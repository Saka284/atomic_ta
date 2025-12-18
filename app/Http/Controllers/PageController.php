<?php

namespace App\Http\Controllers;

use App\Models\CameraData;
use App\Models\Greenhouse;
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
        $sensorName = 'Temperature';

        // ===============================
        // DATA ASLI
        // ===============================
        $sensorData = SensorData::select('sensor_data.node_id', 'sensor_data.value', 'sensor_data.recorded_at')
            ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
            ->where('sensors.gh_id', $gh_id)
            ->where('sensors.name', $sensorName)
            ->orderBy('sensor_data.recorded_at', 'desc')
            ->get()
            ->unique('node_id')
            ->values();

        // ===============================
        // FALLBACK DUMMY 
        // ===============================
        if ($sensorData->isEmpty()) {
            $sensorData = collect([
                ['node_id' => 1, 'value' => 22],
                ['node_id' => 2, 'value' => 26],
                ['node_id' => 3, 'value' => 30],
                ['node_id' => 4, 'value' => 34],
                ['node_id' => 5, 'value' => 38],
            ]);
        }

        $greenhouses = Greenhouse::select('id', 'name')->get();

        return Inertia::render('Heatmap', [
            'sensorData' => $sensorData,
            'greenhouses' => $greenhouses,
            'activeGhId' => (int) $gh_id,
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
