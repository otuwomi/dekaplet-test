import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="dark-container">
      <section className="section-padding pt-32 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--bg-secondary)] p-12 border border-[var(--border-subtle)] mb-8">
            <h1 className="display-large mb-4">Welcome, {user?.name}!</h1>
            <p className="body-large text-[var(--text-secondary)]">
              Your Dekaplet merchant dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">Total Payments</h3>
              <div className="text-4xl font-bold text-[var(--brand-primary)] mb-2">$0.00</div>
              <p className="text-[var(--text-muted)]">0 transactions</p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">Wallet Balance</h3>
              <div className="text-4xl font-bold text-[var(--brand-primary)] mb-2">0.00 BTC</div>
              <p className="text-[var(--text-muted)]">Multi-chain wallets</p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">API Status</h3>
              <div className="text-4xl font-bold text-green-500 mb-2">Active</div>
              <p className="text-[var(--text-muted)]">All systems operational</p>
            </div>
          </div>

          <div className="mt-8 bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
            <h2 className="heading-1 mb-6">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="heading-3 mb-2">Complete KYC Verification</h4>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Verify your identity to start accepting payments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="heading-3 mb-2">Get API Keys</h4>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Generate your API keys to integrate Dekaplet
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="heading-3 mb-2">Start Accepting Payments</h4>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Integrate our payment gateway and start receiving crypto
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
