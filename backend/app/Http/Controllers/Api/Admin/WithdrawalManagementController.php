<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;

class WithdrawalManagementController extends Controller
{
    /**
     * Get all withdrawals
     */
    public function index(Request $request)
    {
        $query = Withdrawal::with('user:id,name,email');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('withdrawal_type', $request->type);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('withdrawal_id', 'like', "%{$search}%")
                  ->orWhereHas('user', function($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $withdrawals = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($withdrawals);
    }

    /**
     * Get withdrawal details
     */
    public function show($id)
    {
        $withdrawal = Withdrawal::with('user')->findOrFail($id);

        return response()->json([
            'withdrawal' => $withdrawal
        ]);
    }

    /**
     * Approve withdrawal
     */
    public function approve(Request $request, $id)
    {
        $request->validate([
            'admin_notes' => 'nullable|string'
        ]);

        $withdrawal = Withdrawal::findOrFail($id);

        if ($withdrawal->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending withdrawals can be approved'
            ], 400);
        }

        $withdrawal->update([
            'status' => 'completed',
            'admin_notes' => $request->admin_notes,
            'processed_at' => now()
        ]);

        // Update transaction status
        Transaction::where('user_id', $withdrawal->user_id)
            ->where('type', 'withdrawal')
            ->where('amount', $withdrawal->amount)
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->first()
            ?->update(['status' => 'completed']);

        return response()->json([
            'message' => 'Withdrawal approved successfully',
            'withdrawal' => $withdrawal
        ]);
    }

    /**
     * Reject withdrawal
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string'
        ]);

        $withdrawal = Withdrawal::findOrFail($id);

        if ($withdrawal->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending withdrawals can be rejected'
            ], 400);
        }

        // Refund to wallet
        $wallet = Wallet::where('user_id', $withdrawal->user_id)
            ->where('currency', $withdrawal->currency)
            ->first();

        if ($wallet) {
            $wallet->increment('balance', $withdrawal->amount + $withdrawal->fee);
        }

        $withdrawal->update([
            'status' => 'failed',
            'admin_notes' => $request->reason,
            'processed_at' => now()
        ]);

        // Update transaction status
        Transaction::where('user_id', $withdrawal->user_id)
            ->where('type', 'withdrawal')
            ->where('amount', $withdrawal->amount)
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->first()
            ?->update(['status' => 'failed']);

        return response()->json([
            'message' => 'Withdrawal rejected and refunded',
            'withdrawal' => $withdrawal
        ]);
    }

    /**
     * Get withdrawal statistics
     */
    public function statistics()
    {
        $stats = [
            'total' => Withdrawal::count(),
            'pending' => Withdrawal::where('status', 'pending')->count(),
            'completed' => Withdrawal::where('status', 'completed')->count(),
            'failed' => Withdrawal::where('status', 'failed')->count(),
            'total_amount' => Withdrawal::where('status', 'completed')->sum('amount'),
            'pending_amount' => Withdrawal::where('status', 'pending')->sum('amount'),
            'by_type' => Withdrawal::selectRaw('withdrawal_type, count(*) as count, sum(amount) as total')
                ->groupBy('withdrawal_type')
                ->get()
        ];

        return response()->json($stats);
    }
}
