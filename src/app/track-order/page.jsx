'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, Search, CheckCircle2, Clock, Package, AlertCircle, ChevronRight, Phone, ArrowRight } from 'lucide-react';
import { lookupOrder } from '../../services/api';

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSearched(true);

    try {
      const data = await lookupOrder(orderQuery.trim());
      if (data) {
        setOrderData(data);
      } else {
        setOrderData(null);
        setErrorMsg(`No active commercial order found for "${orderQuery.trim()}". Please verify your Order ID or contact the sales desk.`);
      }
    } catch (err) {
      setOrderData(null);
      setErrorMsg('Unable to retrieve tracking details. Please try again or call our dispatch hotline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Track Commercial Order</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-12 border border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest mx-auto">
            <Truck className="w-4 h-4 text-accent-orange" />
            <span>REAL-TIME DISPATCH &amp; CONSIGNMENT TRACKING</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Track Your Machinery &amp; Material Dispatch
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Enter your <strong>Order Confirmation Number</strong> (e.g. <code>ORD-2024-XXXX</code>) or registered phone number to check fabrication, testing, and transit status.
          </p>

          {/* Search Form */}
          <form onSubmit={handleTrackSubmit} className="max-w-lg mx-auto pt-3">
            <div className="flex items-center bg-white rounded-2xl p-1.5 shadow-xl border border-slate-300 focus-within:ring-2 focus-within:ring-accent-orange">
              <input
                type="text"
                placeholder="Enter Order ID or Invoice Number..."
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none rounded-xl"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-accent-orange hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center shrink-0 shadow"
              >
                {loading ? 'Tracking...' : (
                  <>
                    <Search className="w-4 h-4 mr-1.5" />
                    <span>Track</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Card */}
        {searched && orderData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Order Number</span>
                <h2 className="text-xl font-black text-navy-800 font-mono">{orderData.orderNumber}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold uppercase">
                  {orderData.status || 'CONFIRMED & IN FABRICATION'}
                </span>
              </div>
            </div>

            {/* Tracking Progress Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'Order Confirmed', desc: 'Design & specs approved', active: true },
                { title: 'Plant Fabrication', desc: 'CNC cutting & TIG welding', active: true },
                { title: 'Testing & Quality', desc: 'Hydrostatic & FAT trial', active: true },
                { title: 'Dispatched in Transit', desc: 'Insured truck freight', active: orderData.status === 'SHIPPED' || orderData.status === 'DELIVERED' },
              ].map((step, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${step.active ? 'bg-slate-50 border-navy-800/20' : 'bg-white border-slate-100 opacity-50'} space-y-1 text-center`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${step.active ? 'bg-navy-800 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <strong className="text-xs font-bold text-navy-800 block">{step.title}</strong>
                  <span className="text-[10px] text-slate-500 block">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {searched && errorMsg && (
          <div className="bg-white rounded-3xl p-8 border border-red-200 text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Tracking Information Not Found</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">{errorMsg}</p>
            <div className="pt-2">
              <a href="tel:+919344411122" className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-800 text-white rounded-xl text-xs font-bold">
                <Phone className="w-4 h-4" /> Call Logistics Desk: +91 93444 11122
              </a>
            </div>
          </div>
        )}

        {/* Support Box */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Need Immediate Assistance?</h4>
          <p className="text-xs text-slate-600">
            For bill-of-lading (LR copy) requests or urgent delivery coordination, contact our central logistics team at <a href="mailto:dispatch@machinery-interior.com" className="text-navy-800 font-bold underline">dispatch@machinery-interior.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
