<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactFormController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\User\DashboardController;
use App\Http\Controllers\Api\User\WalletController;
use App\Http\Controllers\Api\User\TransactionController;
use App\Http\Controllers\Api\User\WithdrawalController;
use App\Http\Controllers\Api\User\KycController;
use App\Http\Controllers\Api\User\ReferralController;
use App\Http\Controllers\Api\User\SupportTicketController;

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
    
    // User Dashboard Routes
    Route::prefix('user')->group(function () {
        // Dashboard stats
        Route::get('/dashboard', [DashboardController::class, 'index']);
        
        // Wallets
        Route::get('/wallets', [WalletController::class, 'index']);
        Route::post('/wallets', [WalletController::class, 'store']);
        Route::get('/wallets/{id}', [WalletController::class, 'show']);
        
        // Transactions
        Route::get('/transactions', [TransactionController::class, 'index']);
        Route::get('/transactions/statistics', [TransactionController::class, 'statistics']);
        Route::get('/transactions/{id}', [TransactionController::class, 'show']);
        
        // Withdrawals
        Route::get('/withdrawals', [WithdrawalController::class, 'index']);
        Route::post('/withdrawals', [WithdrawalController::class, 'store']);
        Route::get('/withdrawals/{id}', [WithdrawalController::class, 'show']);
        Route::post('/withdrawals/{id}/cancel', [WithdrawalController::class, 'cancel']);
        
        // KYC
        Route::get('/kyc', [KycController::class, 'index']);
        Route::post('/kyc', [KycController::class, 'store']);
        Route::get('/kyc/{id}', [KycController::class, 'show']);
        
        // Referrals
        Route::get('/referrals', [ReferralController::class, 'index']);
        Route::get('/referrals/{id}', [ReferralController::class, 'show']);
        
        // Support Tickets
        Route::get('/support-tickets', [SupportTicketController::class, 'index']);
        Route::post('/support-tickets', [SupportTicketController::class, 'store']);
        Route::get('/support-tickets/{id}', [SupportTicketController::class, 'show']);
        Route::post('/support-tickets/{id}/close', [SupportTicketController::class, 'close']);
    });
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
