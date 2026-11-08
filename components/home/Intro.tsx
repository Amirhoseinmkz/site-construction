'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Logo } from '@/components/layout/Logo';

/**
 * Short cinematic curtain (~1.6s), once per session.
 * Pure-CSS fallback hides it even if JS never runs; `intro-seen` (set before paint) skips it entirely.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      sessionStorage.setItem('mkz-intro', '1');
    } catch {}
    if (getComputedStyle(el).display === 'none') return;

    const tl = gsap.timeline({ delay: 1.15, onComplete: () => el.remove() });
    tl.to(el.querySelector('.intro-inner'), { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }).to(
      el,
      { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' },
      '-=0.15'
    );
    const skip = () => tl.progress(1);
    el.addEventListener('click', skip);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && skip();
    window.addEventListener('keydown', onKey);
    return () => {
      tl.kill();
      el.removeEventListener('click', skip);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="intro-overlay fixed inset-0 z-[80] grid cursor-pointer place-items-center bg-ink-950"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      <div className="intro-inner flex flex-col items-center gap-6 text-bone">
        <div className="intro-word scale-[1.6]">
          <Logo />
        </div>
        <span className="intro-rule mt-6 block h-px w-40 origin-center bg-ember" />
      </div>
      <button type="button" className="absolute bottom-8 text-xs tracking-widest text-bone-dim hover:text-bone">
        {skipLabel}
      </button>
    </div>
  );
}
