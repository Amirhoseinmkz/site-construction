'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { BlueprintGrid } from '@/components/ui/BlueprintGrid';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projectsData } from '@/data/projects';
import { Filter, MapPin, Layers } from 'lucide-react';

export default function ProjectsPage() {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.common.all },
    { id: 'residential', label: t.common.residential },
    { id: 'commercial', label: t.common.commercial },
    { id: 'renovation', label: t.common.renovation },
    { id: 'partnership', label: t.common.partnership },
  ];

  const regions = [
    { id: 'all', label: t.common.regions.all },
    { id: 'tehran', label: t.common.regions.tehran },
    { id: 'shemiranat', label: t.common.regions.shemiranat },
    { id: 'caspian', label: t.common.regions.caspian },
  ];

  const filteredProjects = projectsData.filter((project) => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || project.region === selectedRegion;
    return categoryMatch && regionMatch;
  });

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      <BlueprintGrid opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 mb-3 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-400" />
            {locale === 'fa' ? 'آرشیو جامع پروژه‌ها' : 'PROJECT ARCHIVE'}
          </div>
          <h1 className="text-fluid-h2 font-extrabold text-white">
            {locale === 'fa' ? 'پروژه‌های اجراشده و در دست احداث' : 'Landmark Projects & Architectural Portfolios'}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
            {locale === 'fa'
              ? 'مجموعه‌ای از پروژه‌های فاخر مسکونی، تجاری، ویلایی و مشارکت در ساخت گروه ساختمانی میرکاظمی با استانداردهای نوین بین‌المللی.'
              : 'A curated collection of palatial residences, modern commercial high-rises, cantilever villas, and joint-venture developments.'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#0d1014]/90 backdrop-blur-xl mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono me-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === 'fa' ? 'کاربری:' : 'Type:'}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Region Chips */}
          <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-s border-white/10 pt-3 md:pt-0 md:ps-4">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono me-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{locale === 'fa' ? 'منطقه:' : 'Region:'}</span>
            </div>
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-blueprint-light text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <p className="text-neutral-400 text-sm">
              {locale === 'fa' ? 'پروژه‌ای با فیلترهای انتخابی یافت نشد.' : 'No projects matched the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
