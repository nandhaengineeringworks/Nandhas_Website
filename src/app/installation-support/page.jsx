'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, CheckCircle2, ChevronRight, ArrowRight, Factory, Users, ShieldCheck, PhoneCall, Cpu } from 'lucide-react';

export default function InstallationSupportPage() {
  const steps = [
    {
      step: '01',
      title: 'Pre-Installation Plant Layout & Utility Check',
      desc: 'Our design engineers share the GA drawing and utility footprint requirements (electrical load, soft water pressure, steam/glycol loops, drain slopes).',
    },
    {
      step: '02',
      title: 'On-Site Machine Positioning & Leveling',
      desc: 'Our mechanical service engineers arrive on-site to assist in unloading, precision laser leveling, and vibration pad anchoring.',
    },
    {
      step: '03',
      title: 'Sanitary Piping & Electrical Commissioning',
      desc: 'Interconnecting SS304/SS316 sanitary pipe welding, pneumatic valve hookups, and PLC control panel sensor wiring.',
    },
    {
      step: '04',
      title: 'Hydro-Testing, Water Runs & CIP Trials',
      desc: 'Full hydrostatic pressure test, water circulation dry-run, temperature PID calibration, and CIP cleaning validation.',
    },
    {
      step: '05',
      title: 'Live Product Batch Trial Run',
      desc: 'We supervise the first live milk pasteurization, ice cream freeze batch, or juice bottling run to guarantee specified throughput capacity.',
    },
    {
      step: '06',
      title: 'Operator Training & Handover Documentation',
      desc: 'Hands-on operator training covering daily start-stop sequences, CIP cleaning cycles, safety procedures, and preventative maintenance schedules.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Installation &amp; Commissioning Support</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>ON-SITE FACTORY COMMISSIONING BY TRAINED ENGINEERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Turnkey Installation &amp; Commissioning
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We don't just deliver machinery — our factory-trained engineers travel directly to your plant to ensure flawless erection, electrical setup, water testing, and operator training.
            </p>
          </div>
        </div>

        {/* 6-Step Installation Process */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
              Our 6-Stage Commissioning Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A disciplined, step-by-step approach ensuring high uptime, food safety compliance, and peak processing efficiency from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
                <span className="text-3xl font-black text-slate-100 font-mono absolute top-3 right-4 select-none">
                  {item.step}
                </span>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-navy-50 text-navy-800 uppercase">
                  Stage {item.step}
                </span>
                <h3 className="text-base font-bold text-navy-800">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Help Banner */}
        <div className="bg-navy-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Schedule an Engineer Visit for Your Plant</h3>
            <p className="text-xs sm:text-sm text-slate-300">Contact our installation coordinator to schedule engineer arrival dates and site reviews.</p>
          </div>
          <Link href="/contact" className="px-6 py-3 bg-accent-orange text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-accent-hover transition shadow">
            Schedule Installation
          </Link>
        </div>
      </div>
    </div>
  );
}
