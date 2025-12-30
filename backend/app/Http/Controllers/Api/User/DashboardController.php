<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Withdrawal;
use App\Models\Referral;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get user dashboard stats
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get wallet balances
        $wallets = Wallet::where('user_id', $user->id)->get();
        $totalBalance = $wallets->sum('balance');

        // Get transaction stats
        $transactionsCount = Transaction::where('user_id', $user->id)->count();
        $completedTransactions = Transaction::where('user_id', $user->id)
            ->where('status', 'completed')
            ->count();

        // Get total received
        $totalReceived = Transaction::where('user_id', $user->id)
            ->where('type', 'deposit')
            ->where('status', 'completed')
            ->sum('amount');

        // Get total withdrawn
        $totalWithdrawn = Withdrawal::where('user_id', $user->id)
            ->where('status', 'completed')
            ->sum('amount');

        // Get pending withdrawals
        $pendingWithdrawals = Withdrawal::where('user_id', $user->id)
            ->where('status', 'pending')
            ->count();

        // Get referrals count
        $referralsCount = Referral::where('referrer_id', $user->id)->count();
        $referralEarnings = Referral::where('referrer_id', $user->id)
            ->sum('total_commission');

        // Recent transactions
        $recentTransactions = Transaction::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'user' => $user,
            'stats' => [
                'total_balance' => $totalBalance,
                'transactions_count' => $transactionsCount,
                'completed_transactions' => $completedTransactions,
                'total_received' => $totalReceived,
                'total_withdrawn' => $totalWithdrawn,
                'pending_withdrawals' => $pendingWithdrawals,
                'referrals_count' => $referralsCount,
                'referral_earnings' => $referralEarnings
            ],
            'wallets' => $wallets,
            'recent_transactions' => $recentTransactions
        ]);
    }
}
