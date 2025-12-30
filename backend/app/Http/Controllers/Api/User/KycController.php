<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\KycVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KycController extends Controller
{
    /**
     * Get user KYC status
     */
    public function index(Request $request)
    {
        $kyc = KycVerification::where('user_id', $request->user()->id)
            ->latest()
            ->first();

        return response()->json([
            'kyc' => $kyc,
            'is_verified' => $kyc && $kyc->status === 'approved'
        ]);
    }

    /**
     * Submit KYC documents
     */
    public function store(Request $request)
    {
        $request->validate([
            'document_type' => 'required|string|in:passport,drivers_license,national_id',
            'document_number' => 'required|string',
            'document_front' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'document_back' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'selfie' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        $user = $request->user();

        // Check if already has pending/approved KYC
        $existingKyc = KycVerification::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'under_review', 'approved'])
            ->first();

        if ($existingKyc) {
            return response()->json([
                'message' => 'You already have a KYC submission',
                'kyc' => $existingKyc
            ], 400);
        }

        // Store documents (simplified - in production use S3 or similar)
        $documentFrontPath = $request->file('document_front')->store('kyc/documents', 'public');
        $documentBackPath = $request->hasFile('document_back') 
            ? $request->file('document_back')->store('kyc/documents', 'public')
            : null;
        $selfiePath = $request->file('selfie')->store('kyc/selfies', 'public');

        $kyc = KycVerification::create([
            'user_id' => $user->id,
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'document_front_url' => $documentFrontPath,
            'document_back_url' => $documentBackPath,
            'selfie_url' => $selfiePath,
            'status' => 'pending',
            'submitted_at' => now()
        ]);

        return response()->json([
            'message' => 'KYC documents submitted successfully',
            'kyc' => $kyc
        ], 201);
    }

    /**
     * Get KYC details
     */
    public function show(Request $request, $id)
    {
        $kyc = KycVerification::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'kyc' => $kyc
        ]);
    }
}
