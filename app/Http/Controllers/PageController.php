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
        // 1. Optimized Raw SQL for Latest Data Time
        // Leveraging the C++ MySQL Engine for aggregation and joining
        $latestDataTime = DB::select("
            SELECT 
                s.gh_id,
                ss.sensor_id,
                MAX(ss.recorded_at) as latest_time
            FROM sensor_snapshots ss
            JOIN sensors s ON s.id = ss.sensor_id
            GROUP BY ss.sensor_id, s.gh_id
        ");

        // Format dates in PHP (faster than MySQL DATE_FORMAT for large results)
        foreach ($latestDataTime as $item) {
            $item->latest_time = Carbon::parse($item->latest_time)->format('d/m/Y H:i:s');
        }

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
        foreach (Greenhouse::all() as $gh) {
            $allData[$gh->id] = Cache::remember("table_gh_{$gh->id}", 60, function () use ($gh) {
                return DB::select("
                    SELECT 
                        sd.node_id,
                        DATE(sd.recorded_at) as date,
                        TIME(sd.recorded_at) as time,
                        MAX(CASE WHEN s.name = 'Temperature' THEN sd.value END) as temperature,
                        MAX(CASE WHEN s.name = 'Humidity' THEN sd.value END) as humidity,
                        MAX(CASE WHEN s.name = 'Light Intensity' THEN sd.value END) as light_intensity,
                        MAX(CASE WHEN s.name = 'RSSI' THEN sd.value END) as rssi
                    FROM sensor_data sd
                    JOIN sensors s ON s.id = sd.sensor_id
                    WHERE s.gh_id = ?
                    GROUP BY sd.node_id, sd.recorded_at
                    ORDER BY sd.recorded_at DESC
                    LIMIT 500
                ", [$gh->id]);
            });
        }
        
        return Inertia::render('Table', [
            'allTableData' => $allData
        ]);
    }

    public function heatmap(Request $request)
    {
        $gh_id = $request->input('gh_id', 1);

        // ===============================
        // HELPER FUNCTION: Query data sensor terbaru per node
        // Mengambil nilai terbaru dari setiap node_id untuk sensor tertentu
        // ===============================
        $getLatestSensorData = function ($sensorName) use ($gh_id) {
            return SensorData::select('sensor_data.node_id', 'sensor_data.value', 'sensor_data.recorded_at')
                ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
                ->where('sensors.gh_id', $gh_id)
                ->where('sensors.name', $sensorName)
                ->whereIn('sensor_data.id', function ($query) use ($gh_id, $sensorName) {
                    // Subquery: ambil ID dengan recorded_at terbaru per node_id
                    $query->selectRaw('MAX(sd.id)')
                        ->from('sensor_data as sd')
                        ->join('sensors as s', 's.id', '=', 'sd.sensor_id')
                        ->where('s.gh_id', $gh_id)
                        ->where('s.name', $sensorName)
                        ->groupBy('sd.node_id');
                })
                ->get();
        };

        // ===============================
        // QUERY DATA REAL DARI DATABASE
        // ===============================
        $temperatureData = $getLatestSensorData('Temperature');
        $humidityData = $getLatestSensorData('Humidity');
        $luxData = $getLatestSensorData('Light Intensity');

        // ===============================
        // FALLBACK: Jika data kosong, gunakan dummy data
        // (untuk development/testing jika database belum ada data)
        // ===============================
        if ($temperatureData->isEmpty()) {
            $temperatureData = collect([
                ['node_id' => 1, 'value' => 20],
                ['node_id' => 2, 'value' => 25],
                ['node_id' => 3, 'value' => 30],
                ['node_id' => 4, 'value' => 35],
                ['node_id' => 5, 'value' => 40],
            ]);
        }

        if ($humidityData->isEmpty()) {
            $humidityData = collect([
                ['node_id' => 1, 'value' => 45],
                ['node_id' => 2, 'value' => 55],
                ['node_id' => 3, 'value' => 65],
                ['node_id' => 4, 'value' => 75],
                ['node_id' => 5, 'value' => 85],
            ]);
        }

        if ($luxData->isEmpty()) {
            $luxData = collect([
                ['node_id' => 1, 'value' => 10000],
                ['node_id' => 2, 'value' => 20000],
                ['node_id' => 3, 'value' => 35000],
                ['node_id' => 4, 'value' => 50000],
                ['node_id' => 5, 'value' => 65000],
            ]);
        }

        $greenhouses = Greenhouse::select('id', 'name')->get();

        // ===============================
        // GET LATEST DATA TIME FOR EACH GREENHOUSE
        // ===============================
        $latestDataTime = SensorData::select(
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

        // ===============================
        // GET THRESHOLD DATA FROM SENSORS TABLE
        // ===============================
        $tempThresholdData = Sensor::where('gh_id', $gh_id)
            ->where('name', 'Temperature')
            ->first(['threshold_min', 'threshold_max']);

        $humidityThresholdData = Sensor::where('gh_id', $gh_id)
            ->where('name', 'Humidity')
            ->first(['threshold_min', 'threshold_max']);

        $luxThresholdData = Sensor::where('gh_id', $gh_id)
            ->where('name', 'Light Intensity')
            ->first(['threshold_min', 'threshold_max']);

        return Inertia::render('Heatmap', [
            'temperatureData' => $temperatureData,
            'humidityData' => $humidityData,
            'luxData' => $luxData,
            'greenhouses' => $greenhouses,
            'activeGhId' => (int) $gh_id,
            'latestData' => $latestDataTime,
            'temperatureThresholds' => [
                'min' => $tempThresholdData->threshold_min ?? 25,
                'max' => $tempThresholdData->threshold_max ?? 35,
            ],
            'humidityThresholds' => [
                'min' => $humidityThresholdData->threshold_min ?? 50,
                'max' => $humidityThresholdData->threshold_max ?? 80,
            ],
            'luxThresholds' => [
                'min' => $luxThresholdData->threshold_min ?? 20000,
                'max' => $luxThresholdData->threshold_max ?? 50000,
            ],
        ]);
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
