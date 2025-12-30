import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="dark-header">
        <Link to="/" className="dark-logo">
          Dekaplet
        </Link>
        
        <nav className="dark-nav">
          <Link to="/" className="dark-nav-link">Home</Link>
          <Link to="/how-it-works" className="dark-nav-link">How It Works</Link>
          <Link to="/features" className="dark-nav-link">Features</Link>
          <Link to="/developers" className="dark-nav-link">For Developers</Link>
          <Link to="/pricing" className="dark-nav-link">Pricing</Link>
          <Link to="/about" className="dark-nav-link">About Us</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="dark-nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="btn-primary">Logout</button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn-primary">Login</button>
            </Link>
          )}
        </nav>

        <button 
          className="mobile-menu-button text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-black border-b border-[var(--border-subtle)] z-40 md:hidden">
          <nav className="flex flex-col p-5 gap-4">
            <Link to="/" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/how-it-works" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link to="/features" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link to="/developers" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>For Developers</Link>
            <Link to="/pricing" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/about" className="dark-nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="btn-primary w-full">Get Started</button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;