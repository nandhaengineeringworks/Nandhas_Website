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
  Flame
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuoteModal from '../components/QuoteModal';
import { getFeaturedProducts, getCategories, getBanners } from '../services/api';

const quickCategories = [
  {
    name: 'Milk & Dairy',
    icon: <Milk className="w-4 h-4 text-blue-600" />,
    link: '/machinery?cat=milk-dairy-machinery',
    badge: 'Popular'
  },
  {
    name: 'Ice Cream',
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    link: '/machinery?cat=ice-cream-machinery',
    badge: 'Hot'
  },
  {
    name: 'Beverage Lines',
    icon: <Boxes className="w-4 h-4 text-cyan-600" />,
    link: '/machinery?cat=beverage-bottling-machinery',
    badge: null
  },
  {
    name: 'Spare Parts',
    icon: <Wrench className="w-4 h-4 text-emerald-600" />,
    link: '/machinery?cat=machine-parts-fittings',
    badge: null
  },
  {
    name: 'UV Marble Panels',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    link: '/interior?cat=pvc-interior-panels',
    badge: 'New'
  },
  {
    name: 'Charcoal Louvers',
    icon: <Sparkles className="w-4 h-4 text-rose-500" />,
    link: '/interior?cat=wood-wpc-interior-products',
    badge: null
  },
];

const mobileTrustBadges = [
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-trust-green" />, text: '100% Certified SS304' },
  { icon: <Award className="w-3.5 h-3.5 text-blue-600" />, text: '1 Year Full Warranty' },
  { icon: <Truck className="w-3.5 h-3.5 text-amber-600" />, text: 'Pan-India Dispatch' },
  { icon: <Wrench className="w-3.5 h-3.5 text-purple-600" />, text: 'On-Site Commissioning' },
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
    <div className="bg-surface-bg min-h-screen font-sans w-full max-w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION (Dynamic Multi-Device Responsive Banner with Touch Swipe) */}
      {loading ? (
        <section className="relative min-h-[160px] xs:min-h-[200px] sm:min-h-[380px] animate-pulse overflow-hidden bg-slate-200" aria-label="Loading banners" />
      ) : hasBanner ? (
        <section 
          className="relative w-full bg-slate-950 overflow-hidden flex items-center select-none"
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

          {/* Carousel Navigation Controls (Desktop + Mobile Dots) */}
          {currentSlidesList.length > 1 && (
            <>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? currentSlidesList.length - 1 : prev - 1))}
                className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md shadow-lg items-center justify-center hover:bg-accent-orange transition z-20 active:scale-90"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === currentSlidesList.length - 1 ? 0 : prev + 1))}
                className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md shadow-lg items-center justify-center hover:bg-accent-orange transition z-20 active:scale-90"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2 rounded-full bg-black/45 px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md border border-white/10">
                {currentSlidesList.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === activeSlide % currentSlidesList.length ? 'w-4 sm:w-7 bg-accent-orange' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Show banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="relative overflow-hidden bg-navy-950 text-white py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(29,63,173,0.5),transparent_38%),linear-gradient(120deg,#040b1d,#0B1F4D)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-300">
                NANDHAS MACHINERY &amp; INTERIORS
              </span>
              <h1 className="mt-3 sm:mt-4 text-xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Engineering solutions for better production spaces.
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                Explore dependable dairy, ice cream, beverage machinery and premium interior panels—supported from consultation to installation.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link href="/machinery" className="inline-flex items-center justify-center rounded-xl bg-accent-orange px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-accent-hover active:scale-95">
                  <span>Explore Machinery</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button onClick={() => setQuoteModalOpen(true)} className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20 active:scale-95">
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. MOBILE QUICK CATEGORY PILL STRIP (Fast 1-Tap Discovery on Mobile) */}
      <section className="bg-white border-b border-slate-200/80 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {quickCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-navy-800 hover:text-white border border-slate-200/80 shrink-0 transition-all duration-200 active:scale-95 shadow-2xs"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white group-hover:bg-white/20 shadow-2xs shrink-0">
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-white tracking-tight shrink-0">
                  {cat.name}
                </span>
                {cat.badge && (
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow-2xs shrink-0 ${
                    cat.badge === 'Hot' ? 'bg-rose-500 text-white' : 
                    cat.badge === 'New' ? 'bg-emerald-500 text-white' : 
                    'bg-amber-400 text-slate-900'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MOBILE TRUST & ASSURANCE STRIP */}
      <section className="bg-slate-100/60 border-b border-slate-200/60 py-2.5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-around gap-3 overflow-x-auto no-scrollbar">
            {mobileTrustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 text-[10.5px] sm:text-xs font-bold text-slate-700">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION (High-Density 2-Column Mobile Grid) */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between gap-2 px-1">
          <div>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              CERTIFIED MACHINERY CATALOGUE
            </span>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-navy-800 font-display tracking-tight mt-0.5">
              Featured Machines &amp; Equipment
            </h2>
          </div>
          <Link
            href="/machinery"
            className="text-xs font-bold text-navy-800 hover:text-accent-orange flex items-center transition shrink-0 bg-white sm:bg-transparent px-2.5 py-1.5 sm:p-0 rounded-lg border sm:border-0 border-slate-200 shadow-2xs sm:shadow-none"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 2-Column Responsive Product Grid on Mobile */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-64 sm:h-[360px] animate-pulse rounded-2xl sm:rounded-3xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-8 sm:py-10 text-center">
            <Package className="mx-auto h-9 w-9 sm:h-10 sm:w-10 text-slate-400" />
            <h3 className="mt-3 text-sm sm:text-lg font-extrabold text-navy-800">Products are being prepared</h3>
            <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-slate-500">
              Our latest machinery catalogue will appear here soon. Browse the full catalogue or speak with our team for a recommendation.
            </p>
            <Link href="/machinery" className="mt-4 inline-flex items-center rounded-xl bg-navy-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-navy-700">
              Browse Catalogue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* 5. MOBILE QUICK RFQ & FACTORY CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#061a38] via-[#0b2b5b] to-[#123d78] p-5 sm:p-8 text-white relative overflow-hidden shadow-xl border border-navy-800">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-accent-orange block">
                DIRECT HYDERABAD PLANT FABRICATION
              </span>
              <h3 className="text-lg sm:text-2xl font-black font-display text-white">
                Looking for Custom Plant Layout or Capacities?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with Prahalad Nandha for custom food processing fabrication, bulk quotations, and technical drawings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto pt-1">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg transition flex items-center justify-center active:scale-95"
              >
                <Send className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>Instant RFQ</span>
              </button>
              <a
                href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20want%20to%20inquire%20about%20machinery%20specifications."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold uppercase tracking-wider shadow transition flex items-center justify-center active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 shrink-0 fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+918309004707"
                className="hidden xs:flex px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition items-center justify-center"
                title="Call Direct"
              >
                <Phone className="w-3.5 h-3.5" />
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
