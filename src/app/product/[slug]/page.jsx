'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Wrench, 
  ShoppingCart, 
  Send, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Phone, 
  MessageSquare, 
  Download, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Award,
  Cpu,
  SlidersHorizontal
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

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
// Blob URLs are browser-session scoped and always fail on the public site
const safeImageUrl = (url) => (!url || url.startsWith('blob:') ? PLACEHOLDER_IMG : url);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
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
    <div className="bg-surface-bg min-h-screen py-6 sm:py-8 font-sans w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* 1. BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-content-muted overflow-hidden">
          <Link href="/" className="hover:text-navy-800 font-semibold shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={isMachinery ? '/machinery' : '/interior'} className="hover:text-navy-800 font-semibold shrink-0">
            {isMachinery ? 'Industrial Machinery' : 'Interior Panels'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-content-main truncate">{product.name}</span>
        </div>

        {/* 2. TOP PRODUCT SHOWCASE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start bg-white p-4 sm:p-6 lg:p-10 rounded-2xl sm:rounded-3xl border border-surface-border shadow-card">
          
          {/* Gallery View */}
          <div className="space-y-3 sm:space-y-4 w-full min-w-0">
            <div className="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-surface-border relative group flex items-center justify-center p-3 sm:p-4">
              <img
                src={safeImageUrl(selectedImage)}
                alt={product.name}
                onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG; }}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-navy-800 text-white shadow-xs">
                  {product.categoryName}
                </span>
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-1 custom-scrollbar">
                {product.images.map((img) => (
                  <button
                    key={img.id || img.imageUrl}
                    onClick={() => setSelectedImage(img.imageUrl)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition p-1 bg-slate-50 ${
                      selectedImage === img.imageUrl ? 'border-navy-800 ring-2 ring-navy-800/20' : 'border-surface-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={safeImageUrl(img.imageUrl)}
                      alt={img.altText || product.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG; }}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Action Controls */}
          <div className="space-y-4 sm:space-y-6 w-full min-w-0">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-content-muted">
                <span>SKU: {selectedVariant?.sku || product.sku || 'NAND-IND-2024'}</span>
                <span>•</span>
                <span className="text-trust-green flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" /> 100% Quality Tested
                </span>
                <span>•</span>
                <span className="text-slate-700 flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1 text-accent-orange shrink-0" /> 1 Year Warranty
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-navy-800 font-display leading-tight break-words">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Pricing Section or B2B Price on Request Banner */}
            {showPrices && currentPrice && !product.isQuoteOnly ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 sm:p-4">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Commercial List Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-3xl font-black text-navy-800 font-mono">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentPrice)}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">+ 18% GST</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-orange-500/30 bg-orange-50/60 p-3.5 sm:p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-accent-orange animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-accent-orange">
                    B2B Commercial Pricing
                  </span>
                </div>
                <strong className="mt-1 block text-lg sm:text-xl font-black text-navy-800 font-display">
                  Price Available on Request
                </strong>
                <span className="mt-0.5 block text-xs text-slate-600">
                  Direct OEM quotation tailored to your capacity requirements &amp; delivery location.
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
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs shadow-md transition flex items-center justify-center uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 mr-2 text-accent-orange shrink-0" />
                  <span>Request Instant RFQ</span>
                </button>

                <a
                  href={`https://wa.me/918309004707?text=Hi,%20I%20want%20to%20request%20callback%20for:%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center uppercase tracking-wider shadow"
                >
                  <MessageSquare className="w-4 h-4 mr-2 shrink-0" />
                  <span>Request Callback</span>
                </a>

                {showPrices && !product.isQuoteOnly && currentPrice && (
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 rounded-xl bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs transition flex items-center justify-center uppercase shadow"
                    title="Direct Buy"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Direct Phone Line */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <a href="tel:+918309004707" className="text-navy-800 hover:underline font-bold flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-accent-orange shrink-0" />
                  <span>Direct Hotline: +91 83090 04707</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 3. MACHINE SPECIFICATIONS & INFORMATION TABS */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-surface-border shadow-card overflow-hidden">
          
          {/* Segmented Navigation Tabs */}
          <div className="p-2 sm:p-3 bg-slate-50/80 border-b border-slate-200 overflow-x-auto custom-scrollbar">
            <div className="flex items-center space-x-2 min-w-max">
              <button
                onClick={() => setActiveTab('specs')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                  activeTab === 'specs'
                    ? 'bg-navy-800 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-navy-800 border border-slate-200/70'
                }`}
              >
                <SlidersHorizontal className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'specs' ? 'text-accent-orange' : 'text-slate-400'}`} />
                <span>Technical Specifications</span>
              </button>

              <button
                onClick={() => setActiveTab('description')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                  activeTab === 'description'
                    ? 'bg-navy-800 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-navy-800 border border-slate-200/70'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'description' ? 'text-accent-orange' : 'text-slate-400'}`} />
                <span>Description &amp; Applications</span>
              </button>

              <button
                onClick={() => setActiveTab('installation')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-wider transition shrink-0 ${
                  activeTab === 'installation'
                    ? 'bg-navy-800 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-navy-800 border border-slate-200/70'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'installation' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>Installation &amp; Warranty</span>
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="p-4 sm:p-8 md:p-10">
            
            {/* TAB 1: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-navy-800 font-display tracking-tight">
                      Certified Technical Parameters
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Standard factory calibrated parameters &bull; Custom CAD scaling available
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> SS304/SS316 Certified
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] sm:text-[11px] font-bold">
                      <Award className="w-3.5 h-3.5 text-blue-600" /> ISO 9001:2015
                    </span>
                  </div>
                </div>

                {/* Specification Table with Horizontal Scroll wrapper */}
                {product.specs && product.specs.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs custom-scrollbar">
                    <table className="w-full min-w-[450px] text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider">
                          <th className="py-3 px-4 font-bold">Parameter</th>
                          <th className="py-3 px-4 font-bold">Engineering Value</th>
                          <th className="py-3 px-4 font-bold text-right">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {product.specs.map((spec, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 even:bg-slate-50/30">
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {spec.specKey}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-navy-900">
                              {spec.specValue}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getGroupBadgeStyle(spec.specGroup)}`}>
                                {spec.specGroup || 'General'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                    <p className="text-xs text-slate-600 font-semibold">Standard engineering specifications catalog.</p>
                    <p className="text-[11px] text-slate-400">Contact our manufacturing plant for custom technical drawings.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: DESCRIPTION & APPLICATIONS */}
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-4 text-xs text-slate-700 leading-relaxed">
                  <h3 className="text-base sm:text-lg font-black text-navy-800 font-display">
                    Product Engineering Blueprint
                  </h3>
                  <p className="whitespace-pre-line leading-relaxed text-slate-600 text-xs sm:text-sm">
                    {product.description || product.shortDesc}
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy-800">
                    Primary Industry Sectors
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Commercial Dairy Processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-orange" />
                      <span>Ice Cream &amp; Dessert Production</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Beverage &amp; Liquid Bottling</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: INSTALLATION, WARRANTY & DELIVERY */}
            {activeTab === 'installation' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-navy-800 block">On-Site Commissioning</strong>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Factory mechanical engineers visit your plant site for precision laser leveling, piping trials, and operator safety training.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-accent-orange flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-navy-800 block">1 Year OEM Warranty</strong>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Full 12-month manufacturer warranty covering heavy-duty motors, gearboxes, and electrical PLC controllers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-navy-800 block">Pan-India Logistics</strong>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    Heavy-duty export wooden crating with complete transit insurance dispatched directly across all states.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 4. RELATED MACHINES */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-navy-800 font-display">
              Related Equipment &amp; Machinery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
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
