'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { localizeDigits, type Locale } from '@/lib/i18n';
import { Heading } from '@/components/ui/Heading';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectSlide {
  slug: string;
  code: string;
  title: string;
  location: string;
  category: string;
  meta: string;
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: Locale;
  label: string;
  title: string;
  allLabel: string;
  slides: ProjectSlide[];
}

/** Pinned horizontal gallery on desktop; native swipe carousel on touch / reduced motion. */
export function HorizontalProjects({ locale, label, title, allLabel, slides }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const nn = (n: number) => localizeDigits(String(n).padStart(2, '0'), locale);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rtl = document.documentElement.dir === 'rtl';
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      gsap.to(tr, {
        x: () => (rtl ? distance() : -distance()),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-labelledby="work-title"
      className="theme-dark relative overflow-hidden py-section lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 lg:mb-[5vh]">
        <div>
          <p className="label">{label}</p>
          <Heading id="work-title" text={title} className="mt-6" />
        </div>
        <Link href={`/${locale}/projects`} className="btn-ghost">
          {allLabel}
          <span aria-hidden className="arrow">
            →
          </span>
        </Link>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(var(--gutter),calc((100vw-1520px)/2+var(--gutter)))] scroll-px-[var(--gutter)] pb-2 [scrollbar-width:none] md:gap-8 lg:w-max lg:snap-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((p, i) => (
          <Link
            key={p.slug}
            href={`/${locale}/projects/${p.slug}`}
            className="group block w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(40vh,30vw)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
              <Image
                src={p.image.src}
                alt=""
                fill
                sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 76vw"
                className="photo object-cover group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 text-sm text-muted">
              <span className="num">
                {nn(i + 1)} / {nn(slides.length)}
              </span>
              <span>{p.category}</span>
            </div>
            <h3 className="display t-h3 mt-3">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">
              {p.location} · {p.meta}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
