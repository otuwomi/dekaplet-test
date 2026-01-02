import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { 
  LayoutDashboard, 
  Users, 
  ArrowLeftRight, 
  Download, 
  Shield, 
  Mail,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { path: '/admin/withdrawals', label: 'Withdrawals', icon: Download },
    { path: '/admin/kyc', label: 'KYC Reviews', icon: Shield },
    { path: '/admin/contacts', label: 'Contacts', icon: Mail },
    { path: '/admin/support', label: 'Support Tickets', icon: HelpCircle },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
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
          <Link to="/admin" className="flex items-center gap-2">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}
            >
              <ShieldCheck size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Admin
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
          <Link to="/admin" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}
            >
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold block" style={{ color: 'var(--text-primary)' }}>
                Dekaplet
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Admin Info */}
        <div className="px-4 py-4 mx-4 mt-16 lg:mt-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {user?.name}
              </div>
              <div className="text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1" 
                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                Administrator
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
                    background: active ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' : 'transparent',
                    color: active ? 'white' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={20} className={active ? '' : 'group-hover:text-[#ef4444]'} />
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
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200"
            style={{ 
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)' 
            }}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">User Dashboard</span>
          </Link>
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
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search users, transactions..."
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm w-72 transition-all focus:w-96"
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
                style={{ background: '#ef4444' }}
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

export default AdminLayout;
