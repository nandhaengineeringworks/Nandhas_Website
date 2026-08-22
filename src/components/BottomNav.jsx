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
        aria-label="Mobile Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy-950/95 text-slate-300 backdrop-blur-xl border-t border-navy-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] pb-safe transition-all duration-300"
      >
        <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-95 ${
              isActive('/') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Home"
          >
            <div className="relative">
              <Home className={`w-5 h-5 transition-transform duration-200 ${isActive('/') ? 'scale-110' : ''}`} />
              {isActive('/') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-orange" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Home</span>
          </Link>

          {/* 2. Machinery */}
          <Link
            href="/machinery"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-95 ${
              isActive('/machinery') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Machinery Catalogue"
          >
            <div className="relative">
              <Cog className={`w-5 h-5 transition-transform duration-200 ${isActive('/machinery') ? 'scale-110 rotate-45' : ''}`} />
              {isActive('/machinery') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-orange" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Machines</span>
          </Link>

          {/* 3. Get Quote (Primary High-Converting Center Button) */}
          <button
            type="button"
            onClick={() => setQuoteModalOpen(true)}
            className="flex flex-col items-center justify-center -mt-4 group active:scale-95 transition-all duration-200"
            aria-label="Request Instant RFQ Quote"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-orange to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 border-2 border-navy-950 group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5 text-white ml-0.5" />
            </div>
            <span className="text-[9.5px] font-extrabold text-orange-400 uppercase tracking-wider mt-1">
              Get Quote
            </span>
          </button>

          {/* 4. Interior */}
          <Link
            href="/interior"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-95 ${
              isActive('/interior') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Interior & Wall Panels"
          >
            <div className="relative">
              <Layers className={`w-5 h-5 transition-transform duration-200 ${isActive('/interior') ? 'scale-110' : ''}`} />
              {isActive('/interior') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-orange" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">Interiors</span>
          </Link>

          {/* 5. Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 active:scale-95 ${
              isActive('/cart') 
                ? 'text-accent-orange font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label={`Shopping Cart with ${totalItemCount} items`}
          >
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 transition-transform duration-200 ${isActive('/cart') ? 'scale-110' : ''}`} />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-accent-orange text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                  {totalItemCount > 99 ? '99+' : totalItemCount}
                </span>
              )}
              {isActive('/cart') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-orange" />
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
