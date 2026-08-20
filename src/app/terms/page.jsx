'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Commercial Terms &amp; Conditions</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-12 border border-slate-800 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-extrabold uppercase tracking-widest mx-auto">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>COMMERCIAL PURCHASE AGREEMENT &amp; TERMS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Terms &amp; Conditions of Sale
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Last Updated: August 2024 &bull; Applicable to all industrial equipment quotations, invoices, and plant fabrication agreements by Nandhas Engineering Works.
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">1. Quotation Validity &amp; Pricing</h2>
            <p>
              All formal commercial quotations issued by Nandhas Engineering Works remain valid for 30 calendar days from the date of issue, unless otherwise specified in writing. Prices are quoted exclusive of applicable GST (18%) and transport freight charges unless expressly stated as inclusive.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">2. Order Acceptance &amp; Deposit</h2>
            <p>
              An order is deemed confirmed upon receipt of a signed Purchase Order (PO) and realization of the agreed advance payment deposit. Fabrication planning and raw material reservation commence immediately upon advance confirmation.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">3. Factory Acceptance Testing (FAT) &amp; Dispatch</h2>
            <p>
              Clients have the option to witness a physical trial run (FAT) at our Hyderabad fabrication facility before final dispatch. Balance payment must be completed prior to the issuance of dispatch road permits (E-Way Bill) and handover to the freight carrier.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">4. Delivery, Transit Risk &amp; Force Majeure</h2>
            <p>
              While we strive to meet all agreed manufacturing and dispatch schedules, delivery dates are estimates subject to raw material availability, power grid interruptions, or force majeure events. All shipments are insured under transit policies for transit damages.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">5. Limitation of Liability &amp; Jurisdiction</h2>
            <p>
              In no event shall Nandhas Engineering Works be liable for indirect, consequential, or operational downtime losses. Any legal disputes arising out of purchase contracts shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
