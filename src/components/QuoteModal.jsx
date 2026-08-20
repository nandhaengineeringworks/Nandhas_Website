'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, Mail, Building, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#06152d]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-[28px] max-w-3xl w-full max-h-[calc(100vh-1.5rem)] overflow-y-auto shadow-2xl relative border border-white/80 animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          aria-label="Close quote form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-display">Quote Request Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our engineering and sales team has received your inquiry for{' '}
              <strong className="text-brand-600">{product ? product.name : 'our product catalogue'}</strong>.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left space-y-1">
              <p>• A senior sales specialist will contact you on <strong>{formData.phone}</strong> within 2 business hours.</p>
              <p>• Official quotation with GST breakdown and freight estimates will be emailed to <strong>{formData.email || 'your email'}</strong>.</p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-8 py-3 bg-brand-600 text-white font-bold rounded-xl text-sm hover:bg-brand-500 transition shadow-md shadow-brand-600/20"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-[#071b38] px-6 py-7 sm:px-10 sm:py-8 text-white relative overflow-hidden">
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-orange-500/10" />
              <div className="relative flex items-start gap-4 pr-10">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/25">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-orange-300 uppercase">
                    B2B Price Discovery &amp; Formal Quotation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1 leading-tight">
                {product ? `Request Quote for ${product.name}` : 'Request Custom Machinery / Interior Quote'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                    Tell us what you are building. Our engineering team will prepare the right configuration, delivery plan and commercial quote.
                  </p>
                </div>
              </div>
              {product && (
                <div className="relative mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Selected model: <strong className="text-white">{variant ? `${product.name} - ${variant.variantName}` : product.name}</strong>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 pt-5 sm:px-10">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-[11px] font-semibold text-slate-600"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Engineering review</div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-[11px] font-semibold text-slate-600"><Building className="h-4 w-4 text-blue-600" /> GST-ready pricing</div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-[11px] font-semibold text-slate-600"><Phone className="h-4 w-4 text-orange-500" /> Fast callback</div>
            </div>

            {error && (
              <div className="mx-6 mt-5 sm:mx-10 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-10 sm:py-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Your project details</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Required fields are marked with an asterisk.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Secure enquiry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@business.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Dairy / Contractor Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Shree Krishna Dairy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Town</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Coimbatore"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Tamil Nadu"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requirements / Custom Technical Notes</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention daily production capacity, site voltage (Single/3 Phase), panel square footage, delivery timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none text-slate-800 custom-scrollbar"
                ></textarea>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-xl transition flex items-center justify-center disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Sending your enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Get My Custom Quote</span>
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[10px] text-slate-400">No payment required · A specialist will contact you to confirm specifications.</p>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Your contact info is strictly used for engineering quote dispatch. No spam guarantee.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
