<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReferralController extends Controller
{
    /**
     * Get user referral stats
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Generate referral code if not exists
        if (!$user->referral_code) {
            $user->update(['referral_code' => strtoupper(Str::random(8))]);
        }

        $referrals = Referral::where('referrer_id', $user->id)
            ->with('referred:id,name,email,created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'referral_code' => $user->referral_code,
            'total_referrals' => $referrals->count(),
            'active_referrals' => $referrals->where('status', 'active')->count(),
            'total_commission' => $referrals->sum('total_commission'),
            'referral_link' => url('/register?ref=' . $user->referral_code)
        ];

        return response()->json([
            'stats' => $stats,
            'referrals' => $referrals
        ]);
    }

    /**
     * Get referral details
     */
    public function show(Request $request, $id)
    {
        $referral = Referral::where('referrer_id', $request->user()->id)
            ->with('referred')
            ->findOrFail($id);

        return response()->json([
            'referral' => $referral
        ]);
    }
}
