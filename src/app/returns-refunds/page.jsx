'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, Phone, Mail } from 'lucide-react';

export default function ReturnsRefundsPage() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Returns, Warranty &amp; Refund Policy</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-12 border border-slate-800 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest mx-auto">
            <RefreshCw className="w-4 h-4 text-accent-orange" />
            <span>B2B EQUIPMENT WARRANTY &amp; REPLACEMENT POLICY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Warranty, Replacements &amp; Refunds
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Our comprehensive warranty and replacement policy ensures complete peace of mind for industrial plant buyers across India.
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-navy-800">1. Standard 12-Month Manufacturer Warranty</h2>
            <p>
              All newly fabricated machinery units (Pasteurizers, Homogenizers, Freezers, Storage Silos, Bottling Monoblocks) carry a standard <strong>12-Month Comprehensive Warranty</strong> starting from the date of dispatch or commissioning handover.
            </p>
            <p>
              This covers manufacturing defects in motors, gearboxes, electrical PLC controllers, sanitary seals, and stainless steel structural weld joints.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-navy-800">2. Transit Damage &amp; Immediate Part Replacement</h2>
            <p>
              All shipments are insured under marine/road transit policies. Upon delivery, the consignee should inspect the wooden crating. If any physical damage or water ingress is noticed:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
              <li>Record a damage remark on the transporter's delivery receipt (LR Copy).</li>
              <li>Photograph and video-record the damaged crate and part.</li>
              <li>Notify our dispatch desk at <a href="mailto:support@machinery-interior.com" className="text-navy-800 font-bold underline">support@machinery-interior.com</a> within 48 hours.</li>
              <li>We will dispatch emergency replacement parts via express courier at zero extra cost.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-navy-800">3. Custom Engineered Equipment &amp; Cancellation Policy</h2>
            <p>
              Because commercial machinery is custom fabricated according to specific plant throughputs, electrical voltages, and dimensional requirements, advance order deposits for machines in active CNC production are non-refundable once raw material allocation and laser cutting have commenced.
            </p>
            <p>
              Clients are entitled to physical pre-dispatch trial runs (FAT) at our Hyderabad facility to verify complete compliance with agreed engineering specifications before balance payment and final dispatch.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-navy-800">4. Sanitary Spares &amp; Material Return Eligibility</h2>
            <p>
              Unused sanitary valves, fittings, tri-clamps, gaskets, and interior panels in original, unopened packaging may be returned within 14 days of delivery with prior return authorization (RMA) for replacement or store credit.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Have questions about your order warranty?</span>
            <Link href="/contact" className="px-5 py-2.5 bg-navy-800 text-white rounded-xl text-xs font-bold uppercase hover:bg-navy-900 transition">
              Contact Warranty Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
