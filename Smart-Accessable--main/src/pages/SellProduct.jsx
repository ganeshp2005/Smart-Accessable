import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Upload, 
  DollarSign, 
  Cpu, 
  HardDrive, 
  Battery, 
  Sparkles, 
  ShieldCheck, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function SellProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    price: '',
    image: '',
    description: '',
    condition: 'Brand New',
    // Specifications
    ram: '16',
    ramType: 'DDR5',
    storage: '512',
    storageType: 'NVMe SSD',
    processor: '',
    gpu: '',
    batteryLifeHours: '8',
    waterResistance: 'None',
    anc: 'None',
    ports: 'USB-C, USB-A, HDMI'
  });

  const [errors, setErrors] = useState({});
  const [successNotice, setSuccessNotice] = useState(false);

  const sampleImagesByCategory = {
    Laptops: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    Smartphones: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    Headphones: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product title is required.";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid positive price.";
    if (!formData.description.trim()) newErrors.description = "Please describe the product.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePickDefaultImage = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Pick fallback image if none provided
    const chosenImage = formData.image.trim() || 
      sampleImagesByCategory[formData.category]?.[0] || 
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80";

    const newProduct = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      image: chosenImage,
      badge: "Verified Seller",
      description: `${formData.condition}: ${formData.description.trim()}`,
      specifications: {
        ram: formData.ram ? Number(formData.ram) : undefined,
        ramType: formData.ramType || undefined,
        storage: formData.storage ? Number(formData.storage) : undefined,
        storageType: formData.storageType || undefined,
        processor: formData.processor || undefined,
        gpu: formData.gpu || undefined,
        batteryLifeHours: formData.batteryLifeHours ? Number(formData.batteryLifeHours) : undefined,
        waterResistance: formData.waterResistance || undefined,
        anc: formData.anc || undefined,
        ports: formData.ports ? formData.ports.split(',').map(s => s.trim()) : undefined
      },
      pros: ["Priced competitively by direct community seller", "Full specifications declared for AI compatibility checks"],
      cons: ["Seller listed item (check return terms)"]
    };

    const created = addProduct(newProduct);
    setSuccessNotice(true);

    setTimeout(() => {
      navigate(`/products/${created.id}`);
    }, 1200);
  };

  return (
    <div className="page-wrapper">
      <div className="sell-page-container">
        {/* Header */}
        <div className="sell-header-card card-base">
          <div className="sell-header-badge">
            <Sparkles size={14} className="text-amber-500" />
            <span>Community Marketplace & Buy/Sell Hub</span>
          </div>
          <h1 className="sell-main-title">List Your Product for Sale on Amazon Alexa+</h1>
          <p className="sell-desc">
            Declare your hardware specifications with full transparency. Our AI Compatibility Engine matches your product to buyers whose exact workloads align, drastically reducing post-sale return disputes!
          </p>
        </div>

        {successNotice && (
          <div className="success-banner card-base">
            <CheckCircle2 size={24} className="text-success" />
            <div>
              <strong>Product Listed Successfully!</strong>
              <p>Redirecting you to your product's live compatibility page...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="sell-form card-base">
          {/* Section 1: Basic Information */}
          <div className="form-section">
            <h3 className="section-title">1. Basic Product Details</h3>
            <div className="form-grid">
              {/* Product Title */}
              <div className="form-field full-width">
                <label className="field-label">Product Name / Model *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dell XPS 15 9530 (i7-13700H / 32GB RAM / RTX 4060)"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <p className="error-msg"><AlertCircle size={14} /> {errors.name}</p>}
              </div>

              {/* Category */}
              <div className="form-field">
                <label className="field-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Headphones">Headphones</option>
                </select>
              </div>

              {/* Price */}
              <div className="form-field">
                <label className="field-label">Selling Price ($ USD) *</label>
                <div className="input-prefix-wrap">
                  <DollarSign size={16} className="input-prefix-icon" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="950"
                    className={`form-input with-prefix ${errors.price ? 'input-error' : ''}`}
                  />
                </div>
                {errors.price && <p className="error-msg"><AlertCircle size={14} /> {errors.price}</p>}
              </div>

              {/* Condition */}
              <div className="form-field">
                <label className="field-label">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="Brand New (Sealed)">Brand New (Sealed)</option>
                  <option value="Refurbished - Like New">Refurbished - Like New</option>
                  <option value="Gently Used - Excellent">Gently Used - Excellent</option>
                  <option value="Used - Good Condition">Used - Good Condition</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="form-field full-width">
                <label className="field-label">Product Image URL (or choose below)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="form-input"
                />
                <div className="sample-images-row">
                  <span className="sample-images-label">Quick select demo photo:</span>
                  {(sampleImagesByCategory[formData.category] || []).map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt="Sample"
                      onClick={() => handlePickDefaultImage(imgUrl)}
                      className={`sample-thumb ${formData.image === imgUrl ? 'sample-thumb-selected' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="form-field full-width">
                <label className="field-label">Product Description *</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="State the history of the item, reason for sale, warranty status, and any accessories included..."
                  className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
                />
                {errors.description && <p className="error-msg"><AlertCircle size={14} /> {errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="form-section">
            <h3 className="section-title">2. Technical Specifications (For AI Compatibility)</h3>
            <p className="section-subtitle">
              The more accurate your specs, the higher confidence buyers will have in avoiding returns.
            </p>

            <div className="form-grid">
              {/* RAM */}
              <div className="form-field">
                <label className="field-label">
                  <Cpu size={15} /> RAM Capacity (GB)
                </label>
                <input
                  type="number"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  placeholder="16"
                  className="form-input"
                />
              </div>

              {/* Storage */}
              <div className="form-field">
                <label className="field-label">
                  <HardDrive size={15} /> Storage (GB)
                </label>
                <input
                  type="number"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  placeholder="512"
                  className="form-input"
                />
              </div>

              {/* Battery */}
              <div className="form-field">
                <label className="field-label">
                  <Battery size={15} /> Battery Life (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  name="batteryLifeHours"
                  value={formData.batteryLifeHours}
                  onChange={handleChange}
                  placeholder="8.5"
                  className="form-input"
                />
              </div>

              {/* Processor / Chip */}
              <div className="form-field">
                <label className="field-label">Processor / CPU</label>
                <input
                  type="text"
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  placeholder="e.g. Intel Core i7 / AMD Ryzen 7 / Snapdragon 8"
                  className="form-input"
                />
              </div>

              {/* GPU / Graphics */}
              <div className="form-field">
                <label className="field-label">Graphics / GPU</label>
                <input
                  type="text"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleChange}
                  placeholder="e.g. NVIDIA RTX 4060 8GB / Integrated Iris Xe"
                  className="form-input"
                />
              </div>

              {/* Water resistance / Ingress */}
              <div className="form-field">
                <label className="field-label">Water Resistance / IP Rating</label>
                <input
                  type="text"
                  name="waterResistance"
                  value={formData.waterResistance}
                  onChange={handleChange}
                  placeholder="e.g. IP68 / IPX4 / None"
                  className="form-input"
                />
              </div>

              {/* Noise Cancellation */}
              <div className="form-field">
                <label className="field-label">Noise Cancellation (ANC)</label>
                <input
                  type="text"
                  name="anc"
                  value={formData.anc}
                  onChange={handleChange}
                  placeholder="e.g. Hybrid ANC / Passive / None"
                  className="form-input"
                />
              </div>

              {/* Ports */}
              <div className="form-field full-width">
                <label className="field-label">Included Ports / Connectivity</label>
                <input
                  type="text"
                  name="ports"
                  value={formData.ports}
                  onChange={handleChange}
                  placeholder="e.g. Thunderbolt 4, HDMI 2.1, USB-A, 3.5mm Headphone Jack"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions-row">
            <button type="submit" className="btn-primary sell-submit-btn">
              <PlusCircle size={18} />
              <span>List Product for Sale</span>
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .sell-page-container {
          max-width: 860px;
          margin: 0 auto;
        }
        .sell-header-card {
          padding: 2.25rem;
          margin-bottom: 2rem;
          background: #ffffff;
          border-left: 5px solid var(--color-amber);
        }
        .sell-header-badge {
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
        .sell-main-title {
          font-size: 2rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.6rem;
        }
        .sell-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .success-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f0fdf4;
          border-color: #86efac;
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
        }
        .success-banner strong {
          color: #166534;
          font-size: 1rem;
          display: block;
        }
        .success-banner p {
          color: #15803d;
          font-size: 0.85rem;
          margin: 0;
        }
        .sell-form {
          padding: 2.25rem;
          background: #ffffff;
        }
        .form-section {
          margin-bottom: 2.25rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
        }
        .section-title {
          font-size: 1.2rem;
          color: var(--color-navy-dark);
          margin-bottom: 0.25rem;
        }
        .section-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-field.full-width {
          grid-column: 1 / -1;
        }
        .field-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-navy-dark);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .form-input {
          padding: 0.75rem 0.95rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          outline: none;
          transition: all var(--transition-fast);
        }
        .form-input:focus {
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .form-select {
          background-color: #ffffff;
          cursor: pointer;
        }
        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .input-prefix-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-prefix-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .form-input.with-prefix {
          padding-left: 2.2rem;
          width: 100%;
        }
        .sample-images-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .sample-images-label {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .sample-thumb {
          width: 50px;
          height: 40px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color var(--transition-fast);
        }
        .sample-thumb:hover {
          border-color: var(--color-amber);
        }
        .sample-thumb-selected {
          border-color: var(--color-amber);
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.4);
        }
        .input-error {
          border-color: var(--color-danger) !important;
          background: #fffbfa;
        }
        .error-msg {
          font-size: 0.78rem;
          color: var(--color-danger);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .form-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sell-submit-btn {
          font-size: 1rem;
          padding: 0.85rem 1.75rem;
        }
      `}</style>
    </div>
  );
}
