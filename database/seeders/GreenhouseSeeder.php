<?php

namespace Database\Seeders;

use App\Models\Greenhouse;
use Illuminate\Database\Seeder;

class GreenhouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Greenhouse::updateOrCreate(['name' => 'GH Vonflorist 1']);
        Greenhouse::updateOrCreate(['name' => 'GH Vonflorist 2']);
    }
}
