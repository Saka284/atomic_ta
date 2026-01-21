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
        return Inertia::render('Controlling');
    }
}
