<?php

namespace Database\Seeders;

use App\Models\Sensor;
use App\Models\SensorData;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SensorDataSeeder extends Seeder
{
    public function run()
    {
        $startTime = Carbon::now()->subWeek(); // Mulai dari 1 minggu yang lalu
        $endTime = Carbon::now(); // Sampai sekarang
        $interval = 10; // Setiap 10 menit
        $dataPerInterval = 5; // 5 data per interval

        // Ambil semua sensor yang dikelompokkan berdasarkan greenhouse
        $sensorsByGreenhouse = Sensor::all()->groupBy('gh_id');

        $data = [];

        while ($startTime->lessThanOrEqualTo($endTime)) {
            foreach ($sensorsByGreenhouse as $gh_id => $sensors) {
                $nodeRange = $gh_id == 1 ? [1, 5] : [6, 10]; // Node untuk GH 1 & GH 2

                foreach ($sensors as $sensor) {
                    for ($i = 0; $i < $dataPerInterval; $i++) {
                        $data[] = [
                            'sensor_id'   => $sensor->id,
                            'node_id'     => rand($nodeRange[0], $nodeRange[1]), // Pilih node sesuai GH
                            'value'       => $this->generateSensorValue($sensor->name),
                            'recorded_at' => $startTime->toDateTimeString(),
                            'created_at'  => now(),
                            'updated_at'  => now(),
                        ];
                    }
                }
            }

            if (count($data) >= 5000) { // Insert per batch untuk efisiensi
                SensorData::insert($data);
                $data = [];
            }

            $startTime->addMinutes($interval); // Tambah waktu 10 menit
        }

        if (!empty($data)) {
            SensorData::insert($data);
        }
    }

    private function generateSensorValue($sensorName)
    {
        switch (strtolower($sensorName)) {
            case 'temperature':
                return rand(1800, 3200) / 100; // 18.00 - 32.00°C
            case 'humidity':
                return rand(3000, 9000) / 100; // 30.00% - 90.00%
            case 'light intensity':
                return rand(1000, 50000); // 1,000 - 50,000 lux
            default:
                return rand(10, 100);
        }
    }
}
