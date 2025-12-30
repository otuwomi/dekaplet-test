<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactFormController;
use App\Http\Controllers\Api\NewsletterController;

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now(),
        'service' => 'Dekaplet API'
    ]);
});

// Root endpoint
Route::get('/', function () {
    return response()->json([
        'message' => 'Dekaplet API - Powering Crypto Payments'
    ]);
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Contact form routes
Route::post('/contact', [ContactFormController::class, 'store']);

// Protected contact form routes (admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contact', [ContactFormController::class, 'index']);
    Route::get('/contact/{id}', [ContactFormController::class, 'show']);
    Route::put('/contact/{id}', [ContactFormController::class, 'update']);
});

// Newsletter routes
Route::post('/newsletter', [NewsletterController::class, 'store']);

// Protected newsletter routes (admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/newsletter', [NewsletterController::class, 'index']);
});
