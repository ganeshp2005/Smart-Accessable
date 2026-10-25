import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleProducts as initialProducts } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'amazon_alexa_plus_products';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Error loading products from storage:', err);
    }
    return initialProducts;
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to storage:', err);
    }
  }, [products]);

  // Add a newly listed product
  const addProduct = (newProduct) => {
    const formattedProduct = {
      ...newProduct,
      id: newProduct.id || `seller-prod-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      badge: newProduct.badge || "Community Seller",
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [formattedProduct, ...prev]);
    return formattedProduct;
  };

  // Get product by id
  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
