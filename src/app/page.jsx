'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Package,
  Milk,
  Sparkles,
  Boxes,
  Wrench,
  Layers,
  ShieldCheck,
  Award,
  Truck,
  Send,
  MessageCircle,
  Phone,
  Flame,
  Star
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuoteModal from '../components/QuoteModal';
import { getFeaturedProducts, getCategories, getBanners, getProducts } from '../services/api';

const quickCategories = [
  {
    name: 'Milk & Dairy',
    icon: <Milk className="w-4 h-4 text-blue-600" />,
    link: '/machinery?cat=milk-dairy-machinery',
    badge: 'Popular',
    badgeClass: 'badge-vivid-popular'
  },
  {
    name: 'Ice Cream',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    link: '/machinery?cat=ice-cream-machinery',
    badge: 'Hot',
    badgeClass: 'badge-vivid-hot'
  },
  {
    name: 'Beverage Lines',
    icon: <Boxes className="w-4 h-4 text-cyan-500" />,
    link: '/machinery?cat=beverage-bottling-machinery',
    badge: null
  },
  {
    name: 'Spare Parts',
    icon: <Wrench className="w-4 h-4 text-emerald-500" />,
    link: '/machinery?cat=machine-parts-fittings',
    badge: null
  },
  {
    name: 'UV Marble Panels',
    icon: <Layers className="w-4 h-4 text-indigo-500" />,
    link: '/interior?cat=pvc-interior-panels',
    badge: 'New',
    badgeClass: 'badge-vivid-new'
  },
  {
    name: 'Charcoal Louvers',
    icon: <Sparkles className="w-4 h-4 text-rose-500" />,
    link: '/interior?cat=wood-wpc-interior-products',
    badge: null
  },
];

const mobileTrustBadges = [
  { icon: <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />, text: '100% Certified SS304' },
  { icon: <Award className="w-4 h-4 text-blue-500 shrink-0" />, text: '1 Year Full Warranty' },
  { icon: <Truck className="w-4 h-4 text-amber-500 shrink-0" />, text: 'Pan-India Dispatch' },
  { icon: <Wrench className="w-4 h-4 text-purple-500 shrink-0" />, text: 'On-Site Commissioning' },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Touch Swipe Support for mobile hero
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesResult, productsResult, bannersResult] = await Promise.allSettled([
          getCategories('MACHINERY'),
          getFeaturedProducts(),
          getBanners(),
        ]);
        const cRes = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
        let pRes = productsResult.status === 'fulfilled' ? productsResult.value : [];
        const bRes = bannersResult.status === 'fulfilled' ? bannersResult.value : [];

        // Fallback: If no featured products exist, load all latest products
        if (!Array.isArray(pRes) || pRes.length === 0) {
          const allProds = await getProducts({ size: 12 });
          pRes = allProds?.content || [];
        }

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe && currentSlidesList.length > 1) {
      setActiveSlide((prev) => (prev + 1) % currentSlidesList.length);
    } else if (isRightSwipe && currentSlidesList.length > 1) {
      setActiveSlide((prev) => (prev === 0 ? currentSlidesList.length - 1 : prev - 1));
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans w-full max-w-full overflow-x-hidden pb-12 sm:pb-0">
      
      {/* 1. HERO SECTION (High Intensity Dynamic Multi-Device Responsive Banner with Touch Swipe) */}
      {loading ? (
        <section className="relative min-h-[160px] xs:min-h-[200px] sm:min-h-[380px] animate-shimmer overflow-hidden bg-slate-200" aria-label="Loading banners" />
      ) : hasBanner ? (
        <section 
          className="relative w-full bg-slate-950 overflow-hidden flex items-center select-none shadow-xl border-b border-navy-800"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Responsive Image */}
          <div className="relative w-full">
            <Link href={currentSlide.targetUrl || '/machinery'} className="block w-full cursor-pointer" aria-label="Nandhas Hero Banner">
              <picture className="block w-full">
                <source media="(max-width: 640px)" srcSet={currentSlide.mobileImageUrl || currentSlide.desktopImageUrl || currentSlide.imageUrl} />
                <source media="(max-width: 1024px)" srcSet={currentBannerTablet(currentSlide)} />
                <img 
                  src={currentSlide.desktopImageUrl || currentSlide.imageUrl} 
                  alt="Nandhas promotional banner" 
                  className="w-full h-auto object-contain sm:object-cover min-h-[160px] sm:min-h-[300px] max-h-[220px] xs:max-h-[280px] sm:max-h-[420px] md:max-h-[520px] lg:max-h-[640px]" 
                  onError={(e) => {
                    if (currentSlide.imageUrl && e.currentTarget.src !== currentSlide.imageUrl) {
                      e.currentTarget.src = currentSlide.imageUrl;
                    }
                  }}
                />
              </picture>
            </Link>
          </div>

          {/* Carousel Controls */}
          {currentSlidesList.length > 1 && (
            <>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? currentSlidesList.length - 1 : prev - 1))}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-950/80 text-white border border-white/30 backdrop-blur-md shadow-glow-orange items-center justify-center hover:bg-accent-orange transition z-20 active:scale-90"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === currentSlidesList.length - 1 ? 0 : prev + 1))}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-950/80 text-white border border-white/30 backdrop-blur-md shadow-glow-orange items-center justify-center hover:bg-accent-orange transition z-20 active:scale-90"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 sm:bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy-950/80 px-3 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
                {currentSlidesList.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide % currentSlidesList.length ? 'w-6 sm:w-9 bg-accent-orange shadow-glow-orange' : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Show banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="relative overflow-hidden bg-navy-950 text-white py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,240,255,0.25),transparent_40%),linear-gradient(120deg,#03081c,#0a1d4a,#0f52ba)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-amber-400/40 bg-amber-500/20 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-amber-300 shadow-glow-orange">
                NANDHAS MACHINERY &amp; INTERIORS
              </span>
              <h1 className="mt-4 text-2xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                High-Performance Dairy &amp; Food Processing Equipment.
              </h1>
              <p className="mt-3 text-xs sm:text-base leading-relaxed text-slate-200 font-medium">
                Engineered for continuous production excellence with 100% SS304 Food Grade Stainless Steel &amp; Factory Warranty.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/machinery" className="inline-flex items-center justify-center rounded-xl bg-gradient-vivid-orange px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-glow-orange transition hover:scale-105 active:scale-95">
                  <span>Explore Machines</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button onClick={() => setQuoteModalOpen(true)} className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95">
                  Request Instant Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. MOBILE QUICK CATEGORY PILL STRIP (High-Intensity Vivid Badges) */}
      <section className="bg-white border-b border-slate-200 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
            {quickCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-50 hover:bg-navy-900 hover:text-white border border-slate-200/90 shrink-0 transition-all duration-200 active:scale-95 shadow-2xs hover:shadow-md"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-white group-hover:bg-white/20 shadow-xs shrink-0 border border-slate-100">
                  {cat.icon}
                </div>
                <span className="text-xs font-black text-slate-900 group-hover:text-white tracking-tight shrink-0">
                  {cat.name}
                </span>
                {cat.badge && (
                  <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${cat.badgeClass || 'bg-amber-400 text-slate-950'}`}>
                    {cat.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MOBILE TRUST & ASSURANCE STRIP (Vivid High Contrast Icons) */}
      <section className="bg-slate-200/80 border-b border-slate-300/80 py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-around gap-4 overflow-x-auto no-scrollbar">
            {mobileTrustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0 px-2.5 py-1 rounded-xl bg-white/90 shadow-2xs border border-slate-200 text-[11px] sm:text-xs font-black text-slate-800">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION (High-Density 2-Column Mobile Grid) */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-4 sm:space-y-8">
        <div className="flex items-center justify-between gap-2 px-1">
          <div>
            <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-widest text-gradient-vivid block">
              CERTIFIED MACHINERY CATALOGUE
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-navy-950 font-display tracking-tight mt-0.5">
              Featured Machines &amp; Equipment
            </h2>
          </div>
          <Link
            href="/machinery"
            className="text-xs font-black text-navy-900 hover:text-accent-orange flex items-center transition shrink-0 bg-white sm:bg-transparent px-3.5 py-2 sm:p-0 rounded-xl border sm:border-0 border-slate-300 shadow-xs sm:shadow-none"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 ml-1 text-accent-orange" />
          </Link>
        </div>

        {/* 2-Column Responsive Product Grid on Mobile */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-68 sm:h-[380px] animate-shimmer rounded-3xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center shadow-xs">
            <Package className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="mt-3 text-base sm:text-lg font-black text-navy-950">Products are being prepared</h3>
            <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-slate-500">
              Our latest machinery catalogue will appear here soon. Browse the full catalogue or speak with our team for a recommendation.
            </p>
            <Link href="/machinery" className="mt-4 inline-flex items-center rounded-xl bg-navy-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-navy-800">
              Browse Catalogue <ArrowRight className="ml-2 h-4 w-4 text-accent-orange" />
            </Link>
          </div>
        )}
      </section>

      {/* 5. MOBILE QUICK RFQ & FACTORY CONSULTATION BANNER (Vivid Gradient Navy Banner) */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl gradient-royal-blue p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-navy-700">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-orange/20 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-widest text-amber-400 block drop-shadow-xs">
                DIRECT HYDERABAD PLANT FABRICATION
              </span>
              <h3 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight">
                Looking for Custom Plant Layout or Capacities?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Connect directly with Prahalad Nandha for custom food processing fabrication, bulk quotations, and technical drawings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pt-1">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-gradient-vivid-orange hover:scale-105 text-white text-xs font-black uppercase tracking-wider shadow-glow-orange transition flex items-center justify-center active:scale-95"
              >
                <Send className="w-4 h-4 mr-2 shrink-0" />
                <span>Instant RFQ</span>
              </button>
              <a
                href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20want%20to%20inquire%20about%20machinery%20specifications."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-black uppercase tracking-wider shadow-lg transition flex items-center justify-center active:scale-95"
              >
                <MessageCircle className="w-4 h-4 mr-2 shrink-0 fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+918309004707"
                className="hidden xs:flex px-4 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/25 transition items-center justify-center shadow-xs"
                title="Call Direct"
              >
                <Phone className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}

function currentBannerTablet(slide) {
  return slide.tabletImageUrl || slide.desktopImageUrl || slide.imageUrl;
}
