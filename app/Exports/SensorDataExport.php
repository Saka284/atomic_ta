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
        $sensorData = SensorData::select(
            'sensor_data.node_id',
            'sensor_data.recorded_at',
            'sensors.name as sensor_name',
            'sensor_data.value'
        )
            ->join('sensors', 'sensors.id', '=', 'sensor_data.sensor_id')
            ->join('greenhouses', 'greenhouses.id', '=', 'sensors.gh_id')
            ->where('greenhouses.id', $this->gh_id)
            ->whereDate('recorded_at', '>=', $this->start_date)
            ->whereDate('recorded_at', '<=', $this->end_date)
            ->orderByDesc('sensor_data.recorded_at')
            ->get();

        $groupedData = [];

        foreach ($sensorData as $data) {
            $key = $data->node_id . '|' . $data->recorded_at;

            if (!isset($groupedData[$key])) {
                $groupedData[$key] = [
                    'node_id' => $data->node_id,
                    'recorded_at' => $data->recorded_at,
                    'temperature' => null,
                    'humidity' => null,
                    'light_intensity' => null,
                    'rssi' => null,
                ];
            }

            if ($data->sensor_name === 'Temperature') {
                $groupedData[$key]['temperature'] = $data->value;
            } elseif ($data->sensor_name === 'Humidity') {
                $groupedData[$key]['humidity'] = $data->value;
            } elseif ($data->sensor_name === 'Light Intensity') {
                $groupedData[$key]['light_intensity'] = $data->value;
            } elseif ($data->sensor_name === 'RSSI') {
                $groupedData[$key]['rssi'] = $data->value;
}
        }

        return collect(array_values($groupedData));
    }

    public function headings(): array
    {
        return ["Node ID", "Recorded At", "Temperature", "Humidity", "Light Intensity", "RSSI"];
    }
}
