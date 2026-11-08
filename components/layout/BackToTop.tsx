'use client';

import { useLenis } from '@/components/motion/MotionProvider';

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0 });
        document.getElementById('main')?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-2 text-bone-muted transition-colors hover:text-ember"
    >
      {label}
      <span aria-hidden className="transition-transform duration-500 ease-cine group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
