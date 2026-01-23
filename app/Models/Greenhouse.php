<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Greenhouse extends Model
{
    use HasFactory;

    public function sensor()
    {
        return $this->hasMany(Sensor::class, 'gh_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'gh_id');
    }
}
