'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Package
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuoteModal from '../components/QuoteModal';
import { getFeaturedProducts, getCategories, getBanners } from '../services/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesResult, productsResult, bannersResult] = await Promise.allSettled([
          getCategories('MACHINERY'),
          getFeaturedProducts(),
          getBanners(),
        ]);
        const cRes = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
        const pRes = productsResult.status === 'fulfilled' ? productsResult.value : [];
        const bRes = bannersResult.status === 'fulfilled' ? bannersResult.value : [];
        setCategories(cRes || []);
        setFeaturedProducts(Array.isArray(pRes) ? pRes : []);
        setBanners(Array.isArray(bRes) ? bRes : []);
      } catch (err) {
        console.error('Homepage load error:', err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const currentSlidesList = banners;
  const currentSlide = currentSlidesList.length > 0 ? currentSlidesList[activeSlide % currentSlidesList.length] : null;
  const hasBanner = Boolean(currentSlide);

  useEffect(() => {
    if (currentSlidesList.length < 2) return undefined;
    const timer = setInterval(() => setActiveSlide((previous) => (previous + 1) % currentSlidesList.length), 6000);
    return () => clearInterval(timer);
  }, [currentSlidesList.length]);

  return (
    <div className="bg-surface-bg min-h-screen font-sans w-full max-w-full overflow-x-hidden">
      {/* 1. HERO SECTION (Dynamic Multi-Device Responsive Banner) */}
      {loading ? (
        <section className="relative min-h-[180px] xs:min-h-[220px] sm:min-h-[380px] animate-pulse overflow-hidden bg-slate-200" aria-label="Loading banners" />
      ) : hasBanner ? (
        <section className="relative w-full bg-slate-950 overflow-hidden flex items-center">
          {/* Background Responsive Image */}
          <div className="relative w-full">
            <Link href={currentSlide.targetUrl || '/machinery'} className="block w-full cursor-pointer" aria-label="Nandhas Hero Banner">
              <picture className="block w-full">
                <source media="(max-width: 640px)" srcSet={currentSlide.mobileImageUrl || currentSlide.desktopImageUrl || currentSlide.imageUrl} />
                <source media="(max-width: 1024px)" srcSet={currentBannerTablet(currentSlide)} />
                <img 
                  src={currentSlide.desktopImageUrl || currentSlide.imageUrl} 
                  alt="Nandhas promotional banner" 
                  className="w-full h-auto object-contain sm:object-cover max-h-[240px] xs:max-h-[300px] sm:max-h-[420px] md:max-h-[520px] lg:max-h-[640px]" 
                />
              </picture>
            </Link>
          </div>

          {/* Carousel Prev/Next Navigation Controls (Compact on Mobile) */}
          {currentSlidesList.length > 1 && (
            <>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? currentSlidesList.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-accent-orange transition z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === currentSlidesList.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-accent-orange transition z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2 rounded-full bg-black/40 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md border border-white/10">
                {currentSlidesList.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === activeSlide % currentSlidesList.length ? 'w-5 sm:w-7 bg-accent-orange' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Show banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="relative overflow-hidden bg-navy-950 text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(29,63,173,0.5),transparent_38%),linear-gradient(120deg,#040b1d,#0B1F4D)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-300">
                NANDHAS MACHINERY &amp; INTERIORS
              </span>
              <h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Engineering solutions for better production spaces.
              </h1>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                Explore dependable dairy, ice cream, beverage machinery and premium interior panels—supported from consultation to installation.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/machinery" className="inline-flex items-center justify-center rounded-xl bg-accent-orange px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-accent-hover">
                  <span>Explore Machinery</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/quote" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              CERTIFIED MACHINERY CATALOGUE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-navy-800 font-display tracking-tight mt-0.5">
              Featured Machines &amp; Equipment
            </h2>
          </div>
          <Link
            href="/machinery"
            className="text-xs font-bold text-navy-800 hover:text-accent-orange flex items-center transition shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Responsive Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-[360px] animate-pulse rounded-3xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
            <Package className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="mt-3 text-base sm:text-lg font-extrabold text-navy-800">Products are being prepared</h3>
            <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-slate-500">
              Our latest machinery catalogue will appear here soon. Browse the full catalogue or speak with our team for a recommendation.
            </p>
            <Link href="/machinery" className="mt-4 inline-flex items-center rounded-xl bg-navy-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-navy-700">
              Browse Catalogue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

function currentBannerTablet(slide) {
  return slide.tabletImageUrl || slide.desktopImageUrl || slide.imageUrl;
}
