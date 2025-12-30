import React from 'react';
import { Code, Book, Terminal, GitBranch, Webhook, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Developers = () => {
  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="display-huge">Built for Developers</h1>
              <p className="body-large text-[var(--text-secondary)]">
                API-first architecture with comprehensive documentation, SDKs, and tools to integrate crypto payments in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Read Documentation</button>
                <button className="btn-secondary">Try Sandbox</button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" 
                alt="Code" 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Quick Start Integration</h2>
            <p className="body-large text-[var(--text-secondary)]">
              Get up and running in under 10 minutes
            </p>
          </div>

          <div className="bg-black p-8 border border-[var(--border-subtle)] max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[var(--text-muted)]">Create Payment Request</span>
              <span className="text-[var(--brand-primary)] text-sm">cURL</span>
            </div>
            <pre className="bg-[var(--bg-secondary)] p-6 overflow-x-auto text-sm border border-[var(--border-subtle)]">
              <code className="text-[var(--text-secondary)]">{`curl -X POST https://api.dekaplet.com/v1/payments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "100.00",
    "currency": "USD",
    "crypto_currency": "USDT",
    "callback_url": "https://yoursite.com/webhook",
    "metadata": {
      "order_id": "ORDER-123"
    }
  }'`}</code>
            </pre>
          </div>

          <div className="bg-black p-8 border border-[var(--border-subtle)] max-w-4xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[var(--text-muted)]">Response</span>
              <span className="text-[var(--brand-primary)] text-sm">JSON</span>
            </div>
            <pre className="bg-[var(--bg-secondary)] p-6 overflow-x-auto text-sm border border-[var(--border-subtle)]">
              <code className="text-[var(--text-secondary)]">{`{
  "id": "pay_1234567890",
  "status": "pending",
  "amount": "100.00",
  "currency": "USD",
  "crypto_amount": "100.15",
  "crypto_currency": "USDT",
  "wallet_address": "0x742d35Cc6634C0532925a3b8...",
  "qr_code": "https://api.dekaplet.com/qr/pay_1234567890",
  "payment_url": "https://checkout.dekaplet.com/pay_1234567890",
  "expires_at": "2025-08-15T14:30:00Z"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Developer Features */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <Book className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Comprehensive Docs</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Detailed API reference with examples in multiple languages, authentication guides, and best practices.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <Terminal className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">SDKs & Libraries</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Official SDKs for PHP, JavaScript, Python, Ruby, and more. Install via npm, composer, or pip.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <GitBranch className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Sandbox Environment</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Test your integration without real transactions. Full feature parity with production environment.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <Webhook className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Webhook Events</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Real-time notifications for payment confirmations, status changes, and settlements via webhooks.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <Shield className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">API Security</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                OAuth 2.0, API keys, request signing, and rate limiting to keep your integration secure.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <Code className="text-[var(--brand-primary)] mb-4" size={40} />
              <h3 className="heading-2 mb-4">Postman Collection</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Import our complete API collection into Postman and start testing endpoints immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Core API Endpoints</h2>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-[var(--brand-primary)] text-black px-3 py-1 text-sm font-bold">POST</span>
                <code className="text-[var(--text-secondary)]">/v1/payments</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">Create a new payment request</p>
            </div>

            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-green-500 text-black px-3 py-1 text-sm font-bold">GET</span>
                <code className="text-[var(--text-secondary)]">/v1/payments/:id</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">Retrieve payment details and status</p>
            </div>

            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-green-500 text-black px-3 py-1 text-sm font-bold">GET</span>
                <code className="text-[var(--text-secondary)]">/v1/wallets</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">List all wallets and balances</p>
            </div>

            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-[var(--brand-primary)] text-black px-3 py-1 text-sm font-bold">POST</span>
                <code className="text-[var(--text-secondary)]">/v1/withdrawals</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">Initiate a withdrawal to bank or crypto address</p>
            </div>

            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-green-500 text-black px-3 py-1 text-sm font-bold">GET</span>
                <code className="text-[var(--text-secondary)]">/v1/transactions</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">List transaction history with filters</p>
            </div>

            <div className="bg-black p-6 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-[var(--brand-primary)] text-black px-3 py-1 text-sm font-bold">POST</span>
                <code className="text-[var(--text-secondary)]">/v1/webhooks</code>
              </div>
              <p className="text-[var(--text-muted)] text-sm">Configure webhook endpoints for events</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-16">
            <h2 className="display-medium mb-6">Ready to Build?</h2>
            <p className="body-large text-[var(--text-secondary)] mb-8">
              Start integrating Dekaplet in minutes with our developer-friendly API
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-primary">Get API Keys</button>
              <button className="btn-secondary">View Full Docs</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;