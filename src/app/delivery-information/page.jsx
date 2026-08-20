'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, Package, ChevronRight, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export default function DeliveryInformationPage() {
  const deliveryFeatures = [
    {
      icon: <Package className="w-6 h-6 text-accent-orange" />,
      title: 'Heavy-Duty Export Wooden Crating',
      desc: 'All pasteurizers, homogenizers, tanks, and panels are crated with shock-absorbing foam lining and moisture-proof plastic wrap to withstand rough transit.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: '100% Comprehensive Transit Insurance',
      desc: 'Every shipment is covered under full marine/road transit insurance. In the rare event of transit damage, replacement components are dispatched immediately.',
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      title: 'Pan-India Dedicated Logistics Fleet',
      desc: 'Partnerships with premier heavy-haul logistics carriers (VRL, TCI, Safexpress, Blue Dart) ensure safe doorstep delivery across all 28 states and UTs.',
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: 'Predictable Fabrication & Delivery Timelines',
      desc: 'Standard units dispatch within 3–7 business days. Custom engineered turnkey lines dispatch within 2–4 weeks with continuous milestone updates.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Delivery &amp; Shipping Policy</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-extrabold uppercase tracking-widest">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>NATIONWIDE SECURE INDUSTRIAL LOGISTICS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Delivery &amp; Freight Information
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We deliver industrial food machinery, sanitary parts, and interior architectural materials directly from our Hyderabad manufacturing facility to customer sites nationwide.
            </p>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveryFeatures.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-navy-800">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dispatch FAQ & Unloading Guidelines */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-navy-800 font-display">
            Heavy Equipment Unloading &amp; Site Preparation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <strong className="text-navy-800 block font-bold text-sm">1. Crane / Forklift Requirement</strong>
              <p>For machines weighing over 500 KG (e.g. Pasteurizers, Silos, Homogenizers), the buyer must arrange an on-site forklift or overhead crane.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <strong className="text-navy-800 block font-bold text-sm">2. Entryway &amp; Floor Clearances</strong>
              <p>Ensure factory doors and hallways accommodate the crated machine width (detailed dimensions provided in pre-dispatch spec sheet).</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <strong className="text-navy-800 block font-bold text-sm">3. Power &amp; Water Lines Ready</strong>
              <p>Have 415V 3-phase electrical connections and soft water supply piped to the installation footprint before our engineers arrive.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
