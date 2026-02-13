<?php

namespace Database\Seeders;

use App\Models\CameraData;
use App\Models\Greenhouse;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CameraDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $greenhouses = Greenhouse::all();
        $now = Carbon::now();

        foreach ($greenhouses as $greenhouse) {
            for ($daysAgo = 7; $daysAgo > 0; $daysAgo--) {
                $date = $now->copy()->subDays($daysAgo)->startOfDay();

                for ($hour = 0; $hour < 24; $hour++) { // Setiap jam
                    $isFoggy = (bool) rand(0, 1);
                    $fogPercentage = $isFoggy ? rand(55, 95) : rand(0, 45);
                    CameraData::create([
                        'gh_id'       => $greenhouse->id,
                        'image'       => '/storage/camera/' . ($isFoggy ? 'sample_foggy.jpg' : 'sample_clear.jpg'),
                        'isFoggy'     => $isFoggy,
                        'fog_percentage' => $fogPercentage,
                        'recorded_at' => $date->copy()->setHour($hour),
                    ]);
                }
            }
        }
    }
}
