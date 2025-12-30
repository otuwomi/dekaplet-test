import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Users, Copy, Check, Gift, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Referrals = () => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await axios.get(`${API}/user/referrals`);
      setReferrals(response.data.referrals || []);
    } catch (error) {
      console.error('Failed to fetch referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const referralCode = user?.referral_code || 'GENERATE';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarnings = referrals.reduce((sum, r) => sum + parseFloat(r.commission_earned || 0), 0);
  const activeReferrals = referrals.filter(r => r.status === 'active').length;

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
        <h1 className="display-large mb-2">Referrals</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Invite friends and earn rewards</p>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-[var(--brand-primary)]" size={24} />
              <span className="text-[var(--text-muted)]">Total Referrals</span>
            </div>
            <div className="text-3xl font-bold text-white">{referrals.length}</div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-[var(--text-muted)]">Active Referrals</span>
            </div>
            <div className="text-3xl font-bold text-green-500">{activeReferrals}</div>
          </div>

          <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="text-[var(--brand-primary)]" size={24} />
              <span className="text-[var(--text-muted)]">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold text-[var(--brand-primary)]">${totalEarnings.toFixed(2)}</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Your Referral Link</h2>
          <p className="text-[var(--text-muted)] mb-4">
            Share this link with friends. You'll earn 10% commission on their trading fees!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[var(--text-muted)] text-sm mb-2">Referral Code</label>
              <div className="flex">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="flex-1 bg-black border border-[var(--border-subtle)] text-[var(--brand-primary)] p-3 font-mono"
                />
                <button
                  onClick={() => copyToClipboard(referralCode)}
                  className="px-4 bg-[var(--brand-primary)] text-black hover:bg-[var(--brand-primary-hover)]"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[var(--text-muted)] text-sm mb-2">Referral Link</label>
              <div className="flex">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-black border border-[var(--border-subtle)] text-white p-3 text-sm truncate"
                />
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="px-4 bg-[var(--brand-primary)] text-black hover:bg-[var(--brand-primary-hover)]"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold text-white">Referred Users</h2>
          </div>
          
          {referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">User</th>
                    <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Commission</th>
                    <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold">
                            {referral.referred_user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="text-white">{referral.referred_user?.name || 'User'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          referral.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                        }`}>
                          {referral.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--brand-primary)] font-bold">
                        ${parseFloat(referral.commission_earned || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
              <p className="text-[var(--text-muted)]">No referrals yet. Share your link to start earning!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
