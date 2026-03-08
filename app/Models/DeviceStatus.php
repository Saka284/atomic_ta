<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'gh_id',
        'exhaust_status',
        'dehumidifier_status',
        'blower_status',
    ];

    protected $casts = [
        'gh_id' => 'integer',
        'exhaust_status' => 'boolean',
        'dehumidifier_status' => 'boolean',
        'blower_status' => 'boolean',
    ];
}
