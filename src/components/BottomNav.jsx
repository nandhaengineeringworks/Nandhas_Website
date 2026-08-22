'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Cog, 
  Layers, 
  Send, 
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuoteModal from './QuoteModal';

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav 
        aria-label="Mobile Bottom Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy-950/90 text-slate-300 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] pb-safe transition-all duration-300"
      >
        <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-90 ${
              isActive('/') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Home"
          >
            <div className="relative">
              <Home className={`w-5 h-5 transition-transform duration-200 ${isActive('/') ? 'scale-110' : ''}`} />
              {isActive('/') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange shadow-sm shadow-orange-500/80" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Home</span>
          </Link>

          {/* 2. Machinery */}
          <Link
            href="/machinery"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-90 ${
              isActive('/machinery') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Machinery Catalogue"
          >
            <div className="relative">
              <Cog className={`w-5 h-5 transition-transform duration-200 ${isActive('/machinery') ? 'scale-110 rotate-45' : ''}`} />
              {isActive('/machinery') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange shadow-sm shadow-orange-500/80" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Machines</span>
          </Link>

          {/* 3. Get Quote (Primary Glowing Elevated FAB Button) */}
          <button
            type="button"
            onClick={() => setQuoteModalOpen(true)}
            className="flex flex-col items-center justify-center -mt-5 group active:scale-95 transition-all duration-200 z-10"
            aria-label="Request Instant RFQ Quote"
          >
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent-orange via-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/40 border-2 border-navy-950 group-hover:scale-105 transition-transform">
              <span className="absolute -inset-1 rounded-full bg-accent-orange opacity-25 animate-pulse" />
              <Send className="w-5 h-5 text-white ml-0.5 relative z-10" />
            </div>
            <span className="text-[9.5px] font-extrabold text-amber-400 uppercase tracking-wider mt-1 drop-shadow-xs">
              Get Quote
            </span>
          </button>

          {/* 4. Interior */}
          <Link
            href="/interior"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-90 ${
              isActive('/interior') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Interior & Wall Panels"
          >
            <div className="relative">
              <Layers className={`w-5 h-5 transition-transform duration-200 ${isActive('/interior') ? 'scale-110' : ''}`} />
              {isActive('/interior') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange shadow-sm shadow-orange-500/80" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Interiors</span>
          </Link>

          {/* 5. Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-90 ${
              isActive('/cart') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label={`Shopping Cart with ${totalItemCount} items`}
          >
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 transition-transform duration-200 ${isActive('/cart') ? 'scale-110' : ''}`} />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-accent-orange text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md border border-navy-950 animate-in zoom-in-50">
                  {totalItemCount > 99 ? '99+' : totalItemCount}
                </span>
              )}
              {isActive('/cart') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange shadow-sm shadow-orange-500/80" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Cart</span>
          </Link>

        </div>
      </nav>

      {/* Global Quote Request Modal */}
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}
