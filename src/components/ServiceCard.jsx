import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ExternalLink, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  Apple,
  Briefcase,
  RefreshCw,
  CreditCard,
  Tv,
  Music,
  Headphones,
  BookOpen,
  Bookmark,
  Mic,
  Tv2,
  Image as ImageIcon,
  Cloud,
  Store,
  PenTool,
  Video
} from 'lucide-react';
import { useOne } from '../context/OneContext';

// Icon Map
const ICON_MAP = {
  ShoppingBag,
  Apple,
  Briefcase,
  RefreshCw,
  CreditCard,
  Tv,
  Music,
  Headphones,
  BookOpen,
  Bookmark,
  Mic,
  Tv2,
  Image: ImageIcon,
  Cloud,
  Sparkles,
  Store,
  PenTool,
  Video
};

export default function ServiceCard({ service }) {
  const { favorites, toggleFavorite, recordVisit } = useOne();
  const isFavorite = favorites.includes(service.id);
  const IconComponent = ICON_MAP[service.iconName] || ShoppingBag;

  return (
    <div className="service-card card-base">
      <div className="card-top-row">
        <div className="service-icon-box">
          <IconComponent size={22} className="service-icon" />
        </div>
        <div className="service-badge-row">
          <span className="category-pill">{service.category}</span>
          <button 
            type="button" 
            onClick={() => toggleFavorite(service.id)} 
            className="card-fav-btn"
            title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          >
            <Heart size={18} className={isFavorite ? "fav-filled" : "fav-empty"} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="title-row">
          <h3 className="service-name">{service.name}</h3>
          {service.badge && <span className="service-feature-tag">{service.badge}</span>}
        </div>
        <p className="service-tagline">{service.tagline}</p>
        <p className="service-desc">{service.description}</p>

        {/* Feature bullet highlights */}
        <div className="service-features-list">
          {service.features?.slice(0, 2).map((feat, idx) => (
            <span key={idx} className="feat-chip">
              • {feat}
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <Link 
          to={`/services/${service.id}`} 
          onClick={() => recordVisit(service.id)}
          className="btn-primary card-cta-btn"
        >
          <span>Explore Service</span>
          <ArrowRight size={14} />
        </Link>

        {service.officialUrl && (
          <a 
            href={service.officialUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="external-link-btn"
            title="Open official Amazon service site"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <style>{`
        .service-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
          padding: 1.35rem;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .service-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: #f1f5f9;
          color: var(--color-navy-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-border);
        }
        .service-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .category-pill {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          background: var(--color-surface-subtle);
          color: var(--color-text-muted);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.04em;
        }
        .card-fav-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 0.25rem;
          transition: color var(--transition-fast);
        }
        .card-fav-btn:hover {
          color: #ef4444;
        }
        .fav-filled {
          fill: #ef4444;
          color: #ef4444;
        }
        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .service-name {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
          line-height: 1.25;
        }
        .service-feature-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #b45309;
          background: #fef3c7;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }
        .service-tagline {
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .service-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .service-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        .feat-chip {
          font-size: 0.75rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-footer {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid var(--color-border);
        }
        .card-cta-btn {
          flex: 1;
          padding: 0.55rem 0.85rem;
          font-size: 0.85rem;
        }
        .external-link-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface-subtle);
          color: var(--color-text-muted);
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
        }
        .external-link-btn:hover {
          background: #e2e8f0;
          color: var(--color-navy-dark);
        }
      `}</style>
    </div>
  );
}
