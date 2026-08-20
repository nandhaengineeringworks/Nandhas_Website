'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nandhas_compare');
      if (saved) setCompareItems(JSON.parse(saved));
    } catch (error) {
      console.error('Compare storage error:', error);
    }
  }, []);

  const save = (items) => {
    setCompareItems(items);
    try { localStorage.setItem('nandhas_compare', JSON.stringify(items)); } catch (error) {}
  };

  const addToCompare = (product) => {
    if (!product || compareItems.some((item) => item.id === product.id) || compareItems.length >= 3) return;
    save([...compareItems, product]);
  };

  const removeFromCompare = (id) => save(compareItems.filter((item) => item.id !== id));
  const clearCompare = () => save([]);
  const isInCompare = (id) => compareItems.some((item) => item.id === id);

  return <CompareContext.Provider value={{ compareItems, compareCount: compareItems.length, addToCompare, removeFromCompare, clearCompare, isInCompare }}>{children}</CompareContext.Provider>;
}

export const useCompare = () => useContext(CompareContext);
