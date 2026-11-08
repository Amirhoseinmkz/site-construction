'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { processStepsData } from '@/data/processSteps';
import { CheckCircle2, Clock, Flag, ArrowRight } from 'lucide-react';

export default function ProcessPage() {
  const { t, locale } = useLanguage();

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      <BlueprintGrid opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400" />
            {locale === 'fa' ? 'روند ۷ گانه اجرای بی‌نقص' : '7-STAGE EXECUTION FRAMEWORK'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'از اولین تحلیل خاک تا تحویل کلید شاهکار' : 'From Geotechnical Inception to Key-in-Hand Turnkey'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'چارچوب استاندارد مهندسی و مدیریت پروژه گروه میرکاظمی برای تضمین ۱۰۰ درصدی زمان‌بندی، کنترل هزینه، و تطابق مو به مو با نقشه‌های مصوب.'
              : 'Our standardized engineering methodology ensuring zero-rework execution, ironclad CPM scheduling, and micro-precision quality assurance.'}
          </p>
        </div>

        {/* 7 Steps Stack */}
        <div className="flex flex-col gap-10">
          {processStepsData.map((step) => (
            <div
              key={step.stepNumber}
              className="p-8 md:p-10 rounded-2xl border border-white/15 bg-[#0b0e13]/90 backdrop-blur-xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Stage Number (3 cols) */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <span className="font-mono text-6xl md:text-7xl font-black text-amber-500/20 leading-none">
                  0{step.stepNumber}
                </span>
                <span className="font-mono text-xs text-amber-400 font-bold tracking-wider">
                  STAGE CODE: {step.code}
                </span>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-300 px-3 py-1 rounded bg-white/5 border border-white/10 w-fit mt-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{step.duration[locale]}</span>
                </div>
              </div>

              {/* Center & Right Details (9 cols) */}
              <div className="lg:col-span-9 flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {step.title[locale]}
                  </h2>
                  <p className="text-xs md:text-sm font-semibold text-amber-400/90 mb-3">
                    {step.subtitle[locale]}
                  </p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {step.description[locale]}
                  </p>
                </div>

                {/* Checklist */}
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    {locale === 'fa' ? 'اقدامات کلیدی این مرحله:' : 'Critical Execution Items:'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.checklist[locale].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Badge */}
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Flag className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">{locale === 'fa' ? 'خروجی نهایی و مایل‌استون:' : 'Stage Milestone:'}</span>
                  <span className="text-neutral-200">{step.milestone[locale]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm shadow-xl shadow-amber-500/20"
          >
            <span>{t.common.requestConsultation}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
