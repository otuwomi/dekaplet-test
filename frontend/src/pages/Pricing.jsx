import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for testing and small projects',
      features: [
        'Up to $10,000/month volume',
        '2.5% transaction fee',
        'Basic API access',
        'Standard support',
        'Payment links',
        'Dashboard analytics',
        'Email notifications',
        '7-day settlement'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Business',
      price: '$99',
      period: '/month',
      description: 'For growing businesses and startups',
      features: [
        'Up to $100,000/month volume',
        '1.5% transaction fee',
        'Full API access',
        'Priority support',
        'Custom payment links',
        'Advanced analytics',
        'Real-time webhooks',
        'Instant settlement',
        'Multi-user access',
        'White-label checkout'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale operations',
      features: [
        'Unlimited volume',
        'Custom transaction fees',
        'Dedicated API infrastructure',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantees',
        'Same-day settlement',
        'Compliance assistance',
        'Custom reporting',
        'Priority blockchain confirmations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="display-huge mb-6">Simple, Transparent Pricing</h1>
          <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
            Choose the plan that fits your business. Scale as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-[var(--bg-secondary)] border p-8 relative ${
                  plan.popular 
                    ? 'border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)] ring-opacity-50' 
                    : 'border-[var(--border-subtle)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--brand-primary)] text-black px-4 py-1 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="heading-1 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-[var(--brand-primary)]">{plan.price}</span>
                    {plan.period && <span className="text-[var(--text-muted)]">{plan.period}</span>}
                  </div>
                  <p className="text-[var(--text-secondary)]">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={20} />
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <button className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="display-medium mb-6">Additional Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">Network Fees</h3>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                Blockchain network fees (gas fees) are passed through at cost. These vary based on network congestion and are paid by the customer during transactions.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">Withdrawal Fees</h3>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                Bank withdrawals: $5 flat fee. Crypto withdrawals: blockchain network fee only. No additional platform fees.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">Currency Exchange</h3>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                Auto-conversion to fiat uses real-time exchange rates with 0.5% spread. Manual conversions available with better rates for larger volumes.
              </p>
            </div>

            <div className="bg-black p-8 border border-[var(--border-subtle)]">
              <h3 className="heading-2 mb-4">No Hidden Fees</h3>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                No setup fees, no monthly minimums, no cancellation fees. Pay only for what you use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <h2 className="display-medium text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <h4 className="heading-3 mb-3">Can I change plans later?</h4>
              <p className="body-medium text-[var(--text-secondary)]">
                Yes, you can upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate any differences.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <h4 className="heading-3 mb-3">What happens if I exceed my volume limit?</h4>
              <p className="body-medium text-[var(--text-secondary)]">
                We'll automatically upgrade you to the next tier for that month. You'll be notified before this happens.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <h4 className="heading-3 mb-3">Are there long-term contracts?</h4>
              <p className="body-medium text-[var(--text-secondary)]">
                No long-term contracts required. All plans are month-to-month except Enterprise, which includes custom terms.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <h4 className="heading-3 mb-3">Do you offer volume discounts?</h4>
              <p className="body-medium text-[var(--text-secondary)]">
                Yes, Enterprise plans include custom pricing based on your volume. Contact our sales team for a quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="display-medium mb-6">Ready to Get Started?</h2>
          <p className="body-large text-[var(--text-secondary)] mb-8">
            Start accepting crypto payments today with our free plan
          </p>
          <Link to="/contact">
            <button className="btn-primary">
              Create Free Account
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;