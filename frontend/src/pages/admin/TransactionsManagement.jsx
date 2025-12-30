import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    status: ''
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);

      const [txResponse, statsResponse] = await Promise.all([
        axios.get(`${API}/admin/transactions?${params.toString()}`),
        axios.get(`${API}/admin/transactions/statistics`)
      ]);

      setTransactions(txResponse.data.data || []);
      setStats(statsResponse.data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/admin/transactions/${id}/status`, { status });
      setTransactions(transactions.map(tx => tx.id === id ? {...tx, status} : tx));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'processing': return 'bg-blue-500/20 text-blue-500';
      case 'failed': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
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
        <h1 className="display-large mb-2">Transaction Management</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Monitor and manage all transactions</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Transactions</div>
            <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Completed</div>
            <div className="text-2xl font-bold text-green-500">{stats?.completed || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Pending</div>
            <div className="text-2xl font-bold text-yellow-500">{stats?.pending || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Volume</div>
            <div className="text-2xl font-bold text-[var(--brand-primary)]">${parseFloat(stats?.total_volume || 0).toFixed(2)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-white px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="payment">Payment</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-white px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">ID</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">User</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Type</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Amount</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Date</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]">
                    <td className="px-6 py-4 text-[var(--text-muted)]"># {tx.id}</td>
                    <td className="px-6 py-4 text-white">{tx.user?.name || 'Unknown'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {tx.type === 'deposit' ? (
                          <ArrowDownRight className="text-green-500" size={18} />
                        ) : (
                          <ArrowUpRight className="text-red-500" size={18} />
                        )}
                        <span className="text-white capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                        {parseFloat(tx.amount).toFixed(8)} {tx.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={tx.status}
                        onChange={(e) => updateStatus(tx.id, e.target.value)}
                        className="bg-black border border-[var(--border-subtle)] text-white px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTransactions;
