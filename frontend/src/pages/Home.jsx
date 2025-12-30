import React, { Suspense, lazy } from 'react';
import { ArrowRight, Shield, Zap, Globe, Lock, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Home = () => {
  return (
    <div className="dark-container">
      {/* Hero Section with Spline */}
      <section className="section-padding min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="display-huge">
                Powering Crypto Payments and Wallets
              </h1>
              <p className="body-large text-[var(--text-secondary)]">
                Accept, store, and settle cryptocurrency seamlessly. Enterprise-grade infrastructure for the future of payments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button className="btn-primary">
                    Get Started
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link to="/developers">
                  <button className="btn-secondary">
                    View Documentation
                  </button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[var(--brand-primary)]">99.9%</div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--brand-primary)]">$50M+</div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">Processed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--brand-primary)]">500+</div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">Merchants</div>
                </div>
              </div>
            </div>

            {/* Right - Spline 3D Animation */}
            <div className="relative h-[700px] w-full">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-[var(--brand-primary)]">Loading 3D...</div>
                </div>
              }>
                <Spline 
                  scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Why Choose Dekaplet?</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Built for merchants, developers, and enterprises who demand reliability, security, and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 border border-[var(--border-subtle)] dark-hover dark-transition">
              <Shield className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Bank-Grade Security</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Multi-signature wallets, cold storage, and enterprise-grade encryption protect your assets.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)] dark-hover dark-transition">
              <Zap className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Instant Settlements</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Real-time transaction tracking with automated settlement to your local bank account.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)] dark-hover dark-transition">
              <Globe className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Multi-Chain Support</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Accept BTC, ETH, TRON, USDT, BUSD and more. One integration, all blockchains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Simple Integration, Powerful Results</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Get started in minutes with our developer-friendly APIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="heading-3 mb-3">Sign Up</h3>
              <p className="body-small text-[var(--text-secondary)]">
                Create your account and complete KYC verification
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="heading-3 mb-3">Integrate API</h3>
              <p className="body-small text-[var(--text-secondary)]">
                Add our payment gateway to your platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="heading-3 mb-3">Accept Payments</h3>
              <p className="body-small text-[var(--text-secondary)]">
                Start accepting crypto from customers worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="heading-3 mb-3">Withdraw Funds</h3>
              <p className="body-small text-[var(--text-secondary)]">
                Convert to fiat and transfer to your bank
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Images */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Built for Scale</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1640161704729-cbe966a08476" 
                alt="Cryptocurrency" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <Lock className="text-[var(--brand-primary)]" size={48} />
              <h3 className="display-medium">Secure Multi-Chain Wallets</h3>
              <p className="body-large text-[var(--text-secondary)]">
                Store crypto securely until you're ready to withdraw. Multi-signature protection, cold storage, and real-time monitoring keep your assets safe.
              </p>
              <Link to="/features">
                <button className="btn-primary w-fit">
                  Learn More
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-16">
            <h2 className="display-medium mb-6">Ready to Transform Your Payments?</h2>
            <p className="body-large text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Join hundreds of merchants already using Dekaplet to accept crypto payments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary">
                  Get Started Now
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/developers">
                <button className="btn-secondary">
                  View API Docs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;