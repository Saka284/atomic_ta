<?php

namespace Database\Seeders;

use App\Models\Greenhouse;
use App\Models\Sensor;
use Illuminate\Database\Seeder;

class SensorRSSISeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $greenhouses = Greenhouse::all();

        // Seed data untuk setiap greenhouse
        foreach ($greenhouses as $gh) {
            Sensor::firstOrCreate([
                'gh_id' => $gh->id,
                'name' => 'RSSI',
                'unit' => 'dBm',
                'threshold_min' => -100.0,
                'threshold_max' => 0.0,
            ]);
        }
    }
}
