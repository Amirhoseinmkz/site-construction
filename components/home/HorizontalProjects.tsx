'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  locale: string;
  eyebrow: string;
  title: string;
  allLabel: string;
  slides: ProjectSlide[];
}

/** Pinned horizontal gallery on desktop; native swipe carousel on touch / reduced motion. */
export function HorizontalProjects({ locale, eyebrow, title, allLabel, slides }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rtl = document.documentElement.dir === 'rtl';
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const tween = gsap.to(tr, {
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
      // subtle inner parallax for each image while the track moves
      tr.querySelectorAll<HTMLElement>('[data-hparallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: rtl ? 6 : -6 },
          {
            xPercent: rtl ? -6 : 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: rtl ? 'right right' : 'left right',
              end: rtl ? 'left left' : 'right left',
              scrub: true,
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="featured-title" className="relative overflow-hidden bg-ink-950 py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="container mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="featured-title" className="mt-5 max-w-2xl text-display-md font-bold">
            {title}
          </h2>
        </div>
        <Link href={`/${locale}/projects`} className="btn-ghost">
          {allLabel}
          <span aria-hidden className="flip-x-rtl">→</span>
        </Link>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:gap-8 md:px-8 lg:snap-none lg:overflow-visible lg:px-[max(3rem,calc((100vw-1440px)/2+3rem))] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((p, i) => (
          <Link
            key={p.slug}
            href={`/${locale}/projects/${p.slug}`}
            className="group relative block w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[38vw] xl:w-[34vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-800 lg:aspect-[5/6]">
              <div data-hparallax className="absolute inset-[-8%]">
                <Image
                  src={p.image.src}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 38vw, 82vw"
                  className="object-cover transition-transform duration-[1.4s] ease-cine group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
              <span className="absolute start-5 top-5 font-brand text-xs tracking-[0.25em] text-bone/80" dir="ltr">
                {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <span className="absolute end-5 top-5 rounded-full border border-bone/25 px-3 py-1 text-xs text-bone/90 backdrop-blur-sm">
                {p.category}
              </span>
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-brand text-xs tracking-[0.25em] text-ember" dir="ltr">
                  {p.code}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-bone md:text-3xl">{p.title}</h3>
                <p className="mt-1 text-sm text-bone-muted">
                  {p.location} · {p.meta}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
