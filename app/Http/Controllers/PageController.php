<?php

namespace App\Http\Controllers;

use App\Models\CameraData;
use App\Models\Greenhouse;
use App\Models\SensorData;
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
