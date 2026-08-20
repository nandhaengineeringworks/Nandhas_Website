'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Cog, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Cpu,
  Layers,
  Wrench
} from 'lucide-react';

export default function BrandsPage() {
  const brandPartners = [
    {
      name: 'Siemens Automation',
      category: 'PLC & HMI Touchscreens',
      desc: 'Industry-standard programmable logic controllers and intuitive touchscreens powering our continuous pasteurizers and automated filling monoblocks.',
      country: 'Germany',
      icon: Cpu,
    },
    {
      name: 'Schneider Electric',
      category: 'Switchgear & VFD Drives',
      desc: 'Heavy-duty variable frequency drives and circuit breakers ensuring electrical motor surge protection and energy efficiency across all machine lines.',
      country: 'France',
      icon: Cog,
    },
    {
      name: 'Danfoss Refrigeration',
      category: 'Compressors & Expansion Valves',
      desc: 'Precision thermodynamic expansion valves and scroll compressors powering our commercial soft serve and ice cream batch freezers with R404a refrigerant.',
      country: 'Denmark',
      icon: Sparkles,
    },
    {
      name: 'Bitzer Compressors',
      category: 'Semi-Hermetic Cooling Units',
      desc: 'Heavy-duty commercial refrigeration condensing units for high-ambient Indian summer operations up to 48°C ambient temperatures.',
      country: 'Germany',
      icon: Sparkles,
    },
    {
      name: 'ABB Motors',
      category: 'IE3 Premium Efficiency Motors',
      desc: 'High-torque sanitary stainless steel flange motors powering high-pressure homogenizers and continuous agitators.',
      country: 'Switzerland',
      icon: Wrench,
    },
    {
      name: '3M Industrial',
      category: 'Structural Architectural Bonding',
      desc: 'High-strength structural VHB adhesives and UV polyurethane surface protective coatings for architectural marble and charcoal panels.',
      country: 'USA',
      icon: Layers,
    },
  ];

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-content-muted">
            <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-content-main">Engineering Brands &amp; Component Partners</span>
          </div>

          <div className="bg-navy-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-trust-green" /> OEM Grade Components Only
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Global Component Partnerships
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                NANDHAS integrates only certified tier-1 global electrical, refrigeration, and pneumatic components inside our machinery for uninterrupted 24/7 commercial plant reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandPartners.map((brand, i) => {
            const Icon = brand.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card hover:shadow-card-hover transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {brand.country}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-navy-800 font-display">{brand.name}</h3>
                    <span className="text-[11px] font-bold text-accent-orange uppercase tracking-wider block mt-0.5">
                      {brand.category}
                    </span>
                  </div>

                  <p className="text-xs text-content-muted leading-relaxed">
                    {brand.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-trust-green">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
                  <span>100% Genuine OEM Sourced</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore CTA */}
        <div className="bg-slate-100 p-8 rounded-3xl border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-navy-800 font-display">Looking for certified machinery powered by these brands?</h3>
            <p className="text-xs text-content-muted">Explore our complete range of milk pasteurizers, homogenizers, and freezers.</p>
          </div>
          <Link
            href="/machinery"
            className="px-6 py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center"
          >
            <span>Explore Machine Models</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
