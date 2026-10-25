import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ProductProvider } from './context/ProductContext';
import { OneProvider } from './context/OneContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <OneProvider>
          <App />
        </OneProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
