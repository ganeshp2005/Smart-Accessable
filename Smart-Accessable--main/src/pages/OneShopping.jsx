import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  Check, 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  PlusCircle, 
  Tag, 
  Clock, 
  Flame, 
  Scissors, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  Eye, 
  SlidersHorizontal,
  Percent,
  X
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useOne } from '../context/OneContext';

export default function OneShopping() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';

  const { products } = useProducts();
  const { addToCart, cart, showToast } = useOne();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSub, setSelectedSub] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedZip, setSelectedZip] = useState('New York 10001');
  const [clippedCoupons, setClippedCoupons] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Lightning Deals countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 44, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const subCategories = ["All", "Lightning Deals", "Groceries", "Laptops", "Smartphones", "Headphones", "Renewed"];

  // Toggle clip coupon
  const handleClipCoupon = (prodId, discountStr) => {
    setClippedCoupons(prev => {
      const isClipped = prev[prodId];
      if (isClipped) {
        showToast("Coupon unclipped", "info");
        const next = { ...prev };
        delete next[prodId];
        return next;
      }
      showToast(`Clipped ${discountStr} Coupon applied to next purchase!`, "success");
      return { ...prev, [prodId]: discountStr };
    });
  };

  const handleInstantBuy = (product) => {
    addToCart(product);
    showToast(`1-Click Order Placed for ${product.name}! Arriving tomorrow with Prime.`, "success");
  };

  // Filter and sort products
  const filteredProducts = products.filter(p => {
    let matchesCat = true;
    if (selectedSub === 'Lightning Deals') matchesCat = p.badge?.includes('Deal') || p.price > 100;
    else if (selectedSub === 'Renewed') matchesCat = p.badge?.includes('Renewed') || p.name.includes('Renewed');
    else if (selectedSub !== 'All') matchesCat = p.category === selectedSub;

    const q = searchTerm.toLowerCase();
    const matchesQuery = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return (b.rating || 4.5) - (a.rating || 4.5);
  });

  const totalCartCount = cart.reduce((a, b) => a + (b.qty || 1), 0);

  return (
    <div className="retail-showcase-root">
      {/* Prime Retail Top Strip */}
      <div className="retail-masthead card-base">
        <div className="masthead-left">
          <div className="retail-badge">
            <ShoppingBag size={14} className="text-amber-500" />
            <span>Amazon Retail, Fresh Groceries & Certified Renewed</span>
          </div>
          <h1 className="masthead-title">Earth's Biggest Selection with Prime 1-Day Delivery</h1>
          <p className="masthead-desc">
            Shop authentic electronics, pantry groceries, and certified renewed tech with 90-day guarantees and AI spec validation.
          </p>

          <div className="deliver-to-selector">
            <MapPin size={15} className="text-amber-500" />
            <span>Deliver to:</span>
            <select 
              value={selectedZip} 
              onChange={(e) => {
                setSelectedZip(e.target.value);
                showToast(`Delivery location set to ${e.target.value}. Shipping dates updated!`, "info");
              }}
              className="zip-dropdown"
            >
              <option value="New York 10001">New York 10001 (Same-Day Eligible)</option>
              <option value="Seattle 98101">Seattle 98101 (2-Hour Fresh Available)</option>
              <option value="San Francisco 94103">San Francisco 94103 (Prime 1-Day)</option>
              <option value="Bangalore 560001">Bangalore 560001 (Express Delivery)</option>
            </select>
          </div>
        </div>

        <div className="masthead-right">
          <Link to="/cart" className="retail-cart-cta">
            <div className="cart-cta-bubble">
              <ShoppingCart size={20} />
              {totalCartCount > 0 && <span className="cart-count-badge">{totalCartCount}</span>}
            </div>
            <div className="cart-cta-text">
              <span className="cart-sub-txt">Review demo order</span>
              <strong>Demo Cart ({totalCartCount})</strong>
            </div>
          </Link>
          <Link to="/sell" className="btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.82rem' }}>
            <PlusCircle size={15} /> Sell an Item
          </Link>
        </div>
      </div>

      {/* TODAY'S LIGHTNING DEALS BANNER */}
      <div className="lightning-deals-banner card-base">
        <div className="lightning-left">
          <div className="deal-fire-badge">
            <Flame size={18} className="text-amber-400" />
            <strong>TODAY'S LIGHTNING DEALS</strong>
          </div>
          <span className="deal-callout">Up to 45% Off Electronics & Fresh Essentials</span>
        </div>

        <div className="deal-countdown-box">
          <Clock size={16} className="text-amber-400" />
          <span>Ends in:</span>
          <div className="countdown-digits">
            <span className="digit-box">{String(timeLeft.hours).padStart(2, '0')}h</span> :
            <span className="digit-box">{String(timeLeft.minutes).padStart(2, '0')}m</span> :
            <span className="digit-box">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="retail-filter-bar card-base">
        <div className="retail-search-box">
          <Search size={18} className="search-lead-icon" />
          <input
            type="text"
            placeholder="Search millions of products, groceries, specs (e.g. M3 MacBook, AirPods, Fresh Milk)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="retail-search-input"
          />
        </div>

        <div className="retail-filter-actions">
          <div className="categories-pills-row">
            {subCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedSub(cat)}
                className={`cat-pill ${selectedSub === cat ? 'cat-pill-active' : ''}`}
              >
                {cat === 'Lightning Deals' && <Flame size={13} className="text-amber-500" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="sort-box">
            <span className="sort-txt">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="popular">Featured & Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTS SHOWCASE GRID */}
      <div className="retail-grid">
        {filteredProducts.map(product => {
          const isCouponClipped = !!clippedCoupons[product.id];
          const hasCoupon = product.price > 75;
          const couponDiscount = product.price > 300 ? "$25 Off" : "15% Off";
          const dealClaimedPct = Math.min(92, 45 + (product.price % 40));

          return (
            <div key={product.id} className="amazon-retail-card card-base">
              {/* Product Badge Strip */}
              <div className="card-top-badges">
                {product.badge ? (
                  <span className="amazon-choice-badge">{product.badge}</span>
                ) : (
                  <span className="prime-badge">Prime</span>
                )}
                {product.price > 150 && (
                  <span className="deal-discount-badge">SAVE 20%</span>
                )}
              </div>

              {/* Product Thumbnail with Quick View Hover */}
              <div className="card-image-wrap" onClick={() => setQuickViewProduct(product)}>
                <img src={product.image} alt={product.name} className="product-image" />
                <button 
                  type="button" 
                  className="quick-view-overlay-btn"
                  onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                >
                  <Eye size={14} /> Quick View
                </button>
              </div>

              {/* Product Metadata */}
              <div className="card-info-wrap">
                <span className="cat-breadcrumb">{product.category}</span>
                <h3 className="product-title" onClick={() => setQuickViewProduct(product)} title={product.name}>
                  {product.name}
                </h3>

                {/* Rating & Review Count */}
                <div className="stars-row">
                  <div className="stars-display">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="star-filled" />
                    ))}
                  </div>
                  <span className="rating-score">{product.rating || 4.7}</span>
                  <span className="review-count">({product.reviewsCount?.toLocaleString() || '2,410'})</span>
                </div>

                {/* Pricing & Prime Delivery */}
                <div className="pricing-row">
                  <div className="price-tag">
                    <span className="currency-symbol">$</span>
                    <strong className="price-major">{Math.floor(product.price)}</strong>
                    <span className="price-minor">.99</span>
                  </div>
                  {product.price > 100 && (
                    <span className="list-price-strike">${(product.price * 1.25).toFixed(0)}</span>
                  )}
                </div>

                {/* Prime Fast Delivery Tag */}
                <div className="delivery-guarantee">
                  <span className="prime-blue-tag">prime</span>
                  <span className="deliv-time">FREE Tomorrow, <strong>7 AM – 11 AM</strong></span>
                </div>

                {/* Deal claimed bar (if lightning deal) */}
                {selectedSub === 'Lightning Deals' && (
                  <div className="deal-progress-wrap">
                    <div className="claimed-bar">
                      <div className="claimed-fill" style={{ width: `${dealClaimedPct}%` }}></div>
                    </div>
                    <span className="claimed-text">{dealClaimedPct}% claimed</span>
                  </div>
                )}

                {/* Interactive Clip Coupon */}
                {hasCoupon && (
                  <div className="coupon-clip-row">
                    <button
                      type="button"
                      onClick={() => handleClipCoupon(product.id, couponDiscount)}
                      className={`clip-coupon-btn ${isCouponClipped ? 'coupon-clipped' : ''}`}
                    >
                      {isCouponClipped ? (
                        <>
                          <Check size={14} className="text-emerald-500" />
                          <span>Coupon {couponDiscount} Applied!</span>
                        </>
                      ) : (
                        <>
                          <Scissors size={14} />
                          <span>Clip {couponDiscount} Coupon</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="card-actions-grid">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="add-to-cart-btn"
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInstantBuy(product)}
                    className="buy-now-btn"
                  >
                    <Zap size={14} />
                    <span>1-Click Buy</span>
                  </button>
                </div>

                {/* AI Spec Compatibility Analysis Link */}
                <Link to={`/products/${product.id}`} className="spec-check-link">
                  <span>Verify AI Hardware Compatibility</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK VIEW SPEC MODAL */}
      {quickViewProduct && (
        <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-content-quickview card-base" onClick={(e) => e.stopPropagation()}>
            <div className="quickview-grid">
              {/* Product Gallery View */}
              <div className="quickview-img-col">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="quickview-main-img" />
                <div className="quickview-badge-pill">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Amazon Verified Authentic • 30-Day Free Returns</span>
                </div>
              </div>

              {/* Product Detail Spec Sheet */}
              <div className="quickview-info-col">
                <div className="quickview-head">
                  <span className="cat-tag">{quickViewProduct.category}</span>
                  <button type="button" onClick={() => setQuickViewProduct(null)} className="close-qv-btn">
                    <X size={20} />
                  </button>
                </div>

                <h2 className="qv-title">{quickViewProduct.name}</h2>

                <div className="stars-row">
                  <div className="stars-display">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="star-filled" />
                    ))}
                  </div>
                  <strong className="qv-rating">{quickViewProduct.rating || 4.7} out of 5</strong>
                  <span className="qv-reviews">({quickViewProduct.reviewsCount?.toLocaleString() || '1,840'} ratings)</span>
                </div>

                <div className="qv-price-row">
                  <span className="qv-price">${quickViewProduct.price}</span>
                  <span className="qv-prime-tag">Prime Free Overnight</span>
                </div>

                <p className="qv-description">{quickViewProduct.description}</p>

                {/* Tech Specs Table */}
                <div className="qv-specs-table">
                  <div className="spec-row">
                    <span className="spec-label">Availability</span>
                    <span className="spec-val text-success">In Stock. Ships from Amazon fulfillment center.</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Warranty</span>
                    <span className="spec-val">1-Year Manufacturer Warranty + Amazon A-to-z</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Delivery To</span>
                    <span className="spec-val">{selectedZip}</span>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="qv-actions">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="add-to-cart-btn btn-large"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Demo Cart</span>
                  </button>

                  <Link 
                    to={`/products/${quickViewProduct.id}`}
                    className="btn-navy"
                    style={{ padding: '0.85rem 1.25rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <span>Full Spec AI Compatibility Analysis</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RETAIL EMBEDDED STYLES */}
      <style>{`
        .retail-showcase-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Retail Masthead */
        .retail-masthead {
          background: linear-gradient(135deg, #131921 0%, #1f2a37 100%);
          color: #ffffff;
          padding: 2.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 5px solid #ff9900;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .retail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 153, 0, 0.15);
          color: #ff9900;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.6rem;
          border: 1px solid rgba(255, 153, 0, 0.3);
        }
        .masthead-title {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .masthead-desc {
          font-size: 0.95rem;
          color: #9ca3af;
          max-width: 650px;
          line-height: 1.5;
          margin-bottom: 0.85rem;
        }
        .deliver-to-selector {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: #e5e7eb;
        }
        .zip-dropdown {
          background: transparent;
          border: none;
          color: #ff9900;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          outline: none;
        }
        .zip-dropdown option {
          background: #1f2a37;
          color: #ffffff;
        }

        /* Cart CTA */
        .masthead-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .retail-cart-cta {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: #ff9900;
          color: #111827;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          transition: all var(--transition-fast);
        }
        .retail-cart-cta:hover {
          background: #e68a00;
          transform: translateY(-2px);
        }
        .cart-cta-bubble {
          position: relative;
        }
        .cart-count-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: #b12704;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-cta-text {
          display: flex;
          flex-direction: column;
        }
        .cart-sub-txt {
          font-size: 0.7rem;
          opacity: 0.8;
          font-weight: 600;
        }

        /* Lightning Deals Banner */
        .lightning-deals-banner {
          background: linear-gradient(90deg, #b12704 0%, #7f1d1d 100%);
          color: #ffffff;
          padding: 1rem 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .lightning-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .deal-fire-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }
        .deal-callout {
          font-size: 0.88rem;
          opacity: 0.9;
        }
        .deal-countdown-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .countdown-digits {
          display: flex;
          gap: 0.25rem;
        }
        .digit-box {
          background: rgba(0, 0, 0, 0.4);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-family: monospace;
          font-weight: 800;
          font-size: 0.95rem;
        }

        /* Retail Filter Bar */
        .retail-filter-bar {
          background: #ffffff;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .retail-search-box {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.95rem;
        }
        .search-lead-icon {
          color: var(--color-text-muted);
          margin-right: 0.6rem;
        }
        .retail-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          outline: none;
        }
        .retail-filter-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .categories-pills-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: #f8fafc;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text-main);
          cursor: pointer;
        }
        .cat-pill-active {
          background: #131921;
          color: #ffffff;
          border-color: #131921;
        }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }
        .sort-dropdown {
          padding: 0.4rem 0.65rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: #ffffff;
          font-size: 0.85rem;
        }

        /* Products Grid */
        .retail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .amazon-retail-card {
          background: #ffffff;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          transition: all var(--transition-fast);
        }
        .amazon-retail-card:hover {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transform: translateY(-3px);
        }
        .card-top-badges {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .amazon-choice-badge {
          background: #232f3e;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 3px;
        }
        .prime-badge {
          background: #007185;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 3px;
        }
        .deal-discount-badge {
          background: #cc0c39;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: 3px;
        }

        /* Product Image Wrap */
        .card-image-wrap {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          margin-bottom: 1rem;
          background: #f8fafc;
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .product-image {
          max-height: 180px;
          max-width: 100%;
          object-fit: contain;
          transition: transform 300ms ease;
        }
        .card-image-wrap:hover .product-image {
          transform: scale(1.05);
        }
        .quick-view-overlay-btn {
          position: absolute;
          bottom: 0.75rem;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          opacity: 0;
          transform: translateY(10px);
          transition: all var(--transition-fast);
        }
        .card-image-wrap:hover .quick-view-overlay-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* Product Info */
        .card-info-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .cat-breadcrumb {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
          font-weight: 700;
          margin-bottom: 0.2rem;
        }
        .product-title {
          font-size: 0.95rem;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          cursor: pointer;
        }
        .product-title:hover {
          color: #007185;
        }
        .stars-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.6rem;
        }
        .stars-display {
          display: flex;
          color: #f59e0b;
        }
        .star-filled {
          fill: #f59e0b;
        }
        .rating-score {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
        }
        .review-count {
          font-size: 0.75rem;
          color: #007185;
        }
        .pricing-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.3rem;
        }
        .price-tag {
          display: inline-flex;
          color: #0f172a;
          align-items: baseline;
        }
        .currency-symbol {
          font-size: 0.85rem;
          font-weight: 700;
        }
        .price-major {
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
        }
        .price-minor {
          font-size: 0.85rem;
          font-weight: 700;
        }
        .list-price-strike {
          font-size: 0.8rem;
          color: #64748b;
          text-decoration: line-through;
        }
        .delivery-guarantee {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          margin-bottom: 0.75rem;
        }
        .prime-blue-tag {
          color: #007185;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -0.05em;
        }
        .deliv-time {
          color: #0f172a;
        }

        /* Lightning Deals Claimed Bar */
        .deal-progress-wrap {
          margin-bottom: 0.75rem;
        }
        .claimed-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        .claimed-fill {
          height: 100%;
          background: #cc0c39;
        }
        .claimed-text {
          font-size: 0.72rem;
          color: #b12704;
          font-weight: 700;
        }

        /* Coupon Clipper */
        .coupon-clip-row {
          margin-bottom: 0.85rem;
        }
        .clip-coupon-btn {
          width: 100%;
          background: #f0fdf4;
          border: 1px dashed #22c55e;
          color: #15803d;
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .coupon-clipped {
          background: #dcfce7;
          border-style: solid;
        }

        /* Action Buttons */
        .card-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: auto;
          margin-bottom: 0.75rem;
        }
        .add-to-cart-btn {
          background: #ffd814;
          border: 1px solid #fcd200;
          color: #0f172a;
          padding: 0.55rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          cursor: pointer;
        }
        .add-to-cart-btn:hover {
          background: #f7ca00;
        }
        .buy-now-btn {
          background: #ffa41c;
          border: 1px solid #ff8f00;
          color: #0f172a;
          padding: 0.55rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          cursor: pointer;
        }
        .buy-now-btn:hover {
          background: #fa8900;
        }
        .spec-check-link {
          font-size: 0.75rem;
          color: #007185;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid var(--color-border);
        }

        /* Quick View Modal */
        .modal-content-quickview {
          background: #ffffff;
          width: 100%;
          max-width: 820px;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
        }
        .quickview-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .quickview-grid {
            grid-template-columns: 1fr;
          }
        }
        .quickview-img-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .quickview-main-img {
          max-height: 280px;
          max-width: 100%;
          object-fit: contain;
        }
        .quickview-badge-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #f0fdf4;
          color: #166534;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
        }
        .quickview-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .quickview-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cat-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
          font-weight: 700;
        }
        .close-qv-btn {
          border: none;
          background: #f1f5f9;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }
        .qv-title {
          font-size: 1.4rem;
          color: var(--color-navy-dark);
        }
        .qv-rating {
          font-size: 0.85rem;
          color: var(--color-navy-dark);
        }
        .qv-reviews {
          font-size: 0.8rem;
          color: #007185;
        }
        .qv-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }
        .qv-price {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
        }
        .qv-prime-tag {
          background: #007185;
          color: #ffffff;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .qv-description {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .qv-specs-table {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }
        .spec-label {
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .spec-val {
          font-weight: 600;
          color: var(--color-navy-dark);
        }
        .qv-actions {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 0.5rem;
        }
        .btn-large {
          padding: 0.85rem;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
