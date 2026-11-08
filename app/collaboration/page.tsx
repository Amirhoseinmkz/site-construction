'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { PartnershipCalculator } from '@/components/ui/PartnershipCalculator';
import { ShieldCheck, Handshake, TrendingUp, CheckCircle2, FileText, Send, PhoneCall } from 'lucide-react';

export default function CollaborationPage() {
  const { t, locale } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      <BlueprintGrid opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400" />
            {locale === 'fa' ? 'مشارکت در ساخت و سرمایه‌گذاری' : 'CONSTRUCTION JOINT VENTURE'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'تبدیل ملک کلنگی یا زمین شما به برجی فاخر و ارزشمند' : 'Transforming Your Prime Land into a Palatial Landmark'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'گروه ساختمانی میرکاظمی با توان مالی قدرتمند، اکیپ‌های مهندسی طراز اول و ارائه محکم‌ترین تضامین حقوقی و بانکی، مطمئن‌ترین شریک ساخت شماست.'
              : 'Mirkazemi Construction Group provides robust capital backing, top-tier engineering execution, and ironclad legal guarantees for landowners.'}
          </p>
        </div>

        {/* 3 Collaboration Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-xl border border-white/15 bg-[#0b0e13]/90 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                MODEL 01
              </span>
              <h2 className="text-xl font-bold text-white mt-4 mb-2">
                {locale === 'fa' ? 'مشارکت در ساخت با بلاعوض' : 'Joint Venture with Escrow'}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {locale === 'fa'
                  ? 'تامین ۱۰۰ درصدی هزینه‌های ساخت، عوارض شهرداری و پرداخت بلاعوض اسکان به مالکین در ازای سهم توافقی از متراژ مفید ساخته‌شده.'
                  : '100% construction & municipal fee funding by Mirkazemi Group plus guaranteed upfront relocation escrow in exchange for agreed equity.'}
              </p>
              <ul className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{locale === 'fa' ? 'ضمانت‌نامه بانکی تعهدات' : 'Bank Performance Guarantee'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{locale === 'fa' ? 'پرداخت وجه بلاعوض فوری' : 'Upfront Relocation Escrow'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{locale === 'fa' ? 'لیست متریال شفاف و پیوست' : 'Bespoke Material Contract Schedule'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-white/15 bg-[#0b0e13]/90 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-sky-400 px-2.5 py-1 rounded bg-blueprint/40 border border-blueprint-light/40">
                MODEL 02
              </span>
              <h2 className="text-xl font-bold text-white mt-4 mb-2">
                {locale === 'fa' ? 'مدیریت پیمان با حق‌الزحمه (EPC)' : 'Turnkey EPC Management'}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {locale === 'fa'
                  ? 'اجرای کامل ساختمان با سرمایه کارفرما و تحت نظارت عالیه مهندسین میرکاظمی با دریافت درصد شفاف مدیریت (۱۰ تا ۱۵٪).'
                  : 'Turnkey construction execution using client capital under senior engineering supervision for a transparent management fee.'}
              </p>
              <ul className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{locale === 'fa' ? 'گزارش‌دهی مالی و فاکتور هفتگی' : 'Weekly Financial & Invoice Auditing'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{locale === 'fa' ? 'خرید مصالح با تخفیف کارخانه' : 'Direct Manufacturer Discounts'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{locale === 'fa' ? 'حفظ ۱۰۰٪ مالکیت برای کارفرما' : '100% Retained Property Ownership'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-xl border border-white/15 bg-[#0b0e13]/90 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                MODEL 03
              </span>
              <h2 className="text-xl font-bold text-white mt-4 mb-2">
                {locale === 'fa' ? 'سرمایه‌گذاری مشترک و تهاتر' : 'Joint Investment & Barter'}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                {locale === 'fa'
                  ? 'سرمایه‌گذاری روی پروژه‌های در حال احداث یا تهاتر زمین و واحدهای مسکونی با پروژه‌های ساخته‌شده آماده تحویل.'
                  : 'Direct co-investment in ongoing high-yield high-rises or asset-backed property swaps for ready-to-move units.'}
              </p>
              <ul className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locale === 'fa' ? 'سودآوری و بازدهی سرمایه دلاری' : 'Superior Risk-Adjusted ROI'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locale === 'fa' ? 'سند تک‌برگ قطعی ۶ دانگ' : 'Immediate Verified Title Deeds'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{locale === 'fa' ? 'نقدشوندگی بالا در بازار' : 'High Market Liquidity'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Embedded Calculator */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {t.sections.calculatorTitle}
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              {t.sections.calculatorSub}
            </p>
          </div>
          <PartnershipCalculator />
        </div>

        {/* Land Proposal Submission Form */}
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl border border-white/15 bg-[#0d1014]/90 backdrop-blur-2xl shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-2">
              LANDOWNER REGISTRATION PORTAL
            </span>
            <h2 className="text-2xl font-bold text-white">
              {locale === 'fa' ? 'ثبت مشخصات ملک جهت بررسی و ارسال پیشنهاد مشارکت' : 'Submit Your Property for Joint Venture Feasibility'}
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm mt-2">
              {locale === 'fa'
                ? 'مشخصات اولیه زمین یا ملک خود را ثبت کنید تا کارشناسان دپارتمان سرمایه‌گذاری ظرف ۲۴ ساعت با شما تماس بگیرند.'
                : 'Enter your property parameters to receive an official analytical feasibility proposal within 24 hours.'}
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                {locale === 'fa' ? 'اطلاعات ملک با موفقیت ثبت شد' : 'Property Proposal Submitted'}
              </h3>
              <p className="text-sm text-neutral-300 max-w-md">
                {locale === 'fa'
                  ? 'کارشناسان سرمایه‌گذاری پس از استعلام پهنه شهرداری، جهت هماهنگی جلسه حضوری با شما تماس خواهند گرفت.'
                  : 'Our investment team will review municipal zoning and contact you to schedule a private meeting.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleLandSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-300">
                  {locale === 'fa' ? 'نام مالک یا وکیل قانونی' : 'Owner / Legal Representative'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'}
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-300">
                  {locale === 'fa' ? 'شماره تماس همراه' : 'Mobile Number'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0912..."
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400 direction-ltr"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-300">
                  {locale === 'fa' ? 'موقعیت و آدرس ملک' : 'Property Address / Location'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'fa' ? 'مثلاً تهران، فرمانیه، خیابان سنبل' : 'e.g. Farmaniyeh, Tehran'}
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-300">
                  {locale === 'fa' ? 'مساحت عرصه (زمین)' : 'Plot Area (m²)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'fa' ? 'مثلاً ۵۰۰ مترمربع' : 'e.g. 500 m²'}
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-mono text-neutral-300">
                  {locale === 'fa' ? 'وضعیت سند و توضیحات تکمیلی' : 'Deed Status & Additional Details'}
                </label>
                <textarea
                  rows={3}
                  placeholder={locale === 'fa' ? 'وضعیت سند (تک‌برگ، اوقافی و ...)، بر ملک، گذر کوچه و انتظارات...' : 'Deed type, frontage width, alley width and preferences...'}
                  className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{locale === 'fa' ? 'ارسال مشخصات ملک جهت تحلیل اقتصادی' : 'Submit Property for Joint Venture Review'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
