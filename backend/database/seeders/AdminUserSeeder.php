<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@dekaplet.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        echo "✓ Admin user created: admin@dekaplet.com / admin123\n";

        // Create test regular user
        $testUser = User::create([
            'name' => 'Test User',
            'email' => 'user@dekaplet.com',
            'password' => Hash::make('user123'),
            'role' => 'user',
            'email_verified_at' => now(),
            'referral_code' => strtoupper(Str::random(8))
        ]);

        echo "✓ Test user created: user@dekaplet.com / user123\n";

        // Create wallets for test user
        $currencies = ['BTC', 'ETH', 'USDT', 'TRX'];
        foreach ($currencies as $currency) {
            $wallet = Wallet::create([
                'user_id' => $testUser->id,
                'currency' => $currency,
                'balance' => rand(1, 10),
                'address' => $this->generateAddress($currency),
                'is_active' => true
            ]);
        }

        echo "✓ Created " . count($currencies) . " wallets for test user\n";

        // Create some test transactions
        $types = ['deposit', 'withdrawal', 'payment'];
        $statuses = ['completed', 'pending', 'processing'];

        for ($i = 0; $i < 10; $i++) {
            Transaction::create([
                'user_id' => $testUser->id,
                'type' => $types[array_rand($types)],
                'currency' => $currencies[array_rand($currencies)],
                'amount' => rand(10, 1000) / 100,
                'fee' => rand(1, 50) / 100,
                'status' => $statuses[array_rand($statuses)],
                'description' => 'Test transaction ' . ($i + 1)
            ]);
        }

        echo "✓ Created 10 test transactions\n";
        echo "\n=== Seeding Complete! ===\n";
        echo "Admin Login: admin@dekaplet.com / admin123\n";
        echo "User Login: user@dekaplet.com / user123\n";
    }

    private function generateAddress($currency)
    {
        $prefix = match($currency) {
            'BTC' => '1',
            'ETH' => '0x',
            'TRX' => 'T',
            default => '0x'
        };

        return $prefix . strtoupper(Str::random(40));
    }
}
