'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Maximize2,
  Layers,
  Calendar,
  CheckCircle2,
  FileCode2,
  Compass,
  PhoneCall,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { locale, t, dir } = useLanguage();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">
          {locale === 'fa' ? 'پروژه مورد نظر یافت نشد' : 'Project Not Found'}
        </h1>
        <Link
          href="/projects"
          className="px-6 py-2.5 rounded bg-amber-500 text-black font-semibold text-sm"
        >
          {locale === 'fa' ? 'بازگشت به پروژه‌ها' : 'Back to Projects'}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-24">
      <BlueprintGrid opacity={0.3} />

      {/* Top Banner / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>{locale === 'fa' ? 'بازگشت به آرشیو پروژه‌ها' : 'Back to Project Archive'}</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
              {project.dwgNo}
            </span>
            <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {project.location[locale]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
              YEAR: {project.year}
            </span>
            <span
              className={`font-mono text-xs px-3 py-1 rounded border font-bold ${
                project.status === 'completed'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-blueprint/40 text-sky-300 border-blueprint-light/50'
              }`}
            >
              {project.status === 'completed' ? t.common.completed : t.common.inProgress}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          {project.title[locale]}
        </h1>
        <p className="text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed font-light mb-8">
          {project.subtitle[locale]}
        </p>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-12 bg-neutral-950">
          <Image
            src={project.heroImage}
            alt={project.title[locale]}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description & Features (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                <span>{locale === 'fa' ? 'شرح و مشخصات فنی پروژه' : 'Project Narrative & Technical Scope'}</span>
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {project.description[locale]}
              </p>
            </div>

            {/* Key Engineering Features */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'fa' ? 'ویژگی‌های برجسته معماری و سازه' : 'Key Engineering Features'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features[locale].map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#0d1014]/80 border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After Slider if exists */}
            {project.beforeImage && project.afterImage && (
              <div className="pt-4">
                <h3 className="text-lg font-bold text-white mb-4">
                  {locale === 'fa' ? 'مقایسه مرحله اسکلت و اجرای نهایی' : 'Structural vs. Turnkey Comparison'}
                </h3>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                />
              </div>
            )}

            {/* Project Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {locale === 'fa' ? 'گالری تصاویر پروژه' : 'Project Gallery'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-lg overflow-hidden border border-white/10"
                    >
                      <Image
                        src={img}
                        alt={`${project.title[locale]} - ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Spec Sheet Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-xl border border-white/15 bg-[#0e1217]/90 backdrop-blur-xl shadow-xl flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <FileCode2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  ARCHITECTURAL SPEC SHEET
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">{locale === 'fa' ? 'مساحت زیربنا:' : 'Gross Area:'}</span>
                  <span className="font-mono font-bold text-white">{project.area}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">{locale === 'fa' ? 'تعداد طبقات:' : 'Storeys:'}</span>
                  <span className="font-mono font-bold text-white">{project.floors} {locale === 'fa' ? 'طبقه' : 'Floors'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">{locale === 'fa' ? 'سیستم سازه:' : 'Structural System:'}</span>
                  <span className="font-medium text-amber-300 text-end">{project.structureType[locale]}</span>
                </div>
                {project.blueprintData && (
                  <>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-neutral-400">SCALE:</span>
                      <span className="font-mono text-neutral-200">{project.blueprintData.scale}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-neutral-400">ZONE:</span>
                      <span className="font-mono text-neutral-200">{project.blueprintData.zone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-neutral-400">{locale === 'fa' ? 'طراح معماری:' : 'Lead Architect:'}</span>
                      <span className="text-neutral-200">{project.blueprintData.architect}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-400">{locale === 'fa' ? 'مهندس محاسب:' : 'Structural Engineer:'}</span>
                      <span className="text-neutral-200">{project.blueprintData.structuralEngineer}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full py-3.5 rounded bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{locale === 'fa' ? 'درخواست مشاوره برای پروژه مشابه' : 'Inquire Similar Project'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
