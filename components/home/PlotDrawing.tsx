/** Site plan vignette for the joint-venture teaser. Draws itself on scroll (`data-draw`). */
export function PlotDrawing({ className = '' }: { className?: string }) {
  const soft = { strokeOpacity: 0.4 };
  return (
    <svg viewBox="0 0 400 320" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden data-draw className={className}>
      {/* plot boundary and setback */}
      <rect pathLength={1} x={40} y={40} width={320} height={240} />
      <rect pathLength={1} x={64} y={64} width={272} height={192} {...soft} />
      {/* building footprint on its structural grid */}
      <rect pathLength={1} x={64} y={64} width={272} height={124} />
      {[132, 200, 268].map((x) => (
        <line key={x} pathLength={1} x1={x} y1={64} x2={x} y2={188} {...soft} />
      ))}
      <line pathLength={1} x1={64} y1={126} x2={336} y2={126} {...soft} />
      <rect pathLength={1} x={176} y={102} width={48} height={48} />
      <line pathLength={1} x1={176} y1={102} x2={224} y2={150} {...soft} />
      <line pathLength={1} x1={224} y1={102} x2={176} y2={150} {...soft} />
      {/* courtyard */}
      <circle pathLength={1} cx={112} cy={224} r={17} />
      <circle pathLength={1} cx={160} cy={232} r={11} {...soft} />
      <circle pathLength={1} cx={288} cy={224} r={17} />
      {/* dimensions */}
      <line pathLength={1} x1={40} y1={302} x2={360} y2={302} {...soft} />
      <line pathLength={1} x1={40} y1={295} x2={40} y2={309} />
      <line pathLength={1} x1={360} y1={295} x2={360} y2={309} />
      <line pathLength={1} x1={18} y1={40} x2={18} y2={280} {...soft} />
      <line pathLength={1} x1={11} y1={40} x2={25} y2={40} />
      <line pathLength={1} x1={11} y1={280} x2={25} y2={280} />
      {/* north point */}
      <circle pathLength={1} cx={378} cy={22} r={12} {...soft} />
      <path pathLength={1} d="M378 34V10M373 17l5-7 5 7" />
    </svg>
  );
}
