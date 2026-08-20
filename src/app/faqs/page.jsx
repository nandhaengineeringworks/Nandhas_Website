'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ChevronRight, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What stainless steel grades do you use for milk and beverage machinery?',
      a: 'We use 100% genuine certified AISI 304 and AISI 316L food-grade stainless steel with mirror or satin sanitary finishes (Ra < 0.4 µm). Mill Test Certificates (MTC) are provided with every delivery.',
    },
    {
      q: 'Do you provide on-site installation and commissioning across India?',
      a: 'Yes. Our factory-trained mechanical engineers travel to your plant site in any state across India to handle machine positioning, sanitary pipe welding, electrical panel connections, hydro-testing, and operator training.',
    },
    {
      q: 'How does the B2B RFQ (Request for Quotation) process work?',
      a: 'Select any machine or material from our catalogue, click "Get Quote", and enter your capacity requirement, power spec, and delivery location. Our engineering desk issues a detailed commercial quotation with GA drawings and GST breakdown within 2–4 hours.',
    },
    {
      q: 'What are your standard commercial payment terms?',
      a: 'Standard terms for custom manufactured equipment are 40% advance with Purchase Order (PO), 50% upon completion of pre-dispatch Factory Acceptance Testing (FAT) at our Hyderabad facility, and 10% after successful on-site commissioning.',
    },
    {
      q: 'What warranty is included with newly purchased machinery?',
      a: 'Every machine comes with a 12-Month Comprehensive Manufacturer Warranty covering motors, gearboxes, electrical PLC controllers, and structural weld integrity.',
    },
    {
      q: 'How are interior PVC UV marble sheets and acoustic panels delivered?',
      a: 'Interior materials are packed in heavy-duty moisture-proof wooden crates and dispatched via insured multi-axle freight carriers directly to your project site or warehouse.',
    },
    {
      q: 'Can you fabricate custom capacity machines (e.g. 5,000 LPH pasteurizer or 10KL silo)?',
      a: 'Yes, absolutely. Because we operate an in-house fabrication plant in Hyderabad, we build custom tonnage, dimensions, and automation configurations tailored precisely to your plant layout and process specs.',
    },
    {
      q: 'Are spare parts readily available after warranty expiration?',
      a: 'Yes. We maintain a full inventory of replacement mechanical seals, tri-clamps, sanitary butterfly valves, heating elements, and scraper blades with guaranteed 10+ year availability.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Frequently Asked Questions (FAQ)</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-12 border border-slate-800 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest mx-auto">
            <HelpCircle className="w-4 h-4 text-accent-orange" />
            <span>COMMERCIAL MACHINERY &amp; MATERIALS FAQ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Find answers to common questions about our food machinery fabrication, installation timelines, pricing quotation process, and delivery protocols.
          </p>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-navy-800 leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition ${isOpen ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <h3 className="text-lg font-black text-navy-800">Still have a specific question about your project?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our senior engineering team is on standby to help with technical specifications, factory audits, or custom RFQ pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/contact" className="px-6 py-2.5 bg-navy-800 text-white rounded-xl text-xs font-bold uppercase hover:bg-navy-900 transition">
              Contact Engineering Desk
            </Link>
            <a href="https://wa.me/919344411122" target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase hover:bg-emerald-700 transition flex items-center">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
