'use client';

import React from 'react';

interface BlueprintGridProps {
  opacity?: number;
  showCoordinates?: boolean;
  className?: string;
}

export const BlueprintGrid: React.FC<BlueprintGridProps> = ({
  opacity = 0.35,
  showCoordinates = true,
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
      style={{ opacity }}
    >
      {/* Dynamic fine blueprint grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(221, 161, 59, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(221, 161, 59, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Major structural grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 110, 147, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 110, 147, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '240px 240px',
        }}
      />

      {/* Radial soft lighting halo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(221,161,59,0.04) 0%, transparent 70%)',
        }}
      />

      {showCoordinates && (
        <>
          {/* Architectural Drafting Corner Marks */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-amber-500/40 tracking-widest uppercase">
            SEC.A // GRID 01:01 // N 35°48&apos;42&quot; E 51°24&apos;18&quot;
          </div>
          <div className="absolute top-6 right-6 font-mono text-[10px] text-blueprint-light/40 tracking-widest uppercase">
            ELEV: +1680.00M // REV: 2026.08
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-white/20 tracking-widest uppercase">
            MKZ ARCHITECTURAL SUITE v4.2
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-amber-500/40 tracking-widest uppercase">
            SCALE: 1:1 DYNAMIC
          </div>

          {/* Crosshair marks */}
          <div className="absolute top-1/4 left-12 w-3 h-3 border-l border-t border-amber-500/30" />
          <div className="absolute top-1/4 right-12 w-3 h-3 border-r border-t border-amber-500/30" />
          <div className="absolute bottom-1/4 left-12 w-3 h-3 border-l border-b border-amber-500/30" />
          <div className="absolute bottom-1/4 right-12 w-3 h-3 border-r border-b border-amber-500/30" />
        </>
      )}
    </div>
  );
};
