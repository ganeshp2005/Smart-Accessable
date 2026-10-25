import React, { useState } from 'react';
import { Sparkles, DollarSign, Cpu, CheckSquare, Briefcase, AlertCircle } from 'lucide-react';

export default function RequirementForm({ product, onAnalyze, isAnalyzing }) {
  const [formData, setFormData] = useState({
    maxBudget: product.price ? String(product.price + 100) : '',
    minRam: product.specifications?.ram ? String(product.specifications.ram) : '16',
    minStorage: product.specifications?.storage ? String(product.specifications.storage) : '512',
    minBattery: product.specifications?.batteryLifeHours ? String(product.specifications.batteryLifeHours) : '8',
    intendedUse: 'Machine Learning, Coding & Heavy Multitasking',
    mustHaveFeatures: 'Dedicated GPU, Minimum 16GB RAM, Long Battery Life'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.maxBudget || Number(formData.maxBudget) <= 0) {
      newErrors.maxBudget = "Please enter a valid maximum budget amount greater than $0.";
    }

    if (product.category === 'Laptops' || product.category === 'Smartphones') {
      if (!formData.minRam || Number(formData.minRam) <= 0) {
        newErrors.minRam = "Please specify a minimum RAM threshold.";
      }
    }

    if (!formData.intendedUse.trim()) {
      newErrors.intendedUse = "Please describe what you plan to use this device for.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAnalyze(formData);
    }
  };

  const handleFillPreset = (presetType) => {
    if (presetType === 'ml-dev') {
      setFormData({
        maxBudget: '2000',
        minRam: '32',
        minStorage: '1024',
        minBattery: '6',
        intendedUse: 'Machine Learning, PyTorch, Docker & Local LLM inference',
        mustHaveFeatures: 'NVIDIA RTX GPU with CUDA, 32GB RAM, Fast NVMe SSD'
      });
    } else if (presetType === 'budget-student') {
      setFormData({
        maxBudget: '650',
        minRam: '8',
        minStorage: '256',
        minBattery: '10',
        intendedUse: 'College notes, Web browsing, Zoom calls & Netflix',
        mustHaveFeatures: 'Lightweight chassis, All-day battery life, Webcam'
      });
    } else if (presetType === 'travel-audio') {
      setFormData({
        maxBudget: '350',
        minRam: '0',
        minStorage: '0',
        minBattery: '20',
        intendedUse: 'Frequent international flights, noisy cafe work & office calls',
        mustHaveFeatures: 'Active Noise Cancellation (ANC), Multipoint Bluetooth, Over-ear comfort'
      });
    }
    setErrors({});
  };

  return (
    <div className="requirement-form-card card-base">
      <div className="form-header">
        <div className="form-header-title-wrap">
          <Sparkles className="text-amber-500" size={24} />
          <div>
            <h3 className="form-title">Enter Your Shopping Requirements</h3>
            <p className="form-subtitle">
              Amazon Alexa+ evaluates if this item will actually fit your lifestyle before you purchase.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="presets-row">
          <span className="presets-label">Quick Test Scenarios:</span>
          <button 
            type="button" 
            onClick={() => handleFillPreset('ml-dev')} 
            className="preset-btn"
          >
            ML / AI Dev
          </button>
          <button 
            type="button" 
            onClick={() => handleFillPreset('budget-student')} 
            className="preset-btn"
          >
            Budget Student
          </button>
          <button 
            type="button" 
            onClick={() => handleFillPreset('travel-audio')} 
            className="preset-btn"
          >
            Travel & ANC
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="requirements-form">
        <div className="form-grid">
          {/* Max Budget */}
          <div className="form-field">
            <label htmlFor="maxBudget" className="field-label">
              <DollarSign size={16} /> Maximum Budget ($ USD) *
            </label>
            <input
              type="number"
              id="maxBudget"
              name="maxBudget"
              value={formData.maxBudget}
              onChange={handleChange}
              placeholder="e.g. 1200"
              className={`form-input ${errors.maxBudget ? 'input-error' : ''}`}
            />
            {errors.maxBudget && <p className="error-msg"><AlertCircle size={14} /> {errors.maxBudget}</p>}
          </div>

          {/* Min RAM */}
          {(product.category === 'Laptops' || product.category === 'Smartphones') && (
            <div className="form-field">
              <label htmlFor="minRam" className="field-label">
                <Cpu size={16} /> Minimum RAM (GB) *
              </label>
              <input
                type="number"
                id="minRam"
                name="minRam"
                value={formData.minRam}
                onChange={handleChange}
                placeholder="e.g. 16"
                className={`form-input ${errors.minRam ? 'input-error' : ''}`}
              />
              {errors.minRam && <p className="error-msg"><AlertCircle size={14} /> {errors.minRam}</p>}
            </div>
          )}

          {/* Min Storage */}
          <div className="form-field">
            <label htmlFor="minStorage" className="field-label">
              Minimum Storage (GB)
            </label>
            <input
              type="number"
              id="minStorage"
              name="minStorage"
              value={formData.minStorage}
              onChange={handleChange}
              placeholder="e.g. 512"
              className="form-input"
            />
          </div>

          {/* Min Battery Hours */}
          <div className="form-field">
            <label htmlFor="minBattery" className="field-label">
              Min Battery Life (Hours)
            </label>
            <input
              type="number"
              id="minBattery"
              name="minBattery"
              value={formData.minBattery}
              onChange={handleChange}
              placeholder="e.g. 8"
              className="form-input"
            />
          </div>
        </div>

        {/* Intended Use */}
        <div className="form-field full-width">
          <label htmlFor="intendedUse" className="field-label">
            <Briefcase size={16} /> Intended Use & Workload *
          </label>
          <input
            type="text"
            id="intendedUse"
            name="intendedUse"
            value={formData.intendedUse}
            onChange={handleChange}
            placeholder="e.g. Machine learning local training, 4K Premiere video editing, AAA gaming..."
            className={`form-input ${errors.intendedUse ? 'input-error' : ''}`}
          />
          {errors.intendedUse && <p className="error-msg"><AlertCircle size={14} /> {errors.intendedUse}</p>}
        </div>

        {/* Must Have Features */}
        <div className="form-field full-width">
          <label htmlFor="mustHaveFeatures" className="field-label">
            <CheckSquare size={16} /> Must-Have Features & Keywords
          </label>
          <textarea
            id="mustHaveFeatures"
            name="mustHaveFeatures"
            rows="2"
            value={formData.mustHaveFeatures}
            onChange={handleChange}
            placeholder="e.g. Dedicated NVIDIA GPU, Active Noise Cancellation (ANC), IP68 water resistance..."
            className="form-input form-textarea"
          />
        </div>

        {/* Submit Button */}
        <div className="form-submit-row">
          <button 
            type="submit" 
            disabled={isAnalyzing}
            className="btn-primary analyze-submit-btn"
          >
            <Sparkles size={18} />
            <span>{isAnalyzing ? "Evaluating Hardware Fit..." : "Analyze Compatibility"}</span>
          </button>
          <span className="submit-hint">
            Calculates match score, purchase risks, and pulls better alternatives if mismatches are found.
          </span>
        </div>
      </form>

      <style>{`
        .requirement-form-card {
          padding: 1.75rem;
          margin-top: 2rem;
          background: #ffffff;
          border-left: 5px solid var(--color-amber);
        }
        .form-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-border);
        }
        .form-header-title-wrap {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .form-title {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.25rem;
        }
        .form-subtitle {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .presets-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .presets-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .preset-btn {
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          color: var(--color-navy-dark);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .preset-btn:hover {
          background: var(--color-amber-light);
          border-color: var(--color-amber);
          color: #92400e;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-field.full-width {
          margin-bottom: 1.25rem;
        }
        .field-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-main);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .form-input {
          padding: 0.7rem 0.85rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .form-input:focus {
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .form-textarea {
          resize: vertical;
          min-height: 60px;
        }
        .input-error {
          border-color: var(--color-danger) !important;
          background-color: #fffbfa;
        }
        .error-msg {
          font-size: 0.78rem;
          color: var(--color-danger);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .form-submit-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }
        .analyze-submit-btn {
          font-size: 1rem;
          padding: 0.85rem 1.75rem;
        }
        .submit-hint {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          max-width: 480px;
        }
      `}</style>
    </div>
  );
}
