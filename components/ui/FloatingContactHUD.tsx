'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowUp, Calculator, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Link from 'next/link';

export const FloatingContactHUD: React.FC = () => {
  const { t, locale } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none">
      {/* Quick Calculator Quick Action Button */}
      <Link
        href="/collaboration#calculator"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#121519]/90 border border-amber-500/40 text-amber-300 backdrop-blur-xl shadow-xl shadow-black/50 hover:bg-amber-500 hover:text-black transition-all hover:scale-105"
        title={t.hero.ctaSecondary}
      >
        <Calculator className="w-4 h-4 text-amber-400 group-hover:text-black transition-colors" />
        <span className="text-xs font-semibold hidden md:inline">
          {locale === 'fa' ? 'محاسبه‌گر سهم مشارکت' : 'Partnership Estimator'}
        </span>
      </Link>

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/989121111111"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/50 border border-emerald-400/40 transition-all hover:scale-110 group relative"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#07080a] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#07080a]" />
      </a>

      {/* Direct Phone Call Button */}
      <a
        href="tel:02122400000"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 text-black flex items-center justify-center shadow-2xl shadow-amber-500/40 border border-amber-300 transition-all hover:scale-110"
        aria-label="Direct Phone Call"
        title="021-22400000"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-all backdrop-blur-md"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};
