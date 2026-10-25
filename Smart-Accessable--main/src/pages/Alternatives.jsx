import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  HardDrive,
  Battery,
  AlertCircle
} from 'lucide-react';
import ComparisonTable from '../components/ComparisonTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../services/api';

export default function Alternatives() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [originalProduct, setOriginalProduct] = useState(null);
  const [alternatives, setAlternatives] = useState(location.state?.alternatives || []);
  const [analysisResult, setAnalysisResult] = useState(location.state?.analysisResult || null);
  const [loading, setLoading] = useState(!location.state?.alternatives);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const prod = await api.getProductById(id);
        setOriginalProduct(prod);

        // If alternatives not passed in state, compute default
        if (!location.state?.alternatives) {
          const reqs = {
            maxBudget: prod.price + 100,
            minRam: 16,
            minStorage: 512,
            minBattery: 8,
            intendedUse: "Machine Learning & High Performance Workflow"
          };
          const report = await api.analyzeProduct(prod, reqs);
          setAnalysisResult(report);
          setAlternatives(report.alternatives || []);
        }
      } catch (err) {
        console.error("Error loading alternatives:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, location.state]);

  if (loading) return <LoadingSpinner message="Calculating competitive alternatives and compatibility deltas..." />;

  return (
    <div className="page-wrapper">
      {/* Back button */}
      <div className="back-link-row">
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="back-btn-ghost"
        >
          <ArrowLeft size={16} /> Return to Previous Analysis
        </button>
      </div>

      {/* Header */}
      <div className="alts-header-box">
        <div className="alts-badge">
          <Sparkles size={14} className="text-amber-500" />
          <span>Curated Smarter Alternatives</span>
        </div>
        <h1 className="alts-main-heading">
          Better Alternatives for {originalProduct?.name || 'Your Selection'}
        </h1>
        <p className="alts-subtext">
          These products address the specification deficits or price overhead identified in your compatibility analysis.
        </p>
      </div>

      {/* Alternative Product Cards Grid */}
      <div className="alternatives-cards-grid">
        {alternatives.map((altProduct, index) => (
          <div key={altProduct.id} className="alt-card card-base">
            <div className="alt-card-header">
              <span className="alt-rank-tag">Option #{index + 1}</span>
              <div className="alt-match-score">
                <span className="score-val">{altProduct.matchScore}%</span>
                <span className="score-txt">Match Score</span>
              </div>
            </div>

            <div className="alt-card-body">
              <div className="alt-image-box">
                <img src={altProduct.image} alt={altProduct.name} className="alt-img" />
              </div>

              <div className="alt-details-box">
                <h3 className="alt-title">{altProduct.name}</h3>
                <div className="alt-price-row">
                  <span className="alt-price">${altProduct.price}</span>
                  {originalProduct && altProduct.price < originalProduct.price && (
                    <span className="savings-pill">
                      Save ${originalProduct.price - altProduct.price}
                    </span>
                  )}
                </div>

                <p className="alt-desc">{altProduct.description}</p>

                {/* Why This is a Better Fit */}
                <div className="reasons-box">
                  <h4 className="reasons-heading">
                    <CheckCircle2 size={15} className="text-success" />
                    <span>Why this is a better fit:</span>
                  </h4>
                  <ul className="reasons-list">
                    {altProduct.reasons?.map((reason, rIdx) => (
                      <li key={rIdx}>{reason}</li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="alt-card-footer">
                  <Link to={`/products/${altProduct.id}`} className="btn-primary" style={{ flex: 1 }}>
                    <span>View Details & Analyze</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-side Technical Specification Comparison Table */}
      <ComparisonTable originalProduct={originalProduct} alternatives={alternatives} />

      <style>{`
        .back-link-row {
          margin-bottom: 1.5rem;
        }
        .back-btn-ghost {
          background: transparent;
          border: none;
          color: var(--color-navy-dark);
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .back-btn-ghost:hover {
          color: var(--color-amber-hover);
        }
        .alts-header-box {
          margin-bottom: 2.25rem;
        }
        .alts-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #92400e;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }
        .alts-main-heading {
          font-size: 2.1rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }
        .alts-subtext {
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }
        .alternatives-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .alt-card {
          background: #ffffff;
          padding: 1.5rem;
          border-left: 4px solid var(--color-success);
        }
        .alt-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border);
        }
        .alt-rank-tag {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          background: #f1f5f9;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .alt-match-score {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
        }
        .score-val {
          font-weight: 800;
          color: var(--color-success);
          font-size: 1.05rem;
        }
        .score-txt {
          font-size: 0.75rem;
          color: #166534;
          font-weight: 600;
        }
        .alt-card-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 1.75rem;
        }
        .alt-image-box {
          height: 180px;
          background: #f8fafc;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .alt-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .alt-details-box {
          display: flex;
          flex-direction: column;
        }
        .alt-title {
          font-size: 1.3rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.4rem;
        }
        .alt-price-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }
        .alt-price {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-navy-dark);
        }
        .savings-pill {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .alt-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .reasons-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .reasons-heading {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.4rem;
        }
        .reasons-list {
          list-style: disc;
          padding-left: 1.25rem;
          font-size: 0.82rem;
          color: #334155;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .alt-card-footer {
          display: flex;
          margin-top: auto;
        }
        @media (max-width: 768px) {
          .alt-card-body {
            grid-template-columns: 1fr;
          }
          .alt-image-box {
            height: 190px;
          }
        }
      `}</style>
    </div>
  );
}
