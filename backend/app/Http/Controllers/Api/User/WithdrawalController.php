<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
    /**
     * Get all user withdrawals
     */
    public function index(Request $request)
    {
        $withdrawals = Withdrawal::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($withdrawals);
    }

    /**
     * Create withdrawal request
     */
    public function store(Request $request)
    {
        $request->validate([
            'currency' => 'required|string',
            'amount' => 'required|numeric|min:0.00000001',
            'withdrawal_type' => 'required|in:crypto,bank',
            'destination_address' => 'required_if:withdrawal_type,crypto',
            'bank_details' => 'required_if:withdrawal_type,bank|array',
            'bank_details.account_name' => 'required_if:withdrawal_type,bank',
            'bank_details.account_number' => 'required_if:withdrawal_type,bank',
            'bank_details.bank_name' => 'required_if:withdrawal_type,bank',
        ]);

        $user = $request->user();

        // Check wallet balance
        $wallet = Wallet::where('user_id', $user->id)
            ->where('currency', $request->currency)
            ->first();

        if (!$wallet) {
            return response()->json([
                'message' => 'Wallet not found for this currency'
            ], 404);
        }

        // Calculate fee (2% for crypto, $5 for bank)
        $fee = $request->withdrawal_type === 'crypto' 
            ? $request->amount * 0.02 
            : 5.00;

        $totalAmount = $request->amount + $fee;

        if ($wallet->balance < $totalAmount) {
            return response()->json([
                'message' => 'Insufficient balance',
                'available' => $wallet->balance,
                'required' => $totalAmount
            ], 400);
        }

        // Create withdrawal
        $withdrawal = Withdrawal::create([
            'user_id' => $user->id,
            'currency' => $request->currency,
            'amount' => $request->amount,
            'fee' => $fee,
            'withdrawal_type' => $request->withdrawal_type,
            'destination_address' => $request->destination_address,
            'bank_details' => $request->bank_details,
            'status' => 'pending'
        ]);

        // Deduct from wallet
        $wallet->decrement('balance', $totalAmount);

        // Create transaction record
        Transaction::create([
            'user_id' => $user->id,
            'type' => 'withdrawal',
            'currency' => $request->currency,
            'amount' => $request->amount,
            'fee' => $fee,
            'status' => 'pending',
            'to_address' => $request->destination_address ?? 'Bank Transfer',
            'description' => 'Withdrawal request'
        ]);

        return response()->json([
            'message' => 'Withdrawal request submitted successfully',
            'withdrawal' => $withdrawal
        ], 201);
    }

    /**
     * Get withdrawal details
     */
    public function show(Request $request, $id)
    {
        $withdrawal = Withdrawal::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'withdrawal' => $withdrawal
        ]);
    }

    /**
     * Cancel pending withdrawal
     */
    public function cancel(Request $request, $id)
    {
        $withdrawal = Withdrawal::where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->findOrFail($id);

        // Refund to wallet
        $wallet = Wallet::where('user_id', $request->user()->id)
            ->where('currency', $withdrawal->currency)
            ->first();

        if ($wallet) {
            $wallet->increment('balance', $withdrawal->amount + $withdrawal->fee);
        }

        $withdrawal->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Withdrawal cancelled and refunded',
            'withdrawal' => $withdrawal
        ]);
    }
}
