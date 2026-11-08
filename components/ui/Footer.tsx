'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { Compass, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Award, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Blueprint Grid Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(221, 161, 59, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(221, 161, 59, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Architectural Drafting Tag */}
        <div className="flex flex-wrap items-center justify-between pb-8 mb-12 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-amber-400/90 uppercase">
              MKZ // ENGINEERING HEADQUARTERS & ARCHIVE
            </span>
          </div>
          <div className="font-mono text-xs text-neutral-400 flex items-center gap-6">
            <span>REG: 489201</span>
            <span>GRADE: A-1 EPC</span>
            <span>ISO 9001:2015 CERTIFIED</span>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-amber-500/20 to-blueprint/40 border border-amber-500/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-[0.2em] text-lg font-bold text-white uppercase">
                  MIRKAZEMI
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase -mt-0.5">
                  CONSTRUCTION GROUP
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/989121111111"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:text-amber-300 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:text-amber-300 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/[0.03] hover:border-amber-400/60 hover:text-amber-300 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-amber-400 transition-colors">
                  {t.nav.process}
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="hover:text-amber-400 transition-colors">
                  {t.nav.collaboration}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Disciplines */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {t.footer.servicesList}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-neutral-500">01</span>
                <span>{locale === 'fa' ? 'طراحی معماری و مدلسازی BIM' : 'Architectural Design & BIM'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-neutral-500">02</span>
                <span>{locale === 'fa' ? 'محاسبات سازه و تحلیل زلزله' : 'Structural & Seismic Engineering'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-neutral-500">03</span>
                <span>{locale === 'fa' ? 'مدیریت پیمان و ساخت سوپرلوکس' : 'Turnkey EPC Construction'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-neutral-500">04</span>
                <span>{locale === 'fa' ? 'بازسازی و دکوراسیون داخلی' : 'Luxury Interior Restoration'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-neutral-500">05</span>
                <span>{locale === 'fa' ? 'قراردادهای مشارکت در ساخت' : 'Joint Venture Construction'}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Specs */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {t.footer.contactInfo}
            </h4>
            <div className="flex flex-col gap-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-neutral-400 leading-relaxed">{t.footer.addressVal}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-neutral-300 direction-ltr">{t.footer.phoneVal}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-neutral-300">{t.footer.emailVal}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 text-xs font-semibold text-amber-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.common.downloadCatalog}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Blueprint Spec Sheet */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="font-mono">
            {t.footer.rights}
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              LICENSED BY ENGINEERING COUNCIL
            </span>
            <span>|</span>
            <span>{t.footer.designedWithPrecision}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
