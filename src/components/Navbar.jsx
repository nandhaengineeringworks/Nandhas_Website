'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  Wrench, 
  Layers, 
  Send,
  Scale,
  Sparkles,
  Milk,
  Grid,
  ArrowRight,
  TrendingUp,
  Boxes
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import QuoteModal from './QuoteModal';

export default function Navbar() {
  const { showPrices } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [machinesDropdownOpen, setMachinesDropdownOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Search State & Live Suggestions
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState('ALL');
  const searchRef = useRef(null);

  const { totalItemCount, cartTotal } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for enhanced elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFocused(false);
    if (searchQuery.trim()) {
      router.push(`/machinery?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/machinery');
    }
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setSearchFocused(false);
    router.push(`/machinery?search=${encodeURIComponent(term)}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const isActive = (path) => pathname === path;

  // Search suggestions mock data
  const sampleSuggestions = [
    { title: 'Milk Pasteurizer (1000 LPH)', type: 'Machine', link: '/product/milk-pasteurizer-continuous-500-lph' },
    { title: 'Commercial Soft Serve Ice Cream Machine (3-Flavour)', type: 'Machine', link: '/product/commercial-soft-serve-ice-cream-machine-3-flavour' },
    { title: 'High Pressure Homogenizer (2000 LPH)', type: 'Machine', link: '/product/high-pressure-homogenizer-2000-lph' },
    { title: 'Automatic Bottle Filling & Capping Monoblock', type: 'Machine', link: '/product/automatic-liquid-filling-capping-monoblock' },
    { title: '3mm UV Marble Sheets (8x4 ft)', type: 'Interior', link: '/product/high-gloss-uv-marble-sheet-3mm-8x4' },
    { title: 'Acoustic Charcoal Louvered Fluted Panel', type: 'Interior', link: '/product/acoustic-charcoal-fluted-wall-panel' },
  ];

  const popularSearches = [
    '1000 LPH Pasteurizer',
    'Soft Serve Softy Machine',
    'Homogenizer 250 Bar',
    'Bottle Filling Line',
    'Milk Storage Tank',
    'UV Marble Sheet'
  ];

  const filteredSuggestions = searchQuery.trim()
    ? sampleSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : sampleSuggestions;

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-2xl' : 'shadow-md'}`}>
        {/* 1. TOP TRUST STRIP */}
      <div className={`hidden overflow-hidden border-b border-surface-border bg-slate-50 px-4 text-[11px] text-slate-700 transition-all duration-300 lg:block ${hasScrolled ? 'pointer-events-none h-0 translate-y-[-100%] border-b-0 py-0 opacity-0' : 'h-auto py-1.5 opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Brand Trust Tag */}
          <div className="flex items-center space-x-1.5 text-slate-800 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-trust-green shrink-0" />
            <span>India&apos;s Trusted Brand For Dairy, Ice Cream, Beverage &amp; Food Processing Machines</span>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center space-x-6 text-slate-600 font-medium">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-trust-green mr-1 shrink-0" />
              100% Quality Machines
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-trust-green mr-1 shrink-0" />
              1 Year Warranty*
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-trust-green mr-1 shrink-0" />
              Nationwide Delivery &amp; Installation
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-trust-green mr-1 shrink-0" />
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search Bar with Live Suggestions, Phone, Account, Cart) */}
      <div className="bg-white border-b border-slate-200 py-1 px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center space-x-2.5 group" aria-label="Nandhas Engineering Works home">
            <img
              src="/images/nandhas-logo.png"
              alt="Nandhas Engineering Works"
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain transition duration-200 group-hover:scale-105 shrink-0 drop-shadow-sm"
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-navy-800 block leading-none">
                NANDHAS
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mt-0.5">
                ENGINEERING WORKS &bull; HYDERABAD
              </span>
            </div>
          </Link>

          {/* Intelligent Search Bar with Live Suggestions Dropdown */}
          <div ref={searchRef} className="hidden md:block max-w-md w-full mx-3 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex w-full items-center border border-navy-800 rounded-xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-navy-800/20">
                {/* Category Dropdown */}
                <select
                  value={selectedSearchCat}
                  onChange={(e) => setSelectedSearchCat(e.target.value)}
                  className="bg-slate-50 text-slate-700 text-[11px] font-semibold px-2.5 py-1.5 border-r border-slate-200 outline-none cursor-pointer"
                >
                  <option value="ALL">All</option>
                  <option value="dairy">Dairy</option>
                  <option value="ice-cream">Ice Cream</option>
                  <option value="beverage">Beverage</option>
                  <option value="interior">Interior</option>
                </select>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search machines, panels, spares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
                />

                {/* Search Button */}
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-navy-800 hover:bg-navy-900 text-white px-3.5 py-1.5 transition flex items-center justify-center shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Modal */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 space-y-4">
                {/* Machines Suggestions */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    {searchQuery.trim() ? 'Matching Machines & Products' : 'Popular Equipment & Catalog Items'}
                  </span>
                  <div className="space-y-1">
                    {filteredSuggestions.slice(0, 4).map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.link}
                        onClick={() => setSearchFocused(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-navy-800 truncate">
                          {item.title}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.type === 'Machine' ? 'bg-navy-50 text-navy-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {item.type}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Keywords Pill Strip */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 text-accent-orange" />
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleQuickSearch(term)}
                        className="text-[11px] bg-slate-100 hover:bg-navy-800 hover:text-white text-slate-700 px-3 py-1 rounded-lg transition font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Actions (My Account & My Cart) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* My Account */}
            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2.5 px-2.5 py-1 rounded-xl transition group hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-navy-800 group-hover:text-white transition shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-bold text-slate-800 group-hover:text-navy-800 block">
                  My Account
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Login / Admin
                </span>
              </div>
            </a>

            {/* My Cart */}
            <Link 
              href="/cart" 
              className="flex items-center gap-2.5 px-2.5 py-1 rounded-xl transition group hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <div className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-navy-800 group-hover:text-white transition shrink-0">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              </div>
              <div className="hidden sm:block text-left leading-none">
                <span className="text-xs font-bold text-slate-800 group-hover:text-navy-800 block">
                  {showPrices ? 'My Cart' : 'Quote Cart'}
                </span>
                <span className="text-[10px] font-semibold text-accent-orange block mt-1 font-mono">
                  {showPrices ? formatPrice(cartTotal) : `${totalItemCount} ${totalItemCount === 1 ? 'Item' : 'Items'}`}
                </span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-navy-800 hover:bg-slate-100 rounded-xl transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN ROYAL NAVY NAVIGATION BAR (#0B1F4D) WITH COMPREHENSIVE MEGA MENU */}
      <nav className="bg-navy-800 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            {/* Mega Menu Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="bg-navy-900 hover:bg-navy-950 px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition border-r border-navy-700/50"
              >
                <Menu className="w-4 h-4 text-accent-orange" />
                <span>ALL CATEGORIES</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* FULL 5-COLUMN MEGA MENU */}
              {megaMenuOpen && (
                <div 
                  className="absolute top-full left-0 w-[860px] bg-white text-slate-800 shadow-2xl border border-slate-200 rounded-b-3xl p-6 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <div className="grid grid-cols-5 gap-6">
                    {/* Col 1: Dairy Machines */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                        <Milk className="w-3.5 h-3.5 mr-1 text-navy-800" />
                        Dairy Machines
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Milk Processing Plants</Link></li>
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">HTST Pasteurizers</Link></li>
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Homogenizers (250 Bar)</Link></li>
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Insulated Storage Silos</Link></li>
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Cream Separators</Link></li>
                        <li><Link href="/machinery?cat=milk-processing-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Ghee Boilers</Link></li>
                      </ul>
                    </div>

                    {/* Col 2: Ice Cream Machines */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-accent-orange" />
                        Ice Cream Freezers
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        <li><Link href="/machinery?cat=ice-cream-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Soft Serve Softy Units</Link></li>
                        <li><Link href="/machinery?cat=ice-cream-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Batch Freezers (60-200L)</Link></li>
                        <li><Link href="/machinery?cat=ice-cream-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Ice Cream Ageing Vats</Link></li>
                        <li><Link href="/machinery?cat=ice-cream-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Hardening Rooms</Link></li>
                        <li><Link href="/machinery?cat=ice-cream-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Cone Dispensers</Link></li>
                      </ul>
                    </div>

                    {/* Col 3: Beverage Machines */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                        <Boxes className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                        Beverage Lines
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        <li><Link href="/machinery?cat=beverage-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Juice Extractors</Link></li>
                        <li><Link href="/machinery?cat=beverage-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Automatic Bottling Lines</Link></li>
                        <li><Link href="/machinery?cat=beverage-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Rinse-Fill-Cap Monoblock</Link></li>
                        <li><Link href="/machinery?cat=beverage-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Carbonated Drink Plants</Link></li>
                        <li><Link href="/machinery?cat=beverage-machines" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">End-of-line Packaging</Link></li>
                      </ul>
                    </div>

                    {/* Col 4: Interior & PVC Panels */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                        <Layers className="w-3.5 h-3.5 mr-1 text-amber-600" />
                        Interior &amp; PVC
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">3mm UV Marble Sheets</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Acoustic Charcoal Slats</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Waterproof Ceiling Planks</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Exterior WPC Louvers</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">PVC Doors &amp; Profiles</Link></li>
                      </ul>
                    </div>

                    {/* Col 5: Wood & Architectural */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                        <Wrench className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Wood &amp; Cladding
                      </h4>
                      <ul className="space-y-1.5 text-xs">
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Solid Teak Cladding</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Fluted Feature Panels</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">MDF / HDF Architectural</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Decorative Veneers</Link></li>
                        <li><Link href="/interior" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Plywood Substrates</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 pl-4 text-xs font-bold tracking-wide uppercase">
              <Link
                href="/"
                className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                  isActive('/') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                }`}
              >
                HOME
              </Link>

              {/* Machines Link with Dropdown */}
              <div className="relative group">
                <Link
                  href="/machinery"
                  className={`px-3.5 py-3.5 flex items-center hover:text-accent-orange transition ${
                    isActive('/machinery') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                  }`}
                >
                  <span>MACHINES</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Link>
                {/* Hover Dropdown */}
                <div className="absolute top-full left-0 w-60 bg-white text-slate-800 shadow-xl rounded-b-xl py-2 hidden group-hover:block z-50 border border-slate-100">
                  <Link href="/machinery?cat=milk-processing-machines" className="block px-4 py-2 text-xs font-medium hover:bg-slate-50 hover:text-navy-800">
                    Milk Pasteurizers &amp; Tanks
                  </Link>
                  <Link href="/machinery?cat=ice-cream-machines" className="block px-4 py-2 text-xs font-medium hover:bg-slate-50 hover:text-navy-800">
                    Soft Serve &amp; Batch Freezers
                  </Link>
                  <Link href="/machinery?cat=beverage-machines" className="block px-4 py-2 text-xs font-medium hover:bg-slate-50 hover:text-navy-800">
                    Automatic Bottling Lines
                  </Link>
                  <Link href="/machinery?cat=juice-machines" className="block px-4 py-2 text-xs font-medium hover:bg-slate-50 hover:text-navy-800">
                    Juice Processing Plants
                  </Link>
                </div>
              </div>

              <Link
                href="/interior"
                className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                  isActive('/interior') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                }`}
              >
                INTERIOR PANELS
              </Link>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-3.5 py-3.5 text-accent-orange hover:text-white font-bold transition"
              >
                GET QUOTE
              </button>

              <Link
                href="/about"
                className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                  isActive('/about') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                }`}
              >
                ABOUT US
              </Link>

              <Link
                href="/contact"
                className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                  isActive('/contact') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                }`}
              >
                CONTACT US
              </Link>
            </div>
          </div>

          {/* Right Action on Bar */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition flex items-center"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Instant RFQ
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 border-t border-navy-700 px-4 py-4 space-y-3 text-xs font-semibold">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="flex mb-3">
              <input
                type="text"
                placeholder="Search machines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-white text-slate-800 rounded-l-lg outline-none text-xs"
              />
              <button type="submit" className="bg-accent-orange text-white px-4 rounded-r-lg">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-accent-orange border-b border-navy-800">
              HOME
            </Link>
            <Link href="/machinery" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-accent-orange border-b border-navy-800">
              MACHINES CATALOGUE
            </Link>
            <Link href="/interior" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-accent-orange border-b border-navy-800">
              INTERIOR &amp; WALL PANELS
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-accent-orange border-b border-navy-800">
              ABOUT US
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-accent-orange border-b border-navy-800">
              CONTACT US
            </Link>
            <button
              onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}
              className="w-full py-2.5 bg-accent-orange text-white font-bold rounded-lg text-center mt-2 shadow"
            >
              REQUEST A QUOTE
            </button>
          </div>
        )}
      </nav>
      </header>

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}
