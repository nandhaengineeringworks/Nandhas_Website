'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  ChevronRight,
  Package,
  Wrench,
  Sparkles,
  Milk,
  Boxes,
  Layers
} from 'lucide-react';
import { submitEnquiry } from '../../services/api';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    city: '',
    state: 'Tamil Nadu',
    categoryType: 'MACHINERY',
    productName: 'Milk Pasteurizer (1000 LPH)',
    capacityRequired: '1000 LPH / Standard',
    quantity: 1,
    timeline: 'Immediate (Within 15 Days)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        companyName: formData.companyName,
        city: formData.city,
        state: formData.state,
        productName: `${formData.productName} (${formData.capacityRequired})`,
        quantity: Number(formData.quantity) || 1,
        message: `[RFQ Timeline: ${formData.timeline}] ${formData.message}`,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to transmit RFQ. Please call +91 93444 11122 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-content-muted">
          <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-content-main">Request Official Quotation (RFQ)</span>
        </div>

        {/* Top Header Card */}
        <div className="bg-navy-800 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-700">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-trust-green" /> Direct Factory Pricing Guarantee
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              Request an Official B2B Quotation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submit your required machinery or interior panel specifications. Our engineering sales team will transmit a formal commercial proposal, CAD layout options, and delivery lead time within 4 business hours.
            </p>
          </div>
        </div>

        {/* Main Form Section */}
        {success ? (
          <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 text-center space-y-6 shadow-card animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-trust-green flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-black text-navy-800 font-display">Quotation Request Received!</h2>
              <p className="text-xs text-content-muted leading-relaxed">
                Thank you, <strong className="text-content-main">{formData.name}</strong>. Our engineering sales desk in Coimbatore has received your RFQ for <strong className="text-navy-800">{formData.productName}</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-surface-border max-w-md mx-auto text-xs text-slate-600 space-y-1">
              <p>Direct Reference Contact: <strong className="text-navy-800">+91 93444 11122</strong></p>
              <p>Email: <strong className="text-navy-800">sales@nandhas.in</strong></p>
            </div>
            <div className="pt-2">
              <Link
                href="/machinery"
                className="inline-block px-8 py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Browse More Machines
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-surface-border p-6 sm:p-10 shadow-card space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Equipment Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2 flex items-center">
                <Package className="w-4 h-4 mr-2 text-accent-orange" />
                1. Select Equipment / Surface Product
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Division Category *</label>
                  <select
                    value={formData.categoryType}
                    onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  >
                    <option value="MACHINERY">Industrial Machinery</option>
                    <option value="INTERIOR">Architectural Interior Panels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Product Model *</label>
                  <select
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  >
                    <option value="Milk Pasteurizer (Continuous HTST)">Milk Pasteurizer (Continuous HTST)</option>
                    <option value="Commercial Soft Serve Ice Cream Machine (3-Flavour)">Commercial Soft Serve Ice Cream Machine (3-Flavour)</option>
                    <option value="High Pressure Homogenizer (250 Bar)">High Pressure Homogenizer (250 Bar)</option>
                    <option value="Insulated Milk Storage Silo (5000 LTR)">Insulated Milk Storage Silo (5000 LTR)</option>
                    <option value="Bottle Filling & Capping Monoblock">Bottle Filling &amp; Capping Monoblock</option>
                    <option value="Ice Cream Batch Freezer (60-200L)">Ice Cream Batch Freezer (60-200L)</option>
                    <option value="Juice Pulp Extraction & Bottling Line">Juice Pulp Extraction &amp; Bottling Line</option>
                    <option value="3mm UV High Gloss Marble Sheets">3mm UV High Gloss Marble Sheets</option>
                    <option value="Acoustic Charcoal Louvered Fluted Panels">Acoustic Charcoal Louvered Fluted Panels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity / Dimensions Required</label>
                  <input
                    type="text"
                    value={formData.capacityRequired}
                    onChange={(e) => setFormData({ ...formData, capacityRequired: e.target.value })}
                    placeholder="e.g. 2000 LPH / 8x4 ft sheets"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>
              </div>
            </div>

            {/* 2. Customer & Company Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-accent-orange" />
                2. Contact &amp; Plant Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Plant Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Dairy Foods Pvt Ltd"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Coimbatore, Chennai, Bengaluru"
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Other State">Other State</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Notes & Timeline */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800 border-b border-slate-100 pb-2">
                3. Timeline &amp; Custom Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Required</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Delivery Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                  >
                    <option value="Immediate (Within 15 Days)">Immediate (Within 15 Days)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2-3 Months (Plant Project)">2-3 Months (Plant Project)</option>
                    <option value="Budgeting & Planning Stage">Budgeting &amp; Planning Stage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Technical Requirements / Notes</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention desired electrical voltage (Single vs 3 Phase), CIP requirements, stainless steel grade (SS304 / SS316), or factory dimensions..."
                  className="w-full p-3.5 bg-slate-50 border border-surface-border rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center text-xs text-content-muted">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-trust-green" />
                <span>Your commercial request is routed directly to certified plant engineers in Coimbatore.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 uppercase tracking-wider"
              >
                <Send className="w-4 h-4 mr-1 text-accent-orange" />
                <span>{loading ? 'Submitting to Engineering...' : 'Transmit Official RFQ'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
