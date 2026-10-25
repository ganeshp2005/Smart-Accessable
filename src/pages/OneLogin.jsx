import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Hand, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  UserCheck, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useOne } from '../context/OneContext';

const DEMO_PERSONAS = [
  {
    name: "Alex Mercer",
    email: "alex.mercer@amazonone.com",
    role: "Prime All-Access Member",
    tier: "Prime All-Access",
    memberSince: "2021",
    interests: ["Shopping", "Entertainment", "Devices"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@awscloud.io",
    role: "AWS Principal Architect",
    tier: "AWS Enterprise & Bedrock",
    memberSince: "2019",
    interests: ["Cloud", "Business", "Entertainment"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Marcus Vance",
    email: "marcus.vance@sellercentral.net",
    role: "FBA Merchant & Streamer",
    tier: "Seller Central & Twitch",
    memberSince: "2022",
    interests: ["Business", "Shopping", "Payments"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export default function OneLogin({ initialTab }) {
  const { login, register, resetPassword, currentUser, logout, showToast } = useOne();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get('mode') || searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(initialTab || queryTab || 'signin');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign Up Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Amazon One Palm Scanner Animation State
  const [palmScanning, setPalmScanning] = useState(false);
  const [palmSuccess, setPalmSuccess] = useState(false);

  // 2FA OTP State
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password) {
      showToast("Enter your email address and password.", "warning");
      return;
    }
    setIsLoading(true);
    try {
      await login(emailOrPhone, password, keepSignedIn);
      navigate(location.state?.from || '/');
    } catch {
      // OneContext displays a friendly Firebase error toast.
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      showToast("Please fill in your name and email address", "warning");
      return;
    }
    if (regPassword.length < 6) {
      showToast("Passwords must be at least 6 characters", "warning");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast("Passwords do not match", "warning");
      return;
    }

    setIsLoading(true);
    try {
      await register({ name: regName, email: regEmail, password: regPassword });
      navigate(location.state?.from || '/');
    } catch {
      // OneContext displays a friendly Firebase error toast.
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (persona) => {
    try {
      await login(persona.email, "demo-pass");
      navigate(location.state?.from || '/');
    } catch {
      setEmailOrPhone(persona.email);
      setPassword("");
      setActiveTab("signin");
    }
  };

  const handlePalmScan = () => {
    // The animation is a prototype only; it cannot authenticate a real palm.
    setPalmScanning(true);
    setPalmSuccess(false);
    window.setTimeout(() => {
      setPalmScanning(false);
      setPalmSuccess(false);
      showToast("Palm recognition is a demo animation and is not connected to real authentication.", "info");
    }, 1800);
  };
  return (
    <div className="login-root-container">
      {/* Centered Amazon Logo Header */}
      <div className="login-header-strip">
        <Link to="/" className="amazon-brand-logo">
          <span className="brand-primary">amazon</span>
          <span className="brand-accent-one">one</span>
          <span className="brand-domain">.com</span>
        </Link>
      </div>

      {/* Main Authentication Card */}
      <div className="auth-card-wrap">
        {currentUser ? (
          <div className="signed-in-callout card-base">
            <div className="signed-in-header">
              <div className="signed-in-avatar">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <UserCheck size={18} />
                )}
              </div>
              <div className="signed-in-meta">
                <strong>Signed in as {currentUser.name}</strong>
                <span>{currentUser.email} • {currentUser.membershipTier || 'Prime'}</span>
              </div>
            </div>
            <div className="signed-in-btns">
              <button 
                type="button" 
                onClick={() => navigate(location.state?.from || '/')}
                className="btn-amazon-primary flex-1"
              >
                Enter Home Page &rarr;
              </button>
              <button 
                type="button" 
                onClick={logout}
                className="btn-switch-account"
              >
                Sign Out / Switch
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-gate-banner">
            <Lock size={15} className="text-amber-500" />
            <span>
              <strong>Authentication Required:</strong> Please sign in or create an account before entering the Amazon One home dashboard.
            </span>
          </div>
        )}

        <div className="auth-card card-base">
          {/* Auth Tab Switcher */}
          <div className="auth-mode-tabs">
            <button 
              type="button" 
              onClick={() => setActiveTab('signin')}
              className={`auth-tab-btn ${activeTab === 'signin' ? 'tab-active' : ''}`}
            >
              Sign In
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('signup')}
              className={`auth-tab-btn ${activeTab === 'signup' ? 'tab-active' : ''}`}
            >
              Create Account
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('palm')}
              className={`auth-tab-btn ${activeTab === 'palm' ? 'tab-active' : ''}`}
            >
              <Hand size={14} className="text-amber-500" />
              <span>Amazon One Palm</span>
            </button>
          </div>

          {/* ========================================================== */}
          {/* MODE 1: STANDARD SIGN IN                                  */}
          {/* ========================================================== */}
          {activeTab === 'signin' && (
            <div className="tab-pane-content">
              <h1 className="auth-heading">Sign in</h1>
              <p className="auth-subheading">Access your unified Amazon Shopping, Prime, AWS & Pay account.</p>

              <form onSubmit={handleSignInSubmit} className="auth-form">
                <div className="form-field-group">
                  <label htmlFor="emailOrPhone">Email or mobile phone number</label>
                  <div className="input-wrap">
                    <Mail size={16} className="input-lead-icon" />
                    <input 
                      id="emailOrPhone"
                      type="text" 
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="Enter email or phone..."
                      required
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <div className="label-with-link">
                    <label htmlFor="password">Password</label>
                    <a href="#forgot" onClick={async (e) => {
                        e.preventDefault();
                        try { await resetPassword(emailOrPhone); } catch { /* Error toast is shown by context. */ }
                      }} className="forgot-link">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="input-wrap">
                    <KeyRound size={16} className="input-lead-icon" />
                    <input 
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password..."
                      required
                      className="auth-input"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="toggle-pwd-btn"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-checkbox-row">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="custom-checkbox"
                    />
                    <span>Keep me signed in. <span className="details-text">Details</span></span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-amazon-primary"
                >
                  {isLoading ? (
                    <span className="loading-state">
                      <RefreshCw size={16} className="spin-icon" /> Verifying Credentials...
                    </span>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>

                <div className="conditions-notice">
                  By continuing, you agree to Amazon's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                </div>

                {/* Need Help Accordion */}
                <div className="help-accordion">
                  <button 
                    type="button" 
                    onClick={() => setShowHelp(!showHelp)}
                    className="help-toggle-btn"
                  >
                    {showHelp ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    <span>Need help?</span>
                  </button>

                  {showHelp && (
                    <div className="help-dropdown-content">
                      <a href="#reset" onClick={(e) => { e.preventDefault(); showToast("Recovery email dispatched", "info"); }}>
                        Forgot your password?
                      </a>
                      <a href="#other" onClick={(e) => { e.preventDefault(); showToast("Customer support line: (888) 280-4331", "info"); }}>
                        Other issues with Sign-In
                      </a>
                    </div>
                  )}
                </div>
              </form>

              {/* Official Amazon Divider & Create Account CTA */}
              <div className="new-to-amazon-section">
                <div className="divider-row">
                  <div className="divider-line"></div>
                  <span className="divider-label">New to Amazon?</span>
                  <div className="divider-line"></div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('signup')}
                  className="btn-create-account-secondary"
                >
                  Create your Amazon account
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* MODE 2: CREATE ACCOUNT                                    */}
          {/* ========================================================== */}
          {activeTab === 'signup' && (
            <div className="tab-pane-content">
              <h1 className="auth-heading">Create Account</h1>
              <p className="auth-subheading">Start your 30-day Amazon Prime trial with all-in-one ecosystem access.</p>

              <form onSubmit={handleSignUpSubmit} className="auth-form">
                <div className="form-field-group">
                  <label htmlFor="regName">Your name</label>
                  <input 
                    id="regName"
                    type="text" 
                    placeholder="First and last name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="auth-input-standard"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="regEmail">Mobile number or email</label>
                  <input 
                    id="regEmail"
                    type="email" 
                    placeholder="e.g. name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="auth-input-standard"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="regPassword">Password</label>
                  <input 
                    id="regPassword"
                    type="password" 
                    placeholder="At least 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="auth-input-standard"
                  />
                  <span className="field-hint"><AlertCircle size={12} /> Passwords must be at least 6 characters.</span>
                </div>

                <div className="form-field-group">
                  <label htmlFor="regConfirmPassword">Re-enter password</label>
                  <input 
                    id="regConfirmPassword"
                    type="password" 
                    placeholder="Confirm password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                    className="auth-input-standard"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn-amazon-primary"
                >
                  {isLoading ? "Creating Amazon Account..." : "Create your Amazon account"}
                </button>

                <div className="conditions-notice">
                  By creating an account, you agree to Amazon's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                </div>

                <div className="already-customer-bar">
                  <span>Already have an account?</span>
                  <button type="button" onClick={() => setActiveTab('signin')} className="switch-signin-link">
                    Sign in <ArrowRight size={13} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================== */}
          {/* MODE 3: AMAZON ONE CONTACTLESS PALM SCANNER                */}
          {/* ========================================================== */}
          {activeTab === 'palm' && (
            <div className="tab-pane-content palm-tab-content">
              <div className="palm-hero-badge">
                <Sparkles size={14} className="text-amber-500" />
                <span>Contactless Biometrics</span>
              </div>
              <h2 className="auth-heading">Amazon One Palm Recognition</h2>
              <p className="auth-subheading">
                Sign in without phone or passwords. Hover your registered palm over the sensor to authenticate across Whole Foods, Amazon Fresh, and Amazon One.
              </p>

              <div className="palm-scanner-zone">
                <div className={`palm-sensor-chassis ${palmScanning ? 'sensor-scanning' : ''} ${palmSuccess ? 'sensor-success' : ''}`}>
                  <div className="palm-radar-pulse"></div>
                  <div className="palm-radar-pulse pulse-delay"></div>
                  <Hand size={72} className={`palm-hand-icon ${palmScanning ? 'hand-scanning' : ''} ${palmSuccess ? 'hand-success' : ''}`} />
                </div>

                <span className="scanner-status-label">
                  {palmScanning ? "Scanning sub-dermal palm vein signatures..." : palmSuccess ? "Verified! Identity Authenticated" : "Hold palm 2 inches above reader"}
                </span>

                <button 
                  type="button" 
                  onClick={handlePalmScan}
                  disabled={palmScanning}
                  className="btn-palm-scan"
                >
                  <Hand size={18} />
                  <span>{palmScanning ? "Verifying..." : "Simulate Palm Recognition Scan"}</span>
                </button>
              </div>

              <div className="palm-security-footnote">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Prototype animation only. Palm biometrics are not connected to authentication.</span>
              </div>
            </div>
          )}
        </div>

        {/* QUICK 1-CLICK DEMO PERSONAS BAR */}
        <div className="quick-personas-card card-base">
          <div className="personas-head">
            <UserCheck size={16} className="text-amber-500" />
            <strong>Quick Demo 1-Click Profiles:</strong>
          </div>

          <div className="personas-pills-row">
            {DEMO_PERSONAS.map(p => (
              <button 
                key={p.email}
                type="button"
                onClick={() => handleQuickLogin(p)}
                className="persona-btn"
                title={`Click to instantly sign in as ${p.name}`}
              >
                <img src={p.avatar} alt={p.name} className="persona-avatar" />
                <div className="persona-text">
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        <div className="footer-links-row">
          <a href="#conditions">Conditions of Use</a>
          <a href="#privacy">Privacy Notice</a>
          <a href="#help">Help Center</a>
          <a href="#cookies">Cookie Preferences</a>
        </div>
        <p className="copyright-txt">© 1996–2026, Amazon.com, Inc. or its affiliates. Amazon One Prototype Demo.</p>
      </footer>

      <style>{`
        .login-root-container {
          min-height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem 3rem 1.5rem;
          background: #ffffff;
        }

        /* Header Brand */
        .login-header-strip {
          margin-bottom: 1.5rem;
        }
        .amazon-brand-logo {
          display: inline-flex;
          align-items: baseline;
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.04em;
          text-decoration: none;
        }
        .brand-primary {
          color: #111827;
        }
        .brand-accent-one {
          color: #ff9900;
          margin-left: 0.15rem;
          font-weight: 900;
        }
        .brand-domain {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Auth Card */
        .auth-card-wrap {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .auth-gate-banner {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          border-radius: 8px;
          padding: 0.85rem 1rem;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          line-height: 1.45;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .signed-in-callout {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          padding: 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
        }
        .signed-in-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .signed-in-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ff9900;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .signed-in-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .signed-in-meta {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }
        .signed-in-meta strong {
          font-size: 0.92rem;
          color: #0f172a;
        }
        .signed-in-meta span {
          font-size: 0.75rem;
          color: #64748b;
        }
        .signed-in-btns {
          display: flex;
          gap: 0.5rem;
        }
        .btn-switch-account {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .btn-switch-account:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .new-to-amazon-section {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .divider-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        .divider-label {
          font-size: 0.75rem;
          color: #767676;
          font-weight: 500;
          white-space: nowrap;
        }
        .btn-create-account-secondary {
          width: 100%;
          background: #ffffff;
          border: 1px solid #d5d9d9;
          border-radius: 8px;
          color: #0f172a;
          padding: 0.65rem 1rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(213, 217, 217, 0.4);
          transition: all 150ms ease;
          text-align: center;
        }
        .btn-create-account-secondary:hover {
          background: #f7fafa;
          border-color: #a88734;
        }
        .auth-card {
          background: #ffffff;
          border: 1px solid #d5d9d9;
          border-radius: 12px;
          padding: 1.75rem 2rem 2rem 2rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        /* Tabs */
        .auth-mode-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 1.5rem;
          gap: 0.25rem;
        }
        .auth-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0.65rem 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          transition: all var(--transition-fast);
        }
        .auth-tab-btn:hover {
          color: #0f172a;
        }
        .tab-active {
          color: #0f172a !important;
          border-bottom-color: #ff9900 !important;
          font-weight: 700 !important;
        }

        .auth-heading {
          font-size: 1.85rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }
        .auth-subheading {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.45;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-field-group label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #111827;
        }
        .label-with-link {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .forgot-link {
          font-size: 0.78rem;
          color: #007185;
          text-decoration: none;
        }
        .forgot-link:hover {
          color: #c45500;
          text-decoration: underline;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #888c8c;
          border-radius: 6px;
          padding: 0.6rem 0.85rem;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .input-wrap:focus-within {
          border-color: #e77600;
          box-shadow: 0 0 0 3px rgba(228, 121, 17, 0.25);
        }
        .input-lead-icon {
          color: #64748b;
          margin-right: 0.6rem;
        }
        .auth-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.95rem;
          color: #0f172a;
        }
        .toggle-pwd-btn {
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }
        .toggle-pwd-btn:hover {
          color: #0f172a;
        }

        .auth-input-standard {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border: 1px solid #888c8c;
          border-radius: 6px;
          font-size: 0.95rem;
          outline: none;
        }
        .auth-input-standard:focus {
          border-color: #e77600;
          box-shadow: 0 0 0 3px rgba(228, 121, 17, 0.25);
        }
        .field-hint {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        .form-checkbox-row {
          margin: 0.25rem 0;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #111827;
          cursor: pointer;
        }
        .custom-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .details-text {
          color: #007185;
        }

        /* Amazon Primary Button */
        .btn-amazon-primary {
          background: #ffd814;
          border: 1px solid #fcd200;
          border-radius: 8px;
          color: #0f172a;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5);
          transition: all 150ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-amazon-primary:hover {
          background: #f7ca00;
          border-color: #f2c200;
        }
        .loading-state {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .conditions-notice {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.45;
          margin-top: 0.25rem;
        }
        .conditions-notice a {
          color: #007185;
          text-decoration: none;
        }
        .conditions-notice a:hover {
          text-decoration: underline;
        }

        /* Need Help */
        .help-accordion {
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }
        .help-toggle-btn {
          background: transparent;
          border: none;
          color: #007185;
          font-size: 0.82rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          padding: 0;
        }
        .help-toggle-btn:hover {
          color: #c45500;
          text-decoration: underline;
        }
        .help-dropdown-content {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.65rem;
          padding-left: 1rem;
        }
        .help-dropdown-content a {
          font-size: 0.8rem;
          color: #007185;
          text-decoration: none;
        }
        .help-dropdown-content a:hover {
          text-decoration: underline;
        }

        .already-customer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.85rem;
        }
        .switch-signin-link {
          background: transparent;
          border: none;
          color: #007185;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Palm Biometric Scanner */
        .palm-tab-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .palm-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #fffbeb;
          color: #92400e;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }
        .palm-scanner-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          margin: 1.25rem 0;
          width: 100%;
        }
        .palm-sensor-chassis {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);
          border: 3px solid #f59e0b;
          transition: all 300ms ease;
        }
        .sensor-scanning {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.4) !important;
        }
        .sensor-success {
          border-color: #10b981 !important;
          box-shadow: 0 0 35px rgba(16, 185, 129, 0.5) !important;
        }
        .palm-radar-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #f59e0b;
          animation: radarWave 2s infinite ease-out;
        }
        .pulse-delay {
          animation-delay: 1s;
        }
        @keyframes radarWave {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .palm-hand-icon {
          color: #f59e0b;
          z-index: 2;
          transition: color 250ms ease;
        }
        .hand-scanning {
          color: #38bdf8;
          animation: handHover 1.5s infinite ease-in-out;
        }
        .hand-success {
          color: #10b981;
        }
        @keyframes handHover {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
        }
        .scanner-status-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
        }
        .btn-palm-scan {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .btn-palm-scan:hover {
          background: #1e293b;
        }
        .palm-security-footnote {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #64748b;
          background: #f8fafc;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
        }

        /* Demo Profiles Card */
        .quick-personas-card {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 1.25rem;
        }
        .personas-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #334155;
          margin-bottom: 0.75rem;
        }
        .personas-pills-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .persona-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          transition: all 150ms ease;
        }
        .persona-btn:hover {
          border-color: #ff9900;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .persona-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
        }
        .persona-text {
          display: flex;
          flex-direction: column;
        }
        .persona-text strong {
          font-size: 0.85rem;
          color: #0f172a;
        }
        .persona-text span {
          font-size: 0.72rem;
          color: #64748b;
        }

        /* Footer */
        .login-footer {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 1.5rem;
          width: 100%;
          max-width: 500px;
        }
        .footer-links-row {
          display: flex;
          gap: 1.5rem;
          font-size: 0.75rem;
        }
        .footer-links-row a {
          color: #007185;
          text-decoration: none;
        }
        .footer-links-row a:hover {
          text-decoration: underline;
        }
        .copyright-txt {
          font-size: 0.72rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}

