'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, 
  Phone,
  KeyRound,
  AlertCircle, 
  Loader2, 
  Shield,
  ChevronRight,
  LogIn,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { loginWithFirebase } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveAuth, isAuthenticated, sendOtp, getFirebaseIdToken } = useAuth();

  // 'phone' | 'otp' | 'create'
  const [step, setStep] = useState('phone'); 
  
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [tempToken, setTempToken] = useState(null);
  
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

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number with country code (e.g., +91).');
      return;
    }

    if (step === 'create' && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      // Ensure E.164 format roughly
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }
      
      const result = await sendOtp(formattedPhone, 'recaptcha-container');
      setConfirmationResult(result);
      setStep('otp');
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Please check your phone number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!confirmationResult) throw new Error('No OTP session found.');
      
      // Verify OTP with Firebase
      await confirmationResult.confirm(otp);
      
      // Get Firebase ID Token
      const idToken = await getFirebaseIdToken();
      if (!idToken) throw new Error('Authentication failed. No token received.');

      // Send to our backend POST /api/auth/firebase
      const data = await loginWithFirebase(idToken, step === 'create' || step === 'complete-profile' ? fullName : null);

      if (data?.message === 'PROFILE_INCOMPLETE') {
        setTempToken(idToken);
        setStep('complete-profile');
        setLoading(false);
        return;
      }

      if (!data?.token) {
        throw new Error('Server did not return a valid session.');
      }

      // Store the JWT and user info
      saveAuth(data.token, {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      });

      router.replace(redirectTo);
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('Invalid OTP code. Please try again.');
      } else {
        setError(
          err?.response?.data?.message ||
          'Verification failed. The code might be expired or incorrect.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (!tempToken) throw new Error('Session expired. Please start over.');

      const data = await loginWithFirebase(tempToken, fullName);

      if (!data?.token) {
        throw new Error('Server did not return a valid session.');
      }

      // Store the JWT and user info
      saveAuth(data.token, {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      });

    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'Failed to save your profile. Please try again.'
      );
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
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">

          {/* Invisible ReCAPTCHA Container */}
          <div id="recaptcha-container"></div>

          {/* Header Banner */}
          <div className="bg-navy-800 px-8 py-7 text-white text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
              {(step === 'create' || step === 'complete-profile') ? <User className="w-6 h-6 text-white" /> : <Phone className="w-6 h-6 text-white" />}
            </div>
            <h1 className="text-xl font-black font-display tracking-tight">
              {step === 'create' ? 'Create Account' : step === 'complete-profile' ? 'Complete Profile' : 'My Account — Login'}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {step === 'create' 
                ? 'Join Nandhas to track orders and manage quotations.' 
                : step === 'complete-profile'
                  ? 'We just need your name to finish setting up your account.'
                  : 'Sign in to access your Nandhas account with your phone number.'}
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

            {/* STEP: PHONE ENTRY */}
            {step === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="login-phone" className="block text-xs font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="login-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 99999 99999"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Send OTP</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP: CREATE ACCOUNT */}
            {step === 'create' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="create-name" className="block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="create-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="create-phone" className="block text-xs font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="create-phone"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 99999 99999"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4" />
                      <span>Send OTP</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP: VERIFY OTP */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center pb-2">
                  <p className="text-xs text-slate-500">OTP sent to <span className="font-bold text-slate-900">{phoneNumber}</span></p>
                  <button type="button" onClick={() => setStep('phone')} className="text-[10px] text-accent-orange font-bold hover:underline mt-1">Change Number</button>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="otp-code" className="block text-xs font-semibold text-slate-700">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="otp-code"
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full pl-10 pr-4 py-3 text-center tracking-[0.5em] font-mono text-lg rounded-xl border border-slate-200 text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-sans placeholder:text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full py-3.5 rounded-xl bg-accent-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify OTP &amp; Login</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP: COMPLETE PROFILE */}
            {step === 'complete-profile' && (
              <form onSubmit={handleCompleteProfile} className="space-y-4">
                <div className="text-center pb-2">
                  <p className="text-xs text-slate-500">Almost done! Please enter your name to complete your account.</p>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="complete-name" className="block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="complete-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !fullName.trim()}
                  className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Account</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Security Note */}
            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Your login is secured using Firebase authentication. We never store passwords.</span>
            </div>
          </div>
          
          {/* Toggle Create / Login */}
          {(step === 'phone' || step === 'create') && (
            <div className="border-t border-slate-100 bg-slate-50 px-7 py-4 text-center">
              {step === 'phone' ? (
                <p className="text-xs text-slate-500">
                  New to Nandhas?{' '}
                  <button type="button" onClick={() => setStep('create')} className="font-bold text-navy-800 hover:text-accent-orange transition">
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setStep('phone')} className="font-bold text-navy-800 hover:text-accent-orange transition">
                    Sign In
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
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
