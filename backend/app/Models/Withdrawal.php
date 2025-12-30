<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'withdrawal_id',
        'currency',
        'amount',
        'fee',
        'withdrawal_type',
        'destination_address',
        'bank_details',
        'status',
        'admin_notes',
        'processed_at'
    ];

    protected $casts = [
        'amount' => 'decimal:8',
        'fee' => 'decimal:8',
        'bank_details' => 'array',
        'processed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($withdrawal) {
            if (!$withdrawal->withdrawal_id) {
                $withdrawal->withdrawal_id = 'WD-' . strtoupper(Str::random(12));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
