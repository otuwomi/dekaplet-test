import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users, ArrowLeftRight, Download, Shield, HelpCircle, Mail } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const stats = dashboardData?.stats || {};

  return (
    <AdminLayout>
      <div>
        <h1 className="display-large mb-2">Admin Dashboard</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">
          Monitor and manage your Dekaplet platform
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Users */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Total Users</div>
              <Users className="text-blue-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.users?.total || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              +{stats.users?.today || 0} today | +{stats.users?.this_month || 0} this month
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Transactions</div>
              <ArrowLeftRight className="text-green-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.transactions?.total || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.transactions?.pending || 0} pending | ${parseFloat(stats.transactions?.volume || 0).toFixed(2)} volume
            </div>
          </div>

          {/* Withdrawals */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Withdrawals</div>
              <Download className="text-red-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.withdrawals?.pending || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              Pending | ${parseFloat(stats.withdrawals?.amount || 0).toFixed(2)} total
            </div>
          </div>

          {/* KYC */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">KYC Pending</div>
              <Shield className="text-yellow-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.kyc?.pending || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.kyc?.approved || 0} approved | {stats.kyc?.rejected || 0} rejected
            </div>
          </div>

          {/* Support Tickets */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">Open Tickets</div>
              <HelpCircle className="text-purple-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.support?.open || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              {stats.support?.total || 0} total tickets
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[var(--text-muted)]">New Contacts</div>
              <Mail className="text-[var(--brand-primary)]" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.contacts?.new || 0}
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              Contact form submissions
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <h2 className="heading-2 mb-6">Recent Users</h2>
            {dashboardData?.recent_users && dashboardData.recent_users.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recent_users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] rounded">
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-sm text-[var(--text-muted)]">{user.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[var(--text-muted)]">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded mt-1 ${
                        user.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[var(--text-muted)]">
                No recent users
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <h2 className="heading-2 mb-6">Recent Transactions</h2>
            {dashboardData?.recent_transactions && dashboardData.recent_transactions.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recent_transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] rounded">
                    <div>
                      <div className="font-semibold text-white capitalize">{tx.type}</div>
                      <div className="text-sm text-[var(--text-muted)]">
                        {tx.user?.name || 'Unknown User'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--brand-primary)]">
                        {parseFloat(tx.amount).toFixed(8)} {tx.currency}
                      </div>
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
                No recent transactions
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
