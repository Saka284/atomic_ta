<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'gh_id',
        'enabled',
        'start_time',
        'end_time',
        'relay_exhaust',
        'relay_dehumidifier',
        'relay_blower',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    /**
     * Get the greenhouse that owns this schedule.
     */
    public function greenhouse()
    {
        return $this->belongsTo(Greenhouse::class, 'gh_id');
    }

    /**
     * Convert relay states to binary string format.
     * Format: [exhaust][dehumidifier][blower]
     * Values: 0=off, 1=on, 2=threshold
     */
    public function getRelayBinaryAttribute(): string
    {
        $map = ['off' => '0', 'on' => '1', 'threshold' => '2'];
        
        return $map[$this->relay_exhaust] 
             . $map[$this->relay_dehumidifier] 
             . $map[$this->relay_blower];
    }

    /**
     * Set relay states from binary string.
     */
    public static function parseRelayBinary(string $binary): array
    {
        $map = ['0' => 'off', '1' => 'on', '2' => 'threshold'];
        
        return [
            'relay_exhaust' => $map[$binary[0]] ?? 'threshold',
            'relay_dehumidifier' => $map[$binary[1]] ?? 'threshold',
            'relay_blower' => $map[$binary[2]] ?? 'threshold',
        ];
    }
}
