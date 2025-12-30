<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;

class SupportTicketController extends Controller
{
    /**
     * Get all user support tickets
     */
    public function index(Request $request)
    {
        $tickets = SupportTicket::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 20));

        return response()->json($tickets);
    }

    /**
     * Create new support ticket
     */
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'priority' => 'nullable|in:low,medium,high,urgent'
        ]);

        $ticket = SupportTicket::create([
            'user_id' => $request->user()->id,
            'subject' => $request->subject,
            'message' => $request->message,
            'priority' => $request->priority ?? 'medium',
            'status' => 'open'
        ]);

        return response()->json([
            'message' => 'Support ticket created successfully',
            'ticket' => $ticket
        ], 201);
    }

    /**
     * Get ticket details
     */
    public function show(Request $request, $id)
    {
        $ticket = SupportTicket::where('user_id', $request->user()->id)
            ->with('assignedAgent:id,name,email')
            ->findOrFail($id);

        return response()->json([
            'ticket' => $ticket
        ]);
    }

    /**
     * Close ticket
     */
    public function close(Request $request, $id)
    {
        $ticket = SupportTicket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $ticket->update([
            'status' => 'closed',
            'resolved_at' => now()
        ]);

        return response()->json([
            'message' => 'Ticket closed successfully',
            'ticket' => $ticket
        ]);
    }
}
