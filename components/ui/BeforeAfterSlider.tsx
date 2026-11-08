'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  className = '',
}) => {
  const { locale } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultBefore = beforeLabel || (locale === 'fa' ? 'وضعیت اولیه / اسکلت' : 'Existing / Framing');
  const defaultAfter = afterLabel || (locale === 'fa' ? 'اجرای نهایی لوکس' : 'Final Luxury Execution');

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/15 bg-neutral-900 shadow-2xl ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={defaultAfter}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
        <div className="absolute bottom-4 end-4 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{defaultAfter}</span>
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}>
          <Image
            src={beforeImage}
            alt={defaultBefore}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
        <div className="absolute bottom-4 start-4 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/20 text-neutral-300 font-mono text-xs shadow-lg">
          <span>{defaultBefore}</span>
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(221,161,59,0.8)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-500 text-black border-2 border-white flex items-center justify-center shadow-xl">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
