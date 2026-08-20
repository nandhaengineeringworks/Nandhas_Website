'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Heart, Eye, Ruler, BadgeCheck } from 'lucide-react';
import QuoteModal from './QuoteModal';
import { useSettings } from '../context/SettingsContext';

export default function ProductCard({ product }) {
  const { showPrices } = useSettings();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const isMachinery = product.categoryType === 'MACHINERY';
  const isQuote = !showPrices || product.isQuoteOnly || !product.price;

  // Extract specs
  const specs = product.keySpecs || {};
  const capacity = specs['Capacity'] || specs['Standard Dimensions'] || Object.values(specs)[0] || 'Standard Grade';
  const materialOrType = specs['Material'] || specs['Core Composition'] || specs['Automation'] || (isMachinery ? 'SS304 Food Grade' : 'Class B1 Fire Rated');
  const secondSpec = specs['Power'] || specs['Finish'] || specs['Dimensions'] || materialOrType;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-card-hover">
        {/* Top Badges & Wishlist Toggle */}
        <div className="flex items-center justify-between absolute top-3 left-3 right-3 z-10">
          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
            isMachinery ? 'bg-navy-50 text-navy-800 border border-navy-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
          }`}>
            {product.categoryName || (isMachinery ? 'Machinery' : 'Interior')}
          </span>

          <div className="flex items-center space-x-1">
            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`p-1.5 rounded-lg border text-[10px] transition shadow-sm ${
                wishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white/90 text-slate-400 border-slate-200 hover:text-red-500'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div>
          {/* Thumbnail Image */}
          <div className="relative mt-6 mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/50 p-3">
            <img
              src={product.primaryImageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'}
              alt={product.name}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-navy-800 opacity-0 shadow-sm transition group-hover:opacity-100">View product</span>
          </div>

          {/* Title & Technical Specs Lines */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-base font-extrabold leading-snug text-content-main group-hover:text-navy-800 line-clamp-2 transition">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="min-w-0 rounded-xl bg-slate-50 px-2.5 py-2"><span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-400"><Ruler className="h-3 w-3" />Capacity</span><span className="mt-0.5 block truncate text-xs font-bold text-slate-700">{capacity}</span></div>
            <div className="min-w-0 rounded-xl bg-slate-50 px-2.5 py-2"><span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-400"><BadgeCheck className="h-3 w-3" />Key detail</span><span className="mt-0.5 block truncate text-xs font-bold text-slate-700">{secondSpec}</span></div>
          </div>
        </div>

        {/* Commercial Price & Dual Action Buttons */}
        <div className="mt-auto space-y-3 border-t border-slate-100 pt-4">
          <div className="flex min-h-[34px] items-center justify-between gap-2">
            {isQuote ? (
              <div><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Commercial price</span><span className="text-sm font-black text-accent-orange">Price on Request</span></div>
            ) : (
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Commercial price</span>
                <span className="text-base font-black text-navy-800">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[9px] text-slate-400 block">+ 18% GST</span>
              </div>
            )}
          </div>

          {/* Dual Action Buttons: [View Details] and [Get Quote] */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center rounded-xl border border-navy-800 py-2.5 text-xs font-bold uppercase text-navy-800 text-center transition hover:bg-navy-50"
            >
              <Eye className="w-3 h-3 mr-1" />
              <span>Details</span>
            </Link>

            <button
              onClick={() => setQuoteOpen(true)}
              className="flex items-center justify-center rounded-xl bg-navy-800 py-2.5 text-xs font-bold uppercase text-white transition shadow-sm hover:bg-navy-900"
            >
              <Send className="w-3 h-3 mr-1 text-accent-orange" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} product={product} />
    </>
  );
}
