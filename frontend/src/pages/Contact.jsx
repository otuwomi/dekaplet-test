import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'general'
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

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        interest: 'general'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-container">
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="display-huge mb-6">Get in Touch</h1>
          <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
            Ready to start accepting crypto payments? Have questions? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
              <h2 className="heading-1 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[var(--text-secondary)] mb-2" htmlFor="name">
                    Full Name *
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] mb-2" htmlFor="company">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] mb-2" htmlFor="interest">
                    I'm interested in *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="starter">Starter Plan</option>
                    <option value="business">Business Plan</option>
                    <option value="enterprise">Enterprise Plan</option>
                    <option value="api">API Integration</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] mb-2" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-black border border-[var(--border-subtle)] p-4 text-white focus:border-[var(--brand-primary)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-1 mb-6">Contact Information</h2>
                <p className="body-large text-[var(--text-secondary)] mb-8">
                  Reach out to our team for sales inquiries, technical support, or partnership opportunities.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] flex items-start gap-4">
                  <Mail className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="heading-3 mb-2">Email</h3>
                    <p className="text-[var(--text-secondary)]">support@dekaplet.com</p>
                    <p className="text-[var(--text-secondary)]">sales@dekaplet.com</p>
                  </div>
                </div>

                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] flex items-start gap-4">
                  <Phone className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="heading-3 mb-2">Phone</h3>
                    <p className="text-[var(--text-secondary)]">+1 (555) 123-4567</p>
                    <p className="text-[var(--text-muted)] text-sm">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] flex items-start gap-4">
                  <MapPin className="text-[var(--brand-primary)] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="heading-3 mb-2">Office</h3>
                    <p className="text-[var(--text-secondary)]">
                      123 Crypto Street<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
                <h3 className="heading-2 mb-4">Sales Inquiries</h3>
                <p className="body-medium text-[var(--text-secondary)] mb-4">
                  Looking for Enterprise pricing or have specific requirements? Our sales team is ready to help you find the perfect solution.
                </p>
                <a href="mailto:sales@dekaplet.com" className="text-[var(--brand-primary)] hover:underline">
                  Contact Sales →
                </a>
              </div>

              <div className="bg-[var(--bg-secondary)] p-8 border border-[var(--border-subtle)]">
                <h3 className="heading-2 mb-4">Technical Support</h3>
                <p className="body-medium text-[var(--text-secondary)] mb-4">
                  Need help with integration or experiencing technical issues? Our support team is available 24/7.
                </p>
                <a href="mailto:support@dekaplet.com" className="text-[var(--brand-primary)] hover:underline">
                  Get Support →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;