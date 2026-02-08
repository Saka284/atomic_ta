<?php

namespace App\Http\Controllers;

use App\Models\CameraData;
use App\Models\Greenhouse;
use App\Models\Schedule;
use App\Models\Sensor;
use App\Models\SensorData;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PageController extends Controller
{
    public function monitoring()
    {
        // 1. Optimized Raw SQL for Latest Data Time (cached)
        $latestDataTime = Cache::remember('monitoring_latest_time', 10, function () {
            // Leveraging the C++ MySQL Engine for aggregation and joining
            $rows = DB::select("
                SELECT 
                    s.gh_id,
                    ss.sensor_id,
                    MAX(ss.recorded_at) as latest_time
                FROM sensor_snapshots ss
                JOIN sensors s ON s.id = ss.sensor_id
                GROUP BY ss.sensor_id, s.gh_id
            ");

            // Format dates in PHP (faster than MySQL DATE_FORMAT for large results)
            foreach ($rows as $item) {
                $item->latest_time = Carbon::parse($item->latest_time)->format('d/m/Y H:i:s');
            }

            return $rows;
        });

        // 2. Optimized Gauge Data Query (Snapshot Read - O(1))
        // Reads from the pre-computed "Materialized View" table
        $gaugeData = Cache::remember('gaugeData', 5, function () { // Reduced cache time because query is instant
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

        return Inertia::render('Monitoring', [
            'gaugeData' => $gaugeData,
            'latestData' => $latestDataTime
        ]);
    }

    public function table()
    {
        $allData = [];
        $greenhouses = Cache::remember('greenhouses', 3600, function () {
            return Greenhouse::select('id')->get();
        });

        foreach ($greenhouses as $gh) {
            $sensorIds = Cache::remember("sensor_ids_{$gh->id}", 3600, function () use ($gh) {
                return Sensor::where('gh_id', $gh->id)->pluck('id', 'name')->toArray();
            });

            $sensorIdMap = [
                'temperature' => $sensorIds['Temperature'] ?? null,
                'humidity' => $sensorIds['Humidity'] ?? null,
                'light_intensity' => $sensorIds['Light Intensity'] ?? null,
                'rssi' => $sensorIds['RSSI'] ?? null,
            ];

            $caseParams = [
                $sensorIdMap['temperature'],
                $sensorIdMap['humidity'],
                $sensorIdMap['light_intensity'],
                $sensorIdMap['rssi'],
            ];

            $inIds = array_values(array_filter($sensorIdMap));

            $allData[$gh->id] = Cache::remember("table_gh_{$gh->id}", 60, function () use ($caseParams, $inIds) {
                if (empty($inIds)) {
                    return [];
                }

                $placeholders = implode(',', array_fill(0, count($inIds), '?'));
                $sql = "
                    SELECT 
                        sd.node_id,
                        DATE(sd.recorded_at) as date,
                        TIME(sd.recorded_at) as time,
                        MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as temperature,
                        MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as humidity,
                        MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as light_intensity,
                        MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as rssi
                    FROM sensor_data sd
                    WHERE sd.sensor_id IN ($placeholders)
                    GROUP BY sd.node_id, sd.recorded_at
                    ORDER BY sd.recorded_at DESC
                    LIMIT 500
                ";

                $params = array_merge($caseParams, $inIds);

                return DB::select($sql, $params);
            });
        }
        
        return Inertia::render('Table', [
            'allTableData' => $allData
        ]);
    }

    public function heatmap(Request $request)
    {
        $activeGhId = $request->input('gh_id', 1);

        // ===============================
        // GET ALL GREENHOUSES (cached)
        // ===============================
        $greenhouses = Cache::remember('greenhouses', 3600, function () {
            return Greenhouse::select('id', 'name')->get();
        });
        $ghIds = $greenhouses->pluck('id')->toArray();

        // ===============================
        // SUPER OPTIMIZED: Single query untuk semua sensor data
        // Menggunakan approach yang lebih efisien daripada subquery per node
        // ===============================
        $sensorDataByGh = Cache::remember('heatmap_sensor_data', 60, function () use ($ghIds) {
            // Single query: ambil data terbaru per (gh_id, sensor_name, node_id)
            // Menggunakan sensor_snapshots (materialized view) untuk O(1) per sensor/node
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

            // Transform ke struktur yang dibutuhkan frontend
            $result = [];
            foreach ($ghIds as $ghId) {
                $result[$ghId] = [
                    'temperature' => [],
                    'humidity' => [],
                    'lux' => [],
                ];
            }

            foreach ($allData as $row) {
                $paramKey = match($row->sensor_name) {
                    'Temperature' => 'temperature',
                    'Humidity' => 'humidity',
                    'Light Intensity' => 'lux',
                    default => null
                };
                
                if ($paramKey && isset($result[$row->gh_id])) {
                    $result[$row->gh_id][$paramKey][] = [
                        'node_id' => $row->node_id,
                        'value' => $row->value,
                    ];
                }
            }

            // Fallback dummy data jika kosong
            foreach ($ghIds as $ghId) {
                $baseNodeId = $ghId === 1 ? 1 : 6;
                if (empty($result[$ghId]['temperature'])) {
                    $result[$ghId]['temperature'] = $this->getDummyData($baseNodeId, [20, 25, 30, 35, 40]);
                }
                if (empty($result[$ghId]['humidity'])) {
                    $result[$ghId]['humidity'] = $this->getDummyData($baseNodeId, [45, 55, 65, 75, 85]);
                }
                if (empty($result[$ghId]['lux'])) {
                    $result[$ghId]['lux'] = $this->getDummyData($baseNodeId, [10000, 20000, 35000, 50000, 65000]);
                }
            }

            return $result;
        });

        // ===============================
        // OPTIMIZED: Query semua thresholds sekaligus dengan caching
        // ===============================
        $thresholdsByGh = Cache::remember('heatmap_thresholds', 300, function () use ($ghIds) {
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

        // ===============================
        // GET LATEST DATA TIME (cached)
        // ===============================
        $latestDataTime = Cache::remember('heatmap_latest_time', 30, function () {
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

        return Inertia::render('Heatmap', [
            'sensorDataByGh' => $sensorDataByGh,
            'thresholdsByGh' => $thresholdsByGh,
            'greenhouses' => $greenhouses,
            'activeGhId' => (int) $activeGhId,
            'latestData' => $latestDataTime,
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
            'latestData' => $formattedTime
        ]);
    }

    public function controlling()
    {
        $controllingData = Cache::remember('controlling_data', 60, function () {
            return Greenhouse::with(['sensor' => function ($query) {
                $query->whereNotIn('name', ['RSSI']);
            }])->get();
        });
        
        $schedules = [];
        foreach (Greenhouse::all() as $gh) {
            $schedules[$gh->id] = Cache::remember("schedules_{$gh->id}", 60, function () use ($gh) {
                return Schedule::where('gh_id', $gh->id)->get();
            });
        }
        
        return Inertia::render('Controlling', [
            'initialData' => $controllingData,
            'initialSchedules' => $schedules
        ]);
    }
}
