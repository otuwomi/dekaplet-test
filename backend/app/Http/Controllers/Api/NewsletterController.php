<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class NewsletterController extends Controller
{
    /**
     * Subscribe to newsletter
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        try {
            $newsletter = Newsletter::create($validated);

            return response()->json([
                'message' => 'Successfully subscribed to newsletter',
                'data' => $newsletter
            ], 201);
        } catch (QueryException $e) {
            // Check if it's a duplicate email error
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'message' => 'Email already subscribed'
                ], 400);
            }
            
            throw $e;
        }
    }

    /**
     * Get all newsletter subscriptions (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        
        $newsletters = Newsletter::orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($newsletters);
    }
}
