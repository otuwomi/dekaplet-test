import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/features', label: 'Features' },
    { path: '/developers', label: 'Developers' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3' 
          : 'py-4'
      }`}
      style={{
        background: scrolled 
          ? 'var(--bg-primary)' 
          : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-primary)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span 
              className="text-xl font-bold transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Dekaplet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[var(--brand-primary)]'
                    : 'hover:bg-[var(--bg-hover)]'
                }`}
                style={{
                  color: isActive(link.path) ? 'var(--brand-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--brand-gradient)',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(0, 212, 170, 0.3)'
              }}
            >
              Get Started
              <ChevronRight size={16} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ 
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          background: 'var(--bg-primary)',
          borderBottom: isMenuOpen ? '1px solid var(--border-primary)' : 'none'
        }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200`}
                style={{
                  background: isActive(link.path) ? 'var(--bg-secondary)' : 'transparent',
                  color: isActive(link.path) ? 'var(--brand-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-4 py-3 rounded-xl font-semibold text-center transition-all"
              style={{
                background: 'var(--brand-gradient)',
                color: 'white'
              }}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
