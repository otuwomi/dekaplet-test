<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactForm;
use Illuminate\Http\Request;

class ContactFormController extends Controller
{
    /**
     * Submit a contact form
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'interest' => 'required|string|max:100',
            'message' => 'required|string',
        ]);

        $contactForm = ContactForm::create($validated);

        return response()->json([
            'message' => 'Contact form submitted successfully',
            'data' => $contactForm
        ], 201);
    }

    /**
     * Get all contact forms (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        
        $contactForms = ContactForm::orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($contactForms);
    }

    /**
     * Get a single contact form
     */
    public function show($id)
    {
        $contactForm = ContactForm::findOrFail($id);

        return response()->json([
            'data' => $contactForm
        ]);
    }

    /**
     * Update contact form status
     */
    public function update(Request $request, $id)
    {
        $contactForm = ContactForm::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:new,in_progress,completed,closed'
        ]);

        $contactForm->update($validated);

        return response()->json([
            'message' => 'Contact form updated successfully',
            'data' => $contactForm
        ]);
    }
}
