import React from 'react';
import { Shield, Lock, Zap, Globe, Code, BarChart3, Wallet, Users, Bell, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Wallet size={40} />,
      title: 'Multi-Chain Wallets',
      description: 'Secure storage for BTC, ETH, TRON, USDT, BUSD, and more. One wallet, all your crypto assets.'
    },
    {
      icon: <Shield size={40} />,
      title: 'Bank-Grade Security',
      description: 'Multi-signature wallets, cold storage, and enterprise encryption protect your funds 24/7.'
    },
    {
      icon: <Code size={40} />,
      title: 'Developer-First API',
      description: 'RESTful API with comprehensive documentation, SDKs, and sandbox environment for testing.'
    },
    {
      icon: <Zap size={40} />,
      title: 'Instant Settlements',
      description: 'Real-time transaction tracking with automated settlement to your local bank account.'
    },
    {
      icon: <Bell size={40} />,
      title: 'Real-Time Webhooks',
      description: 'Get instant notifications for payment status changes, confirmations, and withdrawals.'
    },
    {
      icon: <Globe size={40} />,
      title: 'Global Payment Links',
      description: 'Generate shareable payment links for invoicing, subscriptions, or one-time payments.'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Advanced Analytics',
      description: 'Track transactions, monitor settlements, and gain insights with comprehensive dashboards.'
    },
    {
      icon: <Users size={40} />,
      title: 'KYC/AML Compliance',
      description: 'Built-in identity verification and anti-money laundering checks for regulatory compliance.'
    },
    {
      icon: <RefreshCw size={40} />,
      title: 'Auto-Convert to Fiat',
      description: 'Automatically convert crypto to fiat currency and transfer to your bank account.'
    },
    {
      icon: <Lock size={40} />,
      title: 'Two-Factor Authentication',
      description: 'Additional security layer with 2FA for all sensitive operations and withdrawals.'
    }
  ];

  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="display-huge mb-6">Features That Scale</h1>
          <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
            Everything you need to accept, manage, and settle crypto payments at enterprise scale.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)] dark-hover dark-transition"
              >
                <div className="text-[var(--brand-primary)] mb-4">
                  {feature.icon}
                </div>
                <h3 className="heading-2 mb-4">{feature.title}</h3>
                <p className="body-medium text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight with Image */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1634704784915-aacf363b021f" 
                alt="Crypto Integration" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="display-medium">Payment Gateway Built for Developers</h2>
              <p className="body-large text-[var(--text-secondary)]">
                Our API-first architecture makes integration simple and straightforward. Whether you're building an e-commerce platform, SaaS application, or marketplace, Dekaplet adapts to your needs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <span className="body-medium">Comprehensive API documentation with code examples</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <span className="body-medium">SDKs for popular programming languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <span className="body-medium">Sandbox environment for testing without risk</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <span className="body-medium">Real-time webhook notifications for all events</span>
                </li>
              </ul>
              <Link to="/developers">
                <button className="btn-primary">View Documentation</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="display-medium">Enterprise-Grade Security</h2>
              <p className="body-large text-[var(--text-secondary)]">
                Your security is our priority. We employ multiple layers of protection to ensure your funds and data are always safe.
              </p>
              <div className="space-y-4">
                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                  <h4 className="heading-3 mb-2">Multi-Signature Wallets</h4>
                  <p className="body-small text-[var(--text-secondary)]">
                    Require multiple approvals for transactions, adding an extra layer of security.
                  </p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                  <h4 className="heading-3 mb-2">Cold Storage</h4>
                  <p className="body-small text-[var(--text-secondary)]">
                    The majority of funds are stored offline in cold wallets, protected from online threats.
                  </p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                  <h4 className="heading-3 mb-2">24/7 Monitoring</h4>
                  <p className="body-small text-[var(--text-secondary)]">
                    Real-time monitoring of all transactions and system activities for anomaly detection.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559526324-593bc073d938" 
                alt="Security" 
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;