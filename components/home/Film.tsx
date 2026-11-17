'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/motion/SplitText';
import { FilmArt } from './FilmArt';

gsap.registerPlugin(ScrollTrigger);

export interface FilmProps {
  label: string;
  title: [string, string];
  lead: string;
  scroll: string;
  /** The four process phases, as the film's chapters */
  chapters: { index: string; title: string; text: string; points: string[] }[];
  /** The chapter count as text, localised ("04" / "۰۴") */
  total: string;
  finaleTitle: string;
  finaleLead: string;
  cta: string;
  ctaHref: string;
}

const DAY = { bg: [234, 230, 220], fg: [12, 17, 24], muted: [86, 93, 103] };
const NIGHT = { bg: [10, 14, 20], fg: [237, 233, 224], muted: [152, 160, 170] };
/** Between day and night the sky passes through a dusky violet, not through grey. */
const DUSK = [72, 64, 84];
const mix = (a: number[], b: number[], t: number) => a.map((n, i) => Math.round(n + (b[i] - n) * t)).join(' ');
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
/** Chapter boundaries in scroll progress: hero · four phases · finale */
const CUTS = [0.1, 0.3, 0.5, 0.76, 0.92];
const chapterAt = (p: number) => CUTS.filter((c) => p >= c).length;

/**
 * The home page's film: a building site that is surveyed, drawn, built and
 * handed over as you scroll, while the light goes from morning to night.
 *
 * The stage is held with CSS `position: sticky` and the scene is driven by
 * writing CSS variables (see globals.css, "THE FILM"), never by a GSAP pin, so
 * no wrapper is injected into DOM that React owns. Without JS or with reduced
 * motion it stays a still "morning" frame with the headline.
 */
export function Film({ label, title, lead, scroll, chapters, total, finaleTitle, finaleLead, cta, ctaHref }: FilmProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const film = root.current;
    const stage = film?.querySelector<HTMLElement>('.film-stage');
    if (!film || !stage) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      film.setAttribute('data-on', '');
      const apply = (p: number) => {
        const e = smooth(0.6, 0.9, p);
        const ink = smooth(0.28, 0.48, e); // text turns light early, once the sky is dark enough
        const s = stage.style;
        s.setProperty('--p', p.toFixed(4));
        s.setProperty('--bg', e < 0.5 ? mix(DAY.bg, DUSK, e / 0.5) : mix(DUSK, NIGHT.bg, (e - 0.5) / 0.5));
        s.setProperty('--fg', mix(DAY.fg, NIGHT.fg, ink));
        s.setProperty('--muted', mix(DAY.muted, NIGHT.muted, ink));
        stage.dataset.tone = ink > 0.5 ? 'dark' : 'light';
        stage.dataset.ch = String(chapterAt(p));
      };
      const trigger = ScrollTrigger.create({
        trigger: film,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      return () => {
        trigger.kill();
        film.removeAttribute('data-on');
        for (const k of ['--p', '--bg', '--fg', '--muted']) stage.style.removeProperty(k);
        stage.dataset.tone = 'light';
        stage.dataset.ch = '0';
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="film">
      <section
        className="film-stage"
        aria-labelledby="hero-title"
        data-header-tone="light"
        data-tone="light"
        data-ch="0"
      >
        {/* the warm horizon: faint at dawn, strong once the lights are on */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-[radial-gradient(60%_70%_at_62%_100%,rgb(var(--glow)/0.28),transparent_72%)]"
          style={{ opacity: 'clamp(0.35, calc(0.35 + var(--p, 0) * 1.1), 1)' }}
        />
        <FilmArt />

        <div className="container pointer-events-none relative h-full">
          {/* chapter 0 — the headline */}
          <div className="film-hero absolute inset-x-[var(--gutter)] top-[calc(var(--header-h)+clamp(1rem,4svh,3rem))]">
            <p className="label enter">{label}</p>
            <SplitText
              as="h1"
              id="hero-title"
              css
              delay={0.1}
              className="display t-mega mt-5"
              lines={[
                title[0],
                <span key="a" className="accent">
                  {title[1]}
                </span>,
              ]}
            />
            <p className="lead enter mt-7 max-w-[26rem]" style={{ animationDelay: '0.5s' }}>
              {lead}
            </p>
          </div>
          <div className="film-hero film-ui absolute bottom-7 start-[var(--gutter)] hidden md:block" style={{ animationDelay: '1.6s' }}>
            <p className="scroll-cue label enter gap-4 [animation-delay:1.6s]">
              <span className="block h-9 w-px bg-current" />
              {scroll}
            </p>
          </div>

          {/* chapters 1–4 — one short line each, taken from the process; they take the headline's place */}
          {chapters.map((c, i) => (
            <div
              key={c.index}
              data-i={i + 1}
              className="film-cap absolute inset-x-[var(--gutter)] top-[calc(var(--header-h)+clamp(1rem,4svh,3rem))]"
            >
              <div className="max-w-[86vw] md:max-w-[min(42vw,34rem)]">
                <p className="num label">
                  {c.index} / {total}
                </p>
                <p className="display t-2 mt-4">{c.title}</p>
                <p className="lead mt-5 max-w-[30rem] !text-[0.98rem] md:!text-[1.08rem]">{c.text}</p>
                <ul className="mt-6 hidden space-y-2.5 text-[0.95rem] md:block">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex gap-4">
                      <span aria-hidden className="mt-[0.85em] h-px w-6 shrink-0 bg-glow" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* the finale — handover, and the way in */}
          <div className="film-finale pointer-events-auto absolute inset-x-[var(--gutter)] top-[calc(var(--header-h)+clamp(1rem,4svh,3rem))]">
            <p className="display t-1 max-w-[86vw] md:max-w-[40vw]">{finaleTitle}</p>
            <p className="lead mt-6 max-w-[26rem]">{finaleLead}</p>
            <Link href={ctaHref} className="btn-glow mt-8">
              {cta}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>

          {/* where we are in the film */}
          <ul aria-hidden className="film-ui absolute end-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i} data-i={i} className="film-dot" />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
