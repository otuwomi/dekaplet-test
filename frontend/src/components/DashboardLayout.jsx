import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  Download, 
  Shield, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/wallets', label: 'Wallets', icon: Wallet },
    { path: '/dashboard/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { path: '/dashboard/cashpoint', label: 'Cashpoint', icon: Download },
    { path: '/dashboard/compliance', label: 'Compliance', icon: Shield },
    { path: '/dashboard/referrals', label: 'Referrals', icon: Users },
    { path: '/dashboard/support', label: 'Support', icon: HelpCircle },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-[var(--brand-primary)] text-2xl font-bold">
            Dekaplet
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <Link to="/" className="text-[var(--brand-primary)] text-2xl font-bold">
            Dekaplet
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white font-semibold">{user?.name}</div>
              <div className="text-[var(--text-muted)] text-sm">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      isActive
                        ? 'bg-[var(--brand-primary)] text-black'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[var(--border-subtle)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] hover:text-white rounded transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
