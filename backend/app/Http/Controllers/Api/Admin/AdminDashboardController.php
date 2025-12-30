<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Withdrawal;
use App\Models\KycVerification;
use App\Models\SupportTicket;
use App\Models\ContactForm;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Get admin dashboard statistics
     */
    public function index(Request $request)
    {
        // User stats
        $totalUsers = User::count();
        $newUsersToday = User::whereDate('created_at', today())->count();
        $newUsersThisMonth = User::whereMonth('created_at', now()->month)->count();
        $adminCount = User::where('role', 'admin')->count();

        // Transaction stats
        $totalTransactions = Transaction::count();
        $pendingTransactions = Transaction::where('status', 'pending')->count();
        $completedTransactions = Transaction::where('status', 'completed')->count();
        $totalVolume = Transaction::where('status', 'completed')->sum('amount');

        // Withdrawal stats
        $pendingWithdrawals = Withdrawal::where('status', 'pending')->count();
        $totalWithdrawals = Withdrawal::count();
        $withdrawalAmount = Withdrawal::where('status', 'completed')->sum('amount');

        // KYC stats
        $pendingKyc = KycVerification::where('status', 'pending')->count();
        $approvedKyc = KycVerification::where('status', 'approved')->count();
        $rejectedKyc = KycVerification::where('status', 'rejected')->count();

        // Support stats
        $openTickets = SupportTicket::where('status', 'open')->count();
        $totalTickets = SupportTicket::count();

        // Contact forms
        $newContacts = ContactForm::where('status', 'new')->count();

        // Recent activity
        $recentUsers = User::orderBy('created_at', 'desc')->limit(5)->get();
        $recentTransactions = Transaction::with('user:id,name,email')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => [
                'users' => [
                    'total' => $totalUsers,
                    'today' => $newUsersToday,
                    'this_month' => $newUsersThisMonth,
                    'admins' => $adminCount
                ],
                'transactions' => [
                    'total' => $totalTransactions,
                    'pending' => $pendingTransactions,
                    'completed' => $completedTransactions,
                    'volume' => $totalVolume
                ],
                'withdrawals' => [
                    'pending' => $pendingWithdrawals,
                    'total' => $totalWithdrawals,
                    'amount' => $withdrawalAmount
                ],
                'kyc' => [
                    'pending' => $pendingKyc,
                    'approved' => $approvedKyc,
                    'rejected' => $rejectedKyc
                ],
                'support' => [
                    'open' => $openTickets,
                    'total' => $totalTickets
                ],
                'contacts' => [
                    'new' => $newContacts
                ]
            ],
            'recent_users' => $recentUsers,
            'recent_transactions' => $recentTransactions
        ]);
    }
}
