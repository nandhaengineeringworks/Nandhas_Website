'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Auth Context — wraps JWT-based login/logout state for the website
// Backend endpoint: POST https://api.nandhas.in/api/auth/login
// Token is stored in localStorage under 'nandhas_auth_token'
// ---------------------------------------------------------------------------

const AUTH_TOKEN_KEY = 'nandhas_auth_token';
const AUTH_USER_KEY = 'nandhas_auth_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { id, email, fullName, role }
  const [token, setToken] = useState(null);     // JWT string
  const [loading, setLoading] = useState(true); // hydrating from localStorage

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // Ignore parse errors — treat as logged out
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Called after a successful POST /api/auth/login response.
   * @param {string} jwtToken - Bearer token returned from the backend
   * @param {object} userInfo - { id, email, fullName, role }
   */
  const saveAuth = useCallback((jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userInfo));
    } catch (e) {
      // localStorage blocked (e.g. private browsing) — still keep in state
    }
  }, []);

  /**
   * Clear authentication state and storage.
   */
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {}
  }, []);

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication state throughout the app.
 * Usage: const { user, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

export default AuthContext;
