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
  ChevronRight,
  Wrench, 
  Layers, 
  Send,
  Sparkles,
  Milk,
  ArrowRight,
  TrendingUp,
  Boxes,
  Phone,
  MessageCircle,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import QuoteModal from './QuoteModal';

export default function Navbar() {
  const { showPrices } = useSettings();
  const { user, isAuthenticated, logout } = useAuth();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileCategoryExpanded, setMobileCategoryExpanded] = useState(false);
  
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
      setHasScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFocused(false);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
    if (searchQuery.trim()) {
      router.push(`/machinery?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/machinery');
    }
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setSearchFocused(false);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
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
      <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        {/* 1. TOP TRUST STRIP (Desktop Only) */}
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

        {/* 2. MAIN HEADER (Logo, Search Bar, Cart, Mobile Menu) */}
        <div className="bg-white border-b border-slate-200 py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo + Brand Name */}
            <Link href="/" className="flex shrink-0 items-center space-x-2 sm:space-x-3 group min-w-0" aria-label="Nandhas Engineering Works home">
              <img
                src="/images/nandhas-logo.png"
                alt="Nandhas Engineering Works"
                className="h-9 w-9 sm:h-12 sm:w-12 object-contain transition duration-200 group-hover:scale-105 shrink-0 drop-shadow-xs"
              />
              <div className="min-w-0">
                <span className="font-display text-lg sm:text-2xl font-black tracking-tight text-navy-800 block leading-none">
                  NANDHAS
                </span>
                <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mt-0.5 truncate">
                  ENGINEERING WORKS &bull; HYDERABAD
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar with Live Suggestions Dropdown */}
            <div ref={searchRef} className="hidden md:block max-w-md w-full mx-3 relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex w-full items-center border border-navy-800 rounded-xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-navy-800/20">
                  {/* Category Dropdown */}
                  <select
                    value={selectedSearchCat}
                    onChange={(e) => setSelectedSearchCat(e.target.value)}
                    className="bg-slate-50 text-slate-700 text-[11px] font-semibold px-2.5 py-2 border-r border-slate-200 outline-none cursor-pointer"
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
                    className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    aria-label="Search"
                    className="bg-navy-800 hover:bg-navy-900 text-white px-3.5 py-2 transition flex items-center justify-center shrink-0"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Live Search Suggestions Dropdown */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 space-y-4">
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

            {/* Right Actions: Mobile Search Toggle, Account, Cart, Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Mobile Search Button Toggle */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 text-slate-700 hover:text-navy-800 hover:bg-slate-100 rounded-xl transition"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* My Account ΓÇö Desktop (authenticated dropdown) + Mobile (icon only ΓåÆ /login) */}
              <div ref={accountRef} className="relative">
                {isAuthenticated ? (
                  /* Authenticated: show user name + dropdown toggle */
                  <button
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-xl transition group hover:bg-slate-50 border border-transparent hover:border-slate-200"
                    aria-label="My Account"
                    aria-haspopup="true"
                    aria-expanded={accountDropdownOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left leading-none hidden md:block">
                      <span className="text-xs font-bold text-slate-800 block truncate max-w-[100px]">
                        {user?.fullName?.split(' ')[0] || 'My Account'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">Account</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden md:block transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  /* Logged out: icon on mobile, icon+label on sm+ ΓÇö both link to /login */
                  <Link
                    href="/login"
                    className="flex items-center gap-2 p-2 sm:px-2.5 sm:py-1 rounded-xl transition group hover:bg-slate-50 border border-transparent hover:border-slate-200"
                    aria-label="My Account ΓÇö Login"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-navy-800 group-hover:text-white transition shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left leading-none hidden md:block">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-navy-800 block">
                        My Account
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">Login</span>
                    </div>
                  </Link>
                )}

                {/* Authenticated Account Dropdown */}
                {isAuthenticated && accountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.fullName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                      {user?.role && (
                        <span className="mt-1 inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-navy-50 text-navy-800 border border-navy-100">
                          {user.role.replace('ROLE_', '').replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/track-order"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-800 transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Track My Orders
                    </Link>
                    <button
                      onClick={() => { logout(); setAccountDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* My Cart Icon (Mobile + Desktop) */}
              <Link 
                href="/cart" 
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-xl transition group hover:bg-slate-50 border border-transparent hover:border-slate-200"
                aria-label="View Shopping Cart"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-navy-800 group-hover:text-white transition shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {totalItemCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block text-left leading-none">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-navy-800 block">
                    {showPrices ? 'My Cart' : 'Quote Cart'}
                  </span>
                  <span className="text-[10px] font-semibold text-accent-orange block mt-1 font-mono">
                    {showPrices ? formatPrice(cartTotal) : `${totalItemCount} Items`}
                  </span>
                </div>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-navy-800 hover:bg-slate-100 rounded-xl transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Collapsible Mobile Inline Search Bar with Quick Chips */}
          {mobileSearchOpen && (
            <div className="md:hidden pt-2 pb-2 animate-in fade-in slide-in-from-top-1 space-y-2">
              <form onSubmit={handleSearchSubmit} className="flex w-full items-center border border-navy-800 rounded-xl overflow-hidden bg-white shadow-xs">
                <input
                  type="text"
                  placeholder="Search machines, panels, spares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-navy-800 text-white px-4 py-2 transition flex items-center justify-center shrink-0"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Search Chips on Mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider flex items-center">
                  <TrendingUp className="w-2.5 h-2.5 mr-0.5 text-accent-orange" />
                  Popular:
                </span>
                {popularSearches.slice(0, 4).map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickSearch(term)}
                    className="text-[10px] bg-slate-100 active:bg-navy-800 active:text-white text-slate-700 px-2.5 py-1 rounded-lg shrink-0 font-medium transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. DESKTOP ROYAL NAVY NAVIGATION BAR (#0B1F4D) WITH MEGA MENU */}
        <nav className="hidden lg:block bg-navy-800 text-white shadow-inner">
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
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Milk Processing Plants</Link></li>
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">HTST Pasteurizers</Link></li>
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Homogenizers (250 Bar)</Link></li>
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Insulated Storage Silos</Link></li>
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Cream Separators</Link></li>
                          <li><Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Ghee Boilers</Link></li>
                        </ul>
                      </div>

                      {/* Col 2: Ice Cream Machines */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1 text-accent-orange" />
                          Ice Cream Freezers
                        </h4>
                        <ul className="space-y-1.5 text-xs">
                          <li><Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Soft Serve Softy Units</Link></li>
                          <li><Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Batch Freezers (60-200L)</Link></li>
                          <li><Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Ice Cream Ageing Vats</Link></li>
                          <li><Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Hardening Rooms</Link></li>
                          <li><Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Cone Dispensers</Link></li>
                        </ul>
                      </div>

                      {/* Col 3: Beverage Machines */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                          <Boxes className="w-3.5 h-3.5 mr-1 text-cyan-600" />
                          Beverage Lines
                        </h4>
                        <ul className="space-y-1.5 text-xs">
                          <li><Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Juice Extractors</Link></li>
                          <li><Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Automatic Bottling Lines</Link></li>
                          <li><Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Rinse-Fill-Cap Monoblock</Link></li>
                          <li><Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Carbonated Drink Plants</Link></li>
                          <li><Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">End-of-line Packaging</Link></li>
                        </ul>
                      </div>

                      {/* Col 4: Interior & PVC Panels */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                          <Layers className="w-3.5 h-3.5 mr-1 text-amber-600" />
                          Interior &amp; PVC
                        </h4>
                        <ul className="space-y-1.5 text-xs">
                          <li><Link href="/interior?cat=pvc-interior-panels" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">3mm UV Marble Sheets</Link></li>
                          <li><Link href="/interior?cat=pvc-interior-panels" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Acoustic Charcoal Slats</Link></li>
                          <li><Link href="/interior?cat=pvc-interior-panels" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Waterproof Ceiling Planks</Link></li>
                          <li><Link href="/interior?cat=pvc-interior-panels" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Exterior WPC Louvers</Link></li>
                          <li><Link href="/interior?cat=pvc-interior-panels" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">PVC Doors &amp; Profiles</Link></li>
                        </ul>
                      </div>

                      {/* Col 5: Wood & Architectural */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black text-navy-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center">
                          <Wrench className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Wood &amp; Cladding
                        </h4>
                        <ul className="space-y-1.5 text-xs">
                          <li><Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Solid Teak Cladding</Link></li>
                          <li><Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Fluted Feature Panels</Link></li>
                          <li><Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">MDF / HDF Architectural</Link></li>
                          <li><Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Decorative Veneers</Link></li>
                          <li><Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMegaMenuOpen(false)} className="text-slate-600 hover:text-navy-800 block">Plywood Substrates</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Navigation Links */}
              <div className="flex items-center space-x-1 pl-4 text-xs font-bold tracking-wide uppercase">
                <Link
                  href="/"
                  className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                    isActive('/') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                  }`}
                >
                  HOME
                </Link>

                <Link
                  href="/machinery"
                  className={`px-3.5 py-3.5 hover:text-accent-orange transition ${
                    isActive('/machinery') ? 'text-white border-b-2 border-accent-orange bg-navy-900/40' : 'text-slate-200'
                  }`}
                >
                  MACHINES
                </Link>

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
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-accent-orange hover:bg-accent-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Instant RFQ
              </button>
            </div>
          </div>
        </nav>

        {/* 4. MOBILE NAVIGATION DRAWER & BACKDROP */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Drawer Panel */}
            <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-navy-950 text-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto custom-scrollbar">
              
              {/* Drawer Top Header */}
              <div className="p-4 border-b border-navy-800 flex items-center justify-between bg-navy-900">
                <div className="flex items-center space-x-2">
                  <img
                    src="/images/nandhas-logo.png"
                    alt="Nandhas"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-display font-black text-lg tracking-tight text-white">NANDHAS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-4 space-y-5 flex-1">
                
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-xl overflow-hidden shadow-xs">
                  <input
                    type="text"
                    placeholder="Search machines, panels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
                  />
                  <button type="submit" className="bg-navy-800 text-white px-3.5 py-2.5 shrink-0" aria-label="Submit search">
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Primary Nav Links */}
                <div className="space-y-1 border-b border-navy-800 pb-4">

                  {/* My Account / Login Row ΓÇö always visible in mobile drawer */}
                  {isAuthenticated ? (
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-navy-900/60">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="leading-none">
                          <span className="text-xs font-bold text-white block truncate max-w-[140px]">{user?.fullName}</span>
                          <span className="text-[9px] text-slate-400 block mt-0.5 truncate">{user?.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300 transition px-2 py-1 rounded-lg hover:bg-red-900/30"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-navy-900/40 text-xs font-bold text-slate-200 hover:bg-navy-900 transition"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent-orange" />
                        MY ACCOUNT ΓÇö LOGIN
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  )}

                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span>HOME</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link
                    href="/machinery"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/machinery') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span>MACHINES CATALOGUE</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link
                    href="/interior"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/interior') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span>INTERIOR &amp; WALL PANELS</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  {/* Categories Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCategoryExpanded(!mobileCategoryExpanded)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:bg-navy-900 transition"
                    >
                      <span className="flex items-center text-accent-orange">
                        <Boxes className="w-4 h-4 mr-2" />
                        ALL PRODUCT CATEGORIES
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategoryExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileCategoryExpanded && (
                      <div className="pl-6 pr-2 py-2 space-y-1.5 bg-navy-900/50 rounded-xl mt-1 text-[11px]">
                        <Link href="/machinery?cat=milk-dairy-machinery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; Milk &amp; Dairy Machinery
                        </Link>
                        <Link href="/machinery?cat=ice-cream-machinery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; Ice Cream Machinery
                        </Link>
                        <Link href="/machinery?cat=beverage-bottling-machinery" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; Beverage &amp; Bottling Machinery
                        </Link>
                        <Link href="/machinery?cat=machine-parts-fittings" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; Machine Parts &amp; Sanitary Fittings
                        </Link>
                        <Link href="/interior?cat=pvc-interior-panels" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; PVC Interior Panels
                        </Link>
                        <Link href="/interior?cat=wood-wpc-interior-products" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-300 hover:text-white">
                          &bull; Wood &amp; WPC Products
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/about') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span>ABOUT US</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/contact') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span>CONTACT US</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/cart') ? 'bg-navy-800 text-accent-orange' : 'text-slate-200 hover:bg-navy-900'
                    }`}
                  >
                    <span className="flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      MY CART ({totalItemCount})
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Instant RFQ Quote Button */}
                <button
                  onClick={() => { setMobileMenuOpen(false); setQuoteModalOpen(true); }}
                  className="w-full py-3 bg-accent-orange hover:bg-accent-hover text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Request Instant RFQ</span>
                </button>

                {/* Quick Phone & WhatsApp support */}
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Direct Engineering Hotline</span>
                  <a
                    href="tel:+918309004707"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800 transition"
                  >
                    <Phone className="w-4 h-4 text-accent-orange" />
                    <span>+91 83090 04707</span>
                  </a>
                  <a
                    href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20would%20like%20to%20inquire%20about%20Nandhas%20Machinery."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-900 text-xs font-semibold text-emerald-400 hover:bg-navy-800 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}
      </header>

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}
