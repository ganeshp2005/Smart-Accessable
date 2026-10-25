import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Bot, 
  Layers, 
  Menu, 
  X, 
  HelpCircle,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/?q=${encodeURIComponent(navSearch.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="navbar-container">
      {/* Top Demo Banner */}
      <div className="demo-banner">
        <Sparkles size={14} className="text-amber-500" />
        <span>
          <strong>Amazon Hackathon Prototype:</strong> AI-powered return mitigation & specification match engine.
        </span>
      </div>

      <nav className="navbar-main">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrap">
            <ShieldCheck size={26} strokeWidth={2.4} className="logo-shield" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">Amazon Alexa<span className="brand-ai">+</span></span>
            <span className="brand-subtitle">Smart Purchase Matcher</span>
          </div>
        </Link>

        {/* Global Search Bar in Header */}
        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
          <div className="nav-search-input-wrap">
            <input 
              type="text" 
              placeholder="Search products by specs or keywords (e.g. OLED, RTX 4070, ANC)..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="nav-search-input"
            />
            <button type="submit" className="nav-search-button" aria-label="Search">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <div className="nav-links-desktop">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/#featured-products" className="nav-link" onClick={() => {
            const el = document.getElementById('featured-products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Products
          </NavLink>
          <NavLink to="/#how-it-works" className="nav-link" onClick={() => {
            const el = document.getElementById('how-it-works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            How It Works
          </NavLink>
          <NavLink to="/sell" className={({ isActive }) => `nav-link-sell ${isActive ? 'nav-link-active' : ''}`}>
            <PlusCircle size={17} />
            <span>Sell Product</span>
          </NavLink>
          <NavLink to="/assistant" className={({ isActive }) => `nav-link-assistant ${isActive ? 'nav-link-active' : ''}`}>
            <Bot size={18} />
            <span>AI Assistant</span>
          </NavLink>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search products..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem' }}>
              <Search size={16} />
            </button>
          </form>

          <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <a href="#featured-products" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Browse Products
          </a>
          <a href="#how-it-works" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <Link to="/sell" className="mobile-nav-link mobile-sell-link" onClick={() => setMobileMenuOpen(false)}>
            <PlusCircle size={18} />
            <span>Sell a Product</span>
          </Link>
          <Link to="/assistant" className="mobile-nav-link mobile-assistant-link" onClick={() => setMobileMenuOpen(false)}>
            <Bot size={18} />
            <span>AI Shopping Assistant</span>
          </Link>
        </div>
      )}

      <style>{`
        .navbar-container {
          background-color: var(--color-navy-dark);
          color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .navbar-main {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          gap: 1.5rem;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .logo-icon-wrap {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0f172a;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
        }
        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          display: block;
          line-height: 1.1;
        }
        .brand-ai {
          color: var(--color-amber);
          margin-left: 2px;
        }
        .brand-subtitle {
          font-size: 0.72rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .nav-search-form {
          flex: 1;
          max-width: 520px;
        }
        .nav-search-input-wrap {
          display: flex;
          background-color: #ffffff;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .nav-search-input {
          flex: 1;
          padding: 0.65rem 1rem;
          border: none;
          outline: none;
          font-size: 0.9rem;
          color: #1e293b;
        }
        .nav-search-button {
          background-color: var(--color-amber);
          border: none;
          padding: 0 1.1rem;
          color: #1e293b;
          cursor: pointer;
          transition: background-color var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-search-button:hover {
          background-color: var(--color-amber-hover);
        }
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          color: #cbd5e1;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .nav-link:hover {
          color: #ffffff;
        }
        .nav-link-active {
          color: var(--color-amber) !important;
          font-weight: 600;
        }
        .nav-link-sell {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #f59e0b;
          font-size: 0.92rem;
          font-weight: 600;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }
        .nav-link-sell:hover {
          background: rgba(245, 158, 11, 0.22);
          color: #fbbf24;
        }
        .nav-link-assistant {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .nav-link-assistant:hover {
          background: rgba(245, 158, 11, 0.2);
          border-color: var(--color-amber);
          color: var(--color-amber);
        }
        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
        }
        .mobile-menu-drawer {
          display: none;
          flex-direction: column;
          background-color: #0f172a;
          padding: 1rem 1.5rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          gap: 0.75rem;
        }
        .mobile-search-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .mobile-search-input {
          flex: 1;
          padding: 0.6rem 0.8rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          font-size: 0.9rem;
        }
        .mobile-nav-link {
          color: #e2e8f0;
          padding: 0.6rem 0;
          font-size: 1rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mobile-assistant-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-amber);
        }
        @media (max-width: 900px) {
          .nav-search-form {
            display: none;
          }
          .nav-links-desktop {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
          .mobile-menu-drawer {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
