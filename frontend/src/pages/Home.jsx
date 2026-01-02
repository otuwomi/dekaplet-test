import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Wallet,
  ArrowUpRight,
  CheckCircle,
  TrendingUp,
  Users,
  Lock
} from 'lucide-react';

const Home = () => {
  const stats = [
    { value: '99.9%', label: 'Uptime', icon: Zap },
    { value: '$50M+', label: 'Processed', icon: TrendingUp },
    { value: '500+', label: 'Merchants', icon: Users },
    { value: '50+', label: 'Countries', icon: Globe },
  ];

  const features = [
    {
      icon: Wallet,
      title: 'Multi-Currency Wallets',
      description: 'Support for Bitcoin, Ethereum, USDT, and more. Manage all your crypto in one place.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with multi-sig wallets, 2FA, and cold storage solutions.',
    },
    {
      icon: Zap,
      title: 'Instant Settlements',
      description: 'Real-time transaction processing with instant confirmations and settlements.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Accept payments from anywhere in the world with localized support.',
    },
  ];

  const testimonials = [
    {
      quote: "Dekaplet transformed how we handle crypto payments. The integration was seamless.",
      author: "Sarah Chen",
      role: "CTO, TechFlow",
      avatar: "S"
    },
    {
      quote: "Best-in-class security and support. Our customers love the payment experience.",
      author: "Michael Ross",
      role: "Founder, PayScale",
      avatar: "M"
    },
    {
      quote: "Finally, a crypto payment solution that actually works for enterprise needs.",
      author: "Emily Zhang",
      role: "CFO, BlockVentures",
      avatar: "E"
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 212, 170, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)'
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Now supporting 50+ cryptocurrencies
                </span>
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                The Future of{' '}
                <span className="text-gradient">Crypto Payments</span>
                {' '}is Here
              </h1>
              
              <p 
                className="text-lg mb-8 max-w-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                Accept, store, and settle cryptocurrency seamlessly. 
                Enterprise-grade infrastructure for the future of payments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'var(--brand-gradient)', 
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(0, 212, 170, 0.3)'
                  }}
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/developers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-primary)'
                  }}
                >
                  View Documentation
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center sm:text-left">
                      <div 
                        className="text-2xl sm:text-3xl font-bold mb-1"
                        style={{ color: 'var(--brand-primary)' }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-sm flex items-center gap-1 justify-center sm:justify-start"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Icon size={14} />
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - 3D Animation */}
            <div className="relative h-[400px] lg:h-[600px] hidden lg:block">
              <Spline 
                scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Everything You Need to Accept Crypto
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Powerful features designed for modern businesses. From startups to enterprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Start Accepting Crypto in Minutes
              </h2>
              <p 
                className="mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Our simple integration process gets you up and running fast. 
                No complex setup required.
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Create Account', desc: 'Sign up and verify your business in minutes' },
                  { step: '02', title: 'Integrate API', desc: 'Add our SDK or use pre-built plugins' },
                  { step: '03', title: 'Start Accepting', desc: 'Receive payments in any cryptocurrency' },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{ background: 'var(--brand-gradient)', color: 'white' }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4 
                        className="font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.title}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="p-8 rounded-3xl"
              style={{ 
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)'
              }}
            >
              <div className="space-y-4">
                {[
                  { label: 'API Integration', value: '5 min' },
                  { label: 'First Transaction', value: 'Instant' },
                  { label: 'Settlement Time', value: '< 1 min' },
                  { label: 'Support Response', value: '< 2 hrs' },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'var(--bg-card)' }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span 
                      className="font-semibold"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Trusted by Industry Leaders
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              See what our customers have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl"
                style={{ 
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)'
                }}
              >
                <p 
                  className="mb-6 text-lg"
                  style={{ color: 'var(--text-primary)' }}
                >
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ background: 'var(--brand-gradient)', color: 'white' }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div 
                      className="font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {testimonial.author}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div 
            className="relative overflow-hidden rounded-3xl p-8 lg:p-16 text-center"
            style={{ background: 'var(--brand-gradient)' }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of businesses already using Dekaplet to accept crypto payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  style={{ background: 'white', color: 'var(--brand-primary)' }}
                >
                  Create Free Account
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/3 translate-y-1/3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
