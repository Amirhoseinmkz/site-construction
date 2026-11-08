'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { ArchitecturalHeroCanvas } from '@/components/3d/ArchitecturalHeroCanvas';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projectsData } from '@/data/projects';
import { servicesData } from '@/data/services';
import { processStepsData } from '@/data/processSteps';
import { PartnershipCalculator } from '@/components/ui/PartnershipCalculator';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import {
  Compass,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Award,
  Clock,
  TrendingUp,
  PhoneCall,
} from 'lucide-react';

export default function HomePage() {
  const { t, locale, dir } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const featuredProjects = projectsData.slice(0, 3);
  const featuredComparison = projectsData[0]; // Zafaraniyeh residence with before/after

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden border-b border-white/10">
        <BlueprintGrid opacity={0.4} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Architectural Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title & Subtitle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h1 className="text-fluid-hero font-extrabold text-white tracking-tight leading-[1.15]">
                <span className="block">{t.hero.titleLine1}</span>
                <span className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  {t.hero.titleLine2}
                </span>
              </h1>

              <p className="text-fluid-body text-neutral-300 leading-relaxed max-w-2xl font-light">
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/projects"
                  className="px-7 py-4 rounded-sm bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href="#calculator"
                  className="px-7 py-4 rounded-sm border border-white/20 bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-500/40 text-neutral-200 text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>{t.hero.ctaSecondary}</span>
                </Link>
              </div>
            </div>

            {/* Live Stats HUD Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-white/10 bg-[#0e1217]/80 backdrop-blur-xl flex flex-col gap-2">
                <div className="font-mono text-3xl md:text-4xl font-extrabold text-amber-400">
                  {t.hero.stats.projectsDone.num}
                </div>
                <div className="text-xs text-neutral-400 font-medium leading-relaxed">
                  {t.hero.stats.projectsDone.label}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-[#0e1217]/80 backdrop-blur-xl flex flex-col gap-2">
                <div className="font-mono text-3xl md:text-4xl font-extrabold text-white">
                  {t.hero.stats.builtArea.num}
                </div>
                <div className="text-xs text-neutral-400 font-medium leading-relaxed">
                  {t.hero.stats.builtArea.label}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-[#0e1217]/80 backdrop-blur-xl flex flex-col gap-2">
                <div className="font-mono text-3xl md:text-4xl font-extrabold text-sky-400">
                  {t.hero.stats.experience.num}
                </div>
                <div className="text-xs text-neutral-400 font-medium leading-relaxed">
                  {t.hero.stats.experience.label}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-[#0e1217]/80 backdrop-blur-xl flex flex-col gap-2">
                <div className="font-mono text-3xl md:text-4xl font-extrabold text-emerald-400">
                  {t.hero.stats.satisfaction.num}
                </div>
                <div className="text-xs text-neutral-400 font-medium leading-relaxed">
                  {t.hero.stats.satisfaction.label}
                </div>
              </div>
            </div>
          </div>

          {/* 3D WebGL Volumetric Centerpiece */}
          <div className="mt-8 rounded-2xl border border-white/15 bg-[#090b0e]/90 overflow-hidden shadow-2xl relative">
            <ArchitecturalHeroCanvas />
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS SECTION */}
      <section className="relative py-24 md:py-32 border-b border-white/10">
        <BlueprintGrid opacity={0.2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-amber-400" />
                {locale === 'fa' ? 'آرشیو شاهکارهای معماری' : 'LANDMARK PORTFOLIO'}
              </div>
              <h2 className="text-fluid-h2 font-extrabold text-white">
                {t.sections.featuredProjectsTitle}
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-2xl">
                {t.sections.featuredProjectsSub}
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/15 hover:border-amber-400/60 text-xs font-semibold text-neutral-200 hover:text-amber-300 transition-colors"
            >
              <span>{t.sections.viewAllProjects}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Interactive Before / After Comparison Showcase */}
          {featuredComparison && featuredComparison.beforeImage && featuredComparison.afterImage && (
            <div className="mt-20 p-8 md:p-12 rounded-2xl border border-white/15 bg-[#0b0e12]/90 backdrop-blur-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                    CASE STUDY // TRANSFORMATION COMPARISON
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {locale === 'fa' ? 'مقایسه اسکلت سازه و تحویل نهایی' : 'Structural Erection vs. Luxury Completion'}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {locale === 'fa'
                      ? 'تصویر اسلایدر زیر، تطبیق دقیق مدل‌سازی محاسباتی سازه با اجرای نهایی سنگ‌های گرانیت و چوب ترمووود برج‌باغ زعفرانیه را به نمایش می‌گذارد.'
                      : 'Drag the slider to witness the microscopic precision between the raw structural framing and the final luxury turnkey delivery of the Zafaraniyeh Palatial Residence.'}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/projects/${featuredComparison.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 font-mono uppercase"
                    >
                      <span>{t.common.viewDetails}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <BeforeAfterSlider
                    beforeImage={featuredComparison.beforeImage}
                    afterImage={featuredComparison.afterImage}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. ENGINEERING DISCIPLINES & SERVICES */}
      <section className="relative py-24 md:py-32 border-b border-white/10 bg-[#06080a]">
        <BlueprintGrid opacity={0.25} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {locale === 'fa' ? 'دپارتمان‌های تخصصی' : 'ENGINEERING DISCIPLINES'}
            </div>
            <h2 className="text-fluid-h2 font-extrabold text-white">
              {t.sections.servicesTitle}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2">
              {t.sections.servicesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                className="group p-8 rounded-xl border border-white/10 bg-[#0b0e13]/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                      {svc.code}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      LAYER: {svc.dwgLayer}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {svc.title[locale]}
                  </h3>

                  <p className="text-xs text-amber-400/80 font-medium mt-1 mb-4">
                    {svc.subtitle[locale]}
                  </p>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {svc.description[locale]}
                  </p>

                  {/* Deliverables Checklist */}
                  <ul className="flex flex-col gap-2.5 border-t border-white/10 pt-4">
                    {svc.deliverables[locale].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-amber-400 transition-colors"
                  >
                    <span>{locale === 'fa' ? 'اطلاعات بیشتر' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 7-STAGE WORKFLOW STEPPER */}
      <section className="relative py-24 md:py-32 border-b border-white/10">
        <BlueprintGrid opacity={0.2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-amber-400" />
                {locale === 'fa' ? 'استاندارد بین‌المللی اجرا' : 'LIFECYCLE ROADMAP'}
              </div>
              <h2 className="text-fluid-h2 font-extrabold text-white">
                {t.sections.processTitle}
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-2xl">
                {t.sections.processSub}
              </p>
            </div>

            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/15 hover:border-amber-400/60 text-xs font-semibold text-neutral-200 hover:text-amber-300 transition-colors"
            >
              <span>{locale === 'fa' ? 'بررسی ۷ گام اجرایی' : 'Explore All 7 Steps'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Stepper Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processStepsData.slice(0, 4).map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-xl border border-white/10 bg-[#0c0f13]/90 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-amber-500/40">
                      0{step.stepNumber}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {step.duration[locale]}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title[locale]}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {step.description[locale]}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="font-mono text-[10px] text-amber-400/90 block">
                    MILESTONE: {step.milestone[locale]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARTNERSHIP CALCULATOR SECTION */}
      <section id="calculator-section" className="relative py-24 md:py-32 border-b border-white/10 bg-[#050709]">
        <BlueprintGrid opacity={0.3} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {locale === 'fa' ? 'تحلیل اقتصادی و ارزش‌گذاری' : 'FEASIBILITY ENGINE'}
            </div>
            <h2 className="text-fluid-h2 font-extrabold text-white">
              {t.sections.calculatorTitle}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2">
              {t.sections.calculatorSub}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PartnershipCalculator />
          </div>
        </div>
      </section>

      {/* 6. WHY MIRKAZEMI (TRUST & EXCELLENCE PILLARS) */}
      <section className="relative py-24 md:py-32 border-b border-white/10">
        <BlueprintGrid opacity={0.2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-amber-400" />
              {locale === 'fa' ? 'اصول تمایز ما' : 'CORE PILLARS'}
            </div>
            <h2 className="text-fluid-h2 font-extrabold text-white">
              {t.sections.whyUsTitle}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2">
              {t.sections.whyUsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-white/10 bg-[#0d1014]/90 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-sm bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                {locale === 'fa' ? 'ضمانت‌نامه کتبی کیفیت' : 'Written QA Warranty'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {locale === 'fa'
                  ? 'گارانتی ۵ ساله کلیه سیستم‌های تأسیساتی و سازه‌ای همراه با خدمات پشتیبانی ۲۴ ساعته.'
                  : '5-year comprehensive structural & MEP warranty with round-the-clock facility maintenance.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#0d1014]/90 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-sm bg-blueprint/40 border border-blueprint-light/40 flex items-center justify-center">
                <Clock className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                {locale === 'fa' ? 'تحویل کلید ۱۰۰٪ در موعد' : '100% On-Time Delivery'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {locale === 'fa'
                  ? 'تضمین زمان‌بندی قرارداد با ضرر و زیان روزانه و مدیریت سخت‌گیرانه زنجیره تامین.'
                  : 'Contractual liquidated damage guarantees backed by advanced CPM timeline tracking.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#0d1014]/90 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-sm bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Layers className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                {locale === 'fa' ? 'مدلسازی BIM بدون تداخل' : 'Zero-Clash BIM LOD 400'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {locale === 'fa'
                  ? 'شناسایی و رفع ۱۰۰ درصدی تداخلات پیش از ورود به فاز اجرا با شبیه‌سازی دیجیتال.'
                  : 'Complete elimination of on-site rework through millimeter-accurate digital pre-construction.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#0d1014]/90 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-sm bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                {locale === 'fa' ? 'شفافیت مالی دست‌اول' : 'Direct Manufacturer Pricing'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {locale === 'fa'
                  ? 'تامین آهن‌آلات، سنگ‌های اسلب و بتن بدون واسطه از تولیدکننده با فاکتورهای رسمی.'
                  : 'Bulk direct purchasing of certified rebar, cement, and Italian marble at factory price.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CONSULTATION BOOKING SECTION */}
      <section className="relative py-24 md:py-32 bg-[#050608]">
        <BlueprintGrid opacity={0.3} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto rounded-2xl border border-amber-500/30 bg-[#0b0e13]/90 backdrop-blur-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-amber-400" />
                {t.contactForm.title}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t.sections.consultationTitle}
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm mt-2">
                {t.contactForm.subtitle}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  {locale === 'fa' ? 'درخواست شما با موفقیت ثبت شد' : 'Inquiry Submitted Successfully'}
                </h3>
                <p className="text-sm text-neutral-300 max-w-md">
                  {t.contactForm.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-neutral-300">
                    {t.contactForm.fullName}
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
                    {t.contactForm.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t.contactForm.phonePlaceholder}
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400 direction-ltr"
                  />
                </div>

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

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-mono text-neutral-300">
                    {t.contactForm.message}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.contactForm.messagePlaceholder}
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-neutral-200 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.contactForm.submit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
