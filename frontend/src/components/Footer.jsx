import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'How It Works', path: '/how-it-works' },
      { label: 'For Developers', path: '/developers' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers', external: true },
      { label: 'Blog', path: '/blog', external: true },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Compliance', path: '/compliance' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer 
      className="relative pt-16 pb-8"
      style={{ 
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)'
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span 
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Dekaplet
              </span>
            </Link>
            <p 
              className="text-sm mb-6 max-w-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              The modern platform for cryptocurrency payments and wallets. 
              Accept, store, and settle cryptocurrency seamlessly with enterprise-grade infrastructure.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@dekaplet.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--brand-primary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail size={16} />
                hello@dekaplet.com
              </a>
              <div 
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <MapPin size={16} />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-[var(--brand-primary)] flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight size={12} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-[var(--brand-primary)] flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight size={12} />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-[var(--brand-primary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-primary)' }}
        >
          <p 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            © {currentYear} Dekaplet. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{ 
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
