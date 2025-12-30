import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Download, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const params = filter ? `?status=${filter}` : '';
      const [withdrawalsRes, statsRes] = await Promise.all([
        axios.get(`${API}/admin/withdrawals${params}`),
        axios.get(`${API}/admin/withdrawals/statistics`)
      ]);
      setWithdrawals(withdrawalsRes.data.data || []);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch withdrawals');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${API}/admin/withdrawals/${id}/approve`);
      setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: 'completed'} : w));
      toast.success('Withdrawal approved');
    } catch (error) {
      toast.error('Failed to approve withdrawal');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`${API}/admin/withdrawals/${id}/reject`);
      setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: 'rejected'} : w));
      toast.success('Withdrawal rejected');
    } catch (error) {
      toast.error('Failed to reject withdrawal');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />;
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'processing': return <AlertCircle className="text-blue-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-gray-500" size={20} />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="display-large mb-2">Withdrawal Management</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Review and process withdrawal requests</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Withdrawals</div>
            <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Pending</div>
            <div className="text-2xl font-bold text-yellow-500">{stats?.pending || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Approved</div>
            <div className="text-2xl font-bold text-green-500">{stats?.completed || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Amount</div>
            <div className="text-2xl font-bold text-[var(--brand-primary)]">${parseFloat(stats?.total_amount || 0).toFixed(2)}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-white px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Withdrawals Table */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">ID</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">User</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Amount</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Destination</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Date</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]">
                    <td className="px-6 py-4 text-[var(--text-muted)]"># {withdrawal.id}</td>
                    <td className="px-6 py-4 text-white">{withdrawal.user?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-[var(--brand-primary)] font-bold">
                      {parseFloat(withdrawal.amount).toFixed(8)} {withdrawal.currency}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)] max-w-xs truncate">
                      {withdrawal.destination_address}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(withdrawal.status)}
                        <span className="text-white capitalize">{withdrawal.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {new Date(withdrawal.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {withdrawal.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(withdrawal.id)}
                            className="px-3 py-1 bg-green-500 text-white text-sm hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(withdrawal.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {withdrawals.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              No withdrawals found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWithdrawals;
