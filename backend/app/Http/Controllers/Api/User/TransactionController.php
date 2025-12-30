<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Get all user transactions
     */
    public function index(Request $request)
    {
        $query = Transaction::where('user_id', $request->user()->id);

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

        // Date range filter
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
     * Get single transaction details
     */
    public function show(Request $request, $id)
    {
        $transaction = Transaction::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'transaction' => $transaction
        ]);
    }

    /**
     * Get transaction statistics
     */
    public function statistics(Request $request)
    {
        $userId = $request->user()->id;

        $stats = [
            'total_transactions' => Transaction::where('user_id', $userId)->count(),
            'completed' => Transaction::where('user_id', $userId)->where('status', 'completed')->count(),
            'pending' => Transaction::where('user_id', $userId)->where('status', 'pending')->count(),
            'failed' => Transaction::where('user_id', $userId)->where('status', 'failed')->count(),
            'total_volume' => Transaction::where('user_id', $userId)
                ->where('status', 'completed')
                ->sum('amount'),
            'by_type' => Transaction::where('user_id', $userId)
                ->selectRaw('type, count(*) as count, sum(amount) as total')
                ->groupBy('type')
                ->get()
        ];

        return response()->json($stats);
    }
}
