'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Privacy Policy</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-12 border border-slate-800 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest mx-auto">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>ENTERPRISE DATA PROTECTION &amp; PRIVACY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Nandhas Engineering Works is committed to safeguarding your business contact details, quotation RFQ data, and proprietary plant specifications.
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">1. Information We Collect</h2>
            <p>
              When you submit a quote request, register an account, or contact our engineering desk, we collect business information including your company name, GSTIN, contact person name, email address, phone number, and machine throughput specifications.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">2. How We Use Your Commercial Data</h2>
            <p>
              We use your submitted data solely to generate technical engineering quotations, fulfill equipment orders, coordinate logistics dispatch, provide warranty service, and communicate maintenance updates.
            </p>
            <p>
              We <strong>never</strong> sell, lease, or distribute your corporate contact information or process specifications to third-party marketing companies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">3. Data Security &amp; Encryption</h2>
            <p>
              All interactions on our digital portal are protected with 256-bit TLS/SSL encryption. Database records are stored securely with strict role-based access control (RBAC).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-navy-800">4. Contact Privacy Officer</h2>
            <p>
              If you have any questions regarding our data protection policies or wish to update your records, email our compliance team at <a href="mailto:privacy@machinery-interior.com" className="text-navy-800 font-bold underline">privacy@machinery-interior.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
