import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';
import AnalysisCard from '../components/AnalysisCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../services/api';

export default function AnalysisResults() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [analysisResult, setAnalysisResult] = useState(location.state?.analysisResult || null);
  const [requirements, setRequirements] = useState(location.state?.requirements || null);
  const [loading, setLoading] = useState(!analysisResult);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user arrived directly without location state, run default benchmark analysis
    if (!analysisResult) {
      async function runFallbackAnalysis() {
        try {
          setLoading(true);
          const product = await api.getProductById(id);
          const fallbackReqs = {
            maxBudget: product.price + 50,
            minRam: 16,
            minStorage: 512,
            minBattery: 8,
            intendedUse: "General Multitasking & Developer Workflow",
            mustHaveFeatures: "Modern processor, fast storage"
          };
          const result = await api.analyzeProduct(product, fallbackReqs);
          setAnalysisResult(result);
          setRequirements(fallbackReqs);
        } catch (err) {
          setError(err.message || "Failed to analyze product.");
        } finally {
          setLoading(false);
        }
      }
      runFallbackAnalysis();
    }
  }, [id, analysisResult]);

  const handleCompareAlternatives = () => {
    navigate(`/alternatives/${id}`, { 
      state: { 
        analysisResult, 
        requirements,
        alternatives: analysisResult.alternatives 
      } 
    });
  };

  if (loading) return <LoadingSpinner message="Calculating hardware compatibility & return risk..." />;

  if (error || !analysisResult) {
    return (
      <div className="page-wrapper">
        <div className="card-base" style={{ padding: '3rem', textAlign: 'center', background: '#fff' }}>
          <h2>Analysis Error</h2>
          <p>{error || "No analysis report found for this product."}</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={16} /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Breadcrumb / Navigation */}
      <div className="results-top-nav">
        <Link to={`/products/${id}`} className="back-link">
          <ArrowLeft size={16} /> Back to Product Page
        </Link>

        <div className="results-top-actions">
          <Link to="/assistant" className="btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
            <Bot size={16} className="text-amber-500" />
            <span>Ask AI About This Report</span>
          </Link>
          <button 
            type="button" 
            onClick={handleCompareAlternatives}
            className="btn-primary"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
          >
            <TrendingUp size={16} />
            <span>View Alternatives ({analysisResult.alternatives?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="results-title-section">
        <div className="results-badge">
          <Sparkles size={14} className="text-amber-500" />
          <span>Verified AI Compatibility Audit</span>
        </div>
        <h1 className="results-main-title">Specification Compatibility Report</h1>
        <p className="results-desc">
          Structured evaluation between your defined personal requirements and OEM verified device hardware.
        </p>
      </div>

      {/* Core Analysis Component */}
      <AnalysisCard 
        analysisResult={analysisResult} 
        onCompareAlternatives={handleCompareAlternatives} 
      />

      <style>{`
        .results-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-navy-dark);
          font-weight: 600;
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }
        .back-link:hover {
          color: var(--color-amber-hover);
        }
        .results-top-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .results-title-section {
          margin-bottom: 2rem;
        }
        .results-badge {
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
        .results-main-title {
          font-size: 2.1rem;
          color: var(--color-navy-dark);
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }
        .results-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
