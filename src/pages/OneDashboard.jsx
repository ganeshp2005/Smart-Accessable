import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Tv, 
  Cloud, 
  CreditCard, 
  Mic, 
  BookOpen, 
  Briefcase,
  Layers,
  Search,
  CheckCircle,
  ExternalLink,
  SlidersHorizontal,
  TrendingUp,
  Heart,
  Navigation
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ServiceCard from '../components/ServiceCard';
import { amazonServices, serviceCategories } from '../data/services';
import { useOne } from '../context/OneContext';

const USAGE_CHART_DATA = [
  { name: 'Shopping', hours: 4.8, fill: '#f59e0b' },
  { name: 'Video', hours: 8.5, fill: '#3b82f6' },
  { name: 'Music', hours: 6.2, fill: '#10b981' },
  { name: 'Kindle', hours: 3.4, fill: '#8b5cf6' },
  { name: 'AWS Cloud', hours: 5.1, fill: '#6366f1' },
  { name: 'Smart Home', hours: 2.9, fill: '#ec4899' }
];

export default function Dashboard() {
  const { userInterests, favorites, recentlyVisited, showToast } = useOne();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter services by category and search
  const filteredServices = amazonServices.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesQuery = 
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // Personalized recommendations based on user interests
  const personalizedServices = amazonServices.filter(s => 
    userInterests.some(interest => interest.toLowerCase() === s.category.toLowerCase())
  ).slice(0, 4);

  // Recently visited services objects
  const recentServicesObjects = recentlyVisited
    .map(id => amazonServices.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="dashboard-root">
      {/* Welcome & Ecosystem Hero Banner */}
      <section className="dashboard-hero card-base">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={16} className="text-amber-500" />
            <span>Unified Ecosystem Intelligence</span>
          </div>
          <h1 className="hero-headline">Welcome to Amazon One</h1>
          <p className="hero-subtext">
            Discover, navigate, and manage all 18 Amazon services across shopping, payments, entertainment, cloud, and smart devices from a single unified hub.
          </p>

          <div className="hero-search-bar">
            <Search size={18} className="hero-search-icon" />
            <input 
              type="text" 
              placeholder="Search services by keyword (e.g. AWS, groceries, music, books, seller)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hero-search-input"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => setSearchTerm('')} 
                className="clear-btn"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Highlights */}
        <div className="hero-stats-panel">
          <div className="dash-stat-box">
            <span className="stat-big-num">18</span>
            <span className="stat-desc">Unified Services</span>
          </div>
          <div className="dash-stat-box">
            <span className="stat-big-num">7</span>
            <span className="stat-desc">Pillar Categories</span>
          </div>
          <div className="dash-stat-box">
            <span className="stat-big-num">{favorites.length}</span>
            <span className="stat-desc">Saved Favorites</span>
          </div>
          <div className="dash-stat-box">
            <span className="stat-big-num">$124.50</span>
            <span className="stat-desc">Demo Prime Savings</span>
          </div>
        </div>
      </section>

      {/* Quick Ecosystem Jump Pillars */}
      <section className="quick-pillars-row">
        <Link to="/shopping" className="pillar-tile card-base">
          <div className="tile-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <strong>Shopping & Retail</strong>
            <span>Fresh, Business, Renewed</span>
          </div>
        </Link>

        <Link to="/payments" className="pillar-tile card-base">
          <div className="tile-icon-wrap" style={{ background: '#dcfce7', color: '#15803d' }}>
            <CreditCard size={20} />
          </div>
          <div>
            <strong>Amazon Pay</strong>
            <span>1-Click Safe Checkout</span>
          </div>
        </Link>

        <Link to="/entertainment" className="pillar-tile card-base">
          <div className="tile-icon-wrap" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
            <Tv size={20} />
          </div>
          <div>
            <strong>Entertainment</strong>
            <span>Video, Music & Audible</span>
          </div>
        </Link>

        <Link to="/cloud" className="pillar-tile card-base">
          <div className="tile-icon-wrap" style={{ background: '#ede9fe', color: '#6d28d9' }}>
            <Cloud size={20} />
          </div>
          <div>
            <strong>AWS Cloud & AI</strong>
            <span>Bedrock, EC2, S3</span>
          </div>
        </Link>

        <Link to="/maps" className="pillar-tile card-base">
          <div className="tile-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Navigation size={20} />
          </div>
          <div>
            <strong>Google Maps & Lockers</strong>
            <span>Returns & Fresh Locations</span>
          </div>
        </Link>
      </section>

      {/* Personalized Recommendations Section */}
      <section className="section-block">
        <div className="section-title-bar">
          <div>
            <div className="section-tag">
              <Sparkles size={13} className="text-amber-500" />
              <span>Tailored For You</span>
            </div>
            <h2 className="section-heading">Personalized Recommendations</h2>
            <p className="section-caption">
              Curated based on your selected interests ({userInterests.join(', ')}).
            </p>
          </div>
          <Link to="/settings" className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
            Customize Interests
          </Link>
        </div>

        <div className="services-grid">
          {personalizedServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Analytics & Activity Overview */}
      <section className="analytics-section-grid">
        {/* Usage Breakdown Chart */}
        <div className="chart-card card-base">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Weekly Ecosystem Activity (Simulated)</h3>
              <p className="chart-sub">Hours spent across Amazon digital services</p>
            </div>
            <span className="badge-pass">31.2 hrs total</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={USAGE_CHART_DATA}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} unit="h" />
                <Tooltip />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {USAGE_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently Visited / Quick Resume */}
        <div className="recents-card card-base">
          <div className="recents-header">
            <h3 className="chart-title">Recently Visited Services</h3>
            <Link to="/services" className="see-all-link">View All 18</Link>
          </div>
          <div className="recents-list">
            {recentServicesObjects.length === 0 ? (
              <p className="text-muted">No recently visited services yet.</p>
            ) : (
              recentServicesObjects.map(service => (
                <Link key={service.id} to={`/services/${service.id}`} className="recent-item">
                  <div className="recent-dot"></div>
                  <div className="recent-meta">
                    <strong>{service.name}</strong>
                    <span>{service.category} • {service.tagline}</span>
                  </div>
                  <ArrowRight size={15} className="recent-arrow" />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Full Services Directory with Category Filters */}
      <section className="section-block">
        <div className="section-title-bar">
          <div>
            <div className="section-tag">
              <Layers size={13} className="text-amber-500" />
              <span>Full Directory</span>
            </div>
            <h2 className="section-heading">Browse All Amazon Services</h2>
          </div>
          <span className="badge-pass">
            Showing {filteredServices.length} of {amazonServices.length} Services
          </span>
        </div>

        {/* Category Pills Bar */}
        <div className="category-pills-row">
          <span className="filter-lead">
            <SlidersHorizontal size={14} /> Filter:
          </span>
          {serviceCategories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <style>{`
        .dashboard-root {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .dashboard-hero {
          background: linear-gradient(135deg, var(--color-navy-dark) 0%, #0f172a 100%);
          color: #ffffff;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--color-amber);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }
        .hero-headline {
          font-size: 2.4rem;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .hero-subtext {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .hero-search-bar {
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 0.25rem 0.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .hero-search-icon {
          color: var(--color-text-muted);
          margin-left: 0.5rem;
        }
        .hero-search-input {
          flex: 1;
          padding: 0.6rem 0.85rem;
          border: none;
          outline: none;
          font-size: 0.92rem;
          color: #0f172a;
        }
        .clear-btn {
          background: none;
          border: none;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 0.25rem 0.6rem;
        }
        .hero-stats-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .dash-stat-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }
        .stat-big-num {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--color-amber);
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .stat-desc {
          font-size: 0.78rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .quick-pillars-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }
        .pillar-tile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: #ffffff;
          text-decoration: none;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .pillar-tile:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .tile-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pillar-tile strong {
          display: block;
          font-size: 0.95rem;
          color: var(--color-navy-dark);
        }
        .pillar-tile span {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .section-block {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .section-title-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .section-heading {
          font-size: 1.6rem;
          color: var(--color-navy-dark);
          letter-spacing: -0.02em;
        }
        .section-caption {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .analytics-section-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.5rem;
        }
        .chart-card, .recents-card {
          padding: 1.5rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .chart-header, .recents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .chart-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
        }
        .chart-sub {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        .see-all-link {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-amber-hover);
        }
        .recents-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .recent-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          background: var(--color-surface-subtle);
          text-decoration: none;
          transition: background var(--transition-fast);
        }
        .recent-item:hover {
          background: #e2e8f0;
        }
        .recent-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-amber);
        }
        .recent-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .recent-meta strong {
          font-size: 0.88rem;
          color: var(--color-navy-dark);
        }
        .recent-meta span {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .recent-arrow {
          color: var(--color-text-muted);
        }
        .category-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.5rem;
        }
        .filter-lead {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-right: 0.25rem;
        }
        .cat-pill-btn {
          background: #ffffff;
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cat-pill-btn:hover {
          background: var(--color-surface-subtle);
          color: var(--color-navy-dark);
        }
        .cat-pill-btn.active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
        @media (max-width: 900px) {
          .dashboard-hero {
            grid-template-columns: 1fr;
          }
          .analytics-section-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
