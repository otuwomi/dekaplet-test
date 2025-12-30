import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { User, Lock, Bell, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notifications, setNotifications] = useState({
    email_transactions: true,
    email_security: true,
    email_marketing: false,
    push_transactions: true,
    push_security: true
  });

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      // In production, make API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.new_password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      // In production, make API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully');
      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationsSave = async () => {
    setSaving(true);
    try {
      // In production, make API call to update notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences saved');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="display-large mb-2">Settings</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Manage your account settings</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-64">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[var(--brand-primary)] text-black'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)]'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Referral Code</label>
                    <input
                      type="text"
                      value={user?.referral_code || 'Not generated'}
                      readOnly
                      className="w-full bg-black border border-[var(--border-subtle)] text-[var(--text-muted)] p-3"
                    />
                  </div>

                  <button
                    onClick={handleProfileSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-6 py-2 font-semibold disabled:opacity-50"
                  >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                  <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-[var(--text-muted)] mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                        className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--text-muted)] mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                        className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                      />
                    </div>

                    <div>
                      <label className="block text-[var(--text-muted)] mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                        className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-6 py-2 font-semibold disabled:opacity-50"
                    >
                      <Lock size={20} />
                      {saving ? 'Changing...' : 'Change Password'}
                    </button>
                  </form>
                </div>

                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                  <h2 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h2>
                  <p className="text-[var(--text-muted)] mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-2 font-semibold hover:bg-[var(--brand-primary)] hover:text-black transition-colors">
                    <Shield size={20} />
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'email_transactions', label: 'Transaction updates' },
                        { key: 'email_security', label: 'Security alerts' },
                        { key: 'email_marketing', label: 'Marketing & promotions' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-3 bg-black border border-[var(--border-subtle)] cursor-pointer">
                          <span className="text-white">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="w-5 h-5 accent-[var(--brand-primary)]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'push_transactions', label: 'Transaction updates' },
                        { key: 'push_security', label: 'Security alerts' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-3 bg-black border border-[var(--border-subtle)] cursor-pointer">
                          <span className="text-white">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="w-5 h-5 accent-[var(--brand-primary)]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNotificationsSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-6 py-2 font-semibold disabled:opacity-50"
                  >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
