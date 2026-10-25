import React from 'react';
import { Settings, Sparkles, Check, CheckSquare } from 'lucide-react';
import { useOne } from '../context/OneContext';

const ALL_INTEREST_OPTIONS = [
  { id: "Shopping", label: "Shopping & Retail (Fresh, Renewed)", desc: "Product deals, same-day groceries, wholesale discounts" },
  { id: "Entertainment", label: "Entertainment & Media (Video, Music)", desc: "Prime Video 4K series, Ultra HD music, podcasts" },
  { id: "Cloud", label: "Cloud & AI (AWS, Bedrock, EC2)", desc: "Serverless compute, foundation models, developer tools" },
  { id: "Devices", label: "Smart Home & Voice (Echo, Alexa, Fire TV)", desc: "Home automation, connected screens, ambient lighting" },
  { id: "Reading", label: "Reading & Authors (Kindle, Goodreads)", desc: "E-books, Whispersync audio, book challenges" },
  { id: "Payments", label: "Payments & Wallet (Amazon Pay)", desc: "1-Click merchant checkout, digital statements" },
  { id: "Business", label: "Business & Creators (Seller, KDP, Twitch)", desc: "E-commerce selling, self-publishing, live streaming" }
];

export default function OneSettings() {
  const { userInterests, setUserInterests, showToast } = useOne();

  const toggleInterest = (id) => {
    setUserInterests(prev => {
      const exists = prev.includes(id);
      let updated;
      if (exists) {
        if (prev.length === 1) {
          showToast("Keep at least one interest selected for recommendations.", "warning");
          return prev;
        }
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      showToast("Updated dashboard personalization preferences", "success");
      return updated;
    });
  };

  return (
    <div className="settings-root">
      <div className="settings-header card-base">
        <div className="settings-title-wrap">
          <Settings size={22} className="text-amber-500" />
          <div>
            <h1 className="settings-title">Personalization & Interests</h1>
            <p className="settings-desc">
              Choose the ecosystem pillars you care most about. Amazon One will prioritize recommendations and cards on your main dashboard accordingly.
            </p>
          </div>
        </div>
      </div>

      <div className="interests-card card-base">
        <h2 className="interests-heading">Select Your Core Interests</h2>
        <div className="interests-list">
          {ALL_INTEREST_OPTIONS.map(opt => {
            const isSelected = userInterests.includes(opt.id);
            return (
              <div 
                key={opt.id} 
                onClick={() => toggleInterest(opt.id)}
                className={`interest-item ${isSelected ? 'interest-selected' : ''}`}
              >
                <div className={`checkbox-box ${isSelected ? 'box-checked' : ''}`}>
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
                <div className="interest-meta">
                  <strong className="interest-label">{opt.label}</strong>
                  <p className="interest-desc">{opt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .settings-root {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .settings-header {
          padding: 2.25rem;
          background: #ffffff;
          border-left: 5px solid var(--color-amber);
        }
        .settings-title-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .settings-title {
          font-size: 1.9rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.25rem;
        }
        .settings-desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          max-width: 650px;
        }
        .interests-card {
          padding: 2rem;
          background: #ffffff;
        }
        .interests-heading {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin-bottom: 1.25rem;
        }
        .interests-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .interest-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .interest-item:hover {
          background: var(--color-surface-subtle);
        }
        .interest-selected {
          border-color: var(--color-amber);
          background: #fffbeb;
        }
        .checkbox-box {
          width: 22px;
          height: 22px;
          border-radius: var(--radius-sm);
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .box-checked {
          background: var(--color-amber);
          border-color: var(--color-amber);
        }
        .interest-meta {
          display: flex;
          flex-direction: column;
        }
        .interest-label {
          font-size: 0.95rem;
          color: var(--color-navy-dark);
        }
        .interest-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
