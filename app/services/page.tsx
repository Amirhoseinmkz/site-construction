'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { servicesData } from '@/data/services';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Building2, Sparkles, Layers } from 'lucide-react';

export default function ServicesPage() {
  const { t, locale } = useLanguage();

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      <BlueprintGrid opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400" />
            {locale === 'fa' ? 'دپارتمان‌های تخصصی مهندسی' : 'ENGINEERING DISCIPLINES'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'خدمات جامع مهندسی ساختمان و مدیریت پیمان' : 'Comprehensive Engineering, BIM & Turnkey Construction'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'گروه ساختمانی میرکاظمی کلیه مراحل چرخه حیات پروژه از طراحی مفهومی، محاسبات دقیق سازه‌ای، مدلسازی بدون تداخل BIM تا اجرای سوپرلوکس و مدیریت پیمان را با تضامین کتبی ارائه می‌نماید.'
              : 'End-to-end engineering excellence covering architectural design, clash-free BIM coordination, seismic engineering, and luxury turnkey EPC management.'}
          </p>
        </div>

        {/* Services Rows */}
        <div className="flex flex-col gap-16">
          {servicesData.map((svc, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={svc.id}
                className="p-8 md:p-12 rounded-2xl border border-white/15 bg-[#0a0d11]/90 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl"
              >
                {/* Text Content (7 cols) */}
                <div className={`lg:col-span-7 flex flex-col gap-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
                      {svc.code}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      LAYER: {svc.dwgLayer}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    {svc.title[locale]}
                  </h2>

                  <p className="text-xs md:text-sm font-semibold text-amber-400/90">
                    {svc.subtitle[locale]}
                  </p>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {svc.description[locale]}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                    <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                      {locale === 'fa' ? 'خروجی‌های کلیدی و تحویل‌شدنی‌ها:' : 'Key Deliverables & Standards:'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.deliverables[locale].map((d, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Service Image Frame (5 cols) */}
                <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 shadow-xl bg-neutral-950">
                    <Image
                      src={svc.image}
                      alt={svc.title[locale]}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#12161c] via-[#0e1217] to-[#141a22] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {locale === 'fa' ? 'نیاز به مشاوره مهندسی تخصصی در محل پروژه دارید؟' : 'Require On-Site Technical Engineering Consultation?'}
            </h3>
            <p className="text-neutral-400 text-sm">
              {locale === 'fa'
                ? 'تیم مهندسین ارشد ما آماده بررسی اولیه نقشه، بازدید از سایت و برآورد زمان‌بندی پروژه شما هستند.'
                : 'Our senior consulting engineers are prepared to review your blueprints and conduct a detailed site survey.'}
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm shrink-0 shadow-xl shadow-amber-500/20"
          >
            {t.common.requestConsultation}
          </Link>
        </div>
      </div>
    </div>
  );
}
