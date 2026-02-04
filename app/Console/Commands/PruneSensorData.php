<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PruneSensorData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:prune {days=365 : The number of days of data to keep}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prune sensor data older than X days to maintain performance';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = $this->argument('days');
        $date = now()->subDays($days);

        $this->info("Pruning data older than {$days} days ({$date->toDateString()})...");

        // Prune via DELETE Query (Fastest)
        $count = \App\Models\SensorData::where('recorded_at', '<', $date)->delete();

        $this->info("Deleted {$count} records.");
        
        // Optimize table (reclaim space)
        // DB::statement('OPTIMIZE TABLE sensor_data'); 

        return 0;
    }
}
