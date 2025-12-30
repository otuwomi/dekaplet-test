<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'type',
        'currency',
        'amount',
        'fee',
        'status',
        'blockchain_hash',
        'from_address',
        'to_address',
        'description',
        'metadata'
    ];

    protected $casts = [
        'amount' => 'decimal:8',
        'fee' => 'decimal:8',
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            if (!$transaction->transaction_id) {
                $transaction->transaction_id = 'TXN-' . strtoupper(Str::random(12));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
