import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Wallet, Plus, Copy, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CURRENCIES = ['BTC', 'ETH', 'USDT', 'TRX', 'BNB', 'SOL'];

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await axios.get(`${API}/user/wallets`);
      setWallets(response.data.wallets || []);
    } catch (error) {
      toast.error('Failed to fetch wallets');
    } finally {
      setLoading(false);
    }
  };

  const createWallet = async () => {
    if (!selectedCurrency) {
      toast.error('Please select a currency');
      return;
    }
    
    setCreating(true);
    try {
      const response = await axios.post(`${API}/user/wallets`, { currency: selectedCurrency });
      setWallets([response.data.wallet, ...wallets]);
      toast.success('Wallet created successfully');
      setShowCreateModal(false);
      setSelectedCurrency('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create wallet');
    } finally {
      setCreating(false);
    }
  };

  const copyAddress = async (address, id) => {
    await navigator.clipboard.writeText(address);
    setCopiedId(id);
    toast.success('Address copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const existingCurrencies = wallets.map(w => w.currency);
  const availableCurrencies = CURRENCIES.filter(c => !existingCurrencies.includes(c));

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading wallets...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="display-large mb-2">My Wallets</h1>
            <p className="body-large text-[var(--text-secondary)]">Manage your cryptocurrency wallets</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
          >
            <Plus size={20} />
            Create Wallet
          </button>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[var(--brand-primary)]/20 rounded-full flex items-center justify-center">
                    <Wallet className="text-[var(--brand-primary)]" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">{wallet.currency}</div>
                    <div className={`text-xs px-2 py-0.5 rounded ${wallet.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {wallet.is_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-[var(--text-muted)] text-sm mb-1">Balance</div>
                <div className="text-2xl font-bold text-[var(--brand-primary)]">
                  {parseFloat(wallet.balance).toFixed(8)} {wallet.currency}
                </div>
              </div>

              <div>
                <div className="text-[var(--text-muted)] text-sm mb-1">Wallet Address</div>
                <div className="flex items-center gap-2">
                  <div className="text-white text-sm truncate flex-1 bg-black px-3 py-2 border border-[var(--border-subtle)]">
                    {wallet.address}
                  </div>
                  <button
                    onClick={() => copyAddress(wallet.address, wallet.id)}
                    className="p-2 bg-[var(--bg-overlay)] hover:bg-[var(--brand-primary)] hover:text-black transition-colors"
                  >
                    {copiedId === wallet.id ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {wallets.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Wallet className="mx-auto text-[var(--text-muted)] mb-4" size={64} />
              <h3 className="text-xl text-white mb-2">No wallets yet</h3>
              <p className="text-[var(--text-muted)] mb-4">Create your first wallet to start receiving crypto</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[var(--brand-primary)] text-black px-6 py-2 font-semibold"
              >
                Create Wallet
              </button>
            </div>
          )}
        </div>

        {/* Create Wallet Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Create New Wallet</h2>
              
              <div className="mb-6">
                <label className="block text-[var(--text-muted)] mb-2">Select Currency</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                >
                  <option value="">Choose currency...</option>
                  {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowCreateModal(false); setSelectedCurrency(''); }}
                  className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                >
                  Cancel
                </button>
                <button
                  onClick={createWallet}
                  disabled={creating || !selectedCurrency}
                  className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Wallet'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Wallets;
