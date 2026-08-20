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
  Settings,
  Shield,
  Truck,
  Users,
  Wrench
} from 'lucide-react';

const machineryLinks = [
  { label: 'Milk & Dairy Machines', href: '/machinery?cat=milk-dairy-machinery' },
  { label: 'Ice Cream Machines', href: '/machinery?cat=ice-cream-machinery' },
  { label: 'Beverage Machines', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Juice Processing Machines', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Food Processing Machines', href: '/machinery?cat=milk-dairy-machinery' },
  { label: 'Packaging Machines', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Refrigeration & Cold Storage', href: '/machinery?cat=ice-cream-machinery' },
  { label: 'Ice Making Machines', href: '/machinery?cat=ice-cream-machinery' },
  { label: 'Water Treatment Plants', href: '/machinery?cat=beverage-bottling-machinery' },
  { label: 'Spare Parts & Accessories', href: '/machinery?cat=machine-parts-fittings' },
];

const interiorLinks = [
  { label: 'PVC Products', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Interior Solutions', href: '/interior' },
  { label: 'Wood & Panels', href: '/interior?cat=wood-wpc-interior-products' },
  { label: 'Plywood', href: '/interior?cat=wood-wpc-interior-products' },
  { label: 'MDF / HDF Boards', href: '/interior?cat=wood-wpc-interior-products' },
  { label: 'Particle Boards', href: '/interior?cat=wood-wpc-interior-products' },
  { label: 'Decorative Panels', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Laminates', href: '/interior?cat=wood-wpc-interior-products' },
  { label: 'Doors & Frames', href: '/interior?cat=pvc-interior-panels' },
  { label: 'Wall & Ceiling Systems', href: '/interior?cat=pvc-interior-panels' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Why Nandhas', href: '/why-nandhas' },
  { label: 'Industries We Serve', href: '/industries' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Quality Assurance', href: '/quality-assurance' },
  { label: 'Careers', href: '/careers' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
];

const customerServiceLinks = [
  { label: 'Get Quote', href: '/quote' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Delivery Information', href: '/delivery-information' },
  { label: 'Installation Support', href: '/installation-support' },
  { label: 'Returns & Refunds', href: '/returns-refunds' },
  { label: "FAQ's", href: '/faqs' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Sitemap', href: '/sitemap' },
];

// Exact Top Trust Badges with Working Links
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
    href: '/quality-assurance',
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
    href: '/returns-refunds',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy-800" fill="none" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Pan India Delivery',
    desc: 'Safe & on-time delivery',
    href: '/delivery-information',
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
    href: '/installation-support',
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
    <footer className="w-full font-sans antialiased">
      
      {/* 1. TOP WHITE TRUST BAR */}
      <div className="border-b border-slate-200 bg-[#F6F8FB] py-6">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {topTrustFeatures.map((item, index) => (
              <Link 
                key={item.title} 
                href={item.href}
                className={`group flex items-center gap-4 transition hover:opacity-90 ${
                  index !== 0 ? 'lg:border-l lg:border-slate-200/80 lg:pl-6' : ''
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0A192F] group-hover:text-accent-orange leading-tight transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER BODY (DEEP NAVY) */}
      <div className="bg-[#03152D] text-slate-300 pt-12 pb-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          
          {/* Main 6 Columns Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr_1fr_1.1fr] xl:gap-8">
            
            {/* Column 1: Brand & Bio */}
            <div className="flex flex-col">
              
              {/* Brand Logo Header */}
              <Link href="/" className="inline-block" aria-label="Nandhas">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-black tracking-tight text-white font-display">
                      NANDHAS
                    </span>
                  </div>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    <span className="text-[#F97316]">MACHINERY</span> • <span className="text-white">EQUIPMENT</span> • <span className="text-[#F97316]">INTERIORS</span>
                  </span>
                </div>
              </Link>

              <p className="mt-4 text-xs leading-relaxed text-slate-300/90 pr-2">
                India&apos;s trusted partner for dairy, beverage, food processing machinery and quality interior &amp; wood solutions. Delivering performance, reliability and value across industries.
              </p>

              {/* Direct Contacts with Orange Icons */}
              <div className="mt-5 space-y-3 text-xs">
                <a href="tel:+918309004707" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition">
                  <Phone className="h-4 w-4 shrink-0 text-[#F97316]" />
                  <span className="font-semibold text-slate-200">+91 83090 04707</span>
                </a>
                <a href="https://wa.me/919640652239" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" />
                  <span className="font-semibold text-slate-200">WhatsApp: +91 96406 52239</span>
                </a>
                <a href="mailto:nandhaengineeringworks0@gmail.com" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition">
                  <Mail className="h-4 w-4 shrink-0 text-[#F97316]" />
                  <span>nandhaengineeringworks0@gmail.com</span>
                </a>
                <div className="flex items-start gap-2.5 text-slate-300 leading-relaxed">
                  <MapPin className="h-4 w-4 shrink-0 text-[#F97316] mt-0.5" />
                  <span>HIG-60, Balaji Nagar, Kukatpally, Hyderabad - 500072, Telangana, India.</span>
                </div>
              </div>

              {/* Follow Us & Social Circles */}
              <div className="mt-6">
                <span className="block text-xs font-bold text-white mb-2.5">
                  Follow Us
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:opacity-90"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.597 1.325-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition hover:opacity-90"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:opacity-90"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.96H5.06v8.54z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white transition hover:opacity-90"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Column 2: MACHINERY */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                MACHINERY
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {machineryLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="group flex items-center transition hover:text-white">
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: INTERIOR & MATERIALS */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                INTERIOR &amp; MATERIALS
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {interiorLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="group flex items-center transition hover:text-white">
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: COMPANY */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                COMPANY
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="group flex items-center transition hover:text-white">
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: CUSTOMER SERVICE */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                CUSTOMER SERVICE
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {customerServiceLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="group flex items-center transition hover:text-white">
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 6: GET IN TOUCH & NEWSLETTER */}
            <div className="flex flex-col">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                GET IN TOUCH
              </h3>

              {/* Call Us */}
              <div className="flex items-start gap-3 mb-3.5">
                <Phone className="h-4 w-4 shrink-0 text-slate-300 mt-1" />
                <div className="text-xs">
                  <strong className="block text-white font-bold">Call Us</strong>
                  <span className="block text-slate-400 text-[11px]">Mon - Sat: 9:00 AM - 6:00 PM</span>
                  <a href="tel:+918309004707" className="block text-slate-200 hover:text-white font-medium mt-0.5">
                    +91 83090 04707
                  </a>
                  <a href="https://wa.me/919640652239" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium mt-1">
                    <MessageCircle className="h-3.5 w-3.5" /> +91 96406 52239
                  </a>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-3 mb-3.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-300 mt-1" />
                <div className="text-xs">
                  <strong className="block text-white font-bold">Email Us</strong>
                  <a href="mailto:nandhaengineeringworks0@gmail.com" className="block text-slate-300 hover:text-white text-[11px] break-all">
                    nandhaengineeringworks0@gmail.com
                  </a>
                </div>
              </div>

              {/* Support */}
              <div className="flex items-start gap-3 mb-5">
                <Headphones className="h-4 w-4 shrink-0 text-slate-300 mt-1" />
                <div className="text-xs">
                  <strong className="block text-white font-bold">Support</strong>
                  <span className="block text-slate-400 text-[11px]">24/7 Online Support</span>
                  <a href="mailto:nandhaengineeringworks0@gmail.com" className="block text-slate-300 hover:text-white text-[11px] break-all">
                    nandhaengineeringworks0@gmail.com
                  </a>
                </div>
              </div>

              {/* SUBSCRIBE TO OUR NEWSLETTER */}
              <div className="mt-1 pt-3 border-t border-slate-800">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                  SUBSCRIBE TO OUR NEWSLETTER
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-2.5">
                  Get latest updates and offers
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
                      className="w-full min-w-0 rounded-l bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="flex shrink-0 items-center justify-center rounded-r bg-[#F97316] px-3 py-2 text-white transition hover:bg-orange-600 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. SUB-FOOTER BOTTOM BAR */}
      <div className="border-t border-slate-800/80 bg-[#020e1f] py-4 text-xs text-slate-400">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          
          {/* Copyright & Quick Links */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400">
            <span>&copy; {new Date().getFullYear()} Nandhas. All Rights Reserved.</span>
            <span className="text-slate-600">&bull;</span>
            <Link href="/terms" className="hover:text-slate-200 transition">Terms</Link>
            <span className="text-slate-600">&bull;</span>
            <Link href="/privacy" className="hover:text-slate-200 transition">Privacy</Link>
            <span className="text-slate-600">&bull;</span>
            <Link href="/sitemap" className="hover:text-slate-200 transition">Sitemap</Link>
          </div>

          {/* Center Designed With */}
          <div className="flex items-center gap-1 text-slate-300">
            <span>Designed with</span>
            <span className="text-red-500 font-bold">❤</span>
            <span>for Quality &amp; Performance</span>
          </div>

          {/* Accepted Payments */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 font-medium text-[11px]">We Accept</span>
            <div className="flex items-center gap-1.5">
              
              {/* VISA */}
              <div className="flex h-6 w-10 items-center justify-center rounded bg-white px-1 shadow-sm">
                <span className="text-[11px] font-black italic tracking-tighter text-[#1A1F71]">
                  VISA
                </span>
              </div>

              {/* MASTERCARD */}
              <div className="flex h-6 w-10 items-center justify-center rounded bg-white px-1 shadow-sm">
                <div className="flex -space-x-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
              </div>

              {/* RUPAY */}
              <div className="flex h-6 w-10 items-center justify-center rounded bg-white px-1 shadow-sm">
                <span className="text-[9px] font-black italic text-[#097939]">
                  Ru<span className="text-[#097939]">Pay</span>
                </span>
              </div>

              {/* UPI */}
              <div className="flex h-6 w-10 items-center justify-center rounded bg-white px-1 shadow-sm">
                <span className="text-[10px] font-black text-[#0f2b5c]">
                  UPI
                </span>
              </div>

              {/* PAYTM */}
              <div className="flex h-6 w-10 items-center justify-center rounded bg-white px-1 shadow-sm">
                <span className="text-[9px] font-extrabold text-[#002E6E]">
                  pay<span className="text-[#00BAF2]">tm</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
