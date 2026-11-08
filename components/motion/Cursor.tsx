'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/** Subtle trailing ring cursor. Only on fine pointers with motion allowed; native cursor stays visible. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.style.opacity = '1';
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest('a, button, [role="slider"], input, select, textarea, label');
      el.dataset.active = interactive ? 'true' : 'false';
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 hidden h-10 w-10 rounded-full border border-ember/60 opacity-0 transition-[opacity,transform,background-color] duration-300 data-[active=true]:scale-150 data-[active=true]:bg-ember/10 md:block"
    />
  );
}
