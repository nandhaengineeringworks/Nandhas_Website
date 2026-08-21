'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, 
  Phone,
  Mail,
  KeyRound,
  AlertCircle, 
  Loader2, 
  Shield,
  ChevronRight,
  LogIn,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { loginWithFirebase, checkPhoneNumber } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveAuth, isAuthenticated, sendOtp, getFirebaseIdToken } = useAuth();

  // Steps: 'lookup' | 'register' | 'otp'
  const [step, setStep] = useState('lookup'); 
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  // Auth state flags
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [existingUserName, setExistingUserName] = useState('');
  
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect target after login (default: homepage)
  const redirectTo = searchParams?.get('redirect') || '/';

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Helper to ensure E.164 format (+91...)
  const formatPhoneNumber = (phone) => {
    let clean = phone.replace(/[^\d+]/g, '').trim();
    if (!clean.startsWith('+')) {
      if (clean.length === 10) {
        clean = '+91' + clean;
      } else if (clean.startsWith('91') && clean.length === 12) {
        clean = '+' + clean;
      } else {
        clean = '+91' + clean;
      }
    }
    return clean;
  };

  /**
   * STEP 1: Lookup Phone in Database
   */
  const handlePhoneLookup = async (e) => {
    if (e) e.preventDefault();
    setError('');

    const raw = phoneNumber.replace(/[^\d]/g, '');
    if (raw.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formatted = formatPhoneNumber(phoneNumber);
    setLoading(true);

    try {
      // 1. Check if user exists in backend database
      const checkResult = await checkPhoneNumber(formatted);

      if (checkResult && checkResult.exists) {
        // User exists -> trigger OTP for direct login
        setIsExistingUser(true);
        setExistingUserName(checkResult.fullName || '');
        if (checkResult.email) setEmail(checkResult.email);

        const result = await sendOtp(formatted, 'recaptcha-container');
        setConfirmationResult(result);
        setResendCooldown(30);
        setStep('otp');
      } else {
        // User does not exist -> navigate to Registration form
        setIsExistingUser(false);
        setStep('register');
      }
    } catch (err) {
      console.error('Phone lookup error:', err);
      setError('Unable to verify mobile number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 2: Register New User & Send OTP
   */
  const handleRegisterAndSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const raw = phoneNumber.replace(/[^\d]/g, '');
    if (raw.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formatted = formatPhoneNumber(phoneNumber);
    setLoading(true);

    try {
      const result = await sendOtp(formatted, 'recaptcha-container');
      setConfirmationResult(result);
      setResendCooldown(30);
      setStep('otp');
    } catch (err) {
      console.error('Send OTP error during registration:', err);
      setError('Failed to send verification code. Please check your number and try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resend OTP Action
   */
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);

    try {
      const formatted = formatPhoneNumber(phoneNumber);
      const result = await sendOtp(formatted, 'recaptcha-container');
      setConfirmationResult(result);
      setResendCooldown(30);
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Failed to resend OTP. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * STEP 3: Verify OTP & Directly Login
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);

    try {
      if (!confirmationResult) {
        throw new Error('No active OTP session found. Please request a new code.');
      }
      
      // 1. Verify OTP with Firebase
      await confirmationResult.confirm(otp);
      
      // 2. Get Firebase ID Token
      const idToken = await getFirebaseIdToken();
      if (!idToken) {
        throw new Error('Authentication failed. No token received from provider.');
      }

      // 3. Send ID token + details to Backend
      const payloadName = (!isExistingUser || !existingUserName) ? fullName : existingUserName;
      const data = await loginWithFirebase(idToken, payloadName, email.trim() || null);

      if (!data?.token) {
        throw new Error('Server did not return a valid session.');
      }

      // 4. Save session and auto-login
      saveAuth(data.token, {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      });

      // 5. Redirect to destination
      router.replace(redirectTo);
    } catch (err) {
      console.error('Verification error:', err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('Invalid or expired OTP code. Please try again.');
      } else {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Verification failed. The code might be expired or incorrect.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 flex items-center justify-center py-12 px-4 w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-md space-y-6">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-semibold transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">
            {step === 'register' ? 'Register Account' : 'My Account'}
          </span>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden relative">

          {/* Invisible ReCAPTCHA Container */}
          <div id="recaptcha-container"></div>

          {/* Card Header Banner */}
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 px-8 py-8 text-white text-center relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-orange/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mb-3.5 shadow-inner">
              {step === 'register' ? (
                <UserPlus className="w-7 h-7 text-accent-orange" />
              ) : step === 'otp' ? (
                <KeyRound className="w-7 h-7 text-accent-orange" />
              ) : (
                <Phone className="w-7 h-7 text-accent-orange" />
              )}
            </div>

            <h1 className="text-xl font-black font-display tracking-tight text-white">
              {step === 'register' 
                ? 'Create New Account' 
                : step === 'otp' 
                  ? (isExistingUser ? 'Welcome Back!' : 'Verify Mobile Number')
                  : 'Sign In / Register'}
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed mt-1 max-w-xs mx-auto">
              {step === 'register'
                ? 'Fill in your details to register and track your orders.'
                : step === 'otp'
                  ? (isExistingUser 
                      ? `Hi ${existingUserName || 'there'}! Enter the 6-digit OTP code sent to your mobile.`
                      : `Enter the 6-digit verification code sent to your phone.`)
                  : 'Enter your 10-digit mobile number. We will check your account automatically.'}
            </p>
          </div>

          {/* Card Body */}
          <div className="px-7 py-8 space-y-5">

            {/* Error Notification Alert */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50/90 border border-red-200 rounded-2xl text-xs text-red-700 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* STEP 1: MOBILE LOOKUP                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {step === 'lookup' && (
              <form onSubmit={handlePhoneLookup} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="lookup-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 pointer-events-none">
                      +91
                    </span>
                    <input
                      id="lookup-phone"
                      type="tel"
                      required
                      maxLength={10}
                      autoFocus
                      value={phoneNumber.replace(/[^\d]/g, '').slice(-10)}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50/80 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Enter your registered 10-digit Indian mobile number.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.replace(/[^\d]/g, '').length < 10}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-navy-950/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Checking Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* STEP 2: REGISTRATION FORM (NEW USER)                           */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {step === 'register' && (
              <form onSubmit={handleRegisterAndSendOtp} className="space-y-4">
                
                {/* Friendly notice that user was not found */}
                <div className="p-3 bg-blue-50/80 border border-blue-200/60 rounded-2xl flex items-start gap-2 text-xs text-blue-800">
                  <Sparkles className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                  <span>
                    No account found with <strong>+91 {phoneNumber.replace(/[^\d]/g, '').slice(-10)}</strong>. Let's create your account in seconds!
                  </span>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="reg-name"
                      type="text"
                      required
                      autoFocus
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800 bg-slate-50/80 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address <span className="text-slate-400 font-normal normal-case text-[11px]">(optional for invoices)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800 bg-slate-50/80 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mobile Number (Pre-filled, editable) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setStep('lookup')} 
                      className="text-[11px] font-bold text-accent-orange hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 pointer-events-none">
                      +91
                    </span>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={phoneNumber.replace(/[^\d]/g, '').slice(-10)}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full pl-16 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50/80 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition"
                    />
                  </div>
                </div>

                {/* Register & Send OTP Button */}
                <button
                  type="submit"
                  disabled={loading || !fullName.trim() || phoneNumber.replace(/[^\d]/g, '').length < 10}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Register &amp; Send OTP</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* STEP 3: OTP VERIFICATION & INSTANT LOGIN                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                
                {/* OTP Target Info Badge */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center space-y-1">
                  <p className="text-xs text-slate-600">
                    OTP sent to <span className="font-bold text-slate-900">{formatPhoneNumber(phoneNumber)}</span>
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setStep(isExistingUser ? 'lookup' : 'register')} 
                    className="text-[11px] font-bold text-accent-orange hover:underline transition"
                  >
                    Edit Phone Number
                  </button>
                </div>
                
                {/* OTP Input Field */}
                <div className="space-y-1.5">
                  <label htmlFor="otp-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
                    Enter 6-Digit OTP
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="otp-input"
                      type="text"
                      required
                      autoFocus
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="• • • • • •"
                      className="w-full pl-12 pr-4 py-4 text-center tracking-[0.6em] font-mono text-xl font-bold rounded-2xl border border-slate-200 text-slate-900 bg-slate-50/80 outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800 transition placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
                    />
                  </div>
                </div>

                {/* Resend OTP Row */}
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-500">Didn't receive code?</span>
                  {resendCooldown > 0 ? (
                    <span className="text-slate-400 font-semibold text-[11px]">
                      Resend in {resendCooldown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="font-bold text-navy-800 hover:text-accent-orange transition flex items-center gap-1 text-[11px]"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Resend OTP</span>
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying &amp; Logging in...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify OTP &amp; Sign In</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 text-center">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Secured with Firebase Phone Verification &amp; JWT</span>
            </div>
          </div>
          
          {/* Card Footer Toggle */}
          <div className="border-t border-slate-100 bg-slate-50/80 px-7 py-4 text-center">
            {step === 'register' ? (
              <p className="text-xs text-slate-500">
                Already registered?{' '}
                <button 
                  type="button" 
                  onClick={() => setStep('lookup')} 
                  className="font-bold text-navy-800 hover:text-accent-orange transition"
                >
                  Sign In with Mobile
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Need to create a new account?{' '}
                <button 
                  type="button" 
                  onClick={() => {
                    setIsExistingUser(false);
                    setStep('register');
                  }} 
                  className="font-bold text-navy-800 hover:text-accent-orange transition"
                >
                  Register Here
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-800/20 border-t-navy-800" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
