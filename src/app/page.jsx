'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Wrench, 
  Truck, 
  Headphones, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Snowflake,
  Cog,
  Package,
  Grid,
  Milk,
  Boxes,
  Building2,
  Hammer,
  FileCheck2,
  Settings2,
  Check,
  Scale,
  Phone
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

  /* Legacy fallback hero removed: banners are managed from the admin panel.
  const defaultHeroSlides = [
    {
      id: 'default-1',
      smallTag: '★ ISO 9001:2015 CERTIFIED MACHINERY',
      title: 'Dairy, Ice Cream, Beverage & Food Processing Machinery',
      subtitle: 'High-throughput Milk Pasteurizers, Ice Cream Dispensers & Homogenizers engineered for Indian commercial enterprises.',
      features: ['SS304 / SS316L Food Grade', '24/7 Pan-India Service Hotline', 'Turn-key Plant Commissioning'],
      desktopImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      primaryButtonText: 'REQUEST TURNKEY QUOTE',
      primaryButtonLink: '/quote',
      primaryButtonEnabled: true,
      secondaryButtonText: 'EXPLORE MACHINES',
      secondaryButtonLink: '/machinery',
      secondaryButtonEnabled: true,
      alignment: 'LEFT',
      verticalPosition: 'CENTER',
      overlayOpacity: 60,
      mobile: {
        alignment: 'CENTER',
        verticalPosition: 'CENTER',
        headingSize: 28,
        buttonLayout: 'VERTICAL',
        overlayOpacity: 65,
      }
    }
  ]; */

  // 1. Industries We Serve (6 Clean Cards)
  const industries = [
    {
      name: 'Dairy Processing Plants',
      desc: 'High-volume milk pasteurization, standardized curd, paneer, and cheese plants.',
      icon: Milk,
      tag: 'Food Grade SS316',
    },
    {
      name: 'Ice Cream Manufacturers',
      desc: 'Commercial soft serve parlors, gelato stores, and industrial batch ice cream factories.',
      icon: Sparkles,
      tag: 'Air-Pump Overrun',
    },
    {
      name: 'Beverage & Soft Drinks',
      desc: 'Automated bottling, juice pasteurization, and carbonated drink packaging lines.',
      icon: Boxes,
      tag: 'PLC Monoblock',
    },
    {
      name: 'Commercial Food Kitchens',
      desc: 'Industrial food processing, vacuum packaging, and sanitary liquid handling.',
      icon: Cog,
      tag: 'FSSAI Standards',
    },
    {
      name: 'Interior Architecture & Decor',
      desc: 'Luxury hotel claddings, acoustic commercial spaces, and residence feature walls.',
      icon: Building2,
      tag: 'Class B1 Fire Rating',
    },
    {
      name: 'Commercial Construction',
      desc: '100% waterproof ceiling panels, exterior louvers, and durable PVC partitions.',
      icon: Hammer,
      tag: '100% Waterproof',
    },
  ];

  // 4. How It Works (5 Step Purchasing Process)
  const purchasingSteps = [
    {
      step: '01',
      title: 'Browse & Filter',
      desc: 'Explore our catalog of certified dairy, ice cream, beverage machines, and panels.',
    },
    {
      step: '02',
      title: 'Compare Specifications',
      desc: 'Use our model comparator to review capacity, metallurgy, motor power, and dimensions side-by-side.',
    },
    {
      step: '03',
      title: 'Request Quotation (RFQ)',
      desc: 'Get an official commercial quote with direct factory pricing and technical engineering drawings.',
    },
    {
      step: '04',
      title: 'Order & GST Invoice',
      desc: 'Confirm your order with 18% GST tax invoice and flexible commercial payment terms.',
    },
    {
      step: '05',
      title: 'Delivery & Installation',
      desc: 'Pan-India insured freight delivery followed by on-site commissioning by factory engineers.',
    },
  ];

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

  let slideFeatures = [];
  if (currentSlide?.featuresJson) {
    try { slideFeatures = JSON.parse(currentSlide.featuresJson); } catch (e) {}
  } else if (Array.isArray(currentSlide?.features)) {
    slideFeatures = currentSlide.features;
  }

  let mobileSettings = { alignment: 'CENTER', verticalPosition: 'CENTER', headingSize: 28, buttonLayout: 'VERTICAL', overlayOpacity: 65 };
  if (currentSlide?.mobileSettingsJson) {
    try { mobileSettings = { ...mobileSettings, ...JSON.parse(currentSlide.mobileSettingsJson) }; } catch (e) {}
  } else if (currentSlide?.mobile) {
    mobileSettings = { ...mobileSettings, ...currentSlide.mobile };
  }

  return (
    <div className="bg-surface-bg min-h-screen font-sans">
      {/* 1. HERO SECTION (Dynamic Multi-Device Responsive Banner) */}
      {loading ? (
        <section className="relative min-h-[250px] animate-pulse overflow-hidden bg-slate-200 sm:min-h-[380px]" aria-label="Loading banners" />
      ) : hasBanner ? (
        <section className="relative w-full bg-slate-950 overflow-hidden flex items-center">
          {/* Background Responsive Image */}
          <div className="relative w-full">
            <Link href={currentSlide.targetUrl || '/machinery'} className="block w-full cursor-pointer" aria-label="Nandhas Hero Banner">
              <picture className="block w-full">
                <source media="(max-width: 767px)" srcSet={currentSlide.mobileImageUrl || currentSlide.desktopImageUrl || currentSlide.imageUrl} />
                <source media="(max-width: 1199px)" srcSet={currentSlide.tabletImageUrl || currentSlide.desktopImageUrl || currentSlide.imageUrl} />
                <img 
                  src={currentSlide.desktopImageUrl || currentSlide.imageUrl} 
                  alt="Nandhas promotional banner" 
                  className="w-full h-auto object-cover max-h-[600px] min-h-[200px]" 
                />
              </picture>
            </Link>
          </div>

          {/* Carousel Prev/Next Navigation Controls ONLY when multiple banners exist */}
          {currentSlidesList.length > 1 && (
            <>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? currentSlidesList.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-accent-orange transition z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === currentSlidesList.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-accent-orange transition z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/10">
                {currentSlidesList.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeSlide % currentSlidesList.length ? 'w-7 bg-accent-orange' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Show banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(29,63,173,0.5),transparent_38%),linear-gradient(120deg,#040b1d,#0B1F4D)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl self-center">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-300">NANDHAS MACHINERY &amp; INTERIORS</span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Engineering solutions for better production spaces.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Explore dependable dairy, ice cream, beverage machinery and premium interior panels—supported from consultation to installation.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/machinery" className="inline-flex items-center justify-center rounded-xl bg-accent-orange px-6 py-3.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-950/30 transition hover:bg-accent-hover"><span>Explore Machinery</span><ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/quote" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20">Request a Quote</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end sm:gap-4">
          </div>
        </div>
      </section>
    )}

      {/* 2. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              CERTIFIED MACHINERY CATALOGUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display tracking-tight mt-0.5">
              Featured Machines &amp; Processing Equipment
            </h2>
          </div>
          <Link
            href="/machinery"
            className="text-xs font-bold text-navy-800 hover:text-accent-orange flex items-center transition"
          >
            <span>View All Machines</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Responsive product cards */}
        {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{[1,2,3,4].map((item) => <div key={item} className="h-[390px] animate-pulse rounded-3xl border border-slate-200 bg-white" />)}</div> : featuredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><Package className="mx-auto h-10 w-10 text-slate-400" /><h3 className="mt-4 text-lg font-extrabold text-navy-800">Products are being prepared</h3><p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">Our latest machinery catalogue will appear here soon. Browse the full catalogue or speak with our team for a recommendation.</p><Link href="/machinery" className="mt-5 inline-flex items-center rounded-xl bg-navy-800 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-navy-700">Browse Catalogue <ArrowRight className="ml-2 h-4 w-4" /></Link></div>}
      </section>

      {false && <>
      {/* 5. INDUSTRIES WE SERVE (6 Clean Cards) */}
      <section className="bg-slate-100/70 border-y border-surface-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              ENGINEERING APPLICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
              Industries We Power Across India
            </h2>
            <p className="text-xs text-content-muted">
              Turn-key equipment and architectural finishing solutions tailored for factory compliance and luxury infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-surface-border shadow-card hover:shadow-card-hover transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {ind.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-content-main">{ind.name}</h3>
                    <p className="text-xs text-content-muted leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>

                  <Link
                    href="/machinery"
                    className="pt-3 border-t border-slate-100 text-xs font-bold text-navy-800 hover:text-accent-orange flex items-center transition"
                  >
                    <span>View Industrial Machines</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHY NANDHAS (5 Trust Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
            MANUFACTURING INTEGRITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display">
            Why Choose NANDHAS Machinery &amp; Panels?
          </h2>
          <p className="text-xs text-content-muted">
            Over 25+ years of mechanical precision, food-grade compliance, and dedicated client service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mx-auto border border-navy-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <strong className="text-xs font-bold text-content-main block">100% Quality Tested</strong>
            <p className="text-[11px] text-content-muted leading-relaxed">
              SS304/SS316 food-grade contact parts meeting strict FSSAI &amp; ISO 9001:2015 hygiene standards.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mx-auto border border-navy-100">
              <Award className="w-6 h-6" />
            </div>
            <strong className="text-xs font-bold text-content-main block">1 Year Warranty</strong>
            <p className="text-[11px] text-content-muted leading-relaxed">
              Comprehensive onsite warranty covering heavy-duty motors, compressors, and PLC controllers.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mx-auto border border-navy-100">
              <Truck className="w-6 h-6" />
            </div>
            <strong className="text-xs font-bold text-content-main block">Pan-India Delivery</strong>
            <p className="text-[11px] text-content-muted leading-relaxed">
              Insured wooden-crate transport directly from our Coimbatore manufacturing plant to your factory.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mx-auto border border-navy-100">
              <Wrench className="w-6 h-6" />
            </div>
            <strong className="text-xs font-bold text-content-main block">On-Site Installation</strong>
            <p className="text-[11px] text-content-muted leading-relaxed">
              Factory service technicians dispatch for mechanical assembly, trial runs, and operator training.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white p-6 rounded-3xl border border-surface-border shadow-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 flex items-center justify-center mx-auto border border-navy-100">
              <Headphones className="w-6 h-6" />
            </div>
            <strong className="text-xs font-bold text-content-main block">24/7 Lifetime Support</strong>
            <p className="text-[11px] text-content-muted leading-relaxed">
              Immediate technical phone assistance, WhatsApp engineering desk, and genuine spare parts supply.
            </p>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (5-Step Purchasing Flow) */}
      <section className="bg-navy-950 text-white py-16 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              TRANSPARENT COMMERCIAL PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              How Purchasing Works at NANDHAS
            </h2>
            <p className="text-xs text-slate-400">
              From engineering consultation to plant commissioning in 5 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {purchasingSteps.map((s, idx) => (
              <div
                key={idx}
                className="bg-navy-900/80 p-6 rounded-3xl border border-navy-800 relative flex flex-col justify-between space-y-4 hover:border-navy-700 transition"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-black font-mono text-accent-orange block">
                    {s.step}
                  </span>
                  <strong className="text-xs font-bold text-white block">{s.title}</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="w-6 h-1 bg-navy-700 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOM ENGINEERING SOLUTION CTA BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-navy-700 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange bg-navy-950/80 px-3 py-1 rounded-full border border-navy-800 inline-block">
              Custom Engineering &amp; Turnkey Plants
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Can&apos;t find the exact machine or custom capacity you need?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our engineering team designs and manufactures custom turn-key processing plants, bespoke capacity pasteurizers, and specialized architectural finishes tailored to your factory layout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center uppercase tracking-wider"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Request Custom RFQ</span>
            </button>

            <a
              href="tel:+919344411122"
              className="w-full sm:w-auto px-6 py-4 bg-navy-950 hover:bg-navy-900 border border-navy-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2 text-accent-orange" />
              <span>+91 93444 11122</span>
            </a>
          </div>
        </div>
      </section>

      </>}

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </div>
  );
}
