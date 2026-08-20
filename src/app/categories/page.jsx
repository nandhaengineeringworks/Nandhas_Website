'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Milk, 
  Sparkles, 
  Boxes, 
  Cog, 
  Layers, 
  Wrench, 
  Snowflake, 
  Package, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { getCategories } from '../../services/api';

export default function CategoriesDirectoryPage() {
  const [machineryCats, setMachineryCats] = useState([]);
  const [interiorCats, setInteriorCats] = useState([]);
  const [activeDomain, setActiveDomain] = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const [mCats, iCats] = await Promise.all([
          getCategories('MACHINERY'),
          getCategories('INTERIOR'),
        ]);
        setMachineryCats(mCats || []);
        setInteriorCats(iCats || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const masterCategories = [
    {
      title: 'Milk & Dairy Processing Machines',
      domain: 'MACHINERY',
      desc: 'HTST Pasteurizers, Homogenizers, Storage Silos, Cream Separators & Ghee Boilers.',
      icon: Milk,
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80',
      link: '/machinery?cat=milk-processing-machines',
      itemCount: '12+ Models'
    },
    {
      title: 'Commercial Ice Cream Freezers',
      domain: 'MACHINERY',
      desc: 'Soft Serve Softy Machines, Gelato Batch Freezers, Hardening Rooms & Cone Dispensers.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
      link: '/machinery?cat=ice-cream-machines',
      itemCount: '8+ Models'
    },
    {
      title: 'Beverage Bottling & Canning Lines',
      domain: 'MACHINERY',
      desc: 'Automatic Rinse-Fill-Cap Monoblocks, Juice Extractors & Carbonated Bottling.',
      icon: Boxes,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
      link: '/machinery?cat=beverage-machines',
      itemCount: '6+ Plants'
    },
    {
      title: 'Juice Processing Plants',
      domain: 'MACHINERY',
      desc: 'Fruit Pulp Extraction, Clarification, Pasteurization & Bag-in-Box Filling.',
      icon: Cog,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      link: '/machinery?cat=juice-machines',
      itemCount: '5+ Models'
    },
    {
      title: '3mm UV High-Gloss Marble Sheets',
      domain: 'INTERIOR',
      desc: 'Waterproof faux marble cladding for luxury interior walls, hotels & elevators.',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      link: '/interior',
      itemCount: '14+ Finishes'
    },
    {
      title: 'Acoustic Charcoal Louvered Panels',
      domain: 'INTERIOR',
      desc: 'Sound-dampening fluted wall slats for corporate boardrooms and auditoriums.',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      link: '/interior',
      itemCount: '8+ Textures'
    },
    {
      title: 'Waterproof PVC Ceiling Planks',
      domain: 'INTERIOR',
      desc: '100% moisture-resistant interlocking ceiling and wall false panels.',
      icon: Package,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      link: '/interior',
      itemCount: '10+ Patterns'
    },
    {
      title: 'Refrigeration & Deep Freezers',
      domain: 'MACHINERY',
      desc: 'Walk-in blast freezers, cold room storage, and Danfoss-powered condensing units.',
      icon: Snowflake,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      link: '/machinery',
      itemCount: '6+ Units'
    },
  ];

  const filtered = activeDomain === 'ALL'
    ? masterCategories
    : masterCategories.filter(c => c.domain === activeDomain);

  return (
    <div className="bg-surface-bg min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-content-muted">
            <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-content-main">Master Categories Directory</span>
          </div>

          <div className="bg-navy-800 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-trust-green" /> Complete Catalogue Hierarchy
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                Equipment &amp; Surface Categories
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Browse our comprehensive catalogue of dairy machines, ice cream freezers, bottling plants, UV marble sheets, and architectural louvers.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 border-b border-surface-border pb-3">
          <button
            onClick={() => setActiveDomain('ALL')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'ALL'
                ? 'bg-navy-800 text-white shadow'
                : 'text-content-muted hover:bg-slate-100 hover:text-content-main'
            }`}
          >
            All Categories ({masterCategories.length})
          </button>
          <button
            onClick={() => setActiveDomain('MACHINERY')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'MACHINERY'
                ? 'bg-navy-800 text-white shadow'
                : 'text-content-muted hover:bg-slate-100 hover:text-content-main'
            }`}
          >
            Industrial Machinery
          </button>
          <button
            onClick={() => setActiveDomain('INTERIOR')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeDomain === 'INTERIOR'
                ? 'bg-navy-800 text-white shadow'
                : 'text-content-muted hover:bg-slate-100 hover:text-content-main'
            }`}
          >
            Architectural Interior &amp; Panels
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                href={cat.link}
                className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-card hover:shadow-card-hover transition group flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-navy-800/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow">
                    {cat.itemCount}
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-accent-orange uppercase block">
                      {cat.domain}
                    </span>
                    <h3 className="font-bold text-sm text-content-main group-hover:text-navy-800 transition line-clamp-1 mt-0.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-content-muted leading-relaxed line-clamp-2 mt-1">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-800 group-hover:text-accent-orange transition">
                    <span>View Equipment</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
