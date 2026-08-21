'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut, getIdToken } from 'firebase/auth';
import { auth } from '../services/firebase';

// ---------------------------------------------------------------------------
// Auth Context — wraps Firebase Phone Auth and our custom JWT backend state
// ---------------------------------------------------------------------------

const AUTH_TOKEN_KEY = 'nandhas_auth_token';
const AUTH_USER_KEY = 'nandhas_auth_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Backend user: { id, email, fullName, role }
  const [token, setToken] = useState(null);     // Backend JWT string
  const [firebaseUser, setFirebaseUser] = useState(null); // Firebase user object
  const [loading, setLoading] = useState(true); // initializing

  // Hydrate from localStorage on mount (client only) for backend session
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
    }
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveAuth = useCallback((jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userInfo));
    } catch (e) {
      // localStorage blocked
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth); // Sign out of Firebase
    } catch (err) {
      console.error('Firebase signout error:', err);
    }
    
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {}
  }, []);

  // Firebase Phone Auth methods
  const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
      });
    }
  };

  const sendOtp = async (phoneNumber, containerId) => {
    setupRecaptcha(containerId);
    const appVerifier = window.recaptchaVerifier;
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  const getFirebaseIdToken = async () => {
    if (!auth.currentUser) return null;
    return await getIdToken(auth.currentUser, true);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      firebaseUser,
      isAuthenticated, 
      loading, 
      saveAuth, 
      logout,
      sendOtp,
      getFirebaseIdToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

export default AuthContext;
