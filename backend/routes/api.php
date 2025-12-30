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
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\UserManagementController;
use App\Http\Controllers\Api\Admin\TransactionManagementController;
use App\Http\Controllers\Api\Admin\KycManagementController;
use App\Http\Controllers\Api\Admin\WithdrawalManagementController;

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

    // Admin Routes (Protected with admin middleware)
    Route::middleware('admin')->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        
        // User Management
        Route::get('/users', [UserManagementController::class, 'index']);
        Route::get('/users/statistics', [UserManagementController::class, 'statistics']);
        Route::get('/users/{id}', [UserManagementController::class, 'show']);
        Route::put('/users/{id}', [UserManagementController::class, 'update']);
        Route::post('/users/{id}/suspend', [UserManagementController::class, 'suspend']);
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);
        
        // Transaction Management
        Route::get('/transactions', [TransactionManagementController::class, 'index']);
        Route::get('/transactions/statistics', [TransactionManagementController::class, 'statistics']);
        Route::get('/transactions/{id}', [TransactionManagementController::class, 'show']);
        Route::put('/transactions/{id}/status', [TransactionManagementController::class, 'updateStatus']);
        
        // KYC Management
        Route::get('/kyc', [KycManagementController::class, 'index']);
        Route::get('/kyc/statistics', [KycManagementController::class, 'statistics']);
        Route::get('/kyc/{id}', [KycManagementController::class, 'show']);
        Route::post('/kyc/{id}/approve', [KycManagementController::class, 'approve']);
        Route::post('/kyc/{id}/reject', [KycManagementController::class, 'reject']);
        
        // Withdrawal Management
        Route::get('/withdrawals', [WithdrawalManagementController::class, 'index']);
        Route::get('/withdrawals/statistics', [WithdrawalManagementController::class, 'statistics']);
        Route::get('/withdrawals/{id}', [WithdrawalManagementController::class, 'show']);
        Route::post('/withdrawals/{id}/approve', [WithdrawalManagementController::class, 'approve']);
        Route::post('/withdrawals/{id}/reject', [WithdrawalManagementController::class, 'reject']);
        
        // Contact Forms
        Route::get('/contacts', [ContactFormController::class, 'index']);
        Route::get('/contacts/{id}', [ContactFormController::class, 'show']);
        Route::put('/contacts/{id}', [ContactFormController::class, 'update']);
        
        // Newsletters
        Route::get('/newsletters', [NewsletterController::class, 'index']);
    });
});

// Contact form routes
Route::post('/contact', [ContactFormController::class, 'store']);

// Newsletter routes
Route::post('/newsletter', [NewsletterController::class, 'store']);
