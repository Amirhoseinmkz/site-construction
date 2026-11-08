'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { Menu, X, PhoneCall, Globe, ArrowUpRight, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { locale, setLocale, t, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/projects', label: t.nav.projects },
    { href: '/services', label: t.nav.services },
    { href: '/process', label: t.nav.process },
    { href: '/collaboration', label: t.nav.collaboration },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLocale(locale === 'fa' ? 'en' : 'fa');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080a]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60 py-3.5'
          : 'bg-gradient-to-b from-[#07080a]/90 via-[#07080a]/40 to-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-amber-500/20 to-blueprint/40 border border-amber-500/40 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors">
            <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.22em] text-lg font-bold text-white group-hover:text-amber-300 transition-colors uppercase">
              MIRKAZEMI
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-400 uppercase -mt-0.5">
              CONSTRUCTION GROUP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 shadow-sm shadow-amber-500/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 font-mono text-xs transition-all"
            title={locale === 'fa' ? 'Switch to English' : 'تغییر به زبان فارسی'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold uppercase">{locale === 'fa' ? 'EN' : 'فا'}</span>
          </button>

          {/* Consultation CTA */}
          <Link
            href="/contact"
            className="relative group overflow-hidden rounded-sm px-4 py-2 border border-amber-500/50 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 hover:border-amber-400 text-amber-300 text-xs font-semibold tracking-wide transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.nav.consultationCta}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-white/10 text-neutral-300 font-mono text-xs"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{locale === 'fa' ? 'EN' : 'فا'}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm border border-white/10 bg-white/5 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#07080a]/95 backdrop-blur-2xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded text-sm transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border-r-2 border-amber-400'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-sm bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.nav.consultationCta}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
