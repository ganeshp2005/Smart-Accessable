import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  RefreshCcw, 
  Search,
  SlidersHorizontal,
  TrendingDown,
  Layers,
  HeartHandshake
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { productCategories } from '../data/products';
import { useProducts } from '../context/ProductContext';

export default function Home() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    
    const matchesSearch = 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.specifications?.ram && `${product.specifications.ram}gb`.includes(query)) ||
      (product.specifications?.gpu && product.specifications.gpu.toLowerCase().includes(query)) ||
      (product.specifications?.anc && product.specifications.anc.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>AI Purchase Risk & Compatibility Engine</span>
          </div>

          <h1 className="hero-title">
            Stop E-Commerce Returns <br />
            <span className="hero-highlight">Before You Even Buy.</span>
          </h1>

          <p className="hero-description">
            Over 30% of online electronics are returned due to minor specification mismatches. 
            Amazon Alexa+ benchmarks product hardware against your personal workloads, budget limits, 
            and must-have features to give you total purchase confidence.
          </p>

          <div className="hero-cta-group">
            <a href="#featured-products" className="btn-primary hero-btn">
              <span>Explore & Analyze Products</span>
              <ArrowRight size={18} />
            </a>
            <Link to="/sell" className="btn-secondary hero-btn-secondary" style={{ borderColor: 'var(--color-amber)', color: 'var(--color-amber)' }}>
              Sell Your Product
            </Link>
            <Link to="/assistant" className="btn-secondary hero-btn-secondary">
              Ask AI Assistant
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Return Risk Accuracy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">30%</span>
              <span className="stat-label">Fewer Return Shipments</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">Instant</span>
              <span className="stat-label">Hardware Spec Synthesis</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-eyebrow">Smart Shopping Workflow</span>
            <h2 className="section-main-heading">How Amazon Alexa+ Protects Your Order</h2>
            <p className="section-subtext">Four seamless steps from product curiosity to verified compatibility.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card card-base">
              <div className="step-num">01</div>
              <h3 className="step-title">Select Any Product</h3>
              <p className="step-desc">
                Browse our catalog of verified laptops, phones, and audio equipment, or enter any product model.
              </p>
            </div>

            <div className="step-card card-base">
              <div className="step-num">02</div>
              <h3 className="step-title">Input Your True Needs</h3>
              <p className="step-desc">
                Define your exact max budget, RAM thresholds, storage minimums, and specific workloads like ML or video editing.
              </p>
            </div>

            <div className="step-card card-base">
              <div className="step-num">03</div>
              <h3 className="step-title">AI Compatibility Audit</h3>
              <p className="step-desc">
                The engine evaluates thermal limits, memory bottlenecks, and missing OEM specs to output a verified match score.
              </p>
            </div>

            <div className="step-card card-base">
              <div className="step-num">04</div>
              <h3 className="step-title">Get Safer Alternatives</h3>
              <p className="step-desc">
                If the product risks failing your workload, Amazon Alexa+ recommends better-matched alternatives to save you time and money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Section */}
      <section id="featured-products" className="products-section">
        <div className="section-container">
          <div className="catalog-header-row">
            <div>
              <span className="section-eyebrow">Verified Catalog & Community Marketplace</span>
              <h2 className="section-main-heading">Explore Products Ready for Analysis & Direct Purchase</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/sell" className="btn-primary" style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}>
                + Sell a Product
              </Link>
              <span className="products-count-badge">
                Showing {filteredProducts.length} Products
              </span>
            </div>
          </div>

          {/* Search and Category Filter Bar */}
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={productCategories}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products-box card-base">
              <Search size={42} className="text-amber-500" />
              <h3>No matching products found</h3>
              <p>Try refining your search terms or selecting another category.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits / Impact Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon-wrap">
                <TrendingDown size={24} />
              </div>
              <h3 className="benefit-title">Zero Return Friction</h3>
              <p className="benefit-desc">
                Eliminate the hassle of repackaging, printing return labels, and waiting weeks for merchant refund credits.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrap">
                <ShieldCheck size={24} />
              </div>
              <h3 className="benefit-title">Unbiased Hardware Truth</h3>
              <p className="benefit-desc">
                Cut through marketing buzzwords. Understand what integrated vs dedicated GPUs actually mean for your tasks.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrap">
                <RefreshCcw size={24} />
              </div>
              <h3 className="benefit-title">Lower Reverse-Logistics Waste</h3>
              <p className="benefit-desc">
                Millions of tons of return-freight carbon emissions are generated yearly. Smarter purchasing protects our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          background: linear-gradient(180deg, var(--color-navy-dark) 0%, #0f172a 100%);
          color: #ffffff;
          padding: 5rem 1.5rem 4rem 1.5rem;
          text-align: center;
          position: relative;
        }
        .hero-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--color-amber);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }
        .hero-title {
          font-size: 3.25rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }
        .hero-highlight {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-description {
          font-size: 1.1rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 2.25rem;
          max-width: 720px;
        }
        .hero-cta-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-btn {
          font-size: 1.05rem;
          padding: 0.9rem 1.8rem;
        }
        .hero-btn-secondary {
          font-size: 1.05rem;
          padding: 0.9rem 1.8rem;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .hero-stats-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem 2.5rem;
          border-radius: var(--radius-lg);
          backdrop-filter: blur(8px);
          flex-wrap: wrap;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-amber);
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .stat-label {
          font-size: 0.78rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .stat-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 255, 255, 0.12);
        }
        .how-it-works-section {
          padding: 5rem 1.5rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--color-border);
        }
        .section-container {
          max-width: 1240px;
          margin: 0 auto;
        }
        .section-header-center {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem auto;
        }
        .section-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-amber);
          display: block;
          margin-bottom: 0.4rem;
        }
        .section-main-heading {
          font-size: 2.1rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.65rem;
          letter-spacing: -0.02em;
        }
        .section-subtext {
          font-size: 1rem;
          color: var(--color-text-muted);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .step-card {
          padding: 2rem 1.5rem;
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          position: relative;
        }
        .step-num {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: rgba(245, 158, 11, 0.4);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .step-title {
          font-size: 1.15rem;
          margin-bottom: 0.6rem;
          color: var(--color-navy-dark);
        }
        .step-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .products-section {
          padding: 4.5rem 1.5rem;
          background-color: var(--color-bg-main);
        }
        .catalog-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .products-count-badge {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          background: #ffffff;
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.75rem;
        }
        .no-products-box {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          background: #ffffff;
        }
        .benefits-section {
          padding: 4.5rem 1.5rem;
          background-color: #ffffff;
          border-top: 1px solid var(--color-border);
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .benefit-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .benefit-icon-wrap {
          background-color: #fef3c7;
          color: #d97706;
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .benefit-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--color-navy-dark);
        }
        .benefit-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .hero-stats-bar {
            gap: 1.5rem;
            padding: 1rem 1.5rem;
          }
          .stat-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
