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

function LoginContent() {
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

      // Store the JWT and user info using AuthContext (saves to localStorage)
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
        setError('Account not found. Please contact Nandhas Engineering Works support.');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center py-10 px-4 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-md space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">My Account</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

          {/* Header Banner */}
          <div className="bg-navy-800 px-8 py-7 text-white text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black font-display tracking-tight">My Account — Login</h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sign in to access your Nandhas account, orders, and quotation history.
            </p>
          </div>

          {/* Form */}
          <div className="px-7 py-8 space-y-5">

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to My Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Your login is secured using JWT authentication. We never store your password.</span>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-slate-500">
          Need help?{' '}
          <Link href="/contact" className="font-bold text-navy-800 hover:text-accent-orange transition">
            Contact Nandhas Support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-800/20 border-t-navy-800" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
