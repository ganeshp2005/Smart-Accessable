import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';
import { useOne } from '../context/OneContext';

export default function OneCart() {
  const { cart, removeFromCart, addToCart, clearCart, showToast } = useOne();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const handleCheckout = () => {
    alert(`Order Placed Successfully via Amazon One Demo Checkout!\n\nOrder Total: $${total.toLocaleString()}\nItems: ${cart.length}\nEstimated Delivery: 2 Days with Prime.`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-root">
        <div className="empty-cart-card card-base">
          <ShoppingCart size={48} className="text-amber-500 empty-icon" />
          <h2 className="empty-title">Your Demo Shopping Cart is Empty</h2>
          <p className="empty-sub">Explore products across Amazon Shopping, Fresh, and Renewed to test the checkout flow.</p>
          <Link to="/shopping" className="btn-primary" style={{ marginTop: '1rem' }}>
            <span>Explore Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-root">
      <div className="cart-header-row">
        <div>
          <h1 className="cart-title">Your Demo Shopping Cart</h1>
          <p className="cart-subtitle">Review items before placing a simulated order with Prime delivery.</p>
        </div>
        <button 
          type="button" 
          onClick={clearCart} 
          className="clear-cart-link"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Cart Items List */}
        <div className="cart-items-col">
          {cart.map(item => (
            <div key={item.id} className="cart-item-card card-base">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <span className="cart-cat">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <span className="cart-item-price">${item.price} each</span>

                <div className="cart-actions-bar">
                  <span className="qty-label">Qty: <strong>{item.qty || 1}</strong></span>
                  <button 
                    type="button" 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-btn"
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Checkout Card */}
        <div className="cart-summary-col">
          <div className="summary-card card-base">
            <h3 className="summary-heading">Order Summary</h3>
            <div className="summary-line">
              <span>Items Subtotal:</span>
              <strong>${subtotal.toLocaleString()}</strong>
            </div>
            <div className="summary-line">
              <span>Prime Shipping:</span>
              <strong className="text-success">FREE</strong>
            </div>
            <div className="summary-line">
              <span>Estimated Tax (8%):</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total-line">
              <span>Order Total:</span>
              <span className="total-val">${total.toLocaleString()}</span>
            </div>

            <button 
              type="button" 
              onClick={handleCheckout} 
              className="btn-primary checkout-btn"
            >
              <span>Place Demo Order with Amazon Pay</span>
              <ArrowRight size={16} />
            </button>

            <div className="perks-list">
              <div className="perk-tag">
                <Truck size={14} className="text-amber-500" />
                <span>Free 2-day Prime delivery</span>
              </div>
              <div className="perk-tag">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>Amazon A-to-z buyer protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cart-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cart-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cart-title {
          font-size: 1.9rem;
          color: var(--color-navy-dark);
        }
        .cart-subtitle {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .clear-cart-link {
          background: none;
          border: none;
          color: var(--color-danger);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .cart-layout-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.75rem;
        }
        .cart-items-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-item-card {
          padding: 1.25rem;
          background: #ffffff;
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .cart-item-img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: var(--radius-md);
          background: #f8fafc;
        }
        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-cat {
          font-size: 0.72rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--color-amber-hover);
        }
        .cart-item-name {
          font-size: 1.05rem;
          color: var(--color-navy-dark);
          margin: 0.2rem 0;
        }
        .cart-item-price {
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.65rem;
        }
        .cart-actions-bar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .qty-label {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .remove-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          color: #dc2626;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .summary-card {
          padding: 1.75rem;
          background: #ffffff;
        }
        .summary-heading {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin-bottom: 1.25rem;
        }
        .summary-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.65rem;
          color: #334155;
        }
        .summary-divider {
          height: 1px;
          background: var(--color-border);
          margin: 1rem 0;
        }
        .summary-total-line {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-navy-dark);
          margin-bottom: 1.5rem;
        }
        .checkout-btn {
          width: 100%;
          padding: 0.85rem;
          font-size: 0.95rem;
        }
        .perks-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }
        .perk-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .empty-cart-card {
          padding: 4rem 2rem;
          text-align: center;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .empty-icon {
          margin-bottom: 1rem;
        }
        .empty-title {
          font-size: 1.5rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.4rem;
        }
        .empty-sub {
          color: var(--color-text-muted);
          font-size: 0.92rem;
          max-width: 440px;
        }
        @media (max-width: 800px) {
          .cart-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
