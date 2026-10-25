import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Send,
  Smartphone,
  Zap,
  Tv,
  Droplets,
  Car,
  Wifi,
  Gift,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Check,
  FileText,
  RefreshCw,
  QrCode,
  DollarSign,
  Download
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { useOne } from '../context/OneContext';

const INITIAL_TRANSACTIONS = [
  { id: "tx-901", merchant: "Whole Foods Market", amount: 64.20, type: "debit", date: "Today, 11:20 AM", status: "Completed", category: "Groceries", icon: "Groceries" },
  { id: "tx-902", merchant: "Amazon Fresh Order", amount: 48.90, type: "debit", date: "Today, 08:45 AM", status: "Completed", category: "Groceries", icon: "Groceries" },
  { id: "tx-903", merchant: "Cashback Reward — Scratch Card", amount: 25.00, type: "credit", date: "Yesterday, 7:15 PM", status: "Received", category: "Cashback", icon: "Gift" },
  { id: "tx-904", merchant: "Mobile Prepaid Recharge", amount: 29.99, type: "debit", date: "Yesterday, 2:10 PM", status: "Completed", category: "Recharges", icon: "Mobile" },
  { id: "tx-905", merchant: "Electricity Bill — ConEd", amount: 112.50, type: "debit", date: "Oct 20, 2026", status: "Completed", category: "Bills", icon: "Power" },
  { id: "tx-906", merchant: "P2P Transfer to Sarah Jenkins", amount: 45.00, type: "debit", date: "Oct 18, 2026", status: "Completed", category: "Transfers", icon: "Send" },
  { id: "tx-907", merchant: "Prime Video Channel Subscription", amount: 14.99, type: "debit", date: "Oct 15, 2026", status: "Completed", category: "Entertainment", icon: "Tv" }
];

const SPENDING_BY_CAT = [
  { name: 'Groceries', value: 113.10, color: '#10b981' },
  { name: 'Bills & Utilities', value: 112.50, color: '#3b82f6' },
  { name: 'P2P Transfers', value: 45.00, color: '#8b5cf6' },
  { name: 'Recharges', value: 29.99, color: '#f59e0b' },
  { name: 'Entertainment', value: 14.99, color: '#ec4899' }
];

export default function OnePayments() {
  const { showToast } = useOne();
  const [balance, setBalance] = useState(842.50);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Virtual Card States
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);

  // Send Money Modal & States
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendNote, setSendNote] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Add Money Modal & States
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('100');

  // Utility Bill Payment Quick Pay State
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [billerConsumerId, setBillerConsumerId] = useState('');
  const [billerAmount, setBillerAmount] = useState('55.00');

  // Scratch Cards Locker
  const [scratchCards, setScratchCards] = useState([
    { id: "sc-1", title: "Amazon Pay Festival Scratch Card", prize: 15.00, isScratched: false, color: "#10b981" },
    { id: "sc-2", title: "Prime Member Weekend Bonus", prize: 25.00, isScratched: false, color: "#f59e0b" },
    { id: "sc-3", title: "Whole Foods Eco-Shopper Reward", prize: 10.00, isScratched: true, color: "#3b82f6" }
  ]);

  const filteredTransactions = transactions.filter(tx => {
    return filterCategory === 'All' || tx.category === filterCategory;
  });

  const handleCopyCard = () => {
    navigator.clipboard?.writeText("4852 9012 3844 7719");
    showToast("Virtual Amazon Prime Visa Card Number Copied!", "success");
  };

  const handleSendMoneySubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (!sendRecipient || isNaN(amt) || amt <= 0) {
      showToast("Please provide a valid recipient and amount", "warning");
      return;
    }
    if (amt > balance) {
      showToast("Insufficient Amazon Pay wallet balance", "warning");
      return;
    }

    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setBalance(prev => prev - amt);
      const newTx = {
        id: `tx-${Date.now()}`,
        merchant: `Transfer to ${sendRecipient}`,
        amount: amt,
        type: "debit",
        date: "Just now",
        status: "Completed",
        category: "Transfers",
        icon: "Send"
      };
      setTransactions(prev => [newTx, ...prev]);
      setShowSendModal(false);
      setSendRecipient('');
      setSendAmount('');
      setSendNote('');
      showToast(`Successfully transferred $${amt.toFixed(2)} to ${sendRecipient}!`, "success");
    }, 1200);
  };

  const handleAddMoneySubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) return;

    setBalance(prev => prev + amt);
    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: "Wallet Load via Stored Bank",
      amount: amt,
      type: "credit",
      date: "Just now",
      status: "Completed",
      category: "Cashback",
      icon: "Gift"
    };
    setTransactions(prev => [newTx, ...prev]);
    setShowAddMoneyModal(false);
    showToast(`Added $${amt.toFixed(2)} to Amazon Pay Wallet!`, "success");
  };

  const handlePayBiller = (e) => {
    e.preventDefault();
    const amt = parseFloat(billerAmount);
    if (amt > balance) {
      showToast("Insufficient balance to pay bill", "warning");
      return;
    }

    setBalance(prev => prev - amt);
    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: `${selectedBiller.name} Payment (${billerConsumerId || 'Self'})`,
      amount: amt,
      type: "debit",
      date: "Just now",
      status: "Completed",
      category: "Bills",
      icon: "Power"
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(`Bill paid successfully to ${selectedBiller.name}!`, "success");
    setSelectedBiller(null);
    setBillerConsumerId('');
  };

  const handleScratch = (cardId) => {
    setScratchCards(prev => prev.map(c => {
      if (c.id === cardId && !c.isScratched) {
        setBalance(b => b + c.prize);
        showToast(`Congratulations! Won $${c.prize.toFixed(2)} Cashback directly added to Wallet!`, "success");
        return { ...c, isScratched: true };
      }
      return c;
    }));
  };

  return (
    <div className="payments-neobank-root">
      {/* NeoBank Emerald & Midnight Banner */}
      <div className="fintech-hero-banner card-base">
        <div className="hero-left-col">
          <div className="fintech-badge">
            <Lock size={14} className="text-emerald-400" />
            <span>Amazon Pay Unified Digital Wallet & UPI Neo-Banking</span>
          </div>
          <h1 className="hero-title">Zero Friction Payments, Bill Settlements & Transfers</h1>
          <p className="hero-subtitle">
            Seamless 1-click checkout across thousands of global merchant sites, instant peer-to-peer transfers, and instant cashback rewards.
          </p>
        </div>

        <div className="hero-stats-badge">
          <div className="stat-pill">
            <span className="dot-pulse"></span>
            <span>Bank-Grade 256-Bit SSL</span>
          </div>
          <div className="stat-pill">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>A-to-z Buyer Protection</span>
          </div>
        </div>
      </div>

      {/* TOP DECK: VIRTUAL CARD + WALLET BALANCE + QUICK ACTIONS */}
      <div className="wallet-top-deck-grid">
        {/* Holographic Virtual Prime Visa Card */}
        <div className="card-flipper-wrapper">
          <div 
            className={`virtual-credit-card ${isCardFlipped ? 'is-flipped' : ''} ${isCardFrozen ? 'is-frozen' : ''}`}
            onClick={() => setIsCardFlipped(!isCardFlipped)}
          >
            {/* Front of Card */}
            <div className="card-face card-front">
              <div className="card-front-top">
                <span className="card-brand-tag">Amazon <strong>Pay</strong></span>
                <span className="card-tier-tag">Prime Signature</span>
              </div>

              <div className="card-chip-row">
                <div className="emv-chip"></div>
                <Wifi size={20} className="contactless-icon" />
              </div>

              <div className="card-number-row">
                <span>•••• •••• •••• 7719</span>
              </div>

              <div className="card-front-bottom">
                <div>
                  <span className="card-holder-label">CARDHOLDER</span>
                  <strong className="card-holder-name">GANESH SHETTY</strong>
                </div>
                <div>
                  <span className="card-holder-label">EXPIRES</span>
                  <strong className="card-exp">10/30</strong>
                </div>
                <div className="visa-logo">VISA</div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="card-face card-back">
              <div className="magnetic-strip"></div>
              <div className="signature-cvv-row">
                <div className="sign-panel">AUTHORIZED SIGNATURE</div>
                <div className="cvv-panel">
                  <span>CVV:</span>
                  <strong>{showCvv ? '842' : '•••'}</strong>
                </div>
              </div>
              <p className="card-back-text">
                Issued by Amazon Pay under license from Visa USA. 5% cashback on Amazon & Whole Foods purchases.
              </p>
              <div className="flip-prompt-text">Click to flip card back</div>
            </div>
          </div>

          {/* Card Controls Toolbar */}
          <div className="card-actions-toolbar">
            <button type="button" onClick={handleCopyCard} className="card-tool-btn">
              <Copy size={14} /> Copy Card #
            </button>
            <button type="button" onClick={() => setShowCvv(!showCvv)} className="card-tool-btn">
              {showCvv ? <EyeOff size={14} /> : <Eye size={14} />} {showCvv ? 'Hide CVV' : 'Show CVV'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsCardFrozen(!isCardFrozen);
                showToast(isCardFrozen ? "Card Unfrozen & Ready for Use" : "Card Frozen! Purchases blocked", "info");
              }} 
              className={`card-tool-btn ${isCardFrozen ? 'text-danger' : ''}`}
            >
              <Lock size={14} /> {isCardFrozen ? 'Unfreeze' : 'Freeze Card'}
            </button>
          </div>
        </div>

        {/* Balance & Instant Action Hub */}
        <div className="balance-hub-card card-base">
          <div className="balance-head">
            <div>
              <span className="balance-label">Total Available Balance</span>
              <h2 className="balance-number">${balance.toFixed(2)}</h2>
            </div>
            <div className="cashback-earned-badge">
              <Sparkles size={16} className="text-amber-500" />
              <div>
                <span className="cashback-label">Cashback Earned</span>
                <strong className="cashback-val">$184.20</strong>
              </div>
            </div>
          </div>

          <div className="balance-action-buttons">
            <button 
              type="button" 
              onClick={() => setShowAddMoneyModal(true)} 
              className="action-btn-primary"
            >
              <Plus size={16} />
              <span>Add Money</span>
            </button>
            <button 
              type="button" 
              onClick={() => setShowSendModal(true)} 
              className="action-btn-secondary"
            >
              <Send size={16} />
              <span>Send Money</span>
            </button>
            <button 
              type="button" 
              onClick={() => showToast("QR Scanner activated. Point camera at merchant UPI QR code.", "info")} 
              className="action-btn-outline"
            >
              <QrCode size={16} />
              <span>Scan QR</span>
            </button>
          </div>

          {/* Amazon Pay Later Credit Line Box */}
          <div className="pay-later-box">
            <div className="pay-later-head">
              <div className="pay-later-title">
                <Clock size={16} className="text-blue-500" />
                <strong>Amazon Pay Later (Instant Credit)</strong>
              </div>
              <span className="badge-pass">Pre-Approved</span>
            </div>
            <div className="pay-later-stats">
              <div>
                <span className="pl-label">Approved Credit</span>
                <strong className="pl-val">$2,500.00</strong>
              </div>
              <div>
                <span className="pl-label">Upcoming Due (Nov 5)</span>
                <strong className="pl-val">$0.00</strong>
              </div>
              <button 
                type="button" 
                onClick={() => showToast("Zero bills due for this cycle!", "success")}
                className="btn-pay-due"
              >
                Auto-Pay Active
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BILL PAYMENTS & RECHARGES CENTER */}
      <div className="utility-bills-section card-base">
        <div className="section-head-bar">
          <div>
            <h3 className="section-title">Recharge & Pay Bills Instantly</h3>
            <p className="section-subtitle">Earn 5% instant cashback on electricity, mobile recharges, water and broadband.</p>
          </div>
          <span className="badge-pass">Instant Settlement</span>
        </div>

        <div className="utility-icons-grid">
          {[
            { id: "mobile", name: "Mobile Prepaid", icon: Smartphone, color: "#3b82f6", bill: "$29.99" },
            { id: "power", name: "Electricity", icon: Zap, color: "#f59e0b", bill: "$84.50" },
            { id: "tv", name: "DTH / Cable", icon: Tv, color: "#8b5cf6", bill: "$19.99" },
            { id: "water", name: "Water Supply", icon: Droplets, color: "#06b6d4", bill: "$32.40" },
            { id: "fastag", name: "Fastag Toll", icon: Car, color: "#10b981", bill: "$40.00" },
            { id: "broadband", name: "Broadband Wi-Fi", icon: Wifi, color: "#ec4899", bill: "$65.00" }
          ].map(biller => (
            <div 
              key={biller.id} 
              className={`utility-item ${selectedBiller?.id === biller.id ? 'biller-active' : ''}`}
              onClick={() => {
                setSelectedBiller(biller);
                setBillerAmount(biller.bill.replace('$', ''));
              }}
            >
              <div className="utility-icon-pill" style={{ background: `${biller.color}15`, color: biller.color }}>
                <biller.icon size={24} />
              </div>
              <strong className="utility-name">{biller.name}</strong>
              <span className="utility-est">Est: {biller.bill}</span>
            </div>
          ))}
        </div>

        {/* Bill Payment Input Drawer (When a biller is selected) */}
        {selectedBiller && (
          <form onSubmit={handlePayBiller} className="biller-drawer card-base">
            <div className="drawer-meta">
              <span className="biller-badge">Paying: <strong>{selectedBiller.name}</strong></span>
              <button type="button" onClick={() => setSelectedBiller(null)} className="close-drawer">✕</button>
            </div>
            <div className="drawer-inputs">
              <input 
                type="text" 
                placeholder="Enter Consumer ID / Mobile Number..." 
                value={billerConsumerId}
                onChange={(e) => setBillerConsumerId(e.target.value)}
                required
                className="drawer-input"
              />
              <input 
                type="number" 
                placeholder="Amount ($)" 
                value={billerAmount}
                onChange={(e) => setBillerAmount(e.target.value)}
                required
                className="drawer-input input-amt"
              />
              <button type="submit" className="drawer-pay-btn">
                Pay ${billerAmount} from Wallet
              </button>
            </div>
          </form>
        )}
      </div>

      {/* SCRATCH & WIN CASHBACK LOCKER */}
      <div className="scratch-rewards-section card-base">
        <div className="section-head-bar">
          <div className="scratch-head-title">
            <Gift size={20} className="text-amber-500" />
            <div>
              <h3 className="section-title">Scratch & Win Cashback Cards</h3>
              <p className="section-subtitle">Click to scratch locked rewards. Cash is credited straight to your Amazon Pay wallet!</p>
            </div>
          </div>
          <span className="badge-pass">3 Rewards Available</span>
        </div>

        <div className="scratch-cards-grid">
          {scratchCards.map(card => (
            <div 
              key={card.id} 
              className={`scratch-card ${card.isScratched ? 'scratched' : 'unscratched'}`}
              onClick={() => handleScratch(card.id)}
            >
              {card.isScratched ? (
                <div className="scratched-content">
                  <Sparkles size={28} className="text-amber-400" />
                  <span className="reward-congrats">Cashback Claimed!</span>
                  <strong className="reward-prize">+${card.prize.toFixed(2)}</strong>
                  <span className="reward-date">Deposited into Amazon Pay</span>
                </div>
              ) : (
                <div className="unscratched-overlay">
                  <div className="gift-gold-box">
                    <Gift size={32} />
                  </div>
                  <strong>Click to Scratch!</strong>
                  <span>{card.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TRANSACTION HISTORY & SPENDING BREAKDOWN GRID */}
      <div className="transactions-analytics-grid">
        {/* Transactions Table */}
        <div className="tx-table-card card-base">
          <div className="tx-table-header">
            <div>
              <h3 className="section-title">Transaction History</h3>
              <p className="section-subtitle">Live debits, credits, and merchant invoices</p>
            </div>

            <div className="tx-filter-pills">
              {['All', 'Groceries', 'Bills', 'Transfers', 'Cashback'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`tx-pill ${filterCategory === cat ? 'tx-pill-active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="tx-records-list">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="tx-row-item">
                <div className="tx-icon-pill">
                  {tx.type === 'credit' ? (
                    <Plus size={18} className="text-emerald-500" />
                  ) : (
                    <ArrowRight size={18} className="text-slate-400" />
                  )}
                </div>

                <div className="tx-meta-col">
                  <strong className="tx-merchant-name">{tx.merchant}</strong>
                  <span className="tx-timestamp">{tx.date} • {tx.category}</span>
                </div>

                <div className="tx-amount-col">
                  <strong className={`tx-amount-val ${tx.type === 'credit' ? 'text-credit' : 'text-debit'}`}>
                    {tx.type === 'credit' ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`}
                  </strong>
                  <span className="tx-status-badge">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Spending Breakdown Chart */}
        <div className="spending-chart-card card-base">
          <div className="chart-header">
            <div>
              <h3 className="section-title">Spending Analytics</h3>
              <p className="section-subtitle">Distribution by purchase category</p>
            </div>
            <button 
              type="button" 
              onClick={() => showToast("Monthly statement downloaded (PDF)", "success")}
              className="btn-download-stmt"
            >
              <Download size={14} /> Statement
            </button>
          </div>

          <div className="pie-container">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie 
                  data={SPENDING_BY_CAT} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {SPENDING_BY_CAT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="spending-legend-list">
            {SPENDING_BY_CAT.map((cat, i) => (
              <div key={i} className="spending-legend-row">
                <div className="legend-lead">
                  <span className="color-swatch" style={{ background: cat.color }}></span>
                  <span className="cat-name">{cat.name}</span>
                </div>
                <strong className="cat-val">${cat.value.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEND MONEY P2P MODAL */}
      {showSendModal && (
        <div className="modal-backdrop" onClick={() => setShowSendModal(false)}>
          <div className="modal-content card-base" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title-wrap">
                <Send size={18} className="text-emerald-500" />
                <h3>Send Money Instantly</h3>
              </div>
              <button type="button" onClick={() => setShowSendModal(false)} className="close-btn">✕</button>
            </div>

            <form onSubmit={handleSendMoneySubmit} className="modal-form">
              <div className="form-group">
                <label>Recipient Contact, UPI ID or Email:</label>
                <input 
                  type="text" 
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  placeholder="e.g. sarah.j@amazonpay or (555) 234-5678"
                  required
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Transfer Amount ($):</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  max={balance}
                  required
                  className="modal-input input-big"
                />
                <span className="input-hint">Available in wallet: ${balance.toFixed(2)}</span>
              </div>

              <div className="form-group">
                <label>Add a Note (Optional):</label>
                <input 
                  type="text" 
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  placeholder="Dinner split, birthday gift, etc."
                  className="modal-input"
                />
              </div>

              <button 
                type="submit" 
                disabled={isTransferring}
                className="btn-primary" 
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {isTransferring ? (
                  <span>Verifying Biometrics...</span>
                ) : (
                  <span>Authorize Transfer (${sendAmount || '0.00'})</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD MONEY MODAL */}
      {showAddMoneyModal && (
        <div className="modal-backdrop" onClick={() => setShowAddMoneyModal(false)}>
          <div className="modal-content card-base" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title-wrap">
                <Plus size={18} className="text-emerald-500" />
                <h3>Add Money to Amazon Pay Wallet</h3>
              </div>
              <button type="button" onClick={() => setShowAddMoneyModal(false)} className="close-btn">✕</button>
            </div>

            <form onSubmit={handleAddMoneySubmit} className="modal-form">
              <div className="preset-amounts-row">
                {['50', '100', '250', '500'].map(p => (
                  <button 
                    key={p} 
                    type="button" 
                    onClick={() => setAddAmount(p)}
                    className={`preset-btn ${addAmount === p ? 'preset-active' : ''}`}
                  >
                    +${p}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label>Custom Amount ($):</label>
                <input 
                  type="number" 
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  required
                  className="modal-input input-big"
                />
              </div>

              <div className="payment-source-box">
                <CreditCard size={18} className="text-blue-500" />
                <div>
                  <strong>Chase Premier Checking (•••• 4920)</strong>
                  <span>Instant transfer • Zero fees</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Confirm Deposit (${addAmount || '0'})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEOBANK STYLES */}
      <style>{`
        .payments-neobank-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .fintech-hero-banner {
          background: linear-gradient(135deg, #090e17 0%, #0d1b2a 100%);
          color: #ffffff;
          padding: 2.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 5px solid #10b981;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .fintech-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.6rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .hero-title {
          font-size: 1.9rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .hero-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          max-width: 650px;
          line-height: 1.5;
        }
        .hero-stats-badge {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: #cbd5e1;
        }
        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        /* Top Deck */
        .wallet-top-deck-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 1.75rem;
        }
        @media (max-width: 900px) {
          .wallet-top-deck-grid {
            grid-template-columns: 1fr;
          }
        }

        /* 3D Virtual Credit Card */
        .card-flipper-wrapper {
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .virtual-credit-card {
          width: 100%;
          height: 220px;
          border-radius: 16px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.35);
        }
        .is-flipped {
          transform: rotateY(180deg);
        }
        .is-frozen {
          filter: grayscale(0.85) contrast(0.9);
          opacity: 0.85;
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          backface-visibility: hidden;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-front {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .card-front-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-brand-tag {
          font-size: 1.2rem;
          color: #ffffff;
        }
        .card-brand-tag strong {
          color: #f59e0b;
        }
        .card-tier-tag {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #93c5fd;
          font-weight: 700;
        }
        .card-chip-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .emv-chip {
          width: 42px;
          height: 30px;
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          border-radius: 5px;
          border: 1px solid #b45309;
        }
        .contactless-icon {
          color: rgba(255, 255, 255, 0.6);
        }
        .card-number-row {
          font-family: monospace;
          font-size: 1.25rem;
          letter-spacing: 0.15em;
          color: #ffffff;
        }
        .card-front-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .card-holder-label {
          display: block;
          font-size: 0.6rem;
          color: #93c5fd;
          font-weight: 700;
        }
        .card-holder-name, .card-exp {
          font-size: 0.85rem;
          font-weight: 700;
        }
        .visa-logo {
          font-size: 1.3rem;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -0.05em;
        }

        .card-back {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          transform: rotateY(180deg);
          padding: 1.25rem 0 1rem 0;
        }
        .magnetic-strip {
          height: 38px;
          background: #000000;
          width: 100%;
        }
        .signature-cvv-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 1.5rem;
        }
        .sign-panel {
          flex: 1;
          height: 32px;
          background: #e2e8f0;
          color: #64748b;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          padding-left: 0.5rem;
          font-style: italic;
        }
        .cvv-panel {
          background: #ffffff;
          color: #0f172a;
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
          display: flex;
          gap: 0.35rem;
        }
        .card-back-text {
          font-size: 0.65rem;
          color: #94a3b8;
          padding: 0 1.5rem;
          line-height: 1.3;
        }
        .flip-prompt-text {
          font-size: 0.7rem;
          text-align: center;
          color: #38bdf8;
          font-weight: 600;
        }

        /* Card Tool Buttons */
        .card-actions-toolbar {
          display: flex;
          gap: 0.5rem;
          justify-content: space-between;
        }
        .card-tool-btn {
          flex: 1;
          background: #ffffff;
          border: 1px solid var(--color-border);
          padding: 0.5rem 0.65rem;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          cursor: pointer;
        }
        .card-tool-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
        }

        /* Balance Hub Card */
        .balance-hub-card {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .balance-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .balance-label {
          font-size: 0.82rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
          font-weight: 700;
        }
        .balance-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-navy-dark);
          line-height: 1.1;
        }
        .cashback-earned-badge {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: var(--radius-md);
          padding: 0.6rem 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .cashback-label {
          display: block;
          font-size: 0.7rem;
          color: #92400e;
          font-weight: 700;
        }
        .cashback-val {
          font-size: 1.1rem;
          color: #b45309;
        }
        .balance-action-buttons {
          display: flex;
          gap: 0.75rem;
        }
        .action-btn-primary {
          flex: 1;
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 0.8rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .action-btn-secondary {
          flex: 1;
          background: var(--color-navy-dark);
          color: #ffffff;
          border: none;
          padding: 0.8rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .action-btn-outline {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          color: var(--color-navy-dark);
          padding: 0.8rem 1.1rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Pay Later Box */
        .pay-later-box {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.1rem;
        }
        .pay-later-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }
        .pay-later-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--color-navy-dark);
        }
        .pay-later-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pl-label {
          display: block;
          font-size: 0.72rem;
          color: var(--color-text-muted);
        }
        .pl-val {
          font-size: 1.05rem;
          color: var(--color-navy-dark);
        }
        .btn-pay-due {
          background: #e2e8f0;
          color: #475569;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* Utility Bills */
        .utility-bills-section {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .section-head-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-title {
          font-size: 1.25rem;
          color: var(--color-navy-dark);
        }
        .section-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .utility-icons-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .utility-icons-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .utility-item {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.1rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .utility-item:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
        }
        .biller-active {
          border-color: #10b981 !important;
          background: #f0fdf4 !important;
        }
        .utility-icon-pill {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .utility-name {
          font-size: 0.85rem;
          color: var(--color-navy-dark);
          text-align: center;
        }
        .utility-est {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* Biller Drawer */
        .biller-drawer {
          background: #f1f5f9;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          animation: slideDown 200ms ease;
        }
        .drawer-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .biller-badge {
          font-size: 0.85rem;
          color: var(--color-navy-dark);
        }
        .close-drawer {
          border: none;
          background: transparent;
          font-size: 1rem;
          cursor: pointer;
        }
        .drawer-inputs {
          display: flex;
          gap: 0.75rem;
        }
        .drawer-input {
          flex: 1;
          padding: 0.65rem 0.95rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: #ffffff;
        }
        .input-amt {
          max-width: 130px;
        }
        .drawer-pay-btn {
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        /* Scratch Rewards */
        .scratch-rewards-section {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .scratch-head-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .scratch-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) {
          .scratch-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        .scratch-card {
          min-height: 160px;
          border-radius: var(--radius-lg);
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
        }
        .unscratched {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.25);
        }
        .unscratched:hover {
          transform: translateY(-3px);
        }
        .unscratched-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .gift-gold-box {
          background: rgba(255, 255, 255, 0.2);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .unscratched-overlay strong {
          font-size: 1.1rem;
        }
        .unscratched-overlay span {
          font-size: 0.75rem;
          opacity: 0.9;
        }
        .scratched {
          background: #f0fdf4;
          border: 2px dashed #22c55e;
          color: #166534;
        }
        .scratched-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .reward-congrats {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: #15803d;
        }
        .reward-prize {
          font-size: 1.8rem;
          color: #166534;
        }
        .reward-date {
          font-size: 0.7rem;
          color: #4ade80;
        }

        /* Analytics & Transactions Grid */
        .transactions-analytics-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 1.75rem;
        }
        @media (max-width: 1000px) {
          .transactions-analytics-grid {
            grid-template-columns: 1fr;
          }
        }
        .tx-table-card {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .tx-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .tx-filter-pills {
          display: flex;
          gap: 0.4rem;
        }
        .tx-pill {
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        .tx-pill-active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
        .tx-records-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .tx-row-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: #ffffff;
        }
        .tx-icon-pill {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tx-meta-col {
          flex: 1;
        }
        .tx-merchant-name {
          font-size: 0.9rem;
          color: var(--color-navy-dark);
          display: block;
        }
        .tx-timestamp {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .tx-amount-col {
          text-align: right;
        }
        .tx-amount-val {
          font-size: 1rem;
          display: block;
        }
        .text-credit { color: #16a34a; }
        .text-debit { color: #0f172a; }
        .tx-status-badge {
          font-size: 0.68rem;
          color: #16a34a;
          background: #dcfce7;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        /* Spending Chart */
        .spending-chart-card {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-download-stmt {
          background: #f1f5f9;
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .pie-container {
          width: 100%;
          height: 210px;
        }
        .spending-legend-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .spending-legend-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
        }
        .legend-lead {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .color-swatch {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        /* Modals */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2200;
          padding: 1.5rem;
        }
        .modal-content {
          background: #ffffff;
          width: 100%;
          max-width: 460px;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
          animation: popUp 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes popUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .modal-title-wrap h3 {
          font-size: 1.15rem;
        }
        .close-btn {
          border: none;
          background: #f1f5f9;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-navy-dark);
        }
        .modal-input {
          padding: 0.75rem 0.95rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
        }
        .input-big {
          font-size: 1.3rem;
          font-weight: 700;
        }
        .input-hint {
          font-size: 0.72rem;
          color: var(--color-text-muted);
        }
        .preset-amounts-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }
        .preset-btn {
          padding: 0.65rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: #f8fafc;
          font-weight: 700;
          cursor: pointer;
        }
        .preset-active {
          background: #10b981;
          color: #ffffff;
          border-color: #10b981;
        }
        .payment-source-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }
        .payment-source-box strong {
          display: block;
          color: var(--color-navy-dark);
        }
        .payment-source-box span {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}
