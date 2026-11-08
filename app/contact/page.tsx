'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
            {locale === 'fa' ? 'ارتباط مستقیم و رزرو جلسه' : 'COMMUNICATIONS & INQUIRIES'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'شروع خلق شاهکار معماری شما' : 'Initiate Your Architectural Masterpiece'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'جهت هماهنگی جلسه حضوری در دفتر مرکزی، ارزیابی اولیه پروژه یا مشاوره مشارکت در ساخت، با ما در تماس باشید.'
              : 'Contact our senior project directors to schedule a private conference or request preliminary feasibility reviews.'}
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl border border-white/15 bg-[#0b0e13]/90 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {t.contactForm.title}
                </h2>
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest">
                  FORM NO. MKZ-REQ-07 // ENCRYPTED SUBMISSION
                </span>
              </div>
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  {locale === 'fa' ? 'درخواست شما با موفقیت ثبت شد' : 'Request Received Successfully'}
                </h3>
                <p className="text-sm text-neutral-300 max-w-md">
                  {t.contactForm.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-300">
                      {t.contactForm.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contactForm.fullNamePlaceholder}
                      className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-300">
                      {t.contactForm.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t.contactForm.phonePlaceholder}
                      className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400 direction-ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-300">
                      {t.contactForm.projectType}
                    </label>
                    <select className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400">
                      <option value="residential" className="bg-[#12161c] text-white">
                        {t.common.residential}
                      </option>
                      <option value="commercial" className="bg-[#12161c] text-white">
                        {t.common.commercial}
                      </option>
                      <option value="renovation" className="bg-[#12161c] text-white">
                        {t.common.renovation}
                      </option>
                      <option value="partnership" className="bg-[#12161c] text-white">
                        {t.common.partnership}
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-neutral-300">
                      {t.contactForm.areaApprox}
                    </label>
                    <input
                      type="text"
                      placeholder={t.contactForm.areaApproxPlaceholder}
                      className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-neutral-300">
                    {t.contactForm.message}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t.contactForm.messagePlaceholder}
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contactForm.submit}</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Side (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct Cards */}
            <div className="p-6 rounded-2xl border border-white/15 bg-[#0e1217]/90 backdrop-blur-xl flex flex-col gap-5">
              <h3 className="font-mono text-xs text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>{locale === 'fa' ? 'اطلاعات ارتباطی دفتر مرکزی' : 'HEADQUARTERS CONTACTS'}</span>
              </h3>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-start gap-3.5 py-3 border-b border-white/10">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-neutral-400 block mb-1">{t.footer.address}</span>
                    <span className="text-white font-medium leading-relaxed">{t.footer.addressVal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 py-3 border-b border-white/10">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-neutral-400 block mb-1">{locale === 'fa' ? 'خطوط ویژه تماس مستقیم' : 'Direct Phone Lines'}</span>
                    <span className="text-white font-mono text-sm block direction-ltr">{t.footer.phoneVal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 py-3 border-b border-white/10">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-neutral-400 block mb-1">{locale === 'fa' ? 'پست الکترونیک رسمی' : 'Official Email'}</span>
                    <span className="text-white font-mono">{t.footer.emailVal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 py-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-neutral-400 block mb-1">{locale === 'fa' ? 'ساعات کاری و پذیرش جلسات' : 'Working Hours'}</span>
                    <span className="text-white">{locale === 'fa' ? 'شنبه تا پنج‌شنبه: ساعت ۹:۰۰ الی ۱۸:۳۰' : 'Saturday to Thursday: 09:00 - 18:30'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/989121111111"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 flex items-center gap-3 transition-colors text-white text-xs font-semibold"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.common.whatsappDirect}</span>
              </a>

              <a
                href="tel:02122400000"
                className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 flex items-center gap-3 transition-colors text-white text-xs font-semibold"
              >
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.common.callDirect}</span>
              </a>
            </div>

            {/* Catalog Download Box */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-white mb-0.5">{t.common.downloadCatalog}</div>
                  <div className="font-mono text-[10px] text-neutral-400">PDF // 24.8 MB // REV 2026</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(locale === 'fa' ? 'کاتالوگ جامع پروژه در حال بارگیری است...' : 'Downloading corporate portfolio...')}
                className="px-4 py-2 rounded border border-white/15 bg-white/5 hover:border-amber-400 text-xs text-amber-300 font-semibold transition-colors"
              >
                {locale === 'fa' ? 'دانلود' : 'Download'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
