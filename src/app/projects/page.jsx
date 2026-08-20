'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Factory, Building2, Layers, CheckCircle2, MapPin, Calendar } from 'lucide-react';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('ALL');

  const projects = [
    {
      id: 1,
      title: '50,000 LPD Automated Milk Pasteurization Plant',
      client: 'Sri Krishna Dairy Cooperative',
      location: 'Vijayawada, Andhra Pradesh',
      type: 'DAIRY',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      scope: 'Turnkey HTST Pasteurizer, 250-Bar Homogenizer, CIP Automated Cleaning Line, 4x 15KL Insulated Storage Silos.',
    },
    {
      id: 2,
      title: 'Continuous Ice Cream Production & Hardening Facility',
      client: 'FrostDelight Foods Pvt Ltd',
      location: 'Hyderabad, Telangana',
      type: 'ICE_CREAM',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      scope: 'Dual 600 LPH Continuous Freezers, Ageing Vats with Glycol jackets, -40°C Quick Hardening Tunnel, Soft-serve dispensing stations.',
    },
    {
      id: 3,
      title: 'High-Speed Automated Juice Bottling Line (120 BPM)',
      client: 'PureCitrus Beverage Ltd',
      location: 'Bengaluru, Karnataka',
      type: 'BEVERAGE',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      scope: 'Rinse-Fill-Cap Monoblock 24-24-6, Steam Shrink Labeling Tunnel, End-of-line Case Packing, SS316 Piping Loop.',
    },
    {
      id: 4,
      title: 'Luxury Hotel Lobby UV Marble & Acoustic Slat Cladding',
      client: 'Grand Heritage Suites',
      location: 'Chennai, Tamil Nadu',
      type: 'INTERIOR',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      scope: '3.0mm Calacatta White UV Marble PVC Sheets, Class B1 Fire-Retardant Acoustic Charcoal Louvers, Waterproof Ceiling Fluted Panels.',
    },
    {
      id: 5,
      title: '20,000 LPD Dairy Chilling & Bulk Milk Cooler Hub',
      client: 'Telangana Agri-Farms Federation',
      location: 'Warangal, Telangana',
      type: 'DAIRY',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
      scope: 'Direct Expansion Bulk Milk Coolers (5KL x 4), Skid-Mounted Chilling System with Emerson Scroll Compressors.',
    },
    {
      id: 6,
      title: 'Commercial Office Tower Fluted WPC Louvers & Paneling',
      client: 'Apex IT Tech Park',
      location: 'Gachibowli, Hyderabad',
      type: 'INTERIOR',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      scope: 'Exterior UV-Stabilized WPC Cladding, Natural Teak HDMR Acoustic Wall Features, Zero-Formaldehyde Interior Panels.',
    },
  ];

  const filtered = activeTab === 'ALL' ? projects : projects.filter(p => p.type === activeTab);

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Featured Projects &amp; Installations</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest">
              <Factory className="w-4 h-4 text-accent-orange" />
              <span>TURNKEY INDUSTRIAL &amp; ARCHITECTURAL SHOWCASE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              Our Turnkey Engineering Projects
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore recent industrial processing plants, commercial bottling facilities, and architectural interior installations engineered, fabricated, and commissioned by Nandhas.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {[
            { id: 'ALL', label: 'All Projects' },
            { id: 'DAIRY', label: 'Milk & Dairy Processing' },
            { id: 'ICE_CREAM', label: 'Ice Cream Plants' },
            { id: 'BEVERAGE', label: 'Beverage & Bottling' },
            { id: 'INTERIOR', label: 'Architectural Panels' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <span className="absolute top-3 left-3 bg-navy-800/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                  {item.type}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  {item.year}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-navy-800 leading-snug">{item.title}</h3>
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent-orange shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 mt-2">{item.scope}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">Client: {item.client}</span>
                  <Link href="/quote" className="text-xs font-bold text-navy-800 hover:text-accent-orange flex items-center">
                    Inquire Similar <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
