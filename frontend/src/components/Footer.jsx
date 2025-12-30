import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[var(--border-subtle)] py-16 px-[7.6923%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-[var(--brand-primary)] text-2xl font-bold mb-4">Dekaplet</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Infrastructure for the Future of Payments
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-[var(--text-muted)] hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-[var(--text-muted)] hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="text-[var(--text-muted)] hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/developers" className="text-[var(--text-muted)] hover:text-white transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[var(--text-muted)] hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[var(--text-muted)] hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-[var(--text-muted)] hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-[var(--text-muted)] hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-[var(--text-muted)] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[var(--text-muted)] hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="text-[var(--text-muted)] hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-[var(--text-muted)] hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] text-center">
          <p className="text-[var(--text-muted)]">
            © {new Date().getFullYear()} Dekaplet. All rights reserved. Powering Crypto Payments and Wallets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;