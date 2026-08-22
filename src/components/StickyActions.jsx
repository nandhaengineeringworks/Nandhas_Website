'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export default function StickyActions() {
  return (
    <>
      {/* Floating Call & WhatsApp Buttons - Raised on mobile to sit comfortably above BottomNav */}
      <div className="fixed bottom-[68px] right-3 sm:bottom-20 sm:right-5 lg:bottom-6 lg:right-6 z-30 flex flex-col gap-2.5 sm:gap-3">
        {/* WhatsApp direct chat */}
        <a
          href="https://wa.me/918309004707?text=Hi%20Prahalad%20Nandha,%20I%20would%20like%20to%20inquire%20about%20Nandhas%20Machinery."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-[#1ebe5d]"
          title="Direct WhatsApp with Prahalad Nandha"
          aria-label="WhatsApp with Prahalad Nandha"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.002 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.875 11.875 0 0 0 5.684 1.447h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 0 0-3.479-8.415" />
          </svg>
        </a>

        {/* Direct Call button */}
        <a
          href="tel:+918309004707"
          className="group flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-navy-800 text-white shadow-xl shadow-navy-900/40 transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-navy-700"
          title="Direct Phone Call - Prahalad Nandha"
          aria-label="Call Prahalad Nandha"
        >
          <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
      </div>
    </>
  );
}
