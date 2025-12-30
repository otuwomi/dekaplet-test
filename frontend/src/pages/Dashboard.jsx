import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Users } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DashboardHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API}/user/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {};

  return (
    <DashboardLayout>
      <div>
        <h1 className="display-large mb-2">Welcome back, {user?.name}!</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">
          Here's what's happening with your account
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Total Balance</div>
              <Wallet className="text-[var(--brand-primary)]" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${parseFloat(stats.total_balance || 0).toFixed(2)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {dashboardData?.wallets?.length || 0} active wallets
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Total Received</div>
              <ArrowDownRight className="text-green-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${parseFloat(stats.total_received || 0).toFixed(2)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.completed_transactions || 0} transactions
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Total Withdrawn</div>
              <ArrowUpRight className="text-red-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${parseFloat(stats.total_withdrawn || 0).toFixed(2)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.pending_withdrawals || 0} pending
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Referral Earnings</div>
              <Users className="text-[var(--brand-primary)]" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${parseFloat(stats.referral_earnings || 0).toFixed(2)}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.referrals_count || 0} referrals
            </div>
          </div>
        </div>

        {/* Wallets Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <h2 className="heading-2 mb-6">Your Wallets</h2>
            {dashboardData?.wallets && dashboardData.wallets.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.wallets.map((wallet) => (
                  <div key={wallet.id} className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] rounded">
                    <div>
                      <div className="font-semibold text-white">{wallet.currency}</div>
                      <div className="text-sm text-[var(--text-muted)] truncate max-w-xs">
                        {wallet.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--brand-primary)]">
                        {parseFloat(wallet.balance).toFixed(8)}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">{wallet.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--text-muted)]">
                No wallets yet. Create your first wallet to get started.
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <h2 className="heading-2 mb-6">Recent Transactions</h2>
            {dashboardData?.recent_transactions && dashboardData.recent_transactions.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recent_transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] rounded">
                    <div>
                      <div className="font-semibold text-white capitalize">{tx.type}</div>
                      <div className="text-sm text-[var(--text-muted)]">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tx.type === 'deposit' ? '+' : '-'}{parseFloat(tx.amount).toFixed(8)}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">{tx.currency}</div>
                      <div className={`text-xs px-2 py-1 rounded mt-1 ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--text-muted)]">
                No transactions yet
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
