'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { localizeDigits, type Locale } from '@/lib/i18n';
import { Heading } from '@/components/ui/Heading';

gsap.registerPlugin(ScrollTrigger);

export interface ReelSlide {
  slug: string;
  code: string;
  title: string;
  place: string;
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: Locale;
  label: string;
  title: string;
  allLabel: string;
  slides: ReelSlide[];
}

/**
 * Projects slide sideways as you scroll down (desktop). The stage is held with
 * CSS `position: sticky` and only the track is translated — no GSAP pin, so no
 * injected wrapper. On touch and narrow screens it is a native swipe carousel.
 */
export function Reel({ locale, label, title, allLabel, slides }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reel = root.current;
    const tr = track.current;
    if (!reel || !tr) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const rtl = document.documentElement.dir === 'rtl';
      let travel = 0;
      const measure = () => {
        travel = Math.max(0, tr.scrollWidth - window.innerWidth);
        reel.style.height = `${window.innerHeight + travel}px`;
      };
      reel.setAttribute('data-on', '');
      measure();
      const trigger = ScrollTrigger.create({
        trigger: reel,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onRefresh: measure,
        onUpdate: (self) => {
          const x = self.progress * travel * (rtl ? 1 : -1);
          tr.style.transform = `translate3d(${x}px,0,0)`;
        },
      });
      return () => {
        trigger.kill();
        reel.removeAttribute('data-on');
        reel.style.height = '';
        tr.style.transform = '';
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="reel theme-dark" data-header-tone="dark">
      <section className="reel-stage py-section min-[900px]:py-0" aria-labelledby="work-title">
        <div className="container mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 min-[900px]:mb-[4svh]">
          <div>
            <p className="label">{label}</p>
            <Heading id="work-title" text={title} size="t-2" className="mt-4" />
          </div>
          <Link href={`/${locale}/projects`} className="btn-ghost">
            {allLabel}
            <span aria-hidden className="arrow">
              →
            </span>
          </Link>
        </div>

        <div ref={track} className="reel-track">
          {slides.map((p, i) => (
            <Link
              key={p.slug}
              href={`/${locale}/projects/${p.slug}`}
              className="group block w-[78vw] shrink-0 sm:w-[52vw] min-[900px]:w-[min(38svh,30vw)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface">
                <Image
                  src={p.image.src}
                  alt=""
                  fill
                  sizes="(min-width:900px) 34vw, 78vw"
                  className="photo object-cover transition-transform duration-[1.6s] ease-cine group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="num label">{localizeDigits(String(i + 1).padStart(2, '0'), locale)}</span>
                <span className="text-sm text-muted">{p.place}</span>
              </div>
              <h3 className="display t-3 mt-2">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
