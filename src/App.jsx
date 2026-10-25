import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Amazon One Navigation & Sidebar
import OneNavbar from './components/OneNavbar';
import OneSidebar from './components/OneSidebar';
import Footer from './components/Footer';

// Core Amazon One Pages
import OneDashboard from './pages/OneDashboard';
import OneAllServices from './pages/OneAllServices';
import ServiceDetails from './pages/ServiceDetails';
import OneShopping from './pages/OneShopping';
import OnePayments from './pages/OnePayments';
import OneEntertainment from './pages/OneEntertainment';
import OneReading from './pages/OneReading';
import OneDevices from './pages/OneDevices';
import OneCloud from './pages/OneCloud';
import OneBusiness from './pages/OneBusiness';
import OneAssistant from './pages/OneAssistant';
import OneCart from './pages/OneCart';
import OneFavorites from './pages/OneFavorites';
import OneSettings from './pages/OneSettings';
import OneMaps from './pages/OneMaps';
import OneLogin from './pages/OneLogin';

// Retail Spec Analysis Pages (Preserved for compatibility analysis & selling)
import ProductDetails from './pages/ProductDetails';
import AnalysisResults from './pages/AnalysisResults';
import Alternatives from './pages/Alternatives';
import SellProduct from './pages/SellProduct';

import { useOne } from './context/OneContext';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useOne();

  return (
    <div className="app-container">
      {/* Toast Notification Float */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <OneNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Layout Area with Collapsible Sidebar */}
      <div className="app-body-layout">
        <OneSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="main-content-scroll">
          <div className="app-page-wrapper">
            <Routes>
              {/* Dashboard & Services */}
              <Route path="/" element={<OneDashboard />} />
              <Route path="/services" element={<OneAllServices />} />
              <Route path="/services/:serviceId" element={<ServiceDetails />} />
              <Route path="/maps" element={<OneMaps />} />

              {/* Ecosystem Service Pages */}
              <Route path="/shopping" element={<OneShopping />} />
              <Route path="/payments" element={<OnePayments />} />
              <Route path="/entertainment" element={<OneEntertainment />} />
              <Route path="/reading" element={<OneReading />} />
              <Route path="/devices" element={<OneDevices />} />
              <Route path="/cloud" element={<OneCloud />} />
              <Route path="/business" element={<OneBusiness />} />

              {/* AI Concierge Assistant */}
              <Route path="/assistant" element={<OneAssistant />} />

              {/* Authentication */}
              <Route path="/login" element={<OneLogin />} />

              {/* Personalization, Cart & Favorites */}
              <Route path="/cart" element={<OneCart />} />
              <Route path="/favorites" element={<OneFavorites />} />
              <Route path="/settings" element={<OneSettings />} />

              {/* Product Spec Analysis & Marketplace */}
              <Route path="/sell" element={<SellProduct />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/analysis/:id" element={<AnalysisResults />} />
              <Route path="/alternatives/:id" element={<Alternatives />} />

              {/* 404 Fallback Page */}
              <Route path="*" element={
                <div className="card-base" style={{ padding: '4rem 2rem', textAlign: 'center', background: '#fff' }}>
                  <h1 style={{ fontSize: '2.5rem', color: 'var(--color-navy-dark)', marginBottom: '0.5rem' }}>404</h1>
                  <h2 style={{ fontSize: '1.3rem', color: 'var(--color-navy-dark)', marginBottom: '0.5rem' }}>Service Page Not Found</h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>The requested route is not available in the Amazon One prototype.</p>
                  <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>Return to Dashboard</Link>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>

      <Footer />

      <style>{`
        .app-body-layout {
          display: flex;
          flex: 1;
          min-height: calc(100vh - 120px);
          position: relative;
        }
        .main-content-scroll {
          flex: 1;
          overflow-y: auto;
          background-color: var(--color-bg-main);
        }
        .app-page-wrapper {
          max-width: 1360px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem 1.5rem;
        }
        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 2000;
          box-shadow: var(--shadow-xl);
          animation: slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .toast-success {
          background: #166534;
          color: #ffffff;
        }
        .toast-info {
          background: #1e3a8a;
          color: #ffffff;
        }
        .toast-warning {
          background: #b45309;
          color: #ffffff;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
