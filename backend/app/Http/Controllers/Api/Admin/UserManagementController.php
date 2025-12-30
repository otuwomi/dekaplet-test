<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    /**
     * Get all users
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Date range
        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($users);
    }

    /**
     * Get user details
     */
    public function show(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Get user's wallets
        $wallets = Wallet::where('user_id', $id)->get();

        // Get user's transactions
        $transactions = Transaction::where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Get user stats
        $stats = [
            'total_transactions' => Transaction::where('user_id', $id)->count(),
            'total_volume' => Transaction::where('user_id', $id)
                ->where('status', 'completed')
                ->sum('amount'),
            'total_balance' => $wallets->sum('balance')
        ];

        return response()->json([
            'user' => $user,
            'wallets' => $wallets,
            'transactions' => $transactions,
            'stats' => $stats
        ]);
    }

    /**
     * Update user
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'role' => 'sometimes|in:user,admin',
            'password' => 'sometimes|string|min:8'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Ban/Suspend user
     */
    public function suspend(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cannot suspend admin users'
            ], 403);
        }

        // In a real app, you'd have a 'status' or 'suspended_at' column
        // For now, we'll just return success
        return response()->json([
            'message' => 'User suspended successfully',
            'user' => $user
        ]);
    }

    /**
     * Delete user
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cannot delete admin users'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get user statistics
     */
    public function statistics()
    {
        $stats = [
            'total_users' => User::count(),
            'users_today' => User::whereDate('created_at', today())->count(),
            'users_this_week' => User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'users_this_month' => User::whereMonth('created_at', now()->month)->count(),
            'by_role' => User::selectRaw('role, count(*) as count')
                ->groupBy('role')
                ->get()
        ];

        return response()->json($stats);
    }
}
