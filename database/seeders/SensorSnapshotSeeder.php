<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SensorSnapshotSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil daftar kombinasi sensor_id dan node_id yang unik
        $combinations = DB::table('sensor_data')
            ->select('sensor_id', 'node_id')
            ->distinct()
            ->get();

        $this->command->info("Found " . count($combinations) . " unique sensor/node combinations");

        $count = 0;
        foreach ($combinations as $combo) {
            // Ambil data terbaru untuk setiap kombinasi
            $latest = DB::table('sensor_data')
                ->where('sensor_id', $combo->sensor_id)
                ->where('node_id', $combo->node_id)
                ->orderByDesc('id')
                ->first();

            if ($latest) {
                DB::table('sensor_snapshots')->updateOrInsert(
                    [
                        'sensor_id' => $latest->sensor_id,
                        'node_id' => $latest->node_id,
                    ],
                    [
                        'value' => $latest->value,
                        'recorded_at' => $latest->recorded_at,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
                $count++;
            }
        }

        $this->command->info("Inserted/updated $count snapshots");
    }
}
