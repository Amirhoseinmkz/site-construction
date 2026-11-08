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
      className="relative aspect-[16/10] touch-pan-y select-none overflow-hidden bg-ink-800"
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
      <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs text-bone">{beforeLabel}</span>
      <span className="absolute right-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs text-bone">{afterLabel}</span>
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
        className="absolute inset-y-0 w-10 -translate-x-1/2 cursor-ew-resize"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px bg-ember" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ember bg-ink-950/80 text-ember">
          ↔
        </span>
      </div>
    </div>
  );
}
