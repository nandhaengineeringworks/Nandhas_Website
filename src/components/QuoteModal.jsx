'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { submitEnquiry } from '../services/api';

export default function QuoteModal({ isOpen, onClose, product = null, variant = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    city: '',
    state: '',
    estimatedQuantity: 1,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        city: formData.city,
        state: formData.state,
        productId: product?.id || null,
        productName: product ? (variant ? `${product.name} (${variant.variantName})` : product.name) : 'General Machinery / Interior Inquiry',
        productSku: variant?.sku || product?.sku || null,
        productType: product?.categoryType || 'MACHINERY',
        estimatedQuantity: Number(formData.estimatedQuantity) || 1,
        message: formData.message,
      };

      await submitEnquiry(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit quote request. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      city: '',
      state: '',
      estimatedQuantity: 1,
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#06152d]/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
      
      {/* Background overlay click to close */}
      <div className="fixed inset-0" onClick={handleResetAndClose} />

      {/* Modal / Mobile Bottom Sheet Card */}
      <div className="bg-white rounded-t-3xl sm:rounded-[28px] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 border border-white/80 animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 custom-scrollbar pb-safe">
        
        {/* Mobile top pull handle indicator */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        <button
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition active:scale-90"
          aria-label="Close quote form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center p-5 sm:p-10 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-display">Quote Request Submitted!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our engineering team has received your inquiry for{' '}
              <strong className="text-navy-800">{product ? product.name : 'our product catalogue'}</strong>.
            </p>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left space-y-1">
              <p>&bull; A senior sales specialist will contact you on <strong>{formData.phone}</strong> shortly.</p>
              <p>&bull; Official quotation with GST breakdown will be emailed to <strong>{formData.email || 'your email'}</strong>.</p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-navy-800 text-white font-bold rounded-xl text-xs hover:bg-navy-900 transition shadow active:scale-95"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="bg-[#071b38] px-4 py-5 sm:px-8 sm:py-7 text-white relative overflow-hidden">
              <div className="relative flex items-start gap-3 sm:gap-4 pr-8">
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[8.5px] sm:text-[10px] font-bold tracking-[0.18em] text-orange-300 uppercase">
                    B2B Price Discovery &amp; Formal Quotation
                  </span>
                  <h3 className="text-base sm:text-2xl font-black text-white font-display mt-0.5 leading-tight">
                    {product ? `Request Quote for ${product.name}` : 'Request Custom Machinery / Interior Quote'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                    Tell us your requirements. Our engineering team will prepare the technical configuration and pricing.
                  </p>
                </div>
              </div>
              {product && (
                <div className="relative mt-3 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate max-w-[220px] sm:max-w-xs text-[11px] sm:text-xs">
                    {variant ? `${product.name} - ${variant.variantName}` : product.name}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 px-3 sm:px-8 pt-3">
              <div className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 border border-slate-100 p-1.5 sm:p-2 text-[9.5px] sm:text-[11px] font-semibold text-slate-600 text-center">
                <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="truncate">Engineering Review</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 border border-slate-100 p-1.5 sm:p-2 text-[9.5px] sm:text-[11px] font-semibold text-slate-600 text-center">
                <Building className="h-3 w-3 text-blue-600 shrink-0" />
                <span className="truncate">GST-Ready</span>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 border border-slate-100 p-1.5 sm:p-2 text-[9.5px] sm:text-[11px] font-semibold text-slate-600 text-center">
                <Phone className="h-3 w-3 text-orange-500 shrink-0" />
                <span className="truncate">Fast Callback</span>
              </div>
            </div>

            {error && (
              <div className="mx-3 sm:mx-8 mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 px-3.5 sm:px-8 py-3.5 sm:py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@business.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Company / Plant Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Shree Krishna Dairy"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Hyderabad"
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Telangana"
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-slate-700 mb-1">Qty</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Requirements / Custom Notes</label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Daily production capacity, voltage requirements, delivery timeline..."
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-navy-800 outline-none text-slate-800 custom-scrollbar"
                ></textarea>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center disabled:opacity-60 active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      <span>Get My Custom Quote</span>
                    </>
                  )}
                </button>
                <p className="mt-1.5 text-center text-[9.5px] sm:text-[10px] text-slate-400">No payment required &bull; Direct factory response.</p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
