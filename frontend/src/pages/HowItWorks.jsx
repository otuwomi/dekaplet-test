import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="display-huge mb-6">How Dekaplet Works</h1>
          <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
            From payment to settlement, understand the complete flow of crypto transactions through our platform.
          </p>
        </div>
      </section>

      {/* Payment Flow Visualization */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1568952433726-3896e3881c65" 
                alt="Digital Network" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="heading-2 mb-2">Merchant Creates Payment</h3>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Your customer initiates a purchase. You generate a payment request via our API or dashboard, specifying the amount in fiat or crypto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="heading-2 mb-2">Customer Sends Payment</h3>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Customer receives a unique wallet address or QR code. They send the crypto from their wallet to the provided address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="heading-2 mb-2">Blockchain Confirmation</h3>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Our system monitors the blockchain for the transaction. Once confirmed, the payment status updates in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="heading-2 mb-2">Secure Storage</h3>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Funds are stored in your secure multi-chain wallet. Keep them in crypto or convert to fiat whenever you're ready.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center text-xl font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="heading-2 mb-2">Settlement & Withdrawal</h3>
                  <p className="body-medium text-[var(--text-secondary)]">
                    Withdraw to your local bank account or keep funds in your wallet. Automated settlements on your schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Technical Infrastructure</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Built on enterprise-grade architecture with multi-layer security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)] mb-4" size={32} />
              <h3 className="heading-2 mb-4">Laravel API Backend</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                RESTful API built with Laravel, featuring Laravel Sanctum for secure authentication and token management.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)] mb-4" size={32} />
              <h3 className="heading-2 mb-4">React Dashboards</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Modern, responsive admin and merchant dashboards with real-time transaction monitoring.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)] mb-4" size={32} />
              <h3 className="heading-2 mb-4">Blockchain Integration</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Connected via Moralis, Chainstack, and Crypto APIs for reliable multi-chain connectivity.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)] mb-4" size={32} />
              <h3 className="heading-2 mb-4">Dockerized Infrastructure</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Containerized deployment for scalability, consistency, and easy maintenance across environments.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)} mb-4" size={32} />
              <h3 className="heading-2 mb-4">Real-Time Webhooks</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Instant notifications for payment status changes, confirmations, and settlements.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <CheckCircle2 className="text-[var(--brand-primary)] mb-4" size={32} />
              <h3 className="heading-2 mb-4">KYC/AML Compliance</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Integrated identity verification and anti-money laundering checks for regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-16">
            <h2 className="display-medium mb-6">Start Accepting Crypto Today</h2>
            <p className="body-large text-[var(--text-secondary)] mb-8">
              Simple integration, powerful infrastructure
            </p>
            <Link to="/contact">
              <button className="btn-primary">
                Get Started
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;