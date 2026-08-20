'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPublicSettings } from '../services/api';

const SettingsContext = createContext({
  showPrices: false,
  b2bMode: true,
  loading: true,
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    showPrices: false,
    b2bMode: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getPublicSettings();
      if (data) {
        setSettings({
          showPrices: Boolean(data.showPrices),
          b2bMode: data.b2bMode !== undefined ? Boolean(data.b2bMode) : true,
        });
      }
    } catch (err) {
      console.error('SettingsContext fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        showPrices: settings.showPrices,
        b2bMode: settings.b2bMode,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
