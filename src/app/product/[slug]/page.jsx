'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Wrench, 
  Layers, 
  ShoppingCart, 
  Send, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Check, 
  Phone, 
  MessageSquare, 
  Download, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Cog,
  FileCheck2,
  Building2,
  Hammer,
  SlidersHorizontal,
  Cpu,
  Gauge,
  Zap,
  Scale
} from 'lucide-react';
import QuoteModal from '../../../components/QuoteModal';
import ProductCard from '../../../components/ProductCard';
import { useCart } from '../../../context/CartContext';
import { useSettings } from '../../../context/SettingsContext';
import { getProductBySlug, getRelatedProducts } from '../../../services/api';

const getGroupBadgeStyle = (group) => {
  const g = (group || '').toLowerCase();
  if (g.includes('metallurgy') || g.includes('material')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (g.includes('perform') || g.includes('capacity')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (g.includes('control') || g.includes('automation')) return 'bg-purple-50 text-purple-700 border-purple-200';
  if (g.includes('electric') || g.includes('power') || g.includes('voltage')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (g.includes('process') || g.includes('heat') || g.includes('cool')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
  if (g.includes('dimension') || g.includes('weight') || g.includes('physical')) return 'bg-rose-50 text-rose-700 border-rose-200';
  if (g.includes('team') || g.includes('warranty')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

export default function ProductDetailPage() {
  const { showPrices } = useSettings();
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProductData() {
      if (!slug) return;
      setLoading(true);
      try {
        const prod = await getProductBySlug(slug);
        if (prod) {
          setProduct(prod);
          setSelectedImage(prod.primaryImageUrl || (prod.images && prod.images[0]?.imageUrl));
          if (prod.variants && prod.variants.length > 0) {
            setSelectedVariant(prod.variants[0]);
          }
          const related = await getRelatedProducts(prod.id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-content-main font-display">Product Not Found</h2>
        <p className="text-sm text-content-muted">The requested equipment catalogue item is unavailable.</p>
        <Link href="/machinery" className="inline-block px-6 py-2.5 bg-navy-800 text-white rounded-xl text-xs font-bold">
          Return to Machinery Catalogue
        </Link>
      </div>
    );
  }

  const isMachinery = product.categoryType === 'MACHINERY';
  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    alert(`Added ${quantity} unit(s) of ${product.name} to your cart.`);
  };

  return (
    <div className="bg-surface-bg min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-content-muted">
          <Link href="/" className="hover:text-navy-800 font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={isMachinery ? '/machinery' : '/interior'} className="hover:text-navy-800 font-semibold">
            {isMachinery ? 'Industrial Machinery' : 'Interior Panels'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-content-main truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2. TOP PRODUCT SHOWCASE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 sm:p-10 rounded-3xl border border-surface-border shadow-card">
          {/* Gallery View */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-surface-border relative group flex items-center justify-center p-4">
              <img
                src={selectedImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg bg-navy-800 text-white shadow-sm">
                  {product.categoryName}
                </span>
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img) => (
                  <button
                    key={img.id || img.imageUrl}
                    onClick={() => setSelectedImage(img.imageUrl)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition p-1 bg-slate-50 ${
                      selectedImage === img.imageUrl ? 'border-navy-800 ring-2 ring-navy-800/20' : 'border-surface-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.imageUrl} alt={img.altText || product.name} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Action Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-content-muted">
                <span>SKU: {selectedVariant?.sku || product.sku || 'NAND-IND-2024'}</span>
                <span>•</span>
                <span className="text-trust-green flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 100% Quality Tested
                </span>
                <span>•</span>
                <span className="text-slate-700 flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1 text-accent-orange" /> 1 Year Warranty
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-navy-800 font-display leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Pricing Section or B2B Price on Request Banner */}
            {showPrices && currentPrice && !product.isQuoteOnly ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Commercial List Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-navy-800 font-mono">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentPrice)}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">+ 18% GST</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-orange-500/30 bg-orange-50/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-accent-orange animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-accent-orange">
                    B2B Commercial Pricing
                  </span>
                </div>
                <strong className="mt-1 block text-xl font-black text-navy-800 font-display">
                  Price Available on Request
                </strong>
                <span className="mt-0.5 block text-xs text-slate-600">
                  Direct OEM manufacturing quotation tailored to your plant layout, power specs &amp; delivery location.
                </span>
              </div>
            )}

            {/* Model Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Machine Capacity / Voltage Configuration:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left text-xs transition flex flex-col justify-between ${
                        selectedVariant?.id === v.id
                          ? 'border-navy-800 bg-navy-50/60 ring-1 ring-navy-800'
                          : 'border-surface-border hover:border-slate-300'
                      }`}
                    >
                      <strong className="text-content-main block">{v.variantName}</strong>
                      <span className="text-[11px] text-content-muted font-mono mt-0.5">SKU: {v.sku}</span>
                      {showPrices && v.price && (
                        <span className="text-xs font-black text-navy-800 mt-1 font-mono">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v.price)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs shadow-md transition flex items-center justify-center uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 mr-2 text-accent-orange" />
                  <span>Request Instant Quote (RFQ)</span>
                </button>

                <a
                  href={`https://wa.me/919344411122?text=Hi,%20I%20want%20to%20request%20callback%20for:%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center uppercase tracking-wider shadow"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Request Callback</span>
                </a>

                {showPrices && !product.isQuoteOnly && currentPrice && (
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 rounded-xl bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs transition flex items-center justify-center uppercase shadow"
                    title="Direct Buy with 18% GST"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Downloads & Direct Line */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <a href="tel:+919344411122" className="text-navy-800 hover:underline font-bold flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-accent-orange" />
                  <span>Sales Desk: +91 93444 11122</span>
                </a>

                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-navy-800 hover:underline font-bold flex items-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Download Engineering PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. MACHINE SPECIFICATIONS & INFORMATION TABS */}
        <div className="bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden">
          
          {/* Modern Segmented Navigation Tabs */}
          <div className="p-3 bg-slate-50/80 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('specs')}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'specs'
                    ? 'bg-navy-800 text-white shadow-md shadow-navy-950/20 ring-1 ring-navy-700'
                    : 'bg-white/80 text-slate-600 hover:text-navy-800 hover:bg-white border border-slate-200/70 shadow-2xs'
                }`}
              >
                <SlidersHorizontal className={`w-4 h-4 ${activeTab === 'specs' ? 'text-accent-orange' : 'text-slate-400'}`} />
                <span>Technical Specifications</span>
                {product.specs && product.specs.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${
                    activeTab === 'specs' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {product.specs.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('description')}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'description'
                    ? 'bg-navy-800 text-white shadow-md shadow-navy-950/20 ring-1 ring-navy-700'
                    : 'bg-white/80 text-slate-600 hover:text-navy-800 hover:bg-white border border-slate-200/70 shadow-2xs'
                }`}
              >
                <FileText className={`w-4 h-4 ${activeTab === 'description' ? 'text-accent-orange' : 'text-slate-400'}`} />
                <span>Description &amp; Applications</span>
              </button>

              <button
                onClick={() => setActiveTab('installation')}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'installation'
                    ? 'bg-navy-800 text-white shadow-md shadow-navy-950/20 ring-1 ring-navy-700'
                    : 'bg-white/80 text-slate-600 hover:text-navy-800 hover:bg-white border border-slate-200/70 shadow-2xs'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${activeTab === 'installation' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>Installation &amp; Warranty</span>
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="p-6 sm:p-10">
            
            {/* TAB 1: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                
                {/* Header Strip with Live Compliance Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                      <h3 className="text-lg font-black text-navy-800 font-display tracking-tight">
                        Certified Technical Parameters
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Standard factory calibrated parameters &bull; Custom CAD scaling available
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> SS304/SS316 Certified
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold">
                      <Award className="w-3.5 h-3.5 text-blue-600" /> ISO 9001:2015
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200/80 text-[11px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent-orange" /> 1-Yr OEM Warranty
                    </span>
                  </div>
                </div>

                {/* Modern Industrial Specification Table */}
                {product.specs && product.specs.length > 0 ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider">
                          <th className="py-3.5 px-5 font-bold w-1/3">Specification Parameter</th>
                          <th className="py-3.5 px-5 font-bold w-1/2">Engineering Value</th>
                          <th className="py-3.5 px-5 font-bold w-1/6 text-right">Group Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {product.specs.map((spec, idx) => (
                          <tr 
                            key={idx} 
                            className="group transition-colors hover:bg-blue-50/40 even:bg-slate-50/40"
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-navy-700 group-hover:bg-accent-orange transition-colors" />
                                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                                  {spec.specKey}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-5">
                              <span className="inline-block px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 font-mono font-bold text-xs sm:text-sm text-navy-900 shadow-2xs group-hover:border-navy-800/40 group-hover:text-navy-950 transition-all">
                                {spec.specValue}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getGroupBadgeStyle(spec.specGroup)}`}>
                                {spec.specGroup || 'General'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                    <p className="text-xs text-slate-600 font-semibold">Standard engineering specifications catalog.</p>
                    <p className="text-[11px] text-slate-400">Contact our Hyderabad manufacturing plant for custom CAD technical drawings and custom capacity sizing.</p>
                  </div>
                )}

                {/* Pre-Dispatch Quality Guarantee Box */}
                <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-[#123d78] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-orange-300 font-extrabold text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
                      <span>100% Pre-Dispatch Quality Verification (FAT)</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Every machine undergoes hydrostatic pressure testing and a 24-hour continuous trial run before dispatch.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer"
                    >
                      Inquire Custom Sizing
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: DESCRIPTION & APPLICATIONS */}
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6 text-xs text-slate-700 leading-relaxed">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-navy-800 font-display">
                      Product Engineering Blueprint
                    </h3>
                    <p className="whitespace-pre-line leading-relaxed text-slate-600 text-xs sm:text-sm">
                      {product.description || product.shortDesc}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-navy-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Zero Contamination Metallurgy</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Precision purge TIG welded with mirror finish (Ra &lt; 0.4 µm) to completely prevent bacterial crevices.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-navy-800">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span>PLC Automation &amp; PID Precision</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Equipped with Delta / Siemens automation with automated CIP sanitization cycles and thermal cutoffs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Application Sectors */}
                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy-800">
                      Primary Industry Sectors
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Commercial Dairy Processing Plants</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent-orange" />
                        <span>Ice Cream &amp; Frozen Dessert Production</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Juice, Beverage &amp; Liquid Bottling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Architectural &amp; Turnkey Interior Fitouts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1">
                    <strong className="block font-bold">Custom Technical Drawings</strong>
                    <p className="text-[11px] text-blue-800/80">
                      Need custom pipe layout diameters or GA drawings? Our engineering team provides detailed 3D CAD models.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INSTALLATION, WARRANTY & DELIVERY */}
            {activeTab === 'installation' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  
                  {/* Step 1 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
                    <span className="text-3xl font-black text-slate-100 font-mono absolute top-3 right-4 select-none">
                      01
                    </span>
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <strong className="text-sm font-bold text-navy-800 block">On-Site Commissioning</strong>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Factory mechanical engineers visit your plant site for precision laser leveling, sanitary SS piping welding, water trials, and operator safety training.
                      </p>
                    </div>
                    <span className="inline-block pt-2 text-[10px] font-bold text-blue-600 uppercase">
                      &bull; Engineer Visit Included
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
                    <span className="text-3xl font-black text-slate-100 font-mono absolute top-3 right-4 select-none">
                      02
                    </span>
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-accent-orange flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <strong className="text-sm font-bold text-navy-800 block">1 Year OEM Warranty</strong>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Full 12-month manufacturer warranty covering heavy-duty motors, gearboxes, electrical PLC controllers, and pressure welds with annual maintenance support.
                      </p>
                    </div>
                    <span className="inline-block pt-2 text-[10px] font-bold text-accent-orange uppercase">
                      &bull; 100% Genuine Parts Covered
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
                    <span className="text-3xl font-black text-slate-100 font-mono absolute top-3 right-4 select-none">
                      03
                    </span>
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Truck className="w-5 h-5" />
                      </div>
                      <strong className="text-sm font-bold text-navy-800 block">Insured Pan-India Logistics</strong>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Heavy-duty export wooden crating with complete transit insurance dispatched directly from our Hyderabad plant across all 28 states and Union Territories.
                      </p>
                    </div>
                    <span className="inline-block pt-2 text-[10px] font-bold text-emerald-600 uppercase">
                      &bull; Real-Time Tracked Freight
                    </span>
                  </div>

                </div>

                {/* Support Hotline Box */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-8 h-8 text-navy-800 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wide">Installation &amp; Logistics Help Desk</h4>
                      <p className="text-xs text-slate-500">Need specific arrival dates or site preparation layout specifications?</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="tel:+918309004707"
                      className="px-5 py-2.5 rounded-xl bg-navy-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-900 transition"
                    >
                      Call +91 83090 04707
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* 4. RELATED MACHINES */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-navy-800 font-display">
              Related Equipment &amp; Processing Machinery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        product={product}
        variant={selectedVariant}
      />
    </div>
  );
}
