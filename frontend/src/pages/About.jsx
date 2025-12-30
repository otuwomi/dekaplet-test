import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="display-huge mb-6">About Dekaplet</h1>
          <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
            Building the infrastructure for the future of payments. Secure, compliant, and developer-first.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-[var(--bg-secondary)] p-12 border border-[var(--border-subtle)]">
              <Target className="text-[var(--brand-primary)] mb-6" size={48} />
              <h2 className="display-medium mb-6">Our Mission</h2>
              <p className="body-large text-[var(--text-secondary)]">
                To democratize access to cryptocurrency payments by providing enterprise-grade infrastructure that's simple, secure, and accessible to businesses of all sizes.
              </p>
              <p className="body-medium text-[var(--text-secondary)] mt-4">
                We believe crypto payments should be as easy as accepting credit cards, with the same level of security and compliance that traditional financial institutions provide.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] p-12 border border-[var(--border-subtle)]">
              <Eye className="text-[var(--brand-primary)] mb-6" size={48} />
              <h2 className="display-medium mb-6">Our Vision</h2>
              <p className="body-large text-[var(--text-secondary)]">
                A world where cryptocurrency is the default payment method for global commerce, enabling instant, low-cost transactions across borders.
              </p>
              <p className="body-medium text-[var(--text-secondary)] mt-4">
                We're building the rails that will power the next generation of online payments, making crypto accessible to merchants and customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Image */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Built by Experts</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Our team combines deep expertise in fintech, blockchain, and enterprise software
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1758873271857-c42a7ef7d692" 
                alt="Team" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-black p-6 border border-[var(--border-subtle)]">
                <h3 className="heading-2 mb-3">Fintech Veterans</h3>
                <p className="body-medium text-[var(--text-secondary)]">
                  With decades of combined experience at leading payment processors and financial institutions, we understand compliance, security, and scale.
                </p>
              </div>
              <div className="bg-black p-6 border border-[var(--border-subtle)]">
                <h3 className="heading-2 mb-3">Blockchain Experts</h3>
                <p className="body-medium text-[var(--text-secondary)]">
                  Our team includes core contributors to major blockchain projects and cryptography researchers with deep technical expertise.
                </p>
              </div>
              <div className="bg-black p-6 border border-[var(--border-subtle)]">
                <h3 className="heading-2 mb-3">Developer-First Culture</h3>
                <p className="body-medium text-[var(--text-secondary)]">
                  We're builders ourselves. Every feature is designed with developers in mind, from our API design to our documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-medium mb-6">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center mx-auto mb-6">
                <Award size={40} />
              </div>
              <h3 className="heading-2 mb-4">Security First</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                We prioritize security in every decision, from code reviews to infrastructure design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center mx-auto mb-6">
                <Users size={40} />
              </div>
              <h3 className="heading-2 mb-4">Customer Obsessed</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Our success is measured by our customers' success. We're here to help you grow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center mx-auto mb-6">
                <Target size={40} />
              </div>
              <h3 className="heading-2 mb-4">Compliance-First</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                We navigate regulations so you don't have to. Compliant by design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center mx-auto mb-6">
                <Eye size={40} />
              </div>
              <h3 className="heading-2 mb-4">Transparency</h3>
              <p className="body-medium text-[var(--text-secondary)]">
                Clear pricing, honest communication, and open about our processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Image */}
      <section className="section-padding bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="display-medium">Compliance-First Approach</h2>
              <p className="body-large text-[var(--text-secondary)]">
                We take regulatory compliance seriously. Our platform is built with KYC/AML requirements in mind from day one.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Award className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="heading-3 mb-1">KYC/AML Integrated</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Built-in identity verification and transaction monitoring
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="heading-3 mb-1">Regulatory Partners</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Working with legal and compliance experts worldwide
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="heading-3 mb-1">Transparent Operations</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Full audit trails and reporting for regulatory compliance
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2" 
                alt="Modern Office" 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Backed By */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="display-medium mb-12">Backed by Leading Investors</h2>
          <p className="body-large text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto">
            Supported by investors who believe in the future of crypto payments
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center">
                <span className="text-[var(--text-muted)] text-lg font-bold">Investor {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;