import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = "Analyzing product compatibility..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner-card card-base">
        <Loader2 className="spinner-icon" size={42} />
        <h4 className="spinner-title">{message}</h4>
        <p className="spinner-subtitle">
          Comparing hardware specs against your stated workloads & budget tolerance...
        </p>
      </div>

      <style>{`
        .spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 420px;
          width: 100%;
          padding: 2rem;
        }
        .spinner-card {
          padding: 3rem 2rem;
          text-align: center;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .spinner-icon {
          color: var(--color-amber);
          animation: spin 1s linear infinite;
          margin-bottom: 1.25rem;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinner-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.5rem;
        }
        .spinner-subtitle {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
