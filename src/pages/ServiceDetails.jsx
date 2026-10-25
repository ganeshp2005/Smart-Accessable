import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Heart, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { amazonServices } from '../data/services';
import { useOne } from '../context/OneContext';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const { favorites, toggleFavorite, recordVisit } = useOne();

  const service = amazonServices.find(s => s.id === serviceId) || amazonServices[0];
  const isFavorite = favorites.includes(service.id);

  // Similar services in the same category
  const similarServices = amazonServices
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="service-details-root">
      {/* Top Breadcrumb */}
      <div className="details-nav-row">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <span className="category-tag">{service.category} Ecosystem</span>
      </div>

      {/* Main Service Hero Card */}
      <div className="service-hero-card card-base">
        <div className="hero-head-row">
          <div>
            <div className="hero-badge-wrap">
              <span className="badge-pass">{service.badge || "Amazon Service"}</span>
              <span className="popularity-tag">★ {service.popularity}% Popularity</span>
            </div>
            <h1 className="service-title">{service.name}</h1>
            <p className="service-tagline-lg">{service.tagline}</p>
          </div>

          <div className="hero-actions-col">
            <button 
              type="button" 
              onClick={() => toggleFavorite(service.id)}
              className={`fav-toggle-btn ${isFavorite ? 'fav-active' : ''}`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              <span>{isFavorite ? "Favorited" : "Save Favorite"}</span>
            </button>

            {service.officialUrl && (
              <a 
                href={service.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-navy official-link-btn"
              >
                <span>Visit Official Site</span>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="service-long-desc">{service.description}</p>

        {/* Feature Checkpoints */}
        <div className="features-showcase-box">
          <h3 className="features-title">Core Capabilities & Integrations:</h3>
          <div className="features-grid">
            {service.features?.map((feat, idx) => (
              <div key={idx} className="feat-card">
                <CheckCircle size={18} className="feat-check-icon" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* In-App Prototype Experience Trigger */}
        <div className="demo-route-banner">
          <div>
            <strong>Interactive Module Available:</strong>
            <p>Experience the prototype interface for {service.name} inside Amazon One.</p>
          </div>
          <Link to={service.demoRoute} className="btn-primary" onClick={() => recordVisit(service.id)}>
            <span>Open {service.name} Module</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Similar Services in Category */}
      {similarServices.length > 0 && (
        <div className="similar-services-section">
          <h2 className="similar-heading">More in {service.category}</h2>
          <div className="similar-grid">
            {similarServices.map(sim => (
              <Link key={sim.id} to={`/services/${sim.id}`} className="sim-card card-base">
                <div>
                  <span className="sim-badge">{sim.category}</span>
                  <h4 className="sim-title">{sim.name}</h4>
                  <p className="sim-desc">{sim.tagline}</p>
                </div>
                <ArrowRight size={16} className="sim-arrow" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .service-details-root {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .details-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-navy-dark);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .category-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          background: #e2e8f0;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .service-hero-card {
          padding: 2.25rem;
          background: #ffffff;
        }
        .hero-head-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .hero-badge-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
        }
        .popularity-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #92400e;
          background: #fef3c7;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .service-title {
          font-size: 2.2rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.35rem;
          line-height: 1.2;
        }
        .service-tagline-lg {
          font-size: 1.1rem;
          color: #475569;
          font-weight: 500;
          max-width: 650px;
        }
        .hero-actions-col {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .fav-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.7rem 1.1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-main);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .fav-toggle-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
        }
        .fav-active {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }
        .official-link-btn {
          padding: 0.7rem 1.2rem;
          font-size: 0.88rem;
        }
        .service-long-desc {
          font-size: 1rem;
          color: #334155;
          line-height: 1.65;
          margin-bottom: 1.75rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .features-showcase-box {
          margin-bottom: 1.75rem;
        }
        .features-title {
          font-size: 1.1rem;
          color: var(--color-navy-dark);
          margin-bottom: 1rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .feat-card {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1rem;
          background: var(--color-surface-subtle);
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          color: #1e293b;
          font-weight: 500;
        }
        .feat-check-icon {
          color: var(--color-success);
          flex-shrink: 0;
        }
        .demo-route-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .demo-route-banner strong {
          color: #1e3a8a;
          font-size: 0.95rem;
          display: block;
        }
        .demo-route-banner p {
          color: #1d4ed8;
          font-size: 0.85rem;
          margin: 0;
        }
        .similar-heading {
          font-size: 1.35rem;
          color: var(--color-navy-dark);
          margin-bottom: 1rem;
        }
        .similar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .sim-card {
          padding: 1.25rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          transition: transform var(--transition-fast);
        }
        .sim-card:hover {
          transform: translateY(-2px);
        }
        .sim-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }
        .sim-title {
          font-size: 1rem;
          color: var(--color-navy-dark);
          margin: 0.2rem 0;
        }
        .sim-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        .sim-arrow {
          color: var(--color-amber-hover);
        }
      `}</style>
    </div>
  );
}
