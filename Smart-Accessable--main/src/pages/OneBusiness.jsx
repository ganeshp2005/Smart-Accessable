import React, { useState } from 'react';
import { 
  Briefcase, 
  Store, 
  PenTool, 
  Video, 
  Sparkles, 
  ExternalLink, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  BarChart3, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Printer, 
  Settings, 
  MessageSquare, 
  Vote, 
  ShieldAlert, 
  Eye, 
  Send
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useOne } from '../context/OneContext';

const MOCK_SALES_DATA = [
  { month: 'May', sales: 12400, orders: 310 },
  { month: 'Jun', sales: 18900, orders: 460 },
  { month: 'Jul', sales: 24500, orders: 590 },
  { month: 'Aug', sales: 22100, orders: 540 },
  { month: 'Sep', sales: 29800, orders: 720 },
  { month: 'Oct', sales: 34200, orders: 842 }
];

const INITIAL_INVENTORY = [
  { id: "inv-1", sku: "AMZ-ANC-01", name: "Active Noise-Cancelling Headphones Pro", stock: 142, price: 149.99, status: "In Stock (FBA)", sales7d: 48 },
  { id: "inv-2", sku: "AMZ-HUB-04", name: "7-in-1 USB-C Multiport Docking Hub", stock: 18, price: 59.99, status: "Low Stock Alert", sales7d: 34 },
  { id: "inv-3", sku: "AMZ-CHG-10", name: "Magnetic Fast Wireless Charging Pad", stock: 320, price: 29.99, status: "In Stock (FBA)", sales7d: 112 },
  { id: "inv-4", sku: "AMZ-KEY-08", name: "Ergonomic Mechanical Wireless Keyboard", stock: 4, price: 119.00, status: "Reorder Required", sales7d: 28 }
];

const KDP_BOOKS = [
  { id: "kdp-1", title: "Building Autonomous Agentic Systems", format: "Kindle & Paperback", kenp: "34,200 pages", sales: "1,240 units", royalties: "$3,420.00", rating: 4.9 },
  { id: "kdp-2", title: "Mastering Cloud Architecture on AWS", format: "Paperback & Hardcover", kenp: "18,400 pages", sales: "890 units", royalties: "$2,670.00", rating: 4.8 },
  { id: "kdp-3", title: "The Pragmatic Guide to Prompt Engineering", format: "Kindle E-Book", kenp: "12,100 pages", sales: "640 units", royalties: "$1,280.00", rating: 4.7 }
];

const INITIAL_TWITCH_CHAT = [
  { id: "c1", user: "GamerDude99", badge: "VIP", message: "That clutch in round 4 was insane! 🔥", time: "12:04" },
  { id: "c2", user: "PixelQueen", badge: "Sub 6mo", message: "Prime sub renewed! Let's goooo!", time: "12:05" },
  { id: "c3", user: "CloudCoder", badge: "Mod", message: "Reminder: Stream schedule is Mon/Wed/Fri at 7 PM EST", time: "12:05" }
];

export default function OneBusiness() {
  const { showToast } = useOne();
  const [activeTab, setActiveTab] = useState('seller'); // 'seller', 'kdp', 'twitch'
  
  // Seller Central State
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [salesTimeframe, setSalesTimeframe] = useState('6M');

  // KDP Calculator State
  const [calcPrice, setCalcPrice] = useState(9.99);
  const [calcPages, setCalcPages] = useState(250);
  const [calcRoyaltyRate, setCalcRoyaltyRate] = useState(0.70); // 70%

  // Twitch Stream State
  const [isLive, setIsLive] = useState(true);
  const [twitchChat, setTwitchChat] = useState(INITIAL_TWITCH_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [activePoll, setActivePoll] = useState({ question: "Which boss should we fight next?", optA: "Dragon of Calamity", votesA: 142, optB: "Abyssal Watcher", votesB: 98 });

  // Calculation for KDP
  const printCost = Math.max(0.85, 0.85 + (calcPages * 0.012));
  const estimatedRoyaltyPerCopy = (calcPrice * calcRoyaltyRate) - (calcRoyaltyRate === 0.70 ? printCost * 0.15 : 0);

  const handleRestock = (sku) => {
    setInventory(prev => prev.map(item => {
      if (item.sku === sku) {
        showToast(`Created FBA inbound shipment for 100 units of ${sku}`, 'success');
        return { ...item, stock: item.stock + 100, status: "In Stock (FBA)" };
      }
      return item;
    }));
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `chat-${Date.now()}`,
      user: "Ganesh (Broadcaster)",
      badge: "Broadcaster",
      message: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTwitchChat(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleVote = (option) => {
    setActivePoll(prev => {
      if (option === 'A') {
        showToast("Voted for " + prev.optA, "info");
        return { ...prev, votesA: prev.votesA + 1 };
      } else {
        showToast("Voted for " + prev.optB, "info");
        return { ...prev, votesB: prev.votesB + 1 };
      }
    });
  };

  return (
    <div className="business-suite-root">
      {/* Executive Creator Banner */}
      <div className="business-banner card-base">
        <div className="banner-left">
          <div className="banner-badge">
            <Briefcase size={14} className="text-amber-500" />
            <span>Amazon Merchant, Author & Streamer Creator Suite</span>
          </div>
          <h1 className="banner-title">Seller Central, KDP & Twitch Broadcast Control</h1>
          <p className="banner-desc">
            Manage global FBA inventory, monitor Amazon merchant sales velocity, self-publish worldwide on Kindle, and broadcast live to millions of Twitch viewers.
          </p>
        </div>

        {/* 3 Main Portals Tab Switcher */}
        <div className="suite-tabs-bar">
          <button 
            type="button" 
            onClick={() => setActiveTab('seller')}
            className={`suite-tab-btn ${activeTab === 'seller' ? 'tab-seller-active' : ''}`}
          >
            <Store size={16} /> Seller Central (FBA)
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('kdp')}
            className={`suite-tab-btn ${activeTab === 'kdp' ? 'tab-kdp-active' : ''}`}
          >
            <PenTool size={16} /> Kindle Publishing (KDP)
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('twitch')}
            className={`suite-tab-btn ${activeTab === 'twitch' ? 'tab-twitch-active' : ''}`}
          >
            <Video size={16} /> Twitch Studio
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: SELLER CENTRAL (FBA INVENTORY & SALES VELOCITY)         */}
      {/* ============================================================== */}
      {activeTab === 'seller' && (
        <div className="seller-portal-layout">
          {/* KPI Stat Cards */}
          <div className="kpi-grid">
            <div className="kpi-box card-base">
              <div className="kpi-icon-wrap bg-amber">
                <DollarSign size={22} />
              </div>
              <div className="kpi-meta">
                <span className="kpi-label">October Gross Sales</span>
                <strong className="kpi-val">$34,200.00</strong>
                <span className="kpi-trend text-success">+14.7% vs last month</span>
              </div>
            </div>

            <div className="kpi-box card-base">
              <div className="kpi-icon-wrap bg-blue">
                <Package size={22} />
              </div>
              <div className="kpi-meta">
                <span className="kpi-label">FBA Orders Dispatched</span>
                <strong className="kpi-val">842 Units</strong>
                <span className="kpi-trend">100% Prime On-Time Delivery</span>
              </div>
            </div>

            <div className="kpi-box card-base">
              <div className="kpi-icon-wrap bg-emerald">
                <TrendingUp size={22} />
              </div>
              <div className="kpi-meta">
                <span className="kpi-label">Buy Box Win Rate</span>
                <strong className="kpi-val">98.4%</strong>
                <span className="kpi-trend text-success">+2.1% across catalog</span>
              </div>
            </div>
          </div>

          {/* Sales Revenue Chart */}
          <div className="chart-panel card-base">
            <div className="chart-head">
              <div>
                <h3 className="card-heading">Seller Central Sales Velocity (Gross Revenue)</h3>
                <p className="card-sub">Monthly gross merchandise value across North America and Europe</p>
              </div>
              <span className="badge-pass">Verified FBA Merchant</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={MOCK_SALES_DATA}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Gross Sales']} />
                  <Bar dataKey="sales" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live FBA Inventory Management Table */}
          <div className="inventory-card card-base">
            <div className="inventory-header">
              <div>
                <h3 className="card-heading">Fulfillment by Amazon (FBA) Stock Manager</h3>
                <p className="card-sub">Real-time inventory levels across Amazon regional fulfillment centers</p>
              </div>
              <button 
                type="button" 
                onClick={() => showToast("Inbound FBA shipping manifest generated", "success")}
                className="btn-primary" 
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              >
                <Plus size={15} /> Send to Amazon FBA
              </button>
            </div>

            <div className="inventory-table-wrap">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Product & SKU</th>
                    <th>Price</th>
                    <th>FBA Stock</th>
                    <th>7-Day Sales</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                        <span className="sku-tag">SKU: {item.sku}</span>
                      </td>
                      <td><strong>${item.price.toFixed(2)}</strong></td>
                      <td>
                        <span className={item.stock < 10 ? 'stock-critical' : item.stock < 30 ? 'stock-warning' : 'stock-good'}>
                          {item.stock} units
                        </span>
                      </td>
                      <td>{item.sales7d} sold</td>
                      <td>
                        <span className={`status-pill ${item.stock < 10 ? 'pill-danger' : item.stock < 30 ? 'pill-warning' : 'pill-success'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.stock < 30 ? (
                          <button 
                            type="button" 
                            onClick={() => handleRestock(item.sku)}
                            className="btn-restock"
                          >
                            Restock FBA
                          </button>
                        ) : (
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}>Optimal Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: KINDLE DIRECT PUBLISHING (KDP AUTHORS)                 */}
      {/* ============================================================== */}
      {activeTab === 'kdp' && (
        <div className="kdp-portal-layout">
          {/* Author Bookshelf */}
          <div className="kdp-bookshelf card-base">
            <div className="bookshelf-head">
              <div>
                <h3 className="card-heading">Your Published Literature (KDP Bookshelf)</h3>
                <p className="card-sub">Distributing digitally via Kindle Unlimited and print paperbacks worldwide</p>
              </div>
              <a 
                href="https://kdp.amazon.com" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              >
                <span>KDP Official Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="books-grid">
              {KDP_BOOKS.map(b => (
                <div key={b.id} className="book-item-card card-base">
                  <div className="book-card-head">
                    <PenTool size={18} className="text-amber-500" />
                    <span className="format-tag">{b.format}</span>
                  </div>
                  <h4 className="book-title">{b.title}</h4>
                  <div className="book-metrics-row">
                    <div>
                      <span className="b-label">KENP Read:</span>
                      <strong>{b.kenp}</strong>
                    </div>
                    <div>
                      <span className="b-label">Sales:</span>
                      <strong>{b.sales}</strong>
                    </div>
                    <div>
                      <span className="b-label">Royalties:</span>
                      <strong className="text-success">{b.royalties}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Author Royalty Calculator */}
          <div className="kdp-calc-card card-base">
            <div className="calc-head">
              <Sparkles size={18} className="text-amber-500" />
              <div>
                <h3 className="card-heading">Interactive KDP Royalty Calculator</h3>
                <p className="card-sub">Estimate your exact net author earnings per copy sold based on Amazon's 70% vs 35% plan</p>
              </div>
            </div>

            <div className="calc-controls-grid">
              <div className="calc-input-group">
                <label>List Price ($): <strong>${calcPrice.toFixed(2)}</strong></label>
                <input 
                  type="range" 
                  min="2.99" 
                  max="29.99" 
                  step="0.50" 
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseFloat(e.target.value))}
                  className="calc-slider"
                />
              </div>

              <div className="calc-input-group">
                <label>Page Length: <strong>{calcPages} pages</strong></label>
                <input 
                  type="range" 
                  min="100" 
                  max="600" 
                  step="20" 
                  value={calcPages}
                  onChange={(e) => setCalcPages(parseInt(e.target.value))}
                  className="calc-slider"
                />
              </div>

              <div className="calc-input-group">
                <label>Royalty Plan:</label>
                <div className="royalty-plan-buttons">
                  <button 
                    type="button" 
                    onClick={() => setCalcRoyaltyRate(0.70)} 
                    className={`plan-btn ${calcRoyaltyRate === 0.70 ? 'plan-active' : ''}`}
                  >
                    70% Royalty Plan
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setCalcRoyaltyRate(0.35)} 
                    className={`plan-btn ${calcRoyaltyRate === 0.35 ? 'plan-active' : ''}`}
                  >
                    35% Royalty Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Royalty Payout Result Box */}
            <div className="payout-result-box">
              <div className="payout-cell">
                <span className="payout-label">Estimated Print Cost:</span>
                <strong>${printCost.toFixed(2)}</strong>
              </div>
              <div className="payout-cell">
                <span className="payout-label">Amazon Distribution Fee:</span>
                <strong>${((calcPrice * (1 - calcRoyaltyRate))).toFixed(2)}</strong>
              </div>
              <div className="payout-cell payout-highlight">
                <span className="payout-label">Your Net Royalty Per Copy:</span>
                <strong className="payout-big">${Math.max(0, estimatedRoyaltyPerCopy).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: TWITCH LIVE BROADCAST & STREAMER STUDIO                */}
      {/* ============================================================== */}
      {activeTab === 'twitch' && (
        <div className="twitch-portal-layout">
          <div className="twitch-stream-grid">
            {/* Left: Broadcast Live Monitor & Controls */}
            <div className="stream-monitor-card card-base">
              <div className="monitor-top-bar">
                <div className="live-status-group">
                  <span className={`live-beacon ${isLive ? 'beacon-on' : ''}`}></span>
                  <strong>{isLive ? 'BROADCASTING LIVE' : 'STREAM OFFLINE'}</strong>
                  <span className="stream-viewers">👀 4,820 Viewers</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsLive(!isLive);
                    showToast(isLive ? "Twitch broadcast stopped" : "Twitch broadcast LIVE!", "info");
                  }}
                  className={`btn-stream-toggle ${isLive ? 'btn-live' : 'btn-offline'}`}
                >
                  <Radio size={14} /> {isLive ? 'End Stream' : 'Go Live'}
                </button>
              </div>

              {/* Simulated Live Video Preview */}
              <div className="stream-video-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" 
                  alt="Live Gaming Broadcast" 
                  className="stream-preview-img"
                />
                <div className="stream-hud-overlay">
                  <span className="stream-game-tag">Playing: Elden Ring Nightfall DLC</span>
                  <span className="stream-fps-badge">1080p 60FPS • 6,000 kbps</span>
                </div>
              </div>

              {/* Stream Telemetry Controls */}
              <div className="telemetry-bar">
                <div className="telem-item">
                  <span className="telem-label">CPU Encoding:</span>
                  <strong>2.4% (NVENC)</strong>
                </div>
                <div className="telem-item">
                  <span className="telem-label">Dropped Frames:</span>
                  <strong className="text-success">0 (0.0%)</strong>
                </div>
                <div className="telem-item">
                  <span className="telem-label">Prime Subscriptions:</span>
                  <strong className="text-amber-500">312 Today</strong>
                </div>
              </div>

              {/* Active Stream Poll Widget */}
              <div className="stream-poll-card">
                <div className="poll-head">
                  <Vote size={16} className="text-purple-400" />
                  <strong>Live Chat Poll: {activePoll.question}</strong>
                </div>
                <div className="poll-options-row">
                  <button type="button" onClick={() => handleVote('A')} className="poll-opt-btn">
                    <span>{activePoll.optA}</span>
                    <strong>{activePoll.votesA} votes</strong>
                  </button>
                  <button type="button" onClick={() => handleVote('B')} className="poll-opt-btn">
                    <span>{activePoll.optB}</span>
                    <strong>{activePoll.votesB} votes</strong>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Stream Chat Stream & Send Message */}
            <div className="stream-chat-card card-base">
              <div className="chat-head">
                <MessageSquare size={16} className="text-purple-400" />
                <h3>Stream Chat</h3>
                <span className="badge-pass">Auto-Moderation Active</span>
              </div>

              <div className="chat-messages-scroll">
                {twitchChat.map(c => (
                  <div key={c.id} className="chat-message-line">
                    <span className={`chat-badge badge-${c.badge.toLowerCase().replace(/[^a-z]/g, '')}`}>{c.badge}</span>
                    <strong className="chat-user">{c.user}:</strong>
                    <span className="chat-text">{c.message}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChat} className="chat-input-bar">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send a message to stream chat..."
                  className="chat-field"
                />
                <button type="submit" className="chat-send-btn">
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EMBEDDED STYLES FOR BUSINESS & CREATOR STUDIO */}
      <style>{`
        .business-suite-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .business-banner {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-left: 5px solid #f59e0b;
        }
        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.6rem;
        }
        .banner-title {
          font-size: 1.9rem;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .banner-desc {
          font-size: 0.95rem;
          color: #94a3b8;
          max-width: 700px;
          line-height: 1.5;
        }

        /* Suite Tabs Bar */
        .suite-tabs-bar {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .suite-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 700;
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .suite-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
        }
        .tab-seller-active {
          background: #d97706 !important;
          color: #ffffff !important;
          border-color: #f59e0b !important;
        }
        .tab-kdp-active {
          background: #2563eb !important;
          color: #ffffff !important;
          border-color: #3b82f6 !important;
        }
        .tab-twitch-active {
          background: #9333ea !important;
          color: #ffffff !important;
          border-color: #a855f7 !important;
        }

        /* KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .kpi-box {
          background: #ffffff;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .kpi-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-amber { background: #fef3c7; color: #b45309; }
        .bg-blue { background: #dbeafe; color: #1d4ed8; }
        .bg-emerald { background: #dcfce7; color: #15803d; }
        .kpi-meta {
          display: flex;
          flex-direction: column;
        }
        .kpi-label {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          font-weight: 700;
        }
        .kpi-val {
          font-size: 1.5rem;
          color: var(--color-navy-dark);
          line-height: 1.2;
        }
        .kpi-trend {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* Chart Panel */
        .chart-panel {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .chart-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-heading {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
        }
        .card-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        /* Inventory Table */
        .inventory-card {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .inventory-table-wrap {
          overflow-x: auto;
        }
        .inventory-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }
        .inventory-table th {
          text-align: left;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-bottom: 2px solid var(--color-border);
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .inventory-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        .sku-tag {
          display: block;
          font-size: 0.72rem;
          font-family: monospace;
          color: var(--color-text-muted);
        }
        .stock-good { font-weight: 700; color: #16a34a; }
        .stock-warning { font-weight: 700; color: #d97706; }
        .stock-critical { font-weight: 700; color: #dc2626; }
        .status-pill {
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
        }
        .pill-success { background: #dcfce7; color: #15803d; }
        .pill-warning { background: #fef3c7; color: #b45309; }
        .pill-danger { background: #fee2e2; color: #991b1b; }
        .btn-restock {
          background: #f59e0b;
          color: #0f172a;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* KDP Portal Layout */
        .kdp-portal-layout {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .kdp-bookshelf {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .bookshelf-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .books-grid {
            grid-template-columns: 1fr;
          }
        }
        .book-item-card {
          padding: 1.25rem;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .book-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .format-tag {
          font-size: 0.72rem;
          font-weight: 700;
          background: #e2e8f0;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        .book-title {
          font-size: 1.05rem;
          color: var(--color-navy-dark);
        }
        .book-metrics-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          border-top: 1px solid var(--color-border);
          padding-top: 0.65rem;
        }
        .b-label {
          display: block;
          color: var(--color-text-muted);
        }

        /* KDP Calc Card */
        .kdp-calc-card {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .calc-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .calc-controls-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 800px) {
          .calc-controls-grid {
            grid-template-columns: 1fr;
          }
        }
        .calc-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .calc-input-group label {
          font-size: 0.85rem;
          color: var(--color-navy-dark);
        }
        .calc-slider {
          width: 100%;
        }
        .royalty-plan-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .plan-btn {
          flex: 1;
          padding: 0.55rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: #f8fafc;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }
        .plan-active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
        .payout-result-box {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 1.25rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .payout-result-box {
            grid-template-columns: 1fr;
          }
        }
        .payout-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .payout-label {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .payout-highlight {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }
        .payout-big {
          font-size: 1.6rem;
          color: #15803d;
        }

        /* Twitch Layout */
        .twitch-portal-layout {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .twitch-stream-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 1.75rem;
        }
        @media (max-width: 900px) {
          .twitch-stream-grid {
            grid-template-columns: 1fr;
          }
        }
        .stream-monitor-card {
          background: #090d16;
          border-radius: var(--radius-lg);
          color: #ffffff;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .monitor-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .live-status-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        .live-beacon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
        }
        .stream-viewers {
          color: #94a3b8;
        }
        .btn-stream-toggle {
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .btn-live { background: #ef4444; color: #ffffff; }
        .btn-offline { background: #9333ea; color: #ffffff; }

        .stream-video-placeholder {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000000;
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .stream-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .stream-hud-overlay {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          right: 0.75rem;
          display: flex;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.7);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          color: #cbd5e1;
        }
        .telemetry-bar {
          display: flex;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
        }
        .telem-label {
          color: #94a3b8;
          margin-right: 0.4rem;
        }
        .stream-poll-card {
          background: rgba(147, 51, 234, 0.15);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .poll-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #e9d5ff;
        }
        .poll-options-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .poll-opt-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          cursor: pointer;
        }
        .poll-opt-btn:hover {
          background: rgba(147, 51, 234, 0.4);
        }

        /* Stream Chat Card */
        .stream-chat-card {
          background: #0f172a;
          color: #ffffff;
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          height: 520px;
        }
        .chat-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.85rem;
        }
        .chat-head h3 {
          font-size: 1rem;
          color: #ffffff;
        }
        .chat-messages-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .chat-message-line {
          font-size: 0.85rem;
          line-height: 1.4;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.35rem;
        }
        .chat-badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 3px;
        }
        .badge-broadcaster { background: #ef4444; color: #ffffff; }
        .badge-vip { background: #ec4899; color: #ffffff; }
        .badge-sub6mo { background: #9333ea; color: #ffffff; }
        .badge-mod { background: #10b981; color: #ffffff; }
        .chat-user {
          color: #a855f7;
        }
        .chat-text {
          color: #e2e8f0;
        }
        .chat-input-bar {
          display: flex;
          gap: 0.5rem;
        }
        .chat-field {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
        }
        .chat-send-btn {
          background: #9333ea;
          color: #ffffff;
          border: none;
          padding: 0.65rem 0.95rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
