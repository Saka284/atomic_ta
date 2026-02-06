<?php

namespace App\Exports;

use App\Models\SensorData;
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
        // Optimization: Raw SQL Pivot
        // Performs pivoting in Database Engine (C++), avoiding PHP array memory limits
        $data = \Illuminate\Support\Facades\DB::select("
            SELECT 
                sd.node_id,
                sd.recorded_at,
                MAX(CASE WHEN s.name = 'Temperature' THEN sd.value END) as temperature,
                MAX(CASE WHEN s.name = 'Humidity' THEN sd.value END) as humidity,
                MAX(CASE WHEN s.name = 'Light Intensity' THEN sd.value END) as light_intensity,
                MAX(CASE WHEN s.name = 'RSSI' THEN sd.value END) as rssi
            FROM sensor_data sd
            JOIN sensors s ON s.id = sd.sensor_id
            WHERE s.gh_id = ? 
            AND DATE(sd.recorded_at) >= ? 
            AND DATE(sd.recorded_at) <= ?
            GROUP BY sd.node_id, sd.recorded_at
            ORDER BY sd.recorded_at DESC
        ", [$this->gh_id, $this->start_date, $this->end_date]);

        return collect($data);
    }

    public function headings(): array
    {
        return ["Node ID", "Recorded At", "Temperature", "Humidity", "Light Intensity", "RSSI"];
    }
}
