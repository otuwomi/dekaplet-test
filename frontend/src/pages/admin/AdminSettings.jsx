import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Settings as SettingsIcon, Save, Globe, Bell, Shield, Database } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    site_name: 'Dekaplet',
    site_description: 'Powering Crypto Payments and Wallets',
    support_email: 'support@dekaplet.com',
    timezone: 'UTC'
  });

  const [securitySettings, setSecuritySettings] = useState({
    require_2fa: false,
    session_timeout: 30,
    max_login_attempts: 5,
    require_email_verification: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    new_user_notification: true,
    withdrawal_notification: true,
    kyc_notification: true,
    transaction_alerts: true
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Database }
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="display-large mb-2">Settings</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Configure platform settings</p>

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
                        ? 'bg-red-500 text-white'
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
            {activeTab === 'general' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Site Name</label>
                    <input
                      type="text"
                      value={generalSettings.site_name}
                      onChange={(e) => setGeneralSettings({...generalSettings, site_name: e.target.value})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Site Description</label>
                    <textarea
                      value={generalSettings.site_description}
                      onChange={(e) => setGeneralSettings({...generalSettings, site_description: e.target.value})}
                      rows={3}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Support Email</label>
                    <input
                      type="email"
                      value={generalSettings.support_email}
                      onChange={(e) => setGeneralSettings({...generalSettings, support_email: e.target.value})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Timezone</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 font-semibold disabled:opacity-50 hover:bg-red-600"
                  >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] cursor-pointer">
                    <div>
                      <div className="text-white font-medium">Require 2FA for all users</div>
                      <div className="text-[var(--text-muted)] text-sm">Force all users to enable two-factor authentication</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.require_2fa}
                      onChange={(e) => setSecuritySettings({...securitySettings, require_2fa: e.target.checked})}
                      className="w-5 h-5 accent-red-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] cursor-pointer">
                    <div>
                      <div className="text-white font-medium">Require email verification</div>
                      <div className="text-[var(--text-muted)] text-sm">Users must verify email before accessing dashboard</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.require_email_verification}
                      onChange={(e) => setSecuritySettings({...securitySettings, require_email_verification: e.target.checked})}
                      className="w-5 h-5 accent-red-500"
                    />
                  </label>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={securitySettings.session_timeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, session_timeout: parseInt(e.target.value)})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--text-muted)] mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={securitySettings.max_login_attempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, max_login_attempts: parseInt(e.target.value)})}
                      className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 font-semibold disabled:opacity-50 hover:bg-red-600"
                  >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">Admin Notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'new_user_notification', label: 'New User Registration', desc: 'Get notified when a new user registers' },
                    { key: 'withdrawal_notification', label: 'Withdrawal Requests', desc: 'Get notified for new withdrawal requests' },
                    { key: 'kyc_notification', label: 'KYC Submissions', desc: 'Get notified when users submit KYC documents' },
                    { key: 'transaction_alerts', label: 'Large Transactions', desc: 'Get alerts for transactions above threshold' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between p-4 bg-black border border-[var(--border-subtle)] cursor-pointer">
                      <div>
                        <div className="text-white font-medium">{item.label}</div>
                        <div className="text-[var(--text-muted)] text-sm">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings[item.key]}
                        onChange={(e) => setNotificationSettings({...notificationSettings, [item.key]: e.target.checked})}
                        className="w-5 h-5 accent-red-500"
                      />
                    </label>
                  ))}

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 font-semibold disabled:opacity-50 hover:bg-red-600"
                  >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <h2 className="text-xl font-bold text-white mb-6">System Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black p-4 border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-muted)] text-sm">PHP Version</div>
                      <div className="text-white font-bold">8.2.x</div>
                    </div>
                    <div className="bg-black p-4 border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-muted)] text-sm">Laravel Version</div>
                      <div className="text-white font-bold">11.x</div>
                    </div>
                    <div className="bg-black p-4 border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-muted)] text-sm">Database</div>
                      <div className="text-white font-bold">MySQL 8.0</div>
                    </div>
                    <div className="bg-black p-4 border border-[var(--border-subtle)]">
                      <div className="text-[var(--text-muted)] text-sm">Server Status</div>
                      <div className="text-green-500 font-bold">Online</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Maintenance</h3>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]">
                        Clear Cache
                      </button>
                      <button className="px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]">
                        Run Migrations
                      </button>
                      <button className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                        Maintenance Mode
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
