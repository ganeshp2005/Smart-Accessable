import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Layers } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { amazonServices } from '../data/services';
import { useOne } from '../context/OneContext';

export default function OneFavorites() {
  const { favorites } = useOne();

  const favoriteServices = amazonServices.filter(s => favorites.includes(s.id));

  return (
    <div className="favorites-root">
      <div className="favorites-header card-base">
        <div className="fav-title-wrap">
          <Heart size={22} className="text-amber-500" fill="currentColor" />
          <div>
            <h1 className="fav-title">My Saved Amazon Services</h1>
            <p className="fav-desc">
              Your personalized bookmarks for quick 1-click access to preferred Amazon platforms.
            </p>
          </div>
        </div>
        <span className="badge-pass">{favoriteServices.length} Saved</span>
      </div>

      {favoriteServices.length === 0 ? (
        <div className="empty-favs card-base">
          <Heart size={42} className="text-muted" />
          <h2>No Saved Favorites Yet</h2>
          <p>Click the heart icon on any service card in the dashboard or directory to save it here.</p>
          <Link to="/services" className="btn-primary" style={{ marginTop: '1rem' }}>
            <span>Browse Directory</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="favs-grid">
          {favoriteServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      <style>{`
        .favorites-root {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .favorites-header {
          padding: 2rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-left: 5px solid var(--color-amber);
        }
        .fav-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .fav-title {
          font-size: 1.8rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.2rem;
        }
        .fav-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .favs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .empty-favs {
          padding: 4rem 2rem;
          text-align: center;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
