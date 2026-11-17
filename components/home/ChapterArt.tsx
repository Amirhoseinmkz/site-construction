'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteArt } from './SiteArt';

gsap.registerPlugin(ScrollTrigger);

export interface Pin {
  /** The label shown in the pin (already localised) */
  n: string;
  /** Position in the artwork's own coordinates */
  x: number;
  y: number;
  /** Build progress at which the part it marks appears */
  a: number;
}

interface Props {
  id: string;
  /** Numbered pins on the drawing; each matches the same number in the text beside it */
  pins?: Pin[];
  /** Build progress shown when the card enters (from) and when it has crossed the screen (to) */
  p: [number, number];
  /** Nightfall at the same two moments */
  n?: [number, number];
  /** Card ground: day (cream), dusk or night */
  ground: 'day' | 'dusk' | 'night';
  className?: string;
}

const GROUND = {
  day: 'theme-light',
  dusk: 'theme-dark [--bg:62_56_78]',
  night: 'theme-dark',
} as const;

/** The part of the artwork a chapter card shows: the plot, the crane and the building. */
const VIEW = '700 20 900 890';

/**
 * One chapter's illustration. It is rendered finished (its `p`/`n` end values
 * are the inline defaults, so with no JS or with reduced motion you see the
 * completed stage), and — where motion is allowed — builds up as the card
 * scrolls through the screen. It never holds or pins the scroll.
 */
export function ChapterArt({ id, p, n = [0, 0], ground, pins = [], className = '' }: Props) {
  const card = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = card.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const apply = (t: number) => {
        el.style.setProperty('--p', String(p[0] + (p[1] - p[0]) * t));
        el.style.setProperty('--n', String(n[0] + (n[1] - n[0]) * t));
      };
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        end: 'bottom 42%',
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      apply(trigger.progress);
      return () => {
        trigger.kill();
        el.style.setProperty('--p', String(p[1]));
        el.style.setProperty('--n', String(n[1]));
      };
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={card}
      className={`${GROUND[ground]} relative aspect-square overflow-hidden rounded-[1.75rem] border border-line bg-bg sm:aspect-[5/4] ${className}`}
      style={{ ['--p' as string]: p[1], ['--n' as string]: n[1] }}
      data-reveal
    >
      <SiteArt id={id} view={VIEW} fill className="absolute inset-0" />
      {/* Same viewBox and alignment as the drawing, so a pin sits exactly on the part it marks */}
      <svg className="site-art pointer-events-none absolute inset-0" style={{ height: '100%' }} viewBox={VIEW} preserveAspectRatio="xMidYMax meet" aria-hidden>
        <g className="film-dolly">
          {pins.map((pin) => (
            <g key={pin.n} data-pin={pin.n} className="chapter-pin film-fade" style={{ ['--a' as string]: pin.a, ['--d' as string]: 0.04 }}>
              <circle cx={pin.x} cy={pin.y} r={21} fill="rgb(var(--glow))" stroke="rgb(var(--bg))" strokeWidth={4} />
              <text x={pin.x} y={pin.y} textAnchor="middle" dominantBaseline="central" fontSize={25} fontWeight={600} fill="#0a0e14" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                {pin.n}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
