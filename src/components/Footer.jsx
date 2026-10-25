import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, HelpCircle, Code2, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-content">
        {/* Brand & Mission column */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <ShieldCheck size={20} className="text-amber-500" />
            </div>
            <span className="footer-brand-title">Amazon Alexa<span className="text-amber-500">+</span></span>
          </div>
          <p className="footer-desc">
            Empowering e-commerce shoppers with intelligent spec-to-need compatibility analysis. 
            Mitigating return waste, carbon footprint, and buyer regret before the order is placed.
          </p>
          <div className="hackathon-tag">
            <Sparkles size={14} className="text-amber-400" />
            <span>Built for Amazon Hackathon 2026</span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home & Catalog</Link></li>
            <li><a href="#featured-products">Browse Products</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><Link to="/assistant">Interactive AI Assistant</Link></li>
          </ul>
        </div>

        {/* Return Reduction Metrics */}
        <div className="footer-col">
          <h4 className="footer-heading">E-Commerce Impact</h4>
          <ul className="footer-impact-stats">
            <li>
              <strong>~30%</strong> of online electronics are returned due to spec mismatch
            </li>
            <li>
              <strong>$50B+</strong> annual merchant reverse-logistics cost
            </li>
            <li>
              <strong>Amazon Alexa+</strong> catches hardware incompatibility at point of intent
            </li>
          </ul>
        </div>

        {/* Disclaimer column */}
        <div className="footer-col">
          <h4 className="footer-heading">Demo Disclaimer</h4>
          <div className="disclaimer-box">
            <AlertTriangle size={16} className="text-amber-400 disclaimer-icon" />
            <p>
              This is an original prototype for hackathon presentation purposes. 
              Sample products, prices, and specifications are simulated demo data.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Amazon Alexa+. All rights reserved.</p>
          <p className="footer-credit">
            Engineered with React + Vite • Optimized for Sustainable E-Commerce
          </p>
        </div>
      </div>

      <style>{`
        .footer-root {
          background-color: var(--color-navy-dark);
          color: #94a3b8;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: auto;
        }
        .footer-content {
          max-width: 1240px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 2.5rem 1.5rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          gap: 2.5rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.85rem;
        }
        .footer-logo-icon {
          background-color: rgba(245, 158, 11, 0.15);
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
        }
        .footer-brand-title {
          font-family: var(--font-heading);
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 700;
        }
        .footer-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: #94a3b8;
        }
        .hackathon-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          color: #e2e8f0;
          font-weight: 600;
        }
        .footer-heading {
          color: #ffffff;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.88rem;
        }
        .footer-links-list a {
          color: #94a3b8;
          transition: color var(--transition-fast);
        }
        .footer-links-list a:hover {
          color: var(--color-amber);
        }
        .footer-impact-stats {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        .footer-impact-stats strong {
          color: var(--color-amber);
        }
        .disclaimer-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          font-size: 0.8rem;
          line-height: 1.5;
          display: flex;
          gap: 0.6rem;
        }
        .disclaimer-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.25rem 1.5rem;
          font-size: 0.82rem;
        }
        .footer-bottom-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        @media (max-width: 992px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
