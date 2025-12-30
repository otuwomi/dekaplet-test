<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\KycVerification;
use Illuminate\Http\Request;

class KycManagementController extends Controller
{
    /**
     * Get all KYC submissions
     */
    public function index(Request $request)
    {
        $query = KycVerification::with('user:id,name,email');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search by user
        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $kycs = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($kycs);
    }

    /**
     * Get KYC details
     */
    public function show($id)
    {
        $kyc = KycVerification::with('user')->findOrFail($id);

        return response()->json([
            'kyc' => $kyc
        ]);
    }

    /**
     * Approve KYC
     */
    public function approve(Request $request, $id)
    {
        $kyc = KycVerification::findOrFail($id);

        $kyc->update([
            'status' => 'approved',
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'KYC approved successfully',
            'kyc' => $kyc
        ]);
    }

    /**
     * Reject KYC
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string'
        ]);

        $kyc = KycVerification::findOrFail($id);

        $kyc->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'KYC rejected',
            'kyc' => $kyc
        ]);
    }

    /**
     * Get KYC statistics
     */
    public function statistics()
    {
        $stats = [
            'total' => KycVerification::count(),
            'pending' => KycVerification::where('status', 'pending')->count(),
            'under_review' => KycVerification::where('status', 'under_review')->count(),
            'approved' => KycVerification::where('status', 'approved')->count(),
            'rejected' => KycVerification::where('status', 'rejected')->count(),
            'today' => KycVerification::whereDate('created_at', today())->count()
        ];

        return response()->json($stats);
    }
}
