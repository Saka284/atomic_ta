<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Greenhouse extends Model
{
    use HasFactory;
    
    protected $fillable = ['id', 'name'];

    public function sensor()
    {
        return $this->hasMany(Sensor::class, 'gh_id');
    }
}
