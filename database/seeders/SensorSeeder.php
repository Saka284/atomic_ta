<?php

namespace Database\Seeders;

use App\Models\Greenhouse;
use App\Models\Sensor;
use Illuminate\Database\Seeder;

class SensorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $greenhouses = Greenhouse::all();

        // Jika tidak ada greenhouse, buat dulu
        if ($greenhouses->isEmpty()) {
            $greenhouses = collect([
                Greenhouse::firstOrCreate(['name' => 'Greenhouse 1']),
                Greenhouse::firstOrCreate(['name' => 'Greenhouse 2']),
            ]);
        }

        // Seed data untuk setiap greenhouse
        foreach ($greenhouses as $gh) {
            Sensor::firstOrCreate([
                'gh_id' => $gh->id,
                'name' => 'Temperature',
                'unit' => '°C',
                'threshold_min' => 15.0,
                'threshold_max' => 30.0,
            ]);

            Sensor::firstOrCreate([
                'gh_id' => $gh->id,
                'name' => 'Humidity',
                'unit' => '%',
                'threshold_min' => 40.0,
                'threshold_max' => 80.0,
            ]);

            Sensor::firstOrCreate([
                'gh_id' => $gh->id,
                'name' => 'Light Intensity',
                'unit' => 'lux',
                'threshold_min' => 1000.0,
                'threshold_max' => 10000.0,
            ]);
        }
    }
}
