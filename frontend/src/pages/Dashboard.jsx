import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  Users,
  ArrowRight,
  Plus,
  Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded-xl mx-auto mb-4 animate-pulse"
              style={{ background: 'var(--brand-gradient)' }}
            />
            <div style={{ color: 'var(--text-muted)' }}>Loading dashboard...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {};

  const statCards = [
    {
      label: 'Total Balance',
      value: `$${parseFloat(stats.total_balance || 0).toFixed(2)}`,
      icon: Wallet,
      color: 'var(--brand-primary)',
      bgColor: 'rgba(0, 212, 170, 0.1)',
      subtext: `${dashboardData?.wallets?.length || 0} active wallets`
    },
    {
      label: 'Total Received',
      value: `$${parseFloat(stats.total_received || 0).toFixed(2)}`,
      icon: ArrowDownRight,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      subtext: `${stats.completed_transactions || 0} transactions`
    },
    {
      label: 'Total Withdrawn',
      value: `$${parseFloat(stats.total_withdrawn || 0).toFixed(2)}`,
      icon: ArrowUpRight,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      subtext: `${stats.pending_withdrawals || 0} pending`
    },
    {
      label: 'Referral Earnings',
      value: `$${parseFloat(stats.referral_earnings || 0).toFixed(2)}`,
      icon: Users,
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      subtext: `${stats.referrals_count || 0} referrals`
    }
  ];

  return (
    <DashboardLayout>
      <div className="animate-slide-up">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Here's an overview of your account activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </span>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: stat.bgColor }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                </div>
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallets Card */}
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ 
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)'
            }}
          >
            <div 
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border-primary)' }}
            >
              <h2 
                className="font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Wallets
              </h2>
              <Link 
                to="/dashboard/wallets"
                className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: 'var(--brand-primary)' }}
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="p-6">
              {dashboardData?.wallets && dashboardData.wallets.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.wallets.slice(0, 4).map((wallet) => (
                    <div 
                      key={wallet.id} 
                      className="flex items-center justify-between p-4 rounded-xl transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                          style={{ background: 'var(--brand-gradient)', color: 'white' }}
                        >
                          {wallet.currency.substring(0, 2)}
                        </div>
                        <div>
                          <div 
                            className="font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {wallet.currency}
                          </div>
                          <div 
                            className="text-sm truncate max-w-[120px]"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {wallet.address?.substring(0, 12)}...
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="font-bold"
                          style={{ color: 'var(--brand-primary)' }}
                        >
                          {parseFloat(wallet.balance).toFixed(4)}
                        </div>
                        <div 
                          className="text-sm"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {wallet.currency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wallet 
                    size={48} 
                    className="mx-auto mb-3"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <p style={{ color: 'var(--text-muted)' }} className="mb-4">
                    No wallets yet
                  </p>
                  <Link
                    to="/dashboard/wallets"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                    style={{ background: 'var(--brand-gradient)', color: 'white' }}
                  >
                    <Plus size={16} />
                    Create Wallet
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ 
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)'
            }}
          >
            <div 
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--border-primary)' }}
            >
              <h2 
                className="font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Recent Transactions
              </h2>
              <Link 
                to="/dashboard/transactions"
                className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: 'var(--brand-primary)' }}
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="p-6">
              {dashboardData?.recent_transactions && dashboardData.recent_transactions.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.recent_transactions.slice(0, 5).map((tx) => (
                    <div 
                      key={tx.id} 
                      className="flex items-center justify-between p-4 rounded-xl transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: tx.type === 'deposit' 
                              ? 'rgba(16, 185, 129, 0.1)' 
                              : 'rgba(239, 68, 68, 0.1)'
                          }}
                        >
                          {tx.type === 'deposit' ? (
                            <ArrowDownRight size={20} style={{ color: '#10b981' }} />
                          ) : (
                            <ArrowUpRight size={20} style={{ color: '#ef4444' }} />
                          )}
                        </div>
                        <div>
                          <div 
                            className="font-semibold capitalize"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {tx.type}
                          </div>
                          <div 
                            className="text-sm"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {new Date(tx.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div 
                          className="font-bold"
                          style={{ color: tx.type === 'deposit' ? '#10b981' : '#ef4444' }}
                        >
                          {tx.type === 'deposit' ? '+' : '-'}{parseFloat(tx.amount).toFixed(4)}
                        </div>
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{
                            background: tx.status === 'completed' 
                              ? 'var(--success-bg)' 
                              : tx.status === 'pending' 
                                ? 'var(--warning-bg)' 
                                : 'var(--error-bg)',
                            color: tx.status === 'completed' 
                              ? 'var(--success)' 
                              : tx.status === 'pending' 
                                ? 'var(--warning)' 
                                : 'var(--error)'
                          }}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp 
                    size={48} 
                    className="mx-auto mb-3"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <p style={{ color: 'var(--text-muted)' }}>
                    No transactions yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Send', icon: ArrowUpRight, path: '/dashboard/cashpoint', color: '#ef4444' },
            { label: 'Receive', icon: ArrowDownRight, path: '/dashboard/wallets', color: '#10b981' },
            { label: 'Verify KYC', icon: Users, path: '/dashboard/compliance', color: '#8b5cf6' },
            { label: 'Get Support', icon: TrendingUp, path: '/dashboard/support', color: '#0ea5e9' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-200 hover:-translate-y-1"
                style={{ 
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${action.color}15` }}
                >
                  <Icon size={24} style={{ color: action.color }} />
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
