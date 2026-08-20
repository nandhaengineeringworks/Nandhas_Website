'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Factory, HelpCircle, Building2, ChevronRight, ArrowRight } from 'lucide-react';

export default function SitemapPage() {
  const sections = [
    {
      title: 'Industrial Machinery Divisions',
      icon: <Factory className="w-5 h-5 text-accent-orange" />,
      links: [
        { label: 'All Machinery & Industrial Equipment', href: '/machinery' },
        { label: 'Milk & Dairy Processing Machinery', href: '/machinery?cat=milk-processing-machines' },
        { label: 'Ice Cream Machinery & Continuous Freezers', href: '/machinery?cat=ice-cream-machines' },
        { label: 'Beverage Processing & Bottling Lines', href: '/machinery?cat=beverage-machines' },
        { label: 'Sanitary Spare Parts & Valves', href: '/services' },
      ],
    },
    {
      title: 'Architectural & Interior Materials',
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      links: [
        { label: 'All Interior & Material Collections', href: '/interior' },
        { label: '3.0mm UV Marble PVC Sheets', href: '/interior' },
        { label: 'Acoustic Charcoal Fluted Panels', href: '/interior' },
        { label: 'Waterproof Ceiling & Wall Planks', href: '/interior' },
        { label: 'Exterior WPC Louvers & Cladding', href: '/interior' },
        { label: 'Solid Teak & HDMR Architectural Panels', href: '/interior' },
      ],
    },
    {
      title: 'Company & Engineering Overview',
      icon: <Building2 className="w-5 h-5 text-navy-800" />,
      links: [
        { label: 'About Nandhas Engineering Works', href: '/about' },
        { label: 'Our Engineering Services', href: '/services' },
        { label: 'Why Choose Nandhas', href: '/why-nandhas' },
        { label: 'Industries We Serve', href: '/industries' },
        { label: 'Our Featured Turnkey Projects', href: '/projects' },
        { label: 'Quality Assurance & Metallurgy Standards', href: '/quality-assurance' },
        { label: 'Career Opportunities', href: '/careers' },
        { label: 'News & Expo Announcements', href: '/news' },
        { label: 'Contact Us & Factory Address', href: '/contact' },
      ],
    },
    {
      title: 'Customer Service & Commercial Portals',
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
      links: [
        { label: 'Request Custom Quotation (RFQ)', href: '/quote' },
        { label: 'Track Order & Consignment Dispatch', href: '/track-order' },
        { label: 'Delivery & Logistics Information', href: '/delivery-information' },
        { label: 'On-Site Installation & Commissioning', href: '/installation-support' },
        { label: 'Warranty, Replacements & Returns', href: '/returns-refunds' },
        { label: 'Frequently Asked Questions (FAQ)', href: '/faqs' },
        { label: 'Terms & Conditions of Sale', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Brands & Partner Ecosystem', href: '/brands' },
        { label: 'Commercial Cart & Checkout', href: '/cart' },
      ],
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Website Directory &amp; Sitemap</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest">
              <Layers className="w-4 h-4 text-accent-orange" />
              <span>COMPREHENSIVE DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Website Directory &amp; Sitemap
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse all pages, product catalogues, engineering services, customer support portals, and commercial documentation across our web platform.
            </p>
          </div>
        </div>

        {/* 4 Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {sec.icon}
                </div>
                <h2 className="text-base sm:text-lg font-black text-navy-800">{sec.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-xs sm:text-sm text-slate-600 hover:text-navy-800 font-medium py-1 transition"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-orange transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
