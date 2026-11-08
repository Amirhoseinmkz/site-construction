'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectItem } from '@/data/projects';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight, MapPin, Maximize2, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const { locale, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl border border-white/10 bg-[#0d1014]/90 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, border-color 0.3s ease',
      }}
    >
      {/* Top Image Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
        <Image
          src={project.heroImage}
          alt={project.title[locale]}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Blueprint gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1014] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Status Tag */}
        <div className="absolute top-3.5 end-3.5 z-10">
          <span
            className={`px-3 py-1 rounded-sm text-[11px] font-mono font-bold tracking-wider uppercase border shadow-lg backdrop-blur-md ${
              project.status === 'completed'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-blueprint/40 text-sky-300 border-blueprint-light/50'
            }`}
          >
            {project.status === 'completed' ? t.common.completed : t.common.inProgress}
          </span>
        </div>

        {/* DWG Spec Tag */}
        <div className="absolute top-3.5 start-3.5 z-10">
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-black/70 border border-white/10 text-neutral-300 backdrop-blur-md tracking-wider">
            {project.dwgNo}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-grow gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location[locale]}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
            {project.title[locale]}
          </h3>

          <p className="text-neutral-400 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
            {project.subtitle[locale]}
          </p>
        </div>

        {/* Architectural Specs Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 font-mono">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>{project.area}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <Layers className="w-3.5 h-3.5 text-neutral-500" />
            <span>{project.floors} {locale === 'fa' ? 'طبقه' : 'Floors'}</span>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-amber-400 font-semibold group/btn hover:text-amber-300 transition-colors"
          >
            <span className="text-xs">{locale === 'fa' ? 'جزئیات' : 'Details'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
