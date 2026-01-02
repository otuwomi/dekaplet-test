import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex transition-colors duration-300"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'var(--brand-gradient)' }}
      >
        <div className="relative z-10 p-12 flex flex-col justify-between h-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold text-white">Dekaplet</span>
          </Link>

          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              Access your crypto wallet and manage your payments with enterprise-grade security.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-white">$50M+</div>
              <div className="text-white/60 text-sm">Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-white/60 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/60 text-sm">Merchants</div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Dekaplet
              </span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="hidden lg:flex justify-end mb-8">
            <ThemeToggle />
          </div>

          <div className="mb-8">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Sign in to your account
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-medium hover:underline"
                style={{ color: 'var(--brand-primary)' }}
              >
                Sign up free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  size={18} 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-base transition-all duration-200"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={18} 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-base transition-all duration-200"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--brand-primary)' }}
                />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Remember me
                </span>
              </label>
              <Link 
                to="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--brand-primary)' }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              style={{ 
                background: 'var(--brand-gradient)', 
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(0, 212, 170, 0.3)'
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div 
            className="mt-8 p-4 rounded-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Demo Credentials:
            </p>
            <div className="space-y-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              <p><strong>Admin:</strong> admin@dekaplet.com / admin123</p>
              <p><strong>User:</strong> user@dekaplet.com / user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
