'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __mkzMotion?: boolean;
  }
}

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const fa = '۰۱۲۳۴۵۶۷۸۹';
function formatCount(n: number, persian: boolean) {
  const s = Math.round(n).toString();
  return persian ? s.replace(/[0-9]/g, (d) => fa[Number(d)]) : s;
}

/** Wires scroll-driven reveals declared with data-attributes in server components. */
function setupReveals(root: HTMLElement) {
  const persian = document.documentElement.lang === 'fa';

  // Fade / rise / clip reveals, batched so many elements share few triggers
  const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
  ScrollTrigger.batch(reveals, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
        overwrite: true,
        // Once in, drop the filter entirely. (clearProps would hand control back to the CSS
        // hidden state, `filter: blur()`, and leave the element permanently soft.)
        onComplete: () => {
          gsap.set(batch, { filter: 'none' });
        },
      }),
  });

  // Masked word/line reveals for headings
  gsap.utils.toArray<HTMLElement>('[data-split]', root).forEach((el) => {
    const parts = el.querySelectorAll<HTMLElement>('.split-line > span');
    gsap.to(parts, {
      y: 0,
      duration: 1.15,
      ease: 'expo.out',
      stagger: 0.055,
      delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Count-up numbers (server renders the final value for no-JS / SEO)
  gsap.utils.toArray<HTMLElement>('[data-count]', root).forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = formatCount(0, persian);
    gsap.to(obj, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = formatCount(obj.v, persian);
      },
    });
  });

  // Slow parallax drift
  gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el) => {
    const amount = Number(el.dataset.parallax || 12);
    gsap.fromTo(
      el,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  // Image settle (scale down while entering)
  gsap.utils.toArray<HTMLElement>('[data-zoom]', root).forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.18 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom 40%', scrub: true },
      }
    );
  });

  // Manifesto text: words light up one by one as the block crosses the viewport
  gsap.utils.toArray<HTMLElement>('[data-scrub-words]', root).forEach((el) => {
    gsap.to(el.children, {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: true },
    });
  });

  // Cinematic exit: hero layers drift at different speeds and fade as the hero scrolls away
  gsap.utils.toArray<HTMLElement>('[data-drift]', root).forEach((el) => {
    const fade = el.dataset.driftFade;
    gsap.to(el, {
      yPercent: Number(el.dataset.drift || 0),
      ...(fade ? { opacity: Number(fade) } : {}),
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Line drawings that draw themselves when scrolled into view
  gsap.utils.toArray<SVGElement>('[data-draw]', root).forEach((el) => {
    gsap.to(el.querySelectorAll('path, line, rect, circle'), {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      stagger: 0.035,
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
  });

  // Scroll progress bars bound to a section (data-progress="vertical|horizontal")
  gsap.utils.toArray<HTMLElement>('[data-progress]', root).forEach((el) => {
    const section = el.closest<HTMLElement>('[data-progress-root]') || el.parentElement!;
    const vertical = el.dataset.progress === 'vertical';
    gsap.fromTo(
      el,
      vertical ? { scaleY: 0 } : { scaleX: 0 },
      {
        ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom 60%', scrub: true },
      }
    );
  });
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const first = useRef(true);

  // Lenis smooth scroll driven by the single GSAP ticker
  useEffect(() => {
    window.__mkzMotion = true;
    const reduced = prefersReducedMotion();
    if (reduced) {
      document.documentElement.classList.remove('js-motion');
      return;
    }
    document.documentElement.classList.add('js-motion');

    const instance = new Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: false });
    const onTick = (time: number) => instance.raf(time * 1000);
    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(500, 33);
    lenisRef.current = instance;
    setLenis(instance);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // (Re)build reveals for every page
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const main = document.getElementById('main');
    if (!main) return;

    if (!first.current && !window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    }
    first.current = false;

    // Reveals live in <main> and in the footer, so the whole body is the scope
    const ctx = gsap.context(() => setupReveals(document.body), document.body);
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    // Accordions change the page height: re-measure once they have finished opening
    let timer = 0;
    const onToggle = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(refresh, 650);
    };
    main.addEventListener('toggle', onToggle, true);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      main.removeEventListener('toggle', onToggle, true);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
