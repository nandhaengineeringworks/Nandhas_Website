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
      <div className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-md">
        
        {/* Top Badges & Wishlist Toggle */}
        <div className="flex items-center justify-between absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
          <span className={`text-[8px] sm:text-[9px] font-extrabold uppercase px-2 py-0.5 rounded truncate max-w-[150px] sm:max-w-none ${
            isMachinery ? 'bg-navy-50 text-navy-800 border border-navy-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
          }`}>
            {product.categoryName || (isMachinery ? 'Machinery' : 'Interior')}
          </span>

          <div className="flex items-center space-x-1 shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`p-1.5 rounded-lg border text-[10px] transition shadow-xs ${
                wishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white/90 text-slate-400 border-slate-200 hover:text-red-500'
              }`}
              title="Save to Wishlist"
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div>
          {/* Thumbnail Image */}
          <Link href={`/product/${product.slug}`} className="block">
            <div className="relative mt-6 mb-3 sm:mb-4 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/50 p-2 sm:p-3">
              <img
                src={product.primaryImageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-navy-800 opacity-0 shadow-xs transition group-hover:opacity-100 sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                View product
              </span>
            </div>
          </Link>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-extrabold leading-snug text-slate-900 group-hover:text-navy-800 line-clamp-2 transition break-words">
              {product.name}
            </h3>
          </Link>

          {/* Technical Specs Lines */}
          <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="min-w-0 rounded-xl bg-slate-50 px-2 py-1.5 sm:px-2.5 sm:py-2 border border-slate-100/80">
              <span className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide text-slate-400 truncate">
                <Ruler className="h-3 w-3 shrink-0" />
                <span className="truncate">Capacity</span>
              </span>
              <span className="mt-0.5 block truncate text-[11px] sm:text-xs font-bold text-slate-700">{capacity}</span>
            </div>
            
            <div className="min-w-0 rounded-xl bg-slate-50 px-2 py-1.5 sm:px-2.5 sm:py-2 border border-slate-100/80">
              <span className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide text-slate-400 truncate">
                <BadgeCheck className="h-3 w-3 shrink-0" />
                <span className="truncate">Key Spec</span>
              </span>
              <span className="mt-0.5 block truncate text-[11px] sm:text-xs font-bold text-slate-700">{secondSpec}</span>
            </div>
          </div>
        </div>

        {/* Commercial Price & Dual Action Buttons */}
        <div className="mt-auto space-y-2.5 sm:space-y-3 border-t border-slate-100 pt-3 sm:pt-4">
          <div className="flex min-h-[30px] items-center justify-between gap-2">
            {isQuote ? (
              <div>
                <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-slate-400">Commercial Price</span>
                <span className="text-xs sm:text-sm font-black text-accent-orange">Price on Request</span>
              </div>
            ) : (
              <div>
                <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-slate-400">Commercial Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-black text-navy-800">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium">+18% GST</span>
                </div>
              </div>
            )}
          </div>

          {/* Dual Action Buttons: [Details] and [Get Quote] */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center rounded-xl border border-navy-800 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase text-navy-800 text-center transition hover:bg-navy-50"
            >
              <Eye className="w-3 h-3 mr-1 shrink-0" />
              <span>Details</span>
            </Link>

            <button
              onClick={() => setQuoteOpen(true)}
              className="flex items-center justify-center rounded-xl bg-navy-800 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase text-white transition shadow-xs hover:bg-navy-900"
            >
              <Send className="w-3 h-3 mr-1 text-accent-orange shrink-0" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} product={product} />
    </>
  );
}
