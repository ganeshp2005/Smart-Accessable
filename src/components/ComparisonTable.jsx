import React from 'react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComparisonTable({ originalProduct, alternatives = [] }) {
  if (!originalProduct) return null;

  // Combine original with alternatives
  const allProducts = [
    { ...originalProduct, isOriginal: true, label: "Selected Target" },
    ...alternatives.map((a, idx) => ({ ...a, isOriginal: false, label: `Alternative #${idx + 1}` }))
  ];

  return (
    <div className="comparison-table-wrap card-base">
      <div className="table-header">
        <h3 className="table-title">Direct Specifications Matrix</h3>
        <p className="table-subtitle">
          Side-by-side comparison of hardware specifications and compatibility scores.
        </p>
      </div>

      <div className="table-responsive">
        <table className="spec-table">
          <thead>
            <tr>
              <th className="feature-col">Feature / Specification</th>
              {allProducts.map((p) => (
                <th key={p.id} className={`product-header-col ${p.isOriginal ? 'original-col' : ''}`}>
                  <span className="col-badge">{p.label}</span>
                  <div className="col-prod-name">{p.name}</div>
                  <div className="col-prod-price">${p.price}</div>
                  {p.matchScore !== undefined && (
                    <div className="col-match-score">
                      Match: <strong>{p.matchScore}%</strong>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr>
              <td className="feature-name">Price (USD)</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  ${p.price}
                </td>
              ))}
            </tr>

            {/* RAM */}
            <tr>
              <td className="feature-name">Memory (RAM)</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  {p.specifications?.ram ? `${p.specifications.ram} GB ${p.specifications?.ramType || ''}` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Storage */}
            <tr>
              <td className="feature-name">Storage Capacity</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  {p.specifications?.storage ? `${p.specifications.storage} GB` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* GPU / Graphics */}
            <tr>
              <td className="feature-name">Graphics / GPU</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  {p.specifications?.gpu || p.specifications?.camera || p.specifications?.anc || 'Standard'}
                </td>
              ))}
            </tr>

            {/* Battery Life */}
            <tr>
              <td className="feature-name">Battery Endurance</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  {p.specifications?.batteryLifeHours ? `~${p.specifications.batteryLifeHours} Hours` : 'N/A (Passive)'}
                </td>
              ))}
            </tr>

            {/* Water / Build Certification */}
            <tr>
              <td className="feature-name">Durability / Ingress</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  {p.specifications?.waterResistance || 'Standard chassis'}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="actions-row">
              <td className="feature-name">Deep Dive</td>
              {allProducts.map(p => (
                <td key={p.id} className={p.isOriginal ? 'original-col' : ''}>
                  <Link to={`/products/${p.id}`} className="btn-secondary table-action-btn">
                    <span>Inspect Specs</span>
                    <ArrowRight size={14} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <style>{`
        .comparison-table-wrap {
          margin-top: 2rem;
          padding: 1.75rem;
          background: #ffffff;
        }
        .table-header {
          margin-bottom: 1.25rem;
        }
        .table-title {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.25rem;
        }
        .table-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .spec-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          text-align: left;
        }
        .spec-table th, .spec-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        .feature-col {
          width: 25%;
          color: var(--color-text-muted);
          font-weight: 600;
          background: #f8fafc;
        }
        .feature-name {
          font-weight: 600;
          color: var(--color-navy-dark);
          background: #f8fafc;
        }
        .product-header-col {
          vertical-align: top;
          min-width: 180px;
        }
        .original-col {
          background-color: #fafbfd;
          border-left: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
        }
        .col-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-muted);
          background: #f1f5f9;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.35rem;
        }
        .col-prod-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          margin-bottom: 0.25rem;
        }
        .col-prod-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-amber-hover);
        }
        .col-match-score {
          font-size: 0.82rem;
          color: #334155;
          margin-top: 0.35rem;
        }
        .actions-row td {
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }
        .table-action-btn {
          font-size: 0.78rem;
          padding: 0.45rem 0.8rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
