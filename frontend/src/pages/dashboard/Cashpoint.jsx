import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Cashpoint = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [formData, setFormData] = useState({
    wallet_id: '',
    amount: '',
    destination_address: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [withdrawalsRes, walletsRes] = await Promise.all([
        axios.get(`${API}/user/withdrawals`),
        axios.get(`${API}/user/wallets`)
      ]);
      setWithdrawals(withdrawalsRes.data.withdrawals || []);
      setWallets(walletsRes.data.wallets || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!formData.wallet_id || !formData.amount || !formData.destination_address) {
      toast.error('Please fill all fields');
      return;
    }

    setWithdrawing(true);
    try {
      const response = await axios.post(`${API}/user/withdrawals`, formData);
      setWithdrawals([response.data.withdrawal, ...withdrawals]);
      toast.success('Withdrawal request submitted');
      setShowWithdrawModal(false);
      setFormData({ wallet_id: '', amount: '', destination_address: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    } finally {
      setWithdrawing(false);
    }
  };

  const cancelWithdrawal = async (id) => {
    try {
      await axios.post(`${API}/user/withdrawals/${id}/cancel`);
      setWithdrawals(withdrawals.map(w => w.id === id ? {...w, status: 'cancelled'} : w));
      toast.success('Withdrawal cancelled');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />;
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'processing': return <AlertCircle className="text-blue-500" size={20} />;
      case 'rejected':
      case 'cancelled': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-gray-500" size={20} />;
    }
  };

  const selectedWallet = wallets.find(w => w.id === parseInt(formData.wallet_id));

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="display-large mb-2">Cashpoint</h1>
            <p className="body-large text-[var(--text-secondary)]">Withdraw your funds</p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={wallets.length === 0}
            className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors disabled:opacity-50"
          >
            <Download size={20} />
            Withdraw
          </button>
        </div>

        {/* Available Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {wallets.map(wallet => (
            <div key={wallet.id} className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
              <div className="text-[var(--text-muted)] text-sm">{wallet.currency} Balance</div>
              <div className="text-xl font-bold text-[var(--brand-primary)]">
                {parseFloat(wallet.balance).toFixed(8)}
              </div>
            </div>
          ))}
        </div>

        {/* Withdrawal History */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold text-white">Withdrawal History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Amount</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Currency</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Address</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Date</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(withdrawal.status)}
                        <span className="text-white capitalize">{withdrawal.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">
                      {parseFloat(withdrawal.amount).toFixed(8)}
                    </td>
                    <td className="px-6 py-4 text-white">{withdrawal.currency}</td>
                    <td className="px-6 py-4 text-[var(--text-muted)] max-w-xs truncate">
                      {withdrawal.destination_address}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {new Date(withdrawal.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {withdrawal.status === 'pending' && (
                        <button
                          onClick={() => cancelWithdrawal(withdrawal.id)}
                          className="text-red-500 hover:text-red-400 text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {withdrawals.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              No withdrawal history
            </div>
          )}
        </div>

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Withdraw Funds</h2>
              
              <form onSubmit={handleWithdraw}>
                <div className="mb-4">
                  <label className="block text-[var(--text-muted)] mb-2">Select Wallet</label>
                  <select
                    value={formData.wallet_id}
                    onChange={(e) => setFormData({...formData, wallet_id: e.target.value})}
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                  >
                    <option value="">Choose wallet...</option>
                    {wallets.map(wallet => (
                      <option key={wallet.id} value={wallet.id}>
                        {wallet.currency} - {parseFloat(wallet.balance).toFixed(8)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-[var(--text-muted)] mb-2">Amount</label>
                  <input
                    type="number"
                    step="0.00000001"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00000000"
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                  />
                  {selectedWallet && (
                    <div className="text-sm text-[var(--text-muted)] mt-1">
                      Available: {parseFloat(selectedWallet.balance).toFixed(8)} {selectedWallet.currency}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-[var(--text-muted)] mb-2">Destination Address</label>
                  <input
                    type="text"
                    value={formData.destination_address}
                    onChange={(e) => setFormData({...formData, destination_address: e.target.value})}
                    placeholder="Enter wallet address"
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={withdrawing}
                    className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold disabled:opacity-50"
                  >
                    {withdrawing ? 'Processing...' : 'Withdraw'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Cashpoint;
