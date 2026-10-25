import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  CreditCard, 
  Tv, 
  BookOpen, 
  Mic, 
  Briefcase, 
  Cloud, 
  Heart, 
  Clock, 
  Settings, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  MapPin,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { useOne } from '../context/OneContext';

export default function OneSidebar({ isOpen, onClose }) {
  const { favorites, recentlyVisited, currentUser, logout } = useOne();

  const navLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/maps", label: "Amazon Maps & Lockers", icon: MapPin, badge: "Google Maps" },
    { to: "/shopping", label: "Shopping & Retail", icon: ShoppingBag, badge: "Fresh / B2B" },
    { to: "/payments", label: "Amazon Pay", icon: CreditCard, badge: "Secure" },
    { to: "/entertainment", label: "Entertainment", icon: Tv, badge: "Prime / Music" },
    { to: "/reading", label: "Kindle & Books", icon: BookOpen },
    { to: "/devices", label: "Smart Devices", icon: Mic, badge: "Echo / Fire" },
    { to: "/cloud", label: "Cloud & Bedrock AI", icon: Cloud, badge: "AWS" },
    { to: "/business", label: "Sellers & Creators", icon: Briefcase, badge: "KDP / Twitch" },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

      <aside className={`one-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <div className="sidebar-inner">
          {/* Main Navigation Group */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">Ecosystem Pillars</span>
            <nav className="sidebar-nav">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={onClose}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                  >
                    <IconComponent size={18} className="sidebar-link-icon" />
                    <span className="sidebar-link-text">{item.label}</span>
                    {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Access AI Concierge */}
          <div className="sidebar-ai-callout">
            <NavLink to="/assistant" onClick={onClose} className="sidebar-ai-banner">
              <div className="ai-icon-pill">
                <Sparkles size={16} />
              </div>
              <div className="ai-banner-text">
                <strong>Ask AI Concierge</strong>
                <span>Natural language discovery</span>
              </div>
            </NavLink>
          </div>

          {/* User Section: Favorites & Account */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">Personal Center</span>
            <nav className="sidebar-nav">
              {currentUser ? (
                <div className="sidebar-user-card">
                  <div className="sidebar-user-row">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="sidebar-user-img" />
                    ) : (
                      <div className="sidebar-user-icon-box">
                        <User size={15} />
                      </div>
                    )}
                    <div className="sidebar-user-details">
                      <strong className="sidebar-user-name">{currentUser.name}</strong>
                      <span className="sidebar-user-badge">{currentUser.membershipTier || 'Prime'}</span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { logout(); onClose(); }}
                    className="sidebar-signout-btn"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <NavLink 
                  to="/login" 
                  onClick={onClose} 
                  className={({ isActive }) => `sidebar-link sidebar-login-link ${isActive ? 'sidebar-link-active' : ''}`}
                >
                  <LogIn size={18} className="sidebar-link-icon text-amber-500" />
                  <span className="sidebar-link-text font-bold">Sign In / Register</span>
                  <span className="sidebar-badge" style={{ background: '#f59e0b', color: '#0f172a', fontWeight: 700 }}>One</span>
                </NavLink>
              )}

              <NavLink 
                to="/favorites" 
                onClick={onClose} 
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              >
                <Heart size={18} className="sidebar-link-icon text-amber-500" />
                <span className="sidebar-link-text">My Saved Favorites</span>
                {favorites.length > 0 && <span className="sidebar-count">{favorites.length}</span>}
              </NavLink>

              <NavLink 
                to="/settings" 
                onClick={onClose} 
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              >
                <Settings size={18} className="sidebar-link-icon" />
                <span className="sidebar-link-text">Interests & Settings</span>
              </NavLink>
            </nav>
          </div>

          {/* Ecosystem Summary Footer */}
          <div className="sidebar-footer">
            <p className="sidebar-footer-text">
              <strong>Amazon One</strong> Unified App
              <br />
              <small>18 Services • 7 Categories</small>
            </p>
          </div>
        </div>

        <style>{`
          .sidebar-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(2px);
            z-index: 850;
            display: none;
          }
          .one-sidebar {
            width: 260px;
            background: #ffffff;
            border-right: 1px solid var(--color-border);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            min-height: calc(100vh - 75px);
            transition: all var(--transition-normal);
            z-index: 900;
          }
          .sidebar-inner {
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            flex: 1;
          }
          .sidebar-group-title {
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--color-text-muted);
            padding: 0 0.75rem;
            margin-bottom: 0.5rem;
            display: block;
          }
          .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.65rem 0.85rem;
            border-radius: var(--radius-md);
            color: #334155;
            font-size: 0.88rem;
            font-weight: 500;
            text-decoration: none;
            transition: all var(--transition-fast);
          }
          .sidebar-login-link {
            background-color: #fefce8;
            border: 1px dashed #f59e0b;
          }
          .sidebar-user-card {
            background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 0.65rem 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
          }
          .sidebar-user-row {
            display: flex;
            align-items: center;
            gap: 0.55rem;
          }
          .sidebar-user-img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--color-amber);
          }
          .sidebar-user-icon-box {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--color-amber);
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sidebar-user-details {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
            flex: 1;
            min-width: 0;
          }
          .sidebar-user-name {
            font-size: 0.85rem;
            font-weight: 700;
            color: #0f172a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sidebar-user-badge {
            font-size: 0.68rem;
            color: #b45309;
            font-weight: 600;
          }
          .sidebar-signout-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            color: #ef4444;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.35rem;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all var(--transition-fast);
          }
          .sidebar-signout-btn:hover {
            background: #fee2e2;
            border-color: #fca5a5;
          }
          .sidebar-link:hover {
            background-color: var(--color-surface-subtle);
            color: var(--color-navy-dark);
          }
          .sidebar-link-active {
            background-color: #fef3c7 !important;
            color: #92400e !important;
            font-weight: 700;
          }
          .sidebar-link-active .sidebar-link-icon {
            color: #b45309;
          }
          .sidebar-link-icon {
            flex-shrink: 0;
            color: #64748b;
          }
          .sidebar-link-text {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sidebar-badge {
            font-size: 0.68rem;
            font-weight: 600;
            background: #f1f5f9;
            color: #475569;
            padding: 0.15rem 0.45rem;
            border-radius: var(--radius-sm);
          }
          .sidebar-count {
            font-size: 0.7rem;
            font-weight: 700;
            background: var(--color-amber);
            color: #0f172a;
            padding: 0.1rem 0.45rem;
            border-radius: var(--radius-full);
          }
          .sidebar-ai-callout {
            background: linear-gradient(135deg, #172554 0%, #0f172a 100%);
            border-radius: var(--radius-md);
            overflow: hidden;
          }
          .sidebar-ai-banner {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.85rem;
            color: #ffffff;
            text-decoration: none;
          }
          .ai-icon-pill {
            background: var(--color-amber);
            color: #0f172a;
            width: 28px;
            height: 28px;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .ai-banner-text {
            display: flex;
            flex-direction: column;
            line-height: 1.25;
          }
          .ai-banner-text strong {
            font-size: 0.85rem;
            color: #ffffff;
          }
          .ai-banner-text span {
            font-size: 0.7rem;
            color: #94a3b8;
          }
          .sidebar-footer {
            margin-top: auto;
            padding: 1rem 0.75rem 0 0.75rem;
            border-top: 1px solid var(--color-border);
            font-size: 0.78rem;
            color: var(--color-text-muted);
          }
          @media (max-width: 900px) {
            .sidebar-backdrop {
              display: block;
            }
            .one-sidebar {
              position: fixed;
              top: 0;
              bottom: 0;
              left: -270px;
              width: 270px;
              min-height: 100vh;
              box-shadow: var(--shadow-xl);
            }
            .sidebar-open {
              left: 0 !important;
            }
          }
        `}</style>
      </aside>
    </>
  );
}
