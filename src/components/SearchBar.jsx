import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories = [] 
}) {
  return (
    <div className="search-bar-wrapper card-base">
      <div className="search-input-group">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          id="product-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by model, specs (e.g. 16GB, OLED, RTX 4070, IP68)..."
          className="search-field"
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={() => setSearchTerm('')} 
            className="clear-search-btn"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div className="categories-pill-row">
          <span className="category-label">
            <SlidersHorizontal size={14} /> Category:
          </span>
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .search-bar-wrapper {
          padding: 1.25rem;
          margin-bottom: 2rem;
          background: #ffffff;
        }
        .search-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .search-field {
          width: 100%;
          padding: 0.85rem 2.8rem;
          font-size: 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .search-field:focus {
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .clear-search-btn {
          position: absolute;
          right: 0.85rem;
          background: transparent;
          border: none;
          color: var(--color-text-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.25rem;
        }
        .clear-search-btn:hover {
          color: var(--color-text-main);
        }
        .categories-pill-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
        }
        .category-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .category-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .category-pill-btn {
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .category-pill-btn:hover {
          background: #e2e8f0;
          color: var(--color-text-main);
        }
        .category-pill-btn.active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
