'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  label: string;
}

/** Accessible before/after comparison: pointer drag + keyboard (arrows / Home / End). */
export function BeforeAfterSlider({ before, after, beforeLabel, afterLabel, label }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const fromPointer = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      dir="ltr"
      className="relative aspect-[16/10] touch-pan-y select-none overflow-hidden rounded-2xl bg-surface"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after} alt={afterLabel} fill sizes="(min-width:1024px) 80vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeLabel} fill sizes="(min-width:1024px) 80vw, 100vw" className="object-cover" />
      </div>
      <span className="theme-dark absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-xs">{beforeLabel}</span>
      <span className="theme-dark absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-xs">{afterLabel}</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 10 : 2;
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPos((p) => Math.max(0, p - step));
          else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPos((p) => Math.min(100, p + step));
          else if (e.key === 'Home') setPos(0);
          else if (e.key === 'End') setPos(100);
          else return;
          e.preventDefault();
        }}
        className="absolute inset-y-0 w-11 -translate-x-1/2 cursor-ew-resize focus-visible:outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px bg-white" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0a0e14] shadow-lg shadow-black/20">
          ↔
        </span>
      </div>
    </div>
  );
}
