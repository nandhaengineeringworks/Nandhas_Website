'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Layers, ChevronRight, Sparkles, Send, CheckCircle2, Eye, Download, Check, ArrowRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import QuoteModal from '../../components/QuoteModal';
import { getProducts, getCategories, getBanners } from '../../services/api';

const interiorAliasMap = {
  'pvc-products': 'pvc-interior-panels',
  'pvc-interior-panels': 'pvc-interior-panels',
  'pvc': 'pvc-interior-panels',
  'wood-products': 'wood-wpc-interior-products',
  'wood-wpc-interior-products': 'wood-wpc-interior-products',
  'wood': 'wood-wpc-interior-products',
  'plywood': 'wood-wpc-interior-products',
  'mdf': 'wood-wpc-interior-products',
  'wpc': 'wood-wpc-interior-products',
};

function InteriorContent() {
  const searchParams = useSearchParams();
  const rawCatParam = searchParams?.get('cat') || searchParams?.get('category') || '';
  const initialCat = interiorAliasMap[rawCatParam] || rawCatParam;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync category state when URL query param changes
  useEffect(() => {
    if (rawCatParam) {
      const mapped = interiorAliasMap[rawCatParam] || rawCatParam;
      setSelectedCat(mapped);
    }
  }, [rawCatParam]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, pRes, bRes] = await Promise.all([
          getCategories('INTERIOR'),
          getProducts({ type: 'INTERIOR' }),
          getBanners('INTERIOR'),
        ]);
        setCategories(cRes || []);
        setProducts(pRes.content || []);
        setBanners(bRes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = selectedCat
    ? products.filter(p => p.categorySlug === selectedCat)
    : products;

  const currentBanner = banners.length > 0 ? banners[0] : null;

  let features = [];
  if (currentBanner?.featuresJson) {
    try { features = JSON.parse(currentBanner.featuresJson); } catch (e) {}
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Architectural Interior Panels</span>
        </div>

        {/* Dynamic Multi-Device Responsive Hero Banner */}
        {currentBanner && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[360px] sm:min-h-[420px] flex items-center">
            {/* Background Images */}
            <div className="absolute inset-0 z-0">
              <picture>
                <source media="(max-width: 767px)" srcSet={currentBanner.mobileImageUrl || currentBanner.desktopImageUrl || currentBanner.imageUrl} />
                <source media="(max-width: 1199px)" srcSet={currentBanner.tabletImageUrl || currentBanner.desktopImageUrl || currentBanner.imageUrl} />
                <img src={currentBanner.desktopImageUrl || currentBanner.imageUrl} alt="Nandhas banner" className="w-full h-full object-cover" />
              </picture>
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: currentBanner.overlayColor || '#0F172A',
                  opacity: (currentBanner.overlayOpacity !== undefined ? currentBanner.overlayOpacity : 55) / 100
                }}
              ></div>
            </div>

            {/* Banner Copy & CTAs */}
            <div className="relative z-10 p-8 sm:p-12 text-white max-w-2xl space-y-4">
              {currentBanner.smallTag && (
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> {currentBanner.smallTag}
                </span>
              )}

              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                {currentBanner.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                {currentBanner.subtitle}
              </p>

              {features.length > 0 && (
                <div className="hidden sm:flex flex-wrap gap-2 pt-1">
                  {features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20 backdrop-blur-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-trust-green mr-1.5" />
                      {feat}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {currentBanner.primaryButtonEnabled !== false && (
                  <button
                    onClick={() => setSampleModalOpen(true)}
                    className="px-6 py-3.5 bg-gradient-to-r from-accent-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>{currentBanner.primaryButtonText || 'Request Swatch Sample Kit'}</span>
                  </button>
                )}

                {currentBanner.secondaryButtonEnabled !== false && (
                  <Link
                    href={currentBanner.secondaryButtonLink || '/contact'}
                    className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs rounded-xl backdrop-blur-sm transition flex items-center justify-center"
                  >
                    <span>{currentBanner.secondaryButtonText || 'Talk to Design Team'}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCat('')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition ${
              selectedCat === '' ? 'bg-amber-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Interior Collections ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition ${
                selectedCat === c.slug ? 'bg-amber-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-4 border border-slate-200 animate-pulse space-y-3">
                <div className="h-48 bg-slate-100 rounded-2xl" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No products found in this collection</h3>
            <p className="text-xs text-slate-400">Please select another category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        product={{ name: 'Contractor Swatch Sample Kit (PVC & Fluted Louvers)' }}
      />
    </div>
  );
}

export default function InteriorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-12 text-center text-xs text-slate-400">Loading Interior Collection...</div>}>
      <InteriorContent />
    </Suspense>
  );
}
