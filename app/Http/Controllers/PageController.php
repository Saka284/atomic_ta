<?php

namespace App\Http\Controllers;

use App\Models\CameraData;
use App\Models\Greenhouse;
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
        $latestDataTime = SensorData::select(
            DB::raw('(SELECT gh_id FROM sensors WHERE sensors.id = sensor_data.sensor_id) as gh_id'),
            'sensor_data.sensor_id',
            DB::raw('MAX(sensor_data.recorded_at) as latest_time')
        )
            ->groupBy('sensor_data.sensor_id')
            ->get()
            ->map(function ($item) {
                $item->latest_time = Carbon::parse($item->latest_time)->format('d/m/Y H:i:s');
                return $item;
            });


        $gaugeData = Cache::remember('gaugeData', 60, function () {
            return SensorData::select(
                'sensors.gh_id',
                'sensor_data.sensor_id',
                'sensors.name',
                'sensors.threshold_min',
                'sensors.threshold_max',
                'sensors.unit',
                DB::raw('AVG(sensor_data.value) as avg_value')
            )
                ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
                ->join(DB::raw('(SELECT sensor_id, node_id, MAX(recorded_at) as latest_time 
                                 FROM sensor_data 
                                 GROUP BY sensor_id, node_id) latest_data'), function ($join) {
                    $join->on('sensor_data.sensor_id', '=', 'latest_data.sensor_id')
                        ->on('sensor_data.node_id', '=', 'latest_data.node_id')
                        ->on('sensor_data.recorded_at', '=', 'latest_data.latest_time');
                })
                ->groupBy(
                    'sensor_data.sensor_id',
                    'sensors.gh_id',
                    'sensors.name',
                    'sensors.threshold_min',
                    'sensors.threshold_max',
                    'sensors.unit'
                )
                ->orderBy('sensors.id')
                ->get();
        });


        return Inertia::render('Monitoring', [
            'gaugeData' => $gaugeData,
            'latestData' => $latestDataTime
        ]);
    }

    public function table()
    {
        return Inertia::render('Table');
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
            $allData = DB::select("
                SELECT 
                    s.gh_id,
                    s.name as sensor_name,
                    sd.node_id,
                    sd.value
                FROM sensor_data sd
                INNER JOIN sensors s ON s.id = sd.sensor_id
                WHERE sd.id IN (
                    SELECT MAX(sd2.id)
                    FROM sensor_data sd2
                    INNER JOIN sensors s2 ON s2.id = sd2.sensor_id
                    WHERE s2.gh_id IN (" . implode(',', $ghIds) . ")
                    GROUP BY sd2.sensor_id, sd2.node_id
                )
            ");

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
            return SensorData::select(
                'sensors.gh_id',
                DB::raw('MAX(sensor_data.recorded_at) as latest_time')
            )
                ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
                ->groupBy('sensors.gh_id')
                ->get()
                ->map(function ($item) {
                    $item->latest_time = Carbon::parse($item->latest_time)->format('d/m/Y H:i:s');
                    return $item;
                });
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
        $latestDataTime = CameraData::latest()->value('recorded_at');
        $formattedTime = $latestDataTime ? Carbon::parse($latestDataTime)->format('d/m/Y H:i:s') : null;
        return Inertia::render('Camera', [
            'latestData' => $formattedTime
        ]);
    }

    public function controlling()
    {
        return Inertia::render('Controlling');
    }
}
