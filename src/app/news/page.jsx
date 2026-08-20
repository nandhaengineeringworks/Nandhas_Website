'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ChevronRight, ArrowRight, Sparkles, Tag, Factory } from 'lucide-react';

export default function NewsPage() {
  const articles = [
    {
      id: 1,
      title: 'Nandhas Unveils Next-Gen High-Pressure Homogenizer with 250-Bar Output',
      date: 'August 14, 2024',
      category: 'Product Launch',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      summary: 'Engineered with Stellite sanitary valves and ceramic plungers for ultra-smooth milk, cream, and juice emulsification with 30% reduced energy footprint.',
    },
    {
      id: 2,
      title: 'Highlights from India Dairy Expo 2024: Nandhas Showcases Automated HTST Systems',
      date: 'July 28, 2024',
      category: 'Exhibition & Expo',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      summary: 'Over 400 dairy processors visited our showcase to experience our live continuous pasteurizers and PLC touch-screen automation controls.',
    },
    {
      id: 3,
      title: 'Expanding Our Architectural Interior Range: 3.0mm Calacatta Marble UV Sheets',
      date: 'June 19, 2024',
      category: 'Interior Materials',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      summary: 'Class B1 fire-rated and 100% waterproof luxury PVC sheets launched for modern hospitality, commercial lobbies, and modular residential interiors.',
    },
    {
      id: 4,
      title: 'Nandhas Reaches Milestone: Over 5,000 Industrial Food Machines Commissioned',
      date: 'May 10, 2024',
      category: 'Company Milestone',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      summary: 'A look back at 25 years of relentless craftsmanship, precision SS304/SS316 fabrication, and expanding direct support infrastructure across India.',
    },
  ];

  return (
    <div className="bg-[#f5f7fb] min-h-screen py-8 lg:py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-navy-800 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">News, Updates &amp; Press</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] text-white shadow-2xl p-8 sm:p-14 border border-slate-800">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest">
              <Newspaper className="w-4 h-4 text-accent-orange" />
              <span>INDUSTRY INSIGHTS &amp; ANNOUNCEMENTS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
              News, Expo Highlights &amp; Innovations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Stay up-to-date with our latest machinery releases, factory expansion updates, exhibition appearances, and food engineering insights.
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <span className="absolute top-3 left-3 bg-navy-800/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-800 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.summary}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <Link href="/machinery" className="text-xs font-bold text-navy-800 hover:text-accent-orange inline-flex items-center">
                    Explore Featured Machinery <ArrowRight className="w-3 h-3 ml-1" />
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
