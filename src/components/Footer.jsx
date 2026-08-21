'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award,
  Factory,
  Headphones,
  Heart,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  Send,
  Shield,
  Truck,
  Wrench
} from 'lucide-react';

const machineryLinks = [
  { label: 'Milk & Dairy Machines', href: '/machinery?cat=milk-dairy-machinery' },
  { label: 'Ice Cream Machines', href: '/machinery?cat=ice-cream-machinery' },
  { label: 'Beverage Machines', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Juice Processing Machines', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Spare Parts & Fittings', href: '/machinery?cat=machine-parts-fittings' },
];

const interiorLinks = [
  { label: 'PVC Interior Panels', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Wood & WPC Products', href: '/interior?cat=wood-wpc-interior-products' },
  { label: '3mm UV Marble Sheets', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Acoustic Charcoal Slats', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Fluted Feature Panels', href: '/interior?cat=wood-wpc-interior-products' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Request a Quote', href: '/quote' },
  { label: 'Shopping Cart', href: '/cart' },
];

const topTrustFeatures = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '100% Quality Products',
    desc: 'Premium quality assured',
    href: '/about',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: '1 Year Warranty*',
    desc: 'On all machinery',
    href: '/about',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Pan India Delivery',
    desc: 'Safe & on-time delivery',
    href: '/contact',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Installation Support',
    desc: 'Expert installation team',
    href: '/contact',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: '24/7 Customer Support',
    desc: 'Always here to help',
    href: '/contact',
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full font-sans antialiased max-w-full overflow-x-hidden">
      
      {/* 1. TOP WHITE TRUST BAR */}
      <div className="border-b border-slate-200 bg-[#F6F8FB] py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 sm:gap-6">
            {topTrustFeatures.map((item, index) => (
              <Link 
                key={item.title} 
                href={item.href}
                className={`group flex items-center gap-3.5 transition hover:opacity-90 ${
                  index !== 0 ? 'lg:border-l lg:border-slate-200/80 lg:pl-6' : ''
                }`}
              >
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0A192F] group-hover:text-accent-orange leading-tight transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER BODY (DEEP NAVY) */}
      <div className="bg-[#03152D] text-slate-300 pt-10 sm:pt-12 pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          
          {/* Main Columns Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
            
            {/* Column 1: Brand & Bio */}
            <div className="flex flex-col space-y-4">
              <Link href="/" className="inline-block" aria-label="Nandhas Home">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
                    NANDHAS
                  </span>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                    <span className="text-[#F97316]">MACHINERY</span> • <span className="text-white">EQUIPMENT</span> • <span className="text-[#F97316]">INTERIORS</span>
                  </span>
                </div>
              </Link>

              <p className="text-xs leading-relaxed text-slate-300/90">
                India&apos;s trusted partner for dairy, beverage, food processing machinery and premium architectural interior &amp; wood solutions.
              </p>

              <div className="space-y-2.5 text-xs">
                <a href="tel:+918309004707" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                  <Phone className="h-4 w-4 shrink-0 text-[#F97316]" />
                  <span className="font-semibold text-slate-200">+91 83090 04707</span>
                </a>
                <a href="https://wa.me/918309004707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" />
                  <span className="font-semibold text-slate-200">WhatsApp: +91 83090 04707</span>
                </a>
                <a href="mailto:nandhaengineeringworks0@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition break-all">
                  <Mail className="h-4 w-4 shrink-0 text-[#F97316]" />
                  <span className="truncate">nandhaengineeringworks0@gmail.com</span>
                </a>
                <div className="flex items-start gap-2 text-slate-300 leading-relaxed">
                  <MapPin className="h-4 w-4 shrink-0 text-[#F97316] mt-0.5" />
                  <span>HIG-60, Balaji Nagar, Kukatpally, Hyderabad - 500072, India.</span>
                </div>
              </div>
            </div>

            {/* Column 2: MACHINERY */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4">
                MACHINERY CATALOGUE
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {machineryLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-accent-orange transition block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: INTERIOR & COMPANY */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4">
                INTERIOR &amp; QUICK LINKS
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {interiorLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-accent-orange transition block">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-accent-orange transition block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: GET IN TOUCH & NEWSLETTER */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                NEWSLETTER &amp; UPDATES
              </h3>

              <p className="text-xs text-slate-400">
                Subscribe for new machine launches, OEM technical specs, and seasonal factory discounts.
              </p>

              {subscribed ? (
                <p className="text-xs font-semibold text-emerald-400">
                  ✓ Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex w-full items-stretch">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full min-w-0 rounded-l-xl bg-white px-3 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex shrink-0 items-center justify-center rounded-r-xl bg-[#F97316] px-4 py-2.5 text-white transition hover:bg-orange-600 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 3. SUB-FOOTER BOTTOM BAR */}
      <div className="border-t border-slate-800/80 bg-[#020e1f] py-4 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-6 lg:px-8 text-center sm:text-left">
          
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-slate-400">
            <span>&copy; {new Date().getFullYear()} Nandhas Engineering Works. All Rights Reserved.</span>
          </div>

          {/* Designed With */}
          <div className="flex items-center justify-center gap-1 text-slate-300">
            <span>Engineered for Quality &amp; Performance</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
