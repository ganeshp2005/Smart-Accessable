import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldAlert, Cpu, HardDrive, Battery, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { id, name, category, price, rating, reviewsCount, image, badge, specifications, description } = product;

  return (
    <div className="product-card card-base">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-img" loading="lazy" />
        {badge && <span className="product-badge">{badge}</span>}
        <span className="product-category-tag">{category}</span>
      </div>

      <div className="product-body">
        <div className="product-header">
          <h3 className="product-title" title={name}>{name}</h3>
          <div className="product-rating-row">
            <div className="rating-stars">
              <Star size={14} className="star-filled" />
              <span className="rating-num">{rating}</span>
            </div>
            <span className="reviews-count">({reviewsCount.toLocaleString()} reviews)</span>
          </div>
        </div>

        <p className="product-short-desc">{description}</p>

        {/* Highlighted Key Specs */}
        <div className="product-specs-chips">
          {specifications?.ram && (
            <span className="spec-chip">
              <Cpu size={12} /> {specifications.ram}GB RAM
            </span>
          )}
          {specifications?.storage && (
            <span className="spec-chip">
              <HardDrive size={12} /> {specifications.storage}GB SSD
            </span>
          )}
          {specifications?.batteryLifeHours && (
            <span className="spec-chip">
              <Battery size={12} /> ~{specifications.batteryLifeHours}h Battery
            </span>
          )}
          {specifications?.anc && (
            <span className="spec-chip">
              <CheckCircle2 size={12} /> {specifications.anc.includes("ANC") ? "Hybrid ANC" : "Audio"}
            </span>
          )}
        </div>

        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="price-currency">$</span>
            <span className="price-val">{price}</span>
            <span className="price-free-shipping">Free Delivery</span>
          </div>

          <Link to={`/products/${id}`} className="btn-primary analyze-cta-btn">
            <span>Analyze Product</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: #ffffff;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .product-image-container {
          position: relative;
          height: 210px;
          background-color: #f1f5f9;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .product-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--color-navy-dark);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .product-category-tag {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          color: var(--color-text-main);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }
        .product-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
          color: var(--color-navy-dark);
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-rating-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.65rem;
        }
        .rating-stars {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          background-color: #fef3c7;
          color: #b45309;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
        }
        .star-filled {
          fill: #f59e0b;
          color: #f59e0b;
        }
        .reviews-count {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .product-short-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin-bottom: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-specs-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .spec-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
        }
        .product-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid var(--color-border);
        }
        .product-price-wrap {
          display: flex;
          flex-direction: column;
        }
        .price-currency {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-navy-dark);
          position: relative;
          top: -4px;
        }
        .price-val {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-navy-dark);
          line-height: 1;
        }
        .price-free-shipping {
          font-size: 0.7rem;
          color: var(--color-success);
          font-weight: 600;
        }
        .analyze-cta-btn {
          padding: 0.55rem 0.95rem;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
