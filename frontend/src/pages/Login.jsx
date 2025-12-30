import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="dark-container">
      <section className="section-padding pt-32 min-h-screen flex items-center">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
            <h1 className="display-medium mb-2 text-center">Welcome Back</h1>
            <p className="body-medium text-[var(--text-secondary)] mb-8 text-center">
              Login to your Dekaplet account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[var(--text-secondary)] mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center mt-6 text-[var(--text-secondary)]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[var(--brand-primary)] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
