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
    protected $signature = 'data:prune
        {days=365 : The number of days of data to keep}
        {--force : Actually delete matching rows}';

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
        $query = \App\Models\SensorData::where('recorded_at', '<', $date);
        $count = (int) $query->count();

        $this->info("Pruning data older than {$days} days ({$date->toDateString()})...");
        $this->info("Matched {$count} rows.");

        if (!$this->option('force')) {
            $this->warn('Dry-run only. Re-run with --force to delete.');
            return 0;
        }

        // Prune via DELETE Query (Fastest)
        $deleted = $query->delete();

        $this->info("Deleted {$deleted} records.");
        
        // Optimize table (reclaim space)
        // DB::statement('OPTIMIZE TABLE sensor_data'); 

        return 0;
    }
}
