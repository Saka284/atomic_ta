<?php

namespace App\Http\Controllers;

use App\Models\CameraData;
use App\Models\DeviceStatus;
use App\Models\Greenhouse;
use App\Models\Schedule;
use App\Models\Sensor;
use App\Models\SensorData;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class PageController extends Controller
{
    private function getGreenhousesBasic()
    {
        return Cache::remember('greenhouses_basic', 3600, function () {
            return Greenhouse::select('id', 'name')
                ->orderBy('id')
                ->get();
        });
    }

    private function ensureSensorSnapshotsReady(): void
    {
        // Karena `saveSensorData` di ApiController sudah melakukan UPSERT ke table sensor_snapshots secara realtime,
        // Kita tidak perlu lagi melakukan pemindaian FULL TABLE SCAN ke `sensor_data` setiap 30 detik.
        // Full scan table `sensor_data` sangat membebani CPU dan memicu lock database ("loading muter-muter").

        // Kita HANYA melakukan inisialisasi awal satu kali jika tabel sensor_snapshots ternyata sepenuhnya kosong.
        if (Cache::remember('sensor_snapshots_initialized', 86400, fn() => DB::table('sensor_snapshots')->exists())) {
            return;
        }

        // Lakukan inisialisasi hanya jika tabel snapshot kosong (misal baru di-migrate/seeding)
        DB::statement("
            INSERT INTO sensor_snapshots (sensor_id, node_id, value, recorded_at, created_at, updated_at)
            SELECT sd.sensor_id, sd.node_id, sd.value, sd.recorded_at, NOW(), NOW()
            FROM sensor_data sd
            INNER JOIN (
                SELECT sensor_id, node_id, MAX(id) AS latest_id
                FROM sensor_data
                GROUP BY sensor_id, node_id
            ) latest ON latest.latest_id = sd.id
            ON DUPLICATE KEY UPDATE
                value = VALUES(value),
                recorded_at = VALUES(recorded_at),
                updated_at = VALUES(updated_at)
        ");

        Cache::put('sensor_snapshots_initialized', true, 86400);
    }

    private function isSensorOutOfThreshold(?array $sensorSnapshot): bool
    {
        if (!$sensorSnapshot) {
            return false;
        }

        $value = (float) ($sensorSnapshot['value'] ?? 0);
        $thresholdMin = (float) ($sensorSnapshot['threshold_min'] ?? 0);
        $thresholdMax = (float) ($sensorSnapshot['threshold_max'] ?? 0);

        return $value < $thresholdMin || $value > $thresholdMax;
    }

    private function resolveActuatorState(?string $mode, ?array $sensorSnapshot): array
    {
        $normalizedMode = in_array($mode, ['on', 'off', 'threshold'], true)
            ? $mode
            : 'threshold';

        if ($normalizedMode === 'on') {
            return ['status' => true, 'mode' => 'on'];
        }

        if ($normalizedMode === 'off') {
            return ['status' => false, 'mode' => 'off'];
        }

        return [
            'status' => $this->isSensorOutOfThreshold($sensorSnapshot),
            'mode' => 'threshold',
        ];
    }

    private function getGatewayStatusFreshnessSeconds(): int
    {
        return max(60, (int) config('app.gateway_device_status_interval_seconds', 300));
    }

    private function resolveDisplayedActuatorState(
        array $logicState,
        ?DeviceStatus $deviceStatus,
        string $statusField,
        bool $gatewayOnline
    ): array {
        return [
            'status' => $gatewayOnline && $deviceStatus
                ? (bool) $deviceStatus->{$statusField}
                : (bool) ($logicState['status'] ?? false),
            'mode' => $logicState['mode'] ?? 'threshold',
            'gateway_online' => $gatewayOnline,
            'gateway_label' => $gatewayOnline ? 'online' : 'offline',
            'status_source' => $gatewayOnline ? 'gateway' : 'logic',
        ];
    }

    private function buildMonitoringActuatorStatus(): array
    {
        $greenhouseIds = $this->getGreenhousesBasic()
            ->pluck('id')
            ->map(fn($id) => (int) $id)
            ->toArray();

        if (empty($greenhouseIds)) {
            return [];
        }

        $sensorRows = DB::select("
            SELECT
                s.gh_id,
                s.name,
                s.threshold_min,
                s.threshold_max,
                AVG(ss.value) AS avg_value
            FROM sensor_snapshots ss
            JOIN sensors s ON s.id = ss.sensor_id
            WHERE s.name IN ('Temperature', 'Humidity')
            GROUP BY
                s.gh_id,
                s.name,
                s.threshold_min,
                s.threshold_max
        ");

        $sensorByGh = [];
        foreach ($sensorRows as $row) {
            $ghId = (int) $row->gh_id;
            $sensorByGh[$ghId][$row->name] = [
                'value' => (float) $row->avg_value,
                'threshold_min' => (float) $row->threshold_min,
                'threshold_max' => (float) $row->threshold_max,
            ];
        }

        $now = now()->format('H:i:s');
        $activeSchedules = DB::select("
            SELECT
                gh_id,
                relay_exhaust,
                relay_dehumidifier,
                relay_blower
            FROM schedules
            WHERE enabled = 1
              AND (
                    (start_time <= end_time AND start_time <= ? AND end_time >= ?)
                    OR
                    (start_time > end_time AND (start_time <= ? OR end_time >= ?))
                  )
            ORDER BY gh_id ASC, start_time DESC
        ", [$now, $now, $now, $now]);

        $scheduleByGh = [];
        foreach ($activeSchedules as $schedule) {
            $ghId = (int) $schedule->gh_id;
            if (!isset($scheduleByGh[$ghId])) {
                $scheduleByGh[$ghId] = $schedule;
            }
        }

        $deviceStatusByGh = collect();
        if (Schema::hasTable('device_statuses')) {
            $deviceStatusByGh = DeviceStatus::query()
                ->whereIn('gh_id', $greenhouseIds)
                ->get()
                ->keyBy(fn(DeviceStatus $status) => (int) $status->gh_id);
        }
        $gatewayFreshAfter = now()->subSeconds($this->getGatewayStatusFreshnessSeconds());

        $result = [];
        foreach ($greenhouseIds as $ghId) {
            $temperature = $sensorByGh[$ghId]['Temperature'] ?? null;
            $humidity = $sensorByGh[$ghId]['Humidity'] ?? null;
            $schedule = $scheduleByGh[$ghId] ?? null;
            $deviceStatus = $deviceStatusByGh->get($ghId);
            $gatewayOnline = $deviceStatus !== null
                && $deviceStatus->updated_at !== null
                && $deviceStatus->updated_at->greaterThanOrEqualTo($gatewayFreshAfter);

            $logicExhaust = $this->resolveActuatorState(
                $schedule?->relay_exhaust,
                $humidity
            );
            $logicDehumidifier = $this->resolveActuatorState(
                $schedule?->relay_dehumidifier,
                $humidity
            );
            $logicBlower = $this->resolveActuatorState(
                $schedule?->relay_blower,
                $temperature
            );

            $result[$ghId] = [
                'exhaust' => $this->resolveDisplayedActuatorState(
                    $logicExhaust,
                    $deviceStatus,
                    'exhaust_status',
                    $gatewayOnline
                ),
                'dehumidifier' => $this->resolveDisplayedActuatorState(
                    $logicDehumidifier,
                    $deviceStatus,
                    'dehumidifier_status',
                    $gatewayOnline
                ),
                'blower' => $this->resolveDisplayedActuatorState(
                    $logicBlower,
                    $deviceStatus,
                    'blower_status',
                    $gatewayOnline
                ),
            ];
        }

        return $result;
    }

    public function monitoring()
    {
        $this->ensureSensorSnapshotsReady();

        return Inertia::render('Monitoring', [
            'gaugeData' => Inertia::defer(function () {
                return Cache::remember('gaugeData', 5, function () {
                    return DB::select("
                        SELECT 
                            s.gh_id,
                            ss.sensor_id,
                            s.name,
                            s.threshold_min,
                            s.threshold_max,
                            s.unit,
                            AVG(ss.value) as avg_value
                        FROM sensor_snapshots ss
                        JOIN sensors s ON s.id = ss.sensor_id
                        GROUP BY 
                            ss.sensor_id,
                            s.gh_id,
                            s.name,
                            s.threshold_min,
                            s.threshold_max,
                            s.unit
                        ORDER BY s.id
                    ");
                });
            }, 'monitoring'),
            'latestData' => Inertia::defer(function () {
                return Cache::remember('monitoring_latest_time', 5, function () {
                    $rows = DB::select("
                        SELECT 
                            s.gh_id,
                            ss.sensor_id,
                            MAX(ss.recorded_at) as latest_time
                        FROM sensor_snapshots ss
                        JOIN sensors s ON s.id = ss.sensor_id
                        GROUP BY ss.sensor_id, s.gh_id
                    ");

                    foreach ($rows as $item) {
                        $item->latest_time = Carbon::parse($item->latest_time)->format('d/m/Y H:i:s');
                    }

                    return $rows;
                });
            }, 'monitoring'),
            'actuatorStatus' => Inertia::defer(function () {
                return Cache::remember('monitoring_actuator_status', 10, function () {
                    return $this->buildMonitoringActuatorStatus();
                });
            }, 'monitoring'),
        ]);
    }

    public function table()
    {
        $greenhouses = $this->getGreenhousesBasic();

        return Inertia::render('Table', [
            'greenhouses' => $greenhouses,
        ]);
    }

    public function heatmap(Request $request)
    {
        $this->ensureSensorSnapshotsReady();

        $activeGhId = $request->input('gh_id', 1);

        // ===============================
        // GET ALL GREENHOUSES (cached)
        // ===============================
        $greenhouses = $this->getGreenhousesBasic();
        $ghIds = $greenhouses->pluck('id')->toArray();

        return Inertia::render('Heatmap', [
            'greenhouses' => $greenhouses,
            'activeGhId' => (int) $activeGhId,
            'sensorDataByGh' => Inertia::defer(function () use ($ghIds) {
                return Cache::remember('heatmap_sensor_data', 10, function () use ($ghIds) {
                    $placeholders = implode(',', array_fill(0, count($ghIds), '?'));
                    $allData = DB::select("
                        SELECT 
                            s.gh_id,
                            s.name as sensor_name,
                            ss.node_id,
                            ss.value
                        FROM sensor_snapshots ss
                        INNER JOIN sensors s ON s.id = ss.sensor_id
                        WHERE s.gh_id IN ($placeholders)
                    ", $ghIds);

                    $result = [];
                    foreach ($ghIds as $ghId) {
                        $result[$ghId] = [
                            'temperature' => [],
                            'humidity' => [],
                            'lux' => [],
                        ];
                    }

                    foreach ($allData as $row) {
                        $paramKey = match ($row->sensor_name) {
                            'Temperature' => 'temperature',
                            'Humidity' => 'humidity',
                            'Light Intensity' => 'lux',
                            default => null
                        };

                        if ($paramKey && isset($result[$row->gh_id])) {
                            $nodeId = $row->node_id;

                            // MAPPING KHUSUS: Jika Node 10 di GH 1, arahkan ke Node 1 agar muncul di denah
                            if ($row->gh_id == 1 && $nodeId >= 10) {
                                $nodeId = 1;
                            }

                            // Validasi: Pastikan node_id sesuai dengan denah lokasinya (GH1: 1-5, GH2: 6-10)
                            $isValidNode = ($row->gh_id == 1 && $nodeId >= 1 && $nodeId <= 5) ||
                                ($row->gh_id == 2 && $nodeId >= 6 && $nodeId <= 10);

                            if ($isValidNode) {
                                $result[$row->gh_id][$paramKey][] = [
                                    'node_id' => $nodeId,
                                    'value' => $row->value,
                                ];
                            }
                        }
                    }

                    return $result;
                });
            }, 'heatmap'),
            'thresholdsByGh' => Inertia::defer(function () use ($ghIds) {
                return Cache::remember('heatmap_thresholds', 300, function () use ($ghIds) {
                    $result = [];

                    $sensors = Sensor::whereIn('gh_id', $ghIds)
                        ->whereIn('name', ['Temperature', 'Humidity', 'Light Intensity'])
                        ->get(['gh_id', 'name', 'threshold_min', 'threshold_max']);

                    foreach ($ghIds as $ghId) {
                        $ghSensors = $sensors->where('gh_id', $ghId);

                        $temp = $ghSensors->firstWhere('name', 'Temperature');
                        $humidity = $ghSensors->firstWhere('name', 'Humidity');
                        $lux = $ghSensors->firstWhere('name', 'Light Intensity');

                        $result[$ghId] = [
                            'temperature' => [
                                'min' => $temp->threshold_min ?? 25,
                                'max' => $temp->threshold_max ?? 35,
                            ],
                            'humidity' => [
                                'min' => $humidity->threshold_min ?? 50,
                                'max' => $humidity->threshold_max ?? 80,
                            ],
                            'lux' => [
                                'min' => $lux->threshold_min ?? 20000,
                                'max' => $lux->threshold_max ?? 50000,
                            ],
                        ];
                    }

                    return $result;
                });
            }, 'heatmap'),
            'latestData' => Inertia::defer(function () {
                return Cache::remember('heatmap_latest_time', 30, function () {
                    $rows = DB::select("
                        SELECT 
                            s.gh_id,
                            MAX(ss.recorded_at) as latest_time
                        FROM sensor_snapshots ss
                        JOIN sensors s ON s.id = ss.sensor_id
                        GROUP BY s.gh_id
                    ");

                    foreach ($rows as $row) {
                        $row->latest_time = Carbon::parse($row->latest_time)->format('d/m/Y H:i:s');
                    }

                    return $rows;
                });
            }, 'heatmap'),
        ]);
    }

    /**
     * Helper: Generate dummy data for development
     */
    private function getDummyData($baseNodeId, $values)
    {
        return array_map(function ($i) use ($baseNodeId, $values) {
            return ['node_id' => $baseNodeId + $i, 'value' => $values[$i]];
        }, range(0, 4));
    }

    /**
     * Helper: Get latest sensor data for a specific greenhouse and sensor type
     */
    private function getLatestSensorDataForGh($ghId, $sensorName)
    {
        $data = SensorData::select('sensor_data.node_id', 'sensor_data.value', 'sensor_data.recorded_at')
            ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
            ->where('sensors.gh_id', $ghId)
            ->where('sensors.name', $sensorName)
            ->whereIn('sensor_data.id', function ($query) use ($ghId, $sensorName) {
                $query->selectRaw('MAX(sd.id)')
                    ->from('sensor_data as sd')
                    ->join('sensors as s', 's.id', '=', 'sd.sensor_id')
                    ->where('s.gh_id', $ghId)
                    ->where('s.name', $sensorName)
                    ->groupBy('sd.node_id');
            })
            ->get();

        // Fallback dummy data jika kosong (untuk development)
        if ($data->isEmpty()) {
            $baseNodeId = $ghId === 1 ? 1 : 6;
            return collect([
                ['node_id' => $baseNodeId, 'value' => $this->getDummyValue($sensorName, 0)],
                ['node_id' => $baseNodeId + 1, 'value' => $this->getDummyValue($sensorName, 1)],
                ['node_id' => $baseNodeId + 2, 'value' => $this->getDummyValue($sensorName, 2)],
                ['node_id' => $baseNodeId + 3, 'value' => $this->getDummyValue($sensorName, 3)],
                ['node_id' => $baseNodeId + 4, 'value' => $this->getDummyValue($sensorName, 4)],
            ]);
        }

        return $data;
    }

    /**
     * Helper: Get dummy value for development/testing
     */
    private function getDummyValue($sensorName, $index)
    {
        $values = [
            'Temperature' => [20, 25, 30, 35, 40],
            'Humidity' => [45, 55, 65, 75, 85],
            'Light Intensity' => [10000, 20000, 35000, 50000, 65000],
        ];
        return $values[$sensorName][$index] ?? 0;
    }


    public function camera()
    {
        $latestDataTime = Cache::remember('camera_latest_time', 10, function () {
            return CameraData::latest()->value('recorded_at');
        });
        $formattedTime = $latestDataTime ? Carbon::parse($latestDataTime)->format('d/m/Y H:i:s') : null;
        return Inertia::render('Camera', [
            'latestData' => $formattedTime,
            'actuatorStatus' => Inertia::defer(function () {
                return Cache::remember('monitoring_actuator_status', 10, function () {
                    return $this->buildMonitoringActuatorStatus();
                });
            }, 'monitoring'),
        ]);
    }

    public function controlling()
    {
        return Inertia::render('Controlling', [
            'initialData' => Inertia::defer(function () {
                return Cache::remember('controlling_data', 60, function () {
                    return Greenhouse::query()
                        ->select(['id', 'name'])
                        ->with([
                            'sensor' => function ($query) {
                                $query->select(['id', 'gh_id', 'name', 'unit', 'threshold_min', 'threshold_max'])
                                    ->where('name', '!=', 'RSSI');
                            }
                        ])
                        ->get();
                });
            }, 'controlling'),
            'initialSchedules' => Inertia::defer(function () {
                return Cache::remember('controlling_schedules', 60, function () {
                    $schedules = [];
                    $allSchedules = Schedule::query()
                        ->select([
                            'id',
                            'gh_id',
                            'enabled',
                            'start_time',
                            'end_time',
                            'relay_exhaust',
                            'relay_dehumidifier',
                            'relay_blower',
                        ])
                        ->orderBy('gh_id')
                        ->orderBy('start_time')
                        ->get();

                    foreach ($allSchedules as $schedule) {
                        $schedules[$schedule->gh_id][] = [
                            'id' => $schedule->id,
                            'greenhouse_id' => $schedule->gh_id,
                            'enabled' => (bool) $schedule->enabled,
                            'start_time' => substr((string) $schedule->start_time, 0, 5),
                            'end_time' => substr((string) $schedule->end_time, 0, 5),
                            'actuators' => [
                                'blower' => $schedule->relay_blower,
                                'exhaust' => $schedule->relay_exhaust,
                                'dehumidifier' => $schedule->relay_dehumidifier,
                            ],
                        ];
                    }

                    return $schedules;
                });
            }, 'controlling'),
        ]);
    }
}
