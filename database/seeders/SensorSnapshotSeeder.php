<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SensorSnapshotSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement("
            INSERT INTO sensor_snapshots (sensor_id, node_id, value, recorded_at, created_at, updated_at)
            SELECT sensor_id, node_id, value, recorded_at, NOW(), NOW()
            FROM sensor_data sd1
            WHERE sd1.id = (
                SELECT MAX(sd2.id) 
                FROM sensor_data sd2 
                WHERE sd2.sensor_id = sd1.sensor_id 
                AND sd2.node_id = sd1.node_id
            )
            ON DUPLICATE KEY UPDATE 
                value = VALUES(value), 
                recorded_at = VALUES(recorded_at), 
                updated_at = NOW()
        ");
    }
}
