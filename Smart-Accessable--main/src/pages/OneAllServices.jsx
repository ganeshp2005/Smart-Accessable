import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers, Search, SlidersHorizontal } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { amazonServices, serviceCategories } from '../data/services';

export default function OneAllServices() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const filtered = amazonServices.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesQuery = 
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="all-services-root">
      <div className="all-header card-base">
        <div className="header-left">
          <div className="badge-pass">Complete Directory</div>
          <h1 className="all-title">All Amazon Ecosystem Services</h1>
          <p className="all-desc">
            Explore and search through all 18 platforms across Shopping, Payments, Entertainment, Cloud, Reading, Devices, and Business.
          </p>
        </div>

        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, category, or capability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field-input"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="pills-bar">
        <span className="pills-label"><SlidersHorizontal size={14} /> Category:</span>
        <div className="pills-row">
          {serviceCategories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="services-grid">
        {filtered.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <style>{`
        .all-services-root {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .all-header {
          padding: 2.25rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          border-left: 5px solid var(--color-amber);
        }
        .all-title {
          font-size: 2rem;
          color: var(--color-navy-dark);
          margin: 0.35rem 0;
        }
        .all-desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          max-width: 580px;
        }
        .search-wrap {
          position: relative;
          min-width: 300px;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
        }
        .search-field-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          outline: none;
        }
        .pills-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .pills-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .pills-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .cat-pill {
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
        .cat-pill.active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
}
