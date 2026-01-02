import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
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
  X,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

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

  const isActive = (path) => location.pathname === path;

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Mobile Header */}
      <div 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3"
        style={{ 
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-primary)'
        }}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Dekaplet
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-xl"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 z-40 transform transition-all duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ 
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-primary)'
        }}
      >
        {/* Logo */}
        <div className="p-6 hidden lg:block">
          <Link to="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Dekaplet
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 mx-4 mt-16 lg:mt-0 rounded-2xl" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: 'var(--brand-gradient)' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {user?.name}
              </div>
              <div className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto mt-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group`}
                  style={{
                    background: active ? 'var(--brand-primary)' : 'transparent',
                    color: active ? 'white' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={20} className={active ? '' : 'group-hover:text-[var(--brand-primary)]'} />
                  <span className={`font-medium ${active ? '' : 'group-hover:text-[var(--text-primary)]'}`}>
                    {item.label}
                  </span>
                  {active && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
          <div className="hidden lg:block mb-2">
            <ThemeToggle className="w-full justify-center" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 hover:bg-[var(--error-bg)]"
            style={{ color: 'var(--error)' }}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Top Bar */}
        <div 
          className="hidden lg:flex items-center justify-between px-8 py-4"
          style={{ borderBottom: '1px solid var(--border-primary)' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="relative"
            >
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm w-64 transition-all focus:w-80"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="relative p-2.5 rounded-xl transition-colors"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <Bell size={20} />
              <span 
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: 'var(--error)' }}
              />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8 animate-fade-in">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
