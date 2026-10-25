import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnalysisCard({ analysisResult, onCompareAlternatives }) {
  const {
    productName,
    productCategory,
    productPrice,
    productImage,
    matchScore,
    matchedRequirements = [],
    mismatchedRequirements = [],
    unknownSpecifications = [],
    explanation,
    isDemoData
  } = analysisResult;

  // Determine score state styling
  let scoreThemeClass = "score-high";
  let scoreBadgeText = "Excellent Compatibility";
  let returnRiskText = "Low Return Probability";
  let returnRiskBadge = "badge-pass";

  if (matchScore < 50) {
    scoreThemeClass = "score-low";
    scoreBadgeText = "High Return Risk";
    returnRiskText = "High Risk of Return (Mismatch)";
    returnRiskBadge = "badge-fail";
  } else if (matchScore < 80) {
    scoreThemeClass = "score-medium";
    scoreBadgeText = "Moderate Fit / Trade-offs";
    returnRiskText = "Moderate Return Risk";
    returnRiskBadge = "badge-warning";
  }

  return (
    <div className="analysis-card card-base">
      {/* Product Summary Header */}
      <div className="analysis-header-row">
        <div className="analysis-prod-meta">
          <img src={productImage} alt={productName} className="analysis-prod-img" />
          <div>
            <span className="analysis-category-tag">{productCategory}</span>
            <h2 className="analysis-prod-title">{productName}</h2>
            <div className="analysis-price-tag">${productPrice}</div>
          </div>
        </div>

        {/* Big Match Score Dial */}
        <div className={`score-dial-box ${scoreThemeClass}`}>
          <div className="score-number-wrap">
            <span className="score-big-num">{matchScore}%</span>
            <span className="score-label">Match Score</span>
          </div>
          <span className={`return-risk-pill ${returnRiskBadge}`}>
            {returnRiskText}
          </span>
          {isDemoData && <span className="demo-tag">Estimated Demo Score</span>}
        </div>
      </div>

      {/* AI Explanation Banner */}
      <div className="ai-summary-banner">
        <div className="ai-summary-header">
          <Sparkles className="text-amber-500" size={18} />
          <strong>AI Purchase Risk Synthesis:</strong>
        </div>
        <p className="ai-summary-text">{explanation}</p>
      </div>

      {/* Detailed Requirement Match Breakdown */}
      <div className="breakdown-grid">
        {/* Matched Requirements */}
        <div className="breakdown-section matched-section">
          <div className="section-title-row">
            <div className="title-icon-wrap icon-success">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="section-title">
              Matched Specifications ({matchedRequirements.length})
            </h3>
          </div>
          <p className="section-desc">Hardware specs that fully satisfy your input criteria:</p>

          <div className="requirements-list">
            {matchedRequirements.length === 0 ? (
              <p className="empty-notice">No specific matching criteria flagged.</p>
            ) : (
              matchedRequirements.map((item, idx) => (
                <div key={idx} className="spec-item-box spec-matched">
                  <div className="spec-item-header">
                    <span className="spec-name">{item.title}</span>
                    <span className="badge-pass">PASS</span>
                  </div>
                  <p className="spec-detail">{item.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mismatched Requirements */}
        <div className="breakdown-section mismatched-section">
          <div className="section-title-row">
            <div className="title-icon-wrap icon-fail">
              <XCircle size={18} />
            </div>
            <h3 className="section-title">
              Mismatch & Return Risks ({mismatchedRequirements.length})
            </h3>
          </div>
          <p className="section-desc">Hardware limitations likely to trigger buyer dissatisfaction or return:</p>

          <div className="requirements-list">
            {mismatchedRequirements.length === 0 ? (
              <div className="spec-item-box spec-all-good">
                <CheckCircle2 size={16} className="text-success" />
                <span>Zero major specification conflicts identified!</span>
              </div>
            ) : (
              mismatchedRequirements.map((item, idx) => (
                <div key={idx} className="spec-item-box spec-mismatched">
                  <div className="spec-item-header">
                    <span className="spec-name">{item.title}</span>
                    <span className="badge-fail">MISMATCH</span>
                  </div>
                  <p className="spec-detail">{item.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Unknown or Unverified Specifications */}
      {unknownSpecifications.length > 0 && (
        <div className="unknown-specs-box">
          <div className="unknown-specs-header">
            <HelpCircle size={18} className="text-amber-500" />
            <h4 className="unknown-specs-title">Missing / Unverified Specifications ({unknownSpecifications.length})</h4>
          </div>
          <p className="unknown-specs-subtitle">
            These parameters could not be validated against official OEM product listings. Verify with seller before checkout:
          </p>
          <div className="unknown-chips-wrap">
            {unknownSpecifications.map((item, idx) => (
              <div key={idx} className="unknown-chip">
                <strong>{item.title}:</strong> {item.detail}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="analysis-card-footer">
        <button 
          type="button" 
          onClick={onCompareAlternatives}
          className="btn-primary"
        >
          <TrendingUp size={18} />
          <span>Compare Better Alternatives</span>
        </button>

        <Link to="/" className="btn-secondary">
          Analyze Another Product
        </Link>
      </div>

      <style>{`
        .analysis-card {
          padding: 2rem;
          background: #ffffff;
        }
        .analysis-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--color-border);
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .analysis-prod-meta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .analysis-prod-img {
          width: 90px;
          height: 90px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 1px solid var(--color-border);
        }
        .analysis-category-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .analysis-prod-title {
          font-size: 1.35rem;
          color: var(--color-navy-dark);
          margin: 0.2rem 0;
        }
        .analysis-price-tag {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-amber-hover);
        }
        .score-dial-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1.75rem;
          border-radius: var(--radius-lg);
          border: 2px solid;
          text-align: center;
          min-width: 190px;
        }
        .score-dial-box.score-high {
          background-color: #f0fdf4;
          border-color: #86efac;
        }
        .score-dial-box.score-medium {
          background-color: #fffbeb;
          border-color: #fcd34d;
        }
        .score-dial-box.score-low {
          background-color: #fef2f2;
          border-color: #fca5a5;
        }
        .score-number-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }
        .score-big-num {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1;
          color: var(--color-navy-dark);
        }
        .score-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }
        .demo-tag {
          font-size: 0.68rem;
          color: var(--color-text-light);
          margin-top: 0.35rem;
        }
        .ai-summary-banner {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid var(--color-amber);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin: 1.75rem 0;
        }
        .ai-summary-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        .ai-summary-text {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #334155;
        }
        .breakdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
        }
        .breakdown-section {
          background: #fdfdfd;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }
        .section-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.35rem;
        }
        .title-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-success {
          background-color: var(--color-success-bg);
          color: var(--color-success);
        }
        .icon-fail {
          background-color: var(--color-danger-bg);
          color: var(--color-danger);
        }
        .section-title {
          font-size: 1.05rem;
          color: var(--color-navy-dark);
        }
        .section-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }
        .requirements-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .spec-item-box {
          padding: 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid;
        }
        .spec-matched {
          background-color: #fcfdfc;
          border-color: #dcfce7;
        }
        .spec-mismatched {
          background-color: #fffbfb;
          border-color: #fee2e2;
        }
        .spec-all-good {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: var(--color-success);
          font-size: 0.88rem;
          font-weight: 500;
        }
        .spec-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .spec-name {
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--color-navy-dark);
        }
        .spec-detail {
          font-size: 0.82rem;
          color: #475569;
          line-height: 1.45;
        }
        .unknown-specs-box {
          background-color: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .unknown-specs-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .unknown-specs-title {
          font-size: 0.95rem;
          color: #92400e;
        }
        .unknown-specs-subtitle {
          font-size: 0.82rem;
          color: #b45309;
          margin-bottom: 0.75rem;
        }
        .unknown-chips-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .unknown-chip {
          font-size: 0.8rem;
          color: #78350f;
          background: rgba(255, 255, 255, 0.7);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .analysis-card-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .breakdown-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
