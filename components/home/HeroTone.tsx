'use client';

import { useEffect } from 'react';

/**
 * The hero's sky is animated by CSS; the header only needs to know when the
 * stage has become dark enough to switch its own text colour. This flips the
 * stage's `data-tone` halfway through nightfall (the timing matches the
 * `hero-night` animation in globals.css). Reduced motion keeps the morning frame.
 */
export function HeroTone({ stageId }: { stageId: string }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = document.getElementById(stageId);
    if (!stage) return;
    // The header reads `data-tone` on scroll; nudge it so it follows the sky even when nobody scrolls
    const settle = () => window.dispatchEvent(new Event('scroll'));
    const timer = window.setTimeout(() => {
      stage.dataset.tone = 'dark';
      settle();
    }, 6700);
    return () => {
      window.clearTimeout(timer);
      stage.dataset.tone = 'light';
      settle();
    };
  }, [stageId]);
  return null;
}
