<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WalletController extends Controller
{
    /**
     * Get all user wallets
     */
    public function index(Request $request)
    {
        $wallets = Wallet::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'wallets' => $wallets
        ]);
    }

    /**
     * Create a new wallet
     */
    public function store(Request $request)
    {
        $request->validate([
            'currency' => 'required|string|max:10'
        ]);

        $user = $request->user();

        // Check if wallet already exists
        $existingWallet = Wallet::where('user_id', $user->id)
            ->where('currency', strtoupper($request->currency))
            ->first();

        if ($existingWallet) {
            return response()->json([
                'message' => 'Wallet already exists for this currency',
                'wallet' => $existingWallet
            ], 400);
        }

        // Generate wallet address (simplified - in production, use actual blockchain API)
        $address = $this->generateWalletAddress($request->currency);

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => strtoupper($request->currency),
            'balance' => 0,
            'address' => $address,
            'is_active' => true
        ]);

        return response()->json([
            'message' => 'Wallet created successfully',
            'wallet' => $wallet
        ], 201);
    }

    /**
     * Get single wallet details
     */
    public function show(Request $request, $id)
    {
        $wallet = Wallet::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $transactions = Transaction::where('user_id', $request->user()->id)
            ->where('currency', $wallet->currency)
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'wallet' => $wallet,
            'transactions' => $transactions
        ]);
    }

    /**
     * Generate wallet address (simplified)
     */
    private function generateWalletAddress($currency)
    {
        $currency = strtoupper($currency);
        $prefix = match($currency) {
            'BTC' => '1',
            'ETH' => '0x',
            'TRX' => 'T',
            default => '0x'
        };

        return $prefix . strtoupper(Str::random(40));
    }
}
