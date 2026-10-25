import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  ArrowLeft, 
  Check, 
  X, 
  ShieldCheck, 
  Truck, 
  Shield, 
  RotateCcw, 
  Cpu, 
  HardDrive, 
  Battery, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import RequirementForm from '../components/RequirementForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../services/api';
import { useProducts } from '../context/ProductContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        // First check in context (which includes community seller items)
        const localProd = getProductById(id);
        if (localProd) {
          setProduct(localProd);
          setLoading(false);
          return;
        }
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Product not found.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, getProductById]);

  const handleAnalyze = async (requirements) => {
    setIsAnalyzing(true);
    try {
      const result = await api.analyzeProduct(product, requirements);
      // Navigate to results page with analysis state
      navigate(`/analysis/${product.id}`, { state: { analysisResult: result, requirements } });
    } catch (err) {
      alert("Error analyzing product: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading product specifications..." />;

  if (error || !product) {
    return (
      <div className="page-wrapper">
        <div className="error-card card-base">
          <h2>Product Not Found</h2>
          <p>{error || "The requested item is not in our verified catalog."}</p>
          <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={16} /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const { specifications = {} } = product;

  return (
    <div className="page-wrapper">
      {/* Back button */}
      <div className="back-link-row">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>

      {/* Main Product Showcase Section */}
      <div className="product-showcase-grid">
        {/* Product Image & Badges */}
        <div className="product-gallery-card card-base">
          <img src={product.image} alt={product.name} className="product-main-image" />
          {product.badge && <span className="gallery-badge">{product.badge}</span>}
          <div className="demo-data-pill">
            <Info size={13} /> Demo Catalog Item
          </div>
        </div>

        {/* Product Overview & Quick Specs */}
        <div className="product-summary-col">
          <span className="product-cat-pill">{product.category}</span>
          <h1 className="product-heading">{product.name}</h1>

          <div className="product-rating-box">
            <div className="stars-pill">
              <Star size={15} className="star-filled" />
              <span>{product.rating}</span>
            </div>
            <span className="reviews-label">{product.reviewsCount?.toLocaleString()} verified customer ratings</span>
          </div>

          <div className="price-strip">
            <div className="price-amount">${product.price}</div>
            <span className="price-vat">Inclusive of all demo taxes</span>
            <button 
              type="button" 
              onClick={() => {
                alert(`Order Placed Successfully for "${product.name}" ($${product.price})!\n\nThis demonstration confirms the buy flow. ReturnWise AI will log your spec compatibility guarantees.`);
              }}
              className="btn-primary buy-now-btn"
              style={{ marginLeft: 'auto', padding: '0.65rem 1.4rem' }}
            >
              Buy Now
            </button>
          </div>

          <p className="product-description-full">{product.description}</p>

          {/* E-Commerce Confidence Perks */}
          <div className="perks-row">
            <div className="perk-item">
              <Truck size={18} className="text-amber-500" />
              <div>
                <strong>Fast Prime Delivery</strong>
                <span>Free 2-day delivery</span>
              </div>
            </div>
            <div className="perk-item">
              <ShieldCheck size={18} className="text-amber-500" />
              <div>
                <strong>Amazon Alexa+ Protected</strong>
                <span>AI verified suitability</span>
              </div>
            </div>
            <div className="perk-item">
              <RotateCcw size={18} className="text-amber-500" />
              <div>
                <strong>30-Day Hassle Free</strong>
                <span>Standard return window</span>
              </div>
            </div>
          </div>

          {/* Quick Specifications Snapshot */}
          <div className="specs-snapshot-box card-base">
            <h3 className="specs-snapshot-title">Hardware Specifications</h3>
            <div className="specs-matrix-grid">
              {Object.entries(specifications).map(([key, val]) => {
                if (typeof val === 'object' && Array.isArray(val)) {
                  val = val.join(', ');
                }
                // Format label from camelCase
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return (
                  <div key={key} className="spec-row">
                    <span className="spec-label">{label}</span>
                    <span className="spec-val">{String(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Requirement Analysis Form */}
      <RequirementForm 
        product={product} 
        onAnalyze={handleAnalyze} 
        isAnalyzing={isAnalyzing} 
      />

      <style>{`
        .back-link-row {
          margin-bottom: 1.5rem;
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
        .product-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 2.5rem;
          margin-bottom: 2rem;
        }
        .product-gallery-card {
          position: relative;
          background: #ffffff;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          max-height: 480px;
        }
        .product-main-image {
          width: 100%;
          max-height: 420px;
          object-fit: cover;
          border-radius: var(--radius-md);
        }
        .gallery-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: var(--color-navy-dark);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        .demo-data-pill {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .product-summary-col {
          display: flex;
          flex-direction: column;
        }
        .product-cat-pill {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-amber-hover);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.35rem;
        }
        .product-heading {
          font-size: 2rem;
          line-height: 1.2;
          color: var(--color-navy-dark);
          margin-bottom: 0.75rem;
        }
        .product-rating-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .stars-pill {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #fef3c7;
          color: #b45309;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .star-filled {
          fill: #f59e0b;
          color: #f59e0b;
        }
        .reviews-label {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .price-strip {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1.25rem;
        }
        .price-amount {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-navy-dark);
        }
        .price-vat {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .product-description-full {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 1.5rem;
        }
        .perks-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #ffffff;
          border: 1px solid var(--color-border);
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }
        .perk-item div {
          display: flex;
          flex-direction: column;
          font-size: 0.78rem;
        }
        .perk-item strong {
          color: var(--color-navy-dark);
        }
        .perk-item span {
          color: var(--color-text-muted);
        }
        .specs-snapshot-box {
          padding: 1.25rem;
          background: #ffffff;
        }
        .specs-snapshot-title {
          font-size: 1.05rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .specs-matrix-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1.25rem;
        }
        .spec-row {
          display: flex;
          flex-direction: column;
          font-size: 0.82rem;
        }
        .spec-label {
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .spec-val {
          color: var(--color-navy-dark);
          font-weight: 600;
        }
        .error-card {
          padding: 3rem;
          text-align: center;
          background: #ffffff;
        }
        @media (max-width: 900px) {
          .product-showcase-grid {
            grid-template-columns: 1fr;
          }
          .specs-matrix-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
