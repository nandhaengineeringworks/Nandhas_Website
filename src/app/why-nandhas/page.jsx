'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Factory, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Cpu, 
  BadgeCheck, 
  Wrench, 
  Truck, 
  PhoneCall, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function WhyNandhasPage() {
  const differentiators = [
    {
      icon: <Factory className="w-6 h-6 text-accent-orange" />,
      title: 'Direct OEM Plant Manufacturing',
      desc: 'No middlemen or trading markups. Everything is fabricated in-house at our Hyderabad engineering facility using precision CNC sheet cutting and laser welding.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Certified SS304 / SS316L Metallurgy',
      desc: 'We never compromise on food-grade stainless steel. Every milk pasteurizer, storage silo, and mixer includes mill test certificates (MTC).',
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      title: 'Smart PLC Automation & HMI Touchscreens',
      desc: 'Equipped with Delta / Siemens PLC automation, automated CIP cleaning cycles, and precise PID temperature regulation.',
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      title: 'Pan-India Insured Dispatch & Logistics',
      desc: 'Heavy-duty wooden export crating with all-India door delivery, transit insurance, and hydraulic unloading assistance.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      title: 'Factory-Trained On-Site Installation',
      desc: 'Our mechanical engineers travel to your plant to perform complete pipe laying, electrical connection, water testing, and operator training.',
    },
    {
      icon: <Award className="w-6 h-6 text-red-600" />,
      title: '1-Year Comprehensive Warranty & AMC',
      desc: 'Full 12-month manufacturer warranty on motors, gearboxes, and welds, with annual maintenance contracts (AMC) available.',
    },
  ];

  const milestones = [
    { num: '25+', label: 'Years of Engineering Heritage' },
    { num: '5,000+', label: 'Plants & Equipment Commissioned' },
    { num: '100%', label: 'Food-Grade Sanitary Standards' },
    { num: '28', label: 'States & UTs Across India Served' },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Why Choose Nandhas</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-accent-orange" />
              <span>THE NANDHAS ENGINEERING ADVANTAGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Why Dairy Plants &amp; Architects Trust Nandhas
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              For over two decades, Nandhas Engineering Works has been the trusted fabrication partner for dairy cooperatives, beverage bottlers, ice cream manufacturers, and luxury commercial interior projects.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/quote" className="inline-flex items-center px-6 py-3 rounded-xl bg-accent-orange text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-hover transition shadow-lg">
                Request Custom Quotation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/machinery" className="inline-flex items-center px-6 py-3 rounded-xl border border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition">
                Explore Machinery Catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Milestones Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-black text-navy-800 font-display block font-mono">{m.num}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1 block">{m.label}</span>
            </div>
          ))}
        </div>

        {/* 6 Core Differentiators */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
              Engineered for Uptime, Hygiene &amp; Profitability
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Here is how we deliver higher reliability, lower total cost of ownership, and seamless regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-navy-800">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-navy-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Plan Your Industrial Machinery Setup</h3>
            <p className="text-xs sm:text-sm text-slate-300">Speak directly with our chief engineers for capacity sizing and plant layout drawings.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="px-6 py-3 bg-accent-orange text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-accent-hover transition shadow">
              Contact Sales Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
