<?php

namespace App\Exports;

use App\Models\Sensor;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;

class SensorDataExport implements FromQuery, WithHeadings
{
    protected $gh_id, $start_date, $end_date, $node_id;

    public function __construct($gh_id, $start_date, $end_date, $node_id = null)
    {
        $this->gh_id = $gh_id;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->node_id = $node_id;
    }

    public function query()
    {
        $sensors = Sensor::where('gh_id', $this->gh_id)->get();
        $sensorIdMap = [
            'temperature' => $sensors->where('name', 'Temperature')->pluck('id')->toArray(),
            'humidity' => $sensors->where('name', 'Humidity')->pluck('id')->toArray(),
            'light_intensity' => $sensors->where('name', 'Light Intensity')->pluck('id')->toArray(),
            'rssi' => $sensors->where('name', 'RSSI')->pluck('id')->toArray(),
        ];

        $allIds = array_merge(...array_values($sensorIdMap));
        if (empty($allIds)) {
            // Return an empty query if no sensors found
            return DB::table('sensor_data')->whereRaw('1 = 0');
        }

        $start = Carbon::parse($this->start_date)->startOfDay()->toDateTimeString();
        $end = Carbon::parse($this->end_date)->addDay()->startOfDay()->toDateTimeString();

        // Helper to build IN clause or return a dummy ID (0) if empty
        $toIn = fn($ids) => !empty($ids) ? implode(',', array_map('intval', $ids)) : '0';

        $tempIds = $toIn($sensorIdMap['temperature']);
        $humIds = $toIn($sensorIdMap['humidity']);
        $lightIds = $toIn($sensorIdMap['light_intensity']);
        $rssiIds = $toIn($sensorIdMap['rssi']);
        $allIdsStr = implode(',', array_map('intval', $allIds));

        $query = DB::table('sensor_data as sd')
            ->select([
                'sd.node_id',
                'sd.recorded_at as sent_at',
                DB::raw('MAX(sd.created_at) as received_at'),
                DB::raw("MAX(CASE WHEN sd.sensor_id IN ($tempIds) THEN sd.value END) as temperature"),
                DB::raw("MAX(CASE WHEN sd.sensor_id IN ($humIds) THEN sd.value END) as humidity"),
                DB::raw("MAX(CASE WHEN sd.sensor_id IN ($lightIds) THEN sd.value END) as light_intensity"),
                DB::raw("MAX(CASE WHEN sd.sensor_id IN ($rssiIds) THEN sd.value END) as rssi"),
            ])
            ->whereIn('sd.sensor_id', $allIds)
            ->where('sd.recorded_at', '>=', $start)
            ->where('sd.recorded_at', '<', $end)
            ->groupBy('sd.node_id', 'sd.recorded_at')
            ->orderBy('sd.recorded_at', 'DESC');

        if (!empty($this->node_id)) {
            $query->where('sd.node_id', (int) $this->node_id);
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            "Node ID",
            "Sent At",
            "Received At",
            "Temperature",
            "Humidity",
            "Light Intensity",
            "RSSI",
        ];
    }
}
