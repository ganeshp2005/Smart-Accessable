import React, { createContext, useContext, useState, useEffect } from 'react';

const OneContext = createContext();

export function OneProvider({ children }) {
  // Favorites storage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_one_favorites');
      return saved ? JSON.parse(saved) : ['amazon-shopping', 'prime-video', 'aws', 'amazon-pay'];
    } catch {
      return ['amazon-shopping', 'prime-video', 'aws', 'amazon-pay'];
    }
  });

  // Recently visited services
  const [recentlyVisited, setRecentlyVisited] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_one_recents');
      return saved ? JSON.parse(saved) : ['prime-video', 'amazon-shopping', 'alexa-echo'];
    } catch {
      return ['prime-video', 'amazon-shopping', 'alexa-echo'];
    }
  });

  // User selected interests for personalized dashboard
  const [userInterests, setUserInterests] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_one_interests');
      return saved ? JSON.parse(saved) : ['Shopping', 'Entertainment', 'Cloud', 'Devices'];
    } catch {
      return ['Shopping', 'Entertainment', 'Cloud', 'Devices'];
    }
  });

  // Demo Cart items
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_one_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current User authentication state - starts null until user logs in or registers
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // Clear legacy mock key from earlier development
      localStorage.removeItem('amazon_one_user');
      const saved = localStorage.getItem('amazon_one_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast Notifications
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('amazon_one_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('amazon_one_recents', JSON.stringify(recentlyVisited));
  }, [recentlyVisited]);

  useEffect(() => {
    localStorage.setItem('amazon_one_interests', JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem('amazon_one_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('amazon_one_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('amazon_one_auth_user');
      localStorage.removeItem('amazon_one_user');
    }
  }, [currentUser]);

  const login = (userData) => {
    const user = {
      ...userData,
      isLoggedIn: true,
      lastLogin: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('amazon_one_auth_user', JSON.stringify(user));
    showToast(`Welcome back, ${user.name}! Prime membership verified.`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('amazon_one_auth_user');
    localStorage.removeItem('amazon_one_user');
    showToast("Signed out. Please sign in or create an account to enter.", 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const toggleFavorite = (serviceId) => {
    setFavorites(prev => {
      const isFav = prev.includes(serviceId);
      const next = isFav ? prev.filter(id => id !== serviceId) : [...prev, serviceId];
      showToast(isFav ? "Removed from Favorites" : "Saved to My Favorites!", "success");
      return next;
    });
  };

  const recordVisit = (serviceId) => {
    setRecentlyVisited(prev => {
      const filtered = prev.filter(id => id !== serviceId);
      return [serviceId, ...filtered].slice(0, 6);
    });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        showToast(`Increased quantity for ${product.name}`, 'info');
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      showToast(`Added "${product.name}" to Demo Cart!`, 'success');
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared", "info");
  };

  return (
    <OneContext.Provider value={{
      favorites,
      toggleFavorite,
      recentlyVisited,
      recordVisit,
      userInterests,
      setUserInterests,
      currentUser,
      login,
      logout,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      toast,
      showToast
    }}>
      {children}
    </OneContext.Provider>
  );
}

export function useOne() {
  const context = useContext(OneContext);
  if (!context) throw new Error('useOne must be used within a OneProvider');
  return context;
}
