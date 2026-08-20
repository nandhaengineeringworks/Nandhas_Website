'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  FileCheck2, 
  Scale, 
  Wrench, 
  BadgeCheck, 
  Gauge, 
  Microscope,
  Cpu
} from 'lucide-react';

export default function QualityAssurancePage() {
  const testingProtocols = [
    {
      icon: <Microscope className="w-6 h-6 text-blue-600" />,
      title: 'Spectrographic Metallurgy Testing',
      desc: 'Every batch of SS304 and SS316L sheet metal and piping undergoes chemical composition verification to ensure zero carbon contamination and corrosion resistance.',
    },
    {
      icon: <Gauge className="w-6 h-6 text-accent-orange" />,
      title: 'Hydrostatic Pressure & Leak Testing',
      desc: 'All pressure vessels, jacketed tanks, homogenizer blocks, and pasteurizer plates are hydro-tested up to 1.5x maximum operating pressure for 24 hours.',
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600" />,
      title: 'X-Ray & Dye Penetrant Weld Inspection',
      desc: '100% sanitary food-grade TIG welding. Welds are ground smooth to Ra < 0.4 µm mirror finish to eliminate microbial crevices and biofilm formation.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: 'PLC Logic & Simulation Dry Runs',
      desc: 'Every automated control panel is pre-commissioned at our plant with electrical load simulations, thermal sensors, safety interlocks, and emergency stop tests.',
    },
    {
      icon: <Scale className="w-6 h-6 text-red-600" />,
      title: 'Dynamic Rotor Balancing & Vibration Checks',
      desc: 'Homogenizer crankshafts, cream separator bowls, and ice cream dasher motors undergo electronic dynamic balancing at high RPMs to ensure quiet, vibration-free operation.',
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-indigo-600" />,
      title: 'Pre-Dispatch Factory Acceptance Testing (FAT)',
      desc: 'Clients are invited for physical FAT trials at our Hyderabad plant prior to packaging and dispatch, complete with signed inspection documentation.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Quality Assurance Standards</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ZERO DEFECT MANUFACTURING &bull; ISO 9001:2015</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Food Safety, Metallurgy &amp; Quality Protocols
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At Nandhas Engineering Works, precision engineering is not an afterthought. Every machine is built to satisfy stringent dairy hygiene standards, BIS specifications, and international food machinery norms.
            </p>
          </div>
        </div>

        {/* 6 Inspection Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testingProtocols.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-navy-800">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications and Warranty Assurance */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-orange block">
              MANUFACTURER WARRANTY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
              1-Year Comprehensive Warranty on All Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every machinery unit dispatched from our factory includes a 12-month standard manufacturer warranty covering gearboxes, motors, sanitary seals, heating elements, and structural welds.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Original Mill Test Certificates (MTC) provided with each delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>On-site emergency technician visits within 24-48 hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guaranteed spare parts availability for 10+ years</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-3">
            <Award className="w-16 h-16 text-navy-800 mx-auto" />
            <h3 className="text-lg font-black text-navy-800">ISO 9001:2015 &amp; Food Grade Compliant</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Our engineering fabrication facility follows rigorous quality assurance standards ensuring seamless audit readiness for your food plant.
            </p>
            <Link href="/contact" className="inline-block mt-2 px-6 py-2.5 bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy-900 transition">
              Request Quality Certificates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
