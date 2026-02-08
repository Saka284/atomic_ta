<?php

namespace Database\Seeders;

use App\Models\Greenhouse;
use App\Models\Sensor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BenchmarkSeeder extends Seeder
{
    public function run(): void
    {
        $ghCount = (int) env('BENCH_GH', 2);
        $nodesPerGh = (int) env('BENCH_NODES', 5);
        $rowsPerNode = (int) env('BENCH_ROWS', 300);
        $cameraRows = (int) env('BENCH_CAMERA_ROWS', 120);

        User::updateOrCreate(
            ['username' => 'bench'],
            ['password' => Hash::make('password')]
        );

        $sensorDefs = [
            ['Temperature', 'C', 25, 35],
            ['Humidity', '%', 50, 80],
            ['Light Intensity', 'lx', 20000, 50000],
            ['RSSI', 'dBm', -100, -30],
        ];

        $greenhouses = [];
        for ($i = 1; $i <= $ghCount; $i++) {
            $greenhouses[] = Greenhouse::create([
                'name' => "GH-{$i}",
                'location' => "Zone {$i}",
                'camera_name' => "Camera {$i}",
            ]);
        }

        $sensorMap = [];
        foreach ($greenhouses as $gh) {
            foreach ($sensorDefs as [$name, $unit, $min, $max]) {
                $sensor = Sensor::create([
                    'gh_id' => $gh->id,
                    'name' => $name,
                    'unit' => $unit,
                    'threshold_min' => $min,
                    'threshold_max' => $max,
                ]);
                $sensorMap[$gh->id][$name] = $sensor->id;
            }
        }

        $now = Carbon::now();
        $start = $now->copy()->subMinutes($rowsPerNode);
        $sensorDataRows = [];
        $snapshots = [];

        foreach ($greenhouses as $gh) {
            $baseNode = $gh->id === 1 ? 1 : 6;
            for ($node = 0; $node < $nodesPerGh; $node++) {
                $nodeId = $baseNode + $node;
                for ($i = 0; $i < $rowsPerNode; $i++) {
                    $recordedAt = $start->copy()->addMinutes($i);
                    foreach ($sensorDefs as [$name, $unit, $min, $max]) {
                        $sensorId = $sensorMap[$gh->id][$name];
                        $value = $this->randomValue($name, $min, $max);
                        $sensorDataRows[] = [
                            'sensor_id' => $sensorId,
                            'node_id' => $nodeId,
                            'value' => $value,
                            'recorded_at' => $recordedAt,
                            'created_at' => $recordedAt,
                            'updated_at' => $recordedAt,
                        ];

                        if ($i === $rowsPerNode - 1) {
                            $snapshots[] = [
                                'sensor_id' => $sensorId,
                                'node_id' => $nodeId,
                                'value' => $value,
                                'recorded_at' => $recordedAt,
                                'created_at' => $recordedAt,
                                'updated_at' => $recordedAt,
                            ];
                        }
                    }

                    if (count($sensorDataRows) >= 1000) {
                        DB::table('sensor_data')->insert($sensorDataRows);
                        $sensorDataRows = [];
                    }
                }
            }
        }

        if (!empty($sensorDataRows)) {
            DB::table('sensor_data')->insert($sensorDataRows);
        }

        if (!empty($snapshots)) {
            DB::table('sensor_snapshots')->upsert(
                $snapshots,
                ['sensor_id', 'node_id'],
                ['value', 'recorded_at', 'updated_at']
            );
        }

        $cameraRowsData = [];
        foreach ($greenhouses as $gh) {
            for ($i = 0; $i < $cameraRows; $i++) {
                $recordedAt = $now->copy()->subMinutes($i);
                $cameraRowsData[] = [
                    'gh_id' => $gh->id,
                    'image' => '/images/no-image.svg',
                    'isFoggy' => (bool) ($i % 2),
                    'fog_percentage' => $this->randomFog(),
                    'recorded_at' => $recordedAt,
                    'created_at' => $recordedAt,
                    'updated_at' => $recordedAt,
                ];
            }
        }
        if (!empty($cameraRowsData)) {
            DB::table('camera_data')->insert($cameraRowsData);
        }

        $scheduleRows = [];
        foreach ($greenhouses as $gh) {
            $scheduleRows[] = [
                'gh_id' => $gh->id,
                'enabled' => true,
                'start_time' => '08:00:00',
                'end_time' => '10:00:00',
                'relay_exhaust' => 'threshold',
                'relay_dehumidifier' => 'threshold',
                'relay_blower' => 'threshold',
                'created_at' => $now,
                'updated_at' => $now,
            ];
            $scheduleRows[] = [
                'gh_id' => $gh->id,
                'enabled' => true,
                'start_time' => '14:00:00',
                'end_time' => '16:00:00',
                'relay_exhaust' => 'on',
                'relay_dehumidifier' => 'off',
                'relay_blower' => 'on',
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        if (!empty($scheduleRows)) {
            DB::table('schedules')->insert($scheduleRows);
        }
    }

    private function randomValue(string $sensorName, float $min, float $max): float
    {
        if ($sensorName === 'RSSI') {
            return mt_rand((int) ($min * 10), (int) ($max * 10)) / 10;
        }

        return mt_rand((int) ($min * 10), (int) ($max * 10)) / 10;
    }

    private function randomFog(): float
    {
        return mt_rand(0, 1000) / 10;
    }
}
