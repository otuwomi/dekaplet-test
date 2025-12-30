import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
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
    
    if (formData.password !== formData.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.password_confirmation
    );
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Registration failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="dark-container">
      <section className="section-padding pt-32 min-h-screen flex items-center">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
            <h1 className="display-medium mb-2 text-center">Create Account</h1>
            <p className="body-medium text-[var(--text-secondary)] mb-8 text-center">
              Start accepting crypto payments today
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[var(--text-secondary)] mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

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
                  minLength="8"
                  className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  placeholder="Minimum 8 characters"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] mb-2" htmlFor="password_confirmation">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  placeholder="Re-enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center mt-6 text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--brand-primary)] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
