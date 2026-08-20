'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Settings2, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  FileCheck2, 
  Award, 
  CheckCircle2, 
  Phone, 
  Send,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Cog
} from 'lucide-react';

export default function ServicesPage() {
  const servicesList = [
    {
      title: 'Turnkey Plant Engineering & Setup',
      desc: 'Complete engineering from concept layout to final production handover. We design complete milk dairies, ice cream plants, and juice bottling lines tailored to your factory square footage.',
      icon: Cog,
      features: ['Factory Floor CAD Drawings', 'Sanitary Piping & Tri-Clamp Design', 'Automated CIP Washing Systems', 'PLC Control Panel Architecture']
    },
    {
      title: 'On-Site Commissioning & Trial Runs',
      desc: 'Our mechanical and electrical engineers visit your plant site for precision installation, structural leveling, cold-water/steam hookups, and trial runs with actual raw ingredients.',
      icon: Wrench,
      features: ['Factory-Trained Field Engineers', 'Precision Leveling & Pipe Welding', 'Live Production Trial Batches', 'Operator Safety & Maintenance Training']
    },
    {
      title: '1 Year Warranty & Preventative AMC',
      desc: 'All machines include a comprehensive 1-year warranty on motors, compressors, and electricals. We also offer Annual Maintenance Contracts (AMC) to prevent costly factory downtime.',
      icon: Award,
      features: ['1 Year Comprehensive Warranty', 'Scheduled Periodic Inspections', 'Priority Technician Dispatch', 'Free Firmware / PLC Updates']
    },
    {
      title: 'Genuine Spare Parts & Tooling Supply',
      desc: 'Never halt your production. We stock 100% genuine replacement food-grade gaskets, homogenizer seals, pasteurizer plates, scraper blades, and PLC modules ready for express dispatch.',
      icon: Settings2,
      features: ['100% OEM Replacement Parts', 'Same-Day Courier Dispatch', 'Food Grade EPDM & Silicon Gaskets', 'Direct Plant Pricing']
    },
    {
      title: 'FSSAI & Regulatory Compliance Advisory',
      desc: 'Ensure your food, dairy, and beverage facilities comply with food safety standards. We guide on food-contact metallurgy certifications, hygiene zoning, and CIP validation.',
      icon: FileCheck2,
      features: ['SS304/SS316 Metallurgy Reports', 'Sanitary Dead-Leg Audits', 'Cleanroom Surface Specifications', 'HACCP Standard Compliance']
    },
    {
      title: '24/7 Dedicated Engineering Support',
      desc: 'Immediate remote troubleshooting desk via phone, video call, and WhatsApp for quick issue diagnosis, electrical schematic walkthroughs, and operator guidance.',
      icon: Headphones,
      features: ['Dedicated Technical Hotline', 'WhatsApp Video Diagnostics', 'Remote PLC Tele-Assistance', 'Multilingual Support Team']
    }
  ];

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-content-muted">
            <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-content-main">Engineering Services</span>
          </div>

          <div className="bg-navy-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-trust-green" /> Complete Engineering Lifecycle
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                NANDHAS Factory Services &amp; Support
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                From initial factory CAD drawings and turn-key mechanical assembly to 24/7 operator support and preventative maintenance contracts across India.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card hover:shadow-card-hover transition space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-800 font-display">{srv.title}</h3>
                    <p className="text-xs text-content-muted leading-relaxed mt-2">{srv.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <strong className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Service Highlights:</strong>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {srv.features.map((f, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-trust-green shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-navy-800 hover:text-white text-navy-800 text-xs font-bold transition flex items-center justify-center border border-slate-200"
                  >
                    <span>Request Engineering Service</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Service Hotline Box */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange bg-navy-950/80 px-2.5 py-1 rounded-full border border-navy-800 inline-block">
              Priority Client Desk
            </span>
            <h3 className="text-2xl font-bold font-display text-white">Need Urgent Technician Support?</h3>
            <p className="text-xs text-slate-300">
              Our factory engineers in Coimbatore are on standby for phone diagnostics and emergency spare parts dispatch.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+919344411122"
              className="px-6 py-3.5 bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs rounded-xl shadow transition flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>Call +91 93444 11122</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
