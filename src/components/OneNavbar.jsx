import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Heart, 
  ShoppingCart, 
  Bell, 
  Menu, 
  X, 
  User, 
  Layers,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { useOne } from '../context/OneContext';

export default function OneNavbar({ onToggleSidebar }) {
  const { favorites, cart, showToast, currentUser, logout } = useOne();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <header className="one-navbar-container">
      {/* Top Banner Notice */}
      <div className="demo-banner">
        <Sparkles size={14} className="text-amber-500" />
        <span>
          <strong>Amazon One Prototype:</strong> AI-powered unified ecosystem dashboard across Shopping, Entertainment, Cloud & Devices.
        </span>
      </div>

      <div className="navbar-content">
        {/* Left Section: Sidebar toggle & Brand Logo */}
        <div className="navbar-brand-section">
          <button 
            type="button" 
            onClick={onToggleSidebar} 
            className="sidebar-toggle-btn"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar Menu"
          >
            <Menu size={20} />
          </button>

          <Link to="/" className="brand-logo-link">
            <div className="brand-badge-box">
              <Compass size={22} className="brand-icon" />
            </div>
            <div className="brand-titles">
              <span className="brand-name">Amazon <span className="brand-accent">One</span></span>
              <span className="brand-subtitle">Unified Ecosystem</span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <form className="global-search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-lead-icon" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon services, movies, cloud tools, books (e.g. AWS, Fresh, Audible)..."
              className="global-search-input"
            />
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </div>
        </form>

        {/* Right: Quick Navigation & Actions */}
        <div className="navbar-actions-desktop">
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}>
            All Services
          </NavLink>
          <NavLink to="/maps" className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}>
            Maps & Lockers
          </NavLink>
          <NavLink to="/assistant" className={({ isActive }) => `nav-assistant-pill ${isActive ? 'nav-active' : ''}`}>
            <Sparkles size={15} />
            <span>AI Concierge</span>
          </NavLink>

          {/* Favorites Link */}
          <Link to="/favorites" className="icon-action-btn" title="Saved Favorites">
            <Heart size={20} className={favorites.length > 0 ? "text-amber-400" : ""} />
            {favorites.length > 0 && <span className="badge-bubble">{favorites.length}</span>}
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="icon-action-btn" title="Demo Cart">
            <ShoppingCart size={20} />
            {totalCartCount > 0 && <span className="badge-bubble cart-bubble">{totalCartCount}</span>}
          </Link>

          {/* Notifications Dropdown */}
          <div className="action-dropdown-wrapper">
            <button 
              type="button" 
              onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }} 
              className="icon-action-btn"
              title="Notifications"
            >
              <Bell size={20} />
              <span className="ping-dot"></span>
            </button>

            {notificationsOpen && (
              <div className="notifications-menu card-base">
                <div className="menu-header">
                  <strong>Notifications</strong>
                  <span className="text-muted">3 new</span>
                </div>
                <div className="notification-item">
                  <span className="notif-badge">Prime Video</span>
                  <p>Fallout Season 2 preview now available to watch!</p>
                  <small>10m ago</small>
                </div>
                <div className="notification-item">
                  <span className="notif-badge">Amazon Fresh</span>
                  <p>Organic weekly specials updated in your area.</p>
                  <small>1h ago</small>
                </div>
                <div className="notification-item">
                  <span className="notif-badge">AWS Bedrock</span>
                  <p>Claude 3.5 Sonnet foundation model now accessible.</p>
                  <small>3h ago</small>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu or Sign In */}
          {currentUser ? (
            <div className="action-dropdown-wrapper">
              <button 
                type="button" 
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="profile-btn"
              >
                <div className="avatar-circle">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Hello, {currentUser.name.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Account & Lists</span>
                </div>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="profile-menu card-base">
                  <div className="profile-info-header">
                    <strong>{currentUser.name}</strong>
                    <span className="text-muted">{currentUser.membershipTier || "Prime Member"}</span>
                  </div>
                  <Link to="/settings" className="menu-item" onClick={() => setProfileOpen(false)}>
                    Personalized Interests
                  </Link>
                  <Link to="/favorites" className="menu-item" onClick={() => setProfileOpen(false)}>
                    My Saved Services
                  </Link>
                  <Link to="/cart" className="menu-item" onClick={() => setProfileOpen(false)}>
                    Demo Cart ({totalCartCount})
                  </Link>
                  <div className="menu-divider"></div>
                  <button 
                    type="button" 
                    onClick={() => { 
                      logout();
                      setProfileOpen(false);
                      navigate('/login');
                    }} 
                    className="menu-item menu-signout text-danger"
                    style={{ color: '#ef4444', fontWeight: 600 }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login-btn">
              <User size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          type="button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn"
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <input 
              type="text" 
              placeholder="Search Amazon services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1rem' }}>
              <Search size={16} />
            </button>
          </form>

          <Link to="/" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/services" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            All 18 Services
          </Link>
          <Link to="/maps" className="mobile-item text-amber-500 font-bold" onClick={() => setMobileMenuOpen(false)}>
            Google Maps & Hub Lockers
          </Link>
          <Link to="/assistant" className="mobile-item text-amber-500 font-bold" onClick={() => setMobileMenuOpen(false)}>
            AI Concierge Assistant
          </Link>
          <Link to="/shopping" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Shopping & Products
          </Link>
          <Link to="/entertainment" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Entertainment (Video, Music, Audio)
          </Link>
          <Link to="/cloud" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Cloud & Bedrock AI
          </Link>
          <Link to="/cart" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Demo Cart ({totalCartCount})
          </Link>
          <Link to="/settings" className="mobile-item" onClick={() => setMobileMenuOpen(false)}>
            Settings & Interests
          </Link>
          {currentUser ? (
            <div style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="avatar-circle">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{currentUser.membershipTier || 'Prime'}</div>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => { logout(); setMobileMenuOpen(false); navigate('/login'); }}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="mobile-item" 
              style={{ color: '#fbbf24', fontWeight: 700 }} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}

      <style>{`
        .one-navbar-container {
          background-color: var(--color-navy-dark);
          color: #ffffff;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
        }
        .navbar-content {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          gap: 1.5rem;
        }
        .navbar-brand-section {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .sidebar-toggle-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }
        .sidebar-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.18);
        }
        .brand-logo-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
        }
        .brand-badge-box {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0f172a;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          display: block;
        }
        .brand-accent {
          color: var(--color-amber);
        }
        .brand-subtitle {
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .global-search-form {
          flex: 1;
          max-width: 580px;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.12);
        }
        .search-lead-icon {
          color: var(--color-text-muted);
          margin-left: 0.85rem;
        }
        .global-search-input {
          flex: 1;
          padding: 0.65rem 0.85rem;
          border: none;
          outline: none;
          font-size: 0.9rem;
          color: #0f172a;
        }
        .search-submit-btn {
          background: var(--color-amber);
          border: none;
          padding: 0 1.25rem;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          height: 40px;
          transition: background var(--transition-fast);
        }
        .search-submit-btn:hover {
          background: var(--color-amber-hover);
        }
        .navbar-actions-desktop {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-item {
          color: #cbd5e1;
          font-size: 0.92rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .nav-item:hover {
          color: #ffffff;
        }
        .nav-active {
          color: var(--color-amber) !important;
          font-weight: 700;
        }
        .nav-assistant-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--color-amber);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        .nav-assistant-pill:hover {
          background: rgba(245, 158, 11, 0.25);
          color: #fde68a;
        }
        .icon-action-btn {
          position: relative;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .icon-action-btn:hover {
          color: #ffffff;
        }
        .badge-bubble {
          position: absolute;
          top: -3px;
          right: -5px;
          background: var(--color-amber);
          color: #0f172a;
          font-size: 0.68rem;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-bubble {
          background: #22c55e;
          color: #ffffff;
        }
        .ping-dot {
          position: absolute;
          top: 3px;
          right: 4px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
        }
        .action-dropdown-wrapper {
          position: relative;
        }
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .nav-login-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--color-amber);
          color: #0f172a;
          padding: 0.42rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: all var(--transition-fast);
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.28);
        }
        .nav-login-btn:hover {
          background: var(--color-amber-hover);
          transform: translateY(-1px);
          color: #000000;
        }
        .avatar-circle {
          background: var(--color-amber);
          color: #0f172a;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .notifications-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 320px;
          background: #ffffff;
          color: #0f172a;
          padding: 1rem;
          box-shadow: var(--shadow-xl);
          z-index: 1050;
        }
        .profile-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 240px;
          background: #ffffff;
          color: #0f172a;
          padding: 0.75rem 0;
          box-shadow: var(--shadow-xl);
          z-index: 1050;
        }
        .menu-header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 0.6rem;
          font-size: 0.88rem;
        }
        .notification-item {
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--color-surface-subtle);
          font-size: 0.82rem;
        }
        .notification-item:last-child {
          border-bottom: none;
        }
        .notif-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          background: #f1f5f9;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.2rem;
        }
        .profile-info-header {
          padding: 0.5rem 1rem 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          font-size: 0.88rem;
        }
        .menu-item {
          display: block;
          padding: 0.55rem 1rem;
          color: #334155;
          font-size: 0.88rem;
          text-decoration: none;
          transition: background var(--transition-fast);
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }
        .menu-item:hover {
          background: var(--color-surface-subtle);
          color: var(--color-navy-dark);
        }
        .menu-signout {
          color: var(--color-amber-hover);
          font-weight: 600;
        }
        .menu-divider {
          height: 1px;
          background: var(--color-border);
          margin: 0.4rem 0;
        }
        .mobile-hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
        }
        .mobile-nav-drawer {
          display: none;
          flex-direction: column;
          background: #0f172a;
          padding: 1rem 1.5rem;
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
        }
        .mobile-item {
          color: #cbd5e1;
          padding: 0.5rem 0;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        @media (max-width: 992px) {
          .global-search-form {
            display: none;
          }
          .navbar-actions-desktop {
            display: none;
          }
          .mobile-hamburger-btn {
            display: block;
          }
          .mobile-nav-drawer {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
