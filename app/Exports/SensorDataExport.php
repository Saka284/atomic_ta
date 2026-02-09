<?php

namespace App\Exports;

use App\Models\Sensor;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SensorDataExport implements FromCollection, WithHeadings
{
    protected $gh_id, $start_date, $end_date;

    public function __construct($gh_id, $start_date, $end_date)
    {
        $this->gh_id = $gh_id;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
    }

    public function collection()
    {
        $sensorIds = Cache::remember("sensor_ids_{$this->gh_id}", 3600, function () {
            return Sensor::where('gh_id', $this->gh_id)->pluck('id', 'name')->toArray();
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
        if (empty($inIds)) {
            return collect([]);
        }

        $start = Carbon::parse($this->start_date)->startOfDay()->toDateTimeString();
        $end = Carbon::parse($this->end_date)->addDay()->startOfDay()->toDateTimeString();

        // Optimization: Raw SQL Pivot
        // Performs pivoting in Database Engine (C++), avoiding PHP array memory limits
        $placeholders = implode(',', array_fill(0, count($inIds), '?'));
        $sql = "
            SELECT 
                sd.node_id,
                sd.recorded_at,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as temperature,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as humidity,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as light_intensity,
                MAX(CASE WHEN sd.sensor_id = ? THEN sd.value END) as rssi
            FROM sensor_data sd
            WHERE sd.sensor_id IN ($placeholders)
            AND sd.recorded_at >= ?
            AND sd.recorded_at < ?
            GROUP BY sd.node_id, sd.recorded_at
            ORDER BY sd.recorded_at DESC
        ";

        $params = array_merge($caseParams, $inIds, [$start, $end]);
        $data = \Illuminate\Support\Facades\DB::select($sql, $params);

        return collect($data);
    }

    public function headings(): array
    {
        return ["Node ID", "Recorded At", "Temperature", "Humidity", "Light Intensity", "RSSI"];
    }
}
