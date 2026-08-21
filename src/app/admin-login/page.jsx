'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2, 
  Shield,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { loginUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveAuth, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Where to redirect after successful login (default: homepage)
  const redirectTo = searchParams?.get('redirect') || '/';

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email.trim().toLowerCase(), password);

      if (!data?.token) {
        throw new Error('No token received from server. Please try again.');
      }

      // Store the JWT and user info
      saveAuth(data.token, {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      });

      // Navigate to redirect target or homepage
      router.replace(redirectTo);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (status === 404) {
        setError('Account not found.');
      } else {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Login failed. Please try again or contact support.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-10 px-4 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-md space-y-6">

        {/* Card */}
        <div className="bg-slate-800 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">

          {/* Header Banner */}
          <div className="bg-slate-950 px-8 py-7 text-white text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <h1 className="text-xl font-black font-display tracking-tight text-slate-100">Admin Authentication</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Restricted access for Nandhas administration.
            </p>
          </div>

          {/* Form */}
          <div className="px-7 py-8 space-y-5">

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-900/30 border border-red-800 rounded-xl text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300">
                  Admin Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@nandhas.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 text-xs text-slate-200 bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-700 text-xs text-slate-200 bg-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Secure Login</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <AdminLoginContent />
    </Suspense>
  );
}
