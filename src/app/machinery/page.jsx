'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, CheckCircle2, Scale, Layers } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { getProducts, getCategories } from '../../services/api';

// Map common URL alias slugs to database category slugs
const categoryAliasMap = {
  'milk-processing-machines': 'milk-dairy-machinery',
  'milk-dairy-machinery': 'milk-dairy-machinery',
  'dairy': 'milk-dairy-machinery',
  'ice-cream-machines': 'ice-cream-machinery',
  'ice-cream-machinery': 'ice-cream-machinery',
  'ice-cream': 'ice-cream-machinery',
  'beverage-machines': 'beverage-bottling-machinery',
  'beverage-bottling-machinery': 'beverage-bottling-machinery',
  'beverage': 'beverage-bottling-machinery',
  'bottling': 'beverage-bottling-machinery',
  'machine-parts-fittings': 'machine-parts-fittings',
  'spare-parts': 'machine-parts-fittings',
  'spares': 'machine-parts-fittings',
  'parts': 'machine-parts-fittings',
};

function MachineryContent() {
  const searchParams = useSearchParams();
  const rawCatParam = searchParams?.get('cat') || searchParams?.get('category') || '';
  const rawSearchParam = searchParams?.get('search') || '';
  const initialCat = categoryAliasMap[rawCatParam] || rawCatParam;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [search, setSearch] = useState(rawSearchParam);
  const [sortBy, setSortBy] = useState('sortOrder');
  const [loading, setLoading] = useState(true);

  // Sync category state when URL changes
  useEffect(() => {
    if (rawCatParam) {
      const mapped = categoryAliasMap[rawCatParam] || rawCatParam;
      setSelectedCat(mapped);
    }
  }, [rawCatParam]);

  // Navbar search navigates here with ?search=...; keep the page state in sync
  useEffect(() => {
    setSearch(rawSearchParam);
  }, [rawSearchParam]);

  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await getCategories('MACHINERY');
        setCategories(cats || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadCats();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await getProducts({
          type: 'MACHINERY',
          categorySlug: selectedCat || undefined,
          search: search || undefined,
          sortBy: sortBy,
        });
        setProducts(res.content || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedCat, search, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Breadcrumb & Header Banner */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500 overflow-hidden">
            <Link href="/" className="hover:text-navy-800 font-semibold shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold text-slate-800 truncate">Industrial Machinery</span>
          </div>

          <div className="bg-navy-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-white relative overflow-hidden shadow-md">
            <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent-orange bg-navy-900/60 px-3 py-1 rounded-full border border-navy-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" /> 100% Quality Tested &amp; Certified
              </span>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight">
                Dairy, Ice Cream &amp; Beverage Machines
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct manufacturing plant prices with nationwide delivery, 1-year warranty, and on-site engineering installation support.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scrolling Category Pill Filter (lg:hidden) */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCat('')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedCat === '' ? 'bg-navy-800 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Machines ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                selectedCat === cat.slug ? 'bg-navy-800 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Desktop Sidebar + Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          
          {/* Desktop Filters Sidebar (hidden on mobile) */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 sticky top-24">
              <div>
                <h3 className="font-bold text-xs text-navy-800 uppercase tracking-wider mb-3">
                  Machinery Categories
                </h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCat('')}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      selectedCat === '' ? 'bg-navy-800 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    All Machines ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.slug)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                        selectedCat === cat.slug ? 'bg-navy-800 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compare Shortcut */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/interior"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-navy-50 border border-navy-100 text-navy-800 font-bold text-xs hover:bg-navy-100 transition"
                >
                  <span className="flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-accent-orange" />
                    Interior &amp; Panels
                  </span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 w-full min-w-0">
            
            {/* Search Toolbar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search machine model, capacity..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-start space-x-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 outline-none font-medium flex-1 sm:flex-initial"
                >
                  <option value="sortOrder">Featured</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price">Price (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-slate-200"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 space-y-3">
                <p className="text-sm text-slate-600 font-semibold">No machinery models match your search.</p>
                <button
                  onClick={() => { setSelectedCat(''); setSearch(''); }}
                  className="text-xs text-navy-800 font-bold hover:underline"
                >
                  Reset Filter Settings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function MachineryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-12 text-center text-xs text-slate-400">Loading Machinery Catalogue...</div>}>
      <MachineryContent />
    </Suspense>
  );
}
