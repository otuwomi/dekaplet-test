<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionManagementController extends Controller
{
    /**
     * Get all transactions
     */
    public function index(Request $request)
    {
        $query = Transaction::with('user:id,name,email');

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by currency
        if ($request->has('currency')) {
            $query->where('currency', $request->currency);
        }

        // Search by transaction ID or user
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('user', function($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Date range
        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($transactions);
    }

    /**
     * Get transaction details
     */
    public function show($id)
    {
        $transaction = Transaction::with('user')->findOrFail($id);

        return response()->json([
            'transaction' => $transaction
        ]);
    }

    /**
     * Update transaction status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,failed,cancelled'
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Transaction status updated successfully',
            'transaction' => $transaction
        ]);
    }

    /**
     * Get transaction statistics
     */
    public function statistics(Request $request)
    {
        $stats = [
            'total' => Transaction::count(),
            'by_status' => Transaction::selectRaw('status, count(*) as count, sum(amount) as total')
                ->groupBy('status')
                ->get(),
            'by_type' => Transaction::selectRaw('type, count(*) as count, sum(amount) as total')
                ->groupBy('type')
                ->get(),
            'by_currency' => Transaction::selectRaw('currency, count(*) as count, sum(amount) as total')
                ->groupBy('currency')
                ->get(),
            'total_volume' => Transaction::where('status', 'completed')->sum('amount'),
            'today_volume' => Transaction::where('status', 'completed')
                ->whereDate('created_at', today())
                ->sum('amount'),
            'this_month_volume' => Transaction::where('status', 'completed')
                ->whereMonth('created_at', now()->month)
                ->sum('amount')
        ];

        return response()->json($stats);
    }
}
