'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const ArchitecturalHeroCanvas = dynamic(() => import('@/components/3d/ArchitecturalHeroCanvas'), { ssr: false });

function canRun3D() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  // Phones get the poster: saves battery and keeps scrolling smooth
  if (matchMedia('(pointer: coarse)').matches && window.innerWidth < 900) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Loads the WebGL tower only on capable devices, after the page is idle. */
export function HeroVisual({ triggerId }: { triggerId: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!canRun3D()) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (n: number) => void;
    };
    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const id = w.requestIdleCallback(() => setEnabled(true), { timeout: 1500 });
      return () => w.cancelIdleCallback!(id);
    }
    const id = window.setTimeout(() => setEnabled(true), 600);
    return () => clearTimeout(id);
  }, []);

  if (!enabled) return null;
  return (
    <div className={`absolute inset-0 transition-opacity duration-[1500ms] ease-cine ${ready ? 'opacity-100' : 'opacity-0'}`}>
      <ArchitecturalHeroCanvas triggerId={triggerId} onReady={onReady} />
    </div>
  );
}
