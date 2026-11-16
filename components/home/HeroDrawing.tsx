import type { CSSProperties } from 'react';

type Shape =
  | { k: 'line'; d: [number, number, number, number]; i: number; soft: boolean }
  | { k: 'rect'; d: [number, number, number, number]; i: number; soft: boolean }
  | { k: 'circle'; d: [number, number, number]; i: number; soft: boolean }
  | { k: 'path'; d: string; i: number; soft: boolean };

const GROUND = 360;

/**
 * A street elevation, described as plain geometry: site hoarding and trees, a
 * neighbouring block, a finished residential building, and a steel frame going
 * up under a tower crane. `i` is the draw order (stagger), `soft` marks the
 * secondary linework.
 */
function elevation(): Shape[] {
  const s: Shape[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, i: number, soft = false) =>
    s.push({ k: 'line', d: [x1, y1, x2, y2], i, soft });
  const rect = (x: number, y: number, w: number, h: number, i: number, soft = false) =>
    s.push({ k: 'rect', d: [x, y, w, h], i, soft });
  const circle = (cx: number, cy: number, r: number, i: number, soft = false) =>
    s.push({ k: 'circle', d: [cx, cy, r], i, soft });
  const tree = (cx: number, cy: number, r: number, i: number) => {
    circle(cx, cy, r, i);
    line(cx, cy + r * 0.3, cx, GROUND, i);
    line(cx, cy + r * 0.75, cx - r * 0.42, cy + r * 0.22, i, true);
    line(cx, cy + r * 0.95, cx + r * 0.36, cy + r * 0.5, i, true);
  };

  // Site hoarding and trees
  line(0, 330, 380, 330, 1, true);
  for (let x = 20; x <= 380; x += 60) line(x, 330, x, GROUND, 1, true);
  tree(452, 292, 34, 3);
  tree(526, 320, 19, 4);

  // Neighbouring block (G+2)
  rect(590, 196, 210, 164, 5, true);
  line(582, 196, 808, 196, 5, true);
  for (const y of [248, 300]) line(590, y, 800, y, 6, true);
  for (const top of [196, 248]) for (const x of [612, 678, 744]) rect(x, top + 13, 34, 28, 7, true);
  rect(606, 316, 56, 30, 7, true);
  rect(681, 316, 28, 44, 7, true);
  rect(728, 316, 56, 30, 7, true);
  tree(830, 318, 19, 8);

  // Main building (G+5): core strip on the left, glazed bays and balconies on the right
  rect(860, 62, 300, 298, 9);
  line(924, 62, 924, GROUND, 10);
  rect(884, 84, 16, 196, 11);
  for (let y = 116; y <= 248; y += 44) line(884, y, 900, y, 11, true);
  rect(878, 308, 28, 52, 12);
  line(868, 300, 916, 300, 12);
  rect(944, 306, 96, 54, 12);
  for (let y = 315; y < GROUND; y += 9) line(944, y, 1040, y, 12, true);
  rect(1064, 304, 76, 56, 12);
  line(1102, 304, 1102, GROUND, 12, true);
  for (let k = 0; k < 5; k++) {
    const top = 72 + 44 * k;
    const slab = top + 44;
    const i = 17 - k;
    const edge = k % 2 === 0 ? 1182 : 1160; // every other balcony cantilevers
    line(924, slab, 1160, slab, i);
    rect(940, top + 10, 132, 34, i);
    for (const x of [973, 1006, 1039]) line(x, top + 10, x, slab, i, true);
    line(1086, top + 24, edge, top + 24, i);
    for (let x = 1100; x < edge - 6; x += 14) line(x, top + 24, x, slab, i, true);
    if (edge > 1160) {
      line(1160, slab, edge, slab, i);
      line(edge, top + 24, edge, slab, i);
    }
  }
  for (const x of [960, 1020, 1080, 1140]) line(x, 62, x, 42, 18);
  line(948, 42, 1152, 42, 18);
  line(948, 37, 1152, 37, 18, true);

  // Steel frame under construction
  for (const x of [1216, 1276, 1336]) line(x, GROUND, x, x === 1336 ? 136 : 106, 20);
  line(1396, GROUND, 1396, 192, 20);
  for (const y of [304, 248, 192]) line(1216, y, 1396, y, 21);
  line(1216, 136, 1336, 136, 22);
  line(1336, GROUND, 1396, 304, 22, true);
  line(1396, GROUND, 1336, 304, 22, true);

  // Tower crane
  line(1300, GROUND, 1300, 30, 23);
  line(1312, GROUND, 1312, 30, 23);
  let mast = `M1300 ${GROUND}`;
  for (let y = GROUND - 12, n = 0; y >= 36; y -= 12, n++) mast += ` L${n % 2 ? 1300 : 1312} ${y}`;
  s.push({ k: 'path', d: mast, i: 24, soft: true });
  line(1300, 30, 1306, 6, 25);
  line(1312, 30, 1306, 6, 25);
  line(1186, 30, 1300, 30, 26);
  line(1200, 22, 1300, 22, 26);
  let jib = 'M1200 30';
  for (let x = 1210, n = 0; x <= 1300; x += 10, n++) jib += ` L${x} ${n % 2 ? 30 : 22}`;
  s.push({ k: 'path', d: jib, i: 27, soft: true });
  line(1306, 6, 1204, 22, 27);
  line(1312, 30, 1386, 30, 26);
  line(1306, 6, 1380, 30, 27);
  rect(1362, 30, 20, 16, 27);
  rect(1312, 36, 14, 12, 27);

  return s;
}

/** The hook, slings and load hanging from the jib — drawn in their own group so they can sway. */
const LOAD: Shape[] = [
  { k: 'line', d: [1238, 30, 1238, 84], i: 28, soft: true },
  { k: 'line', d: [1238, 84, 1222, 93], i: 28, soft: false },
  { k: 'line', d: [1238, 84, 1254, 93], i: 28, soft: false },
  { k: 'rect', d: [1214, 93, 48, 9], i: 29, soft: false },
];

/** Lit windows: [x, y, w, h, brightness]. They switch on one by one after the drawing completes. */
function windows(): [number, number, number, number, number][] {
  const w: [number, number, number, number, number][] = [];
  // main building: the glazed bay on each floor is four panes
  const pattern = [[0, 1, 3], [1, 2], [0, 2, 3], [1], [0, 1, 2]];
  pattern.forEach((panes, k) => {
    const top = 72 + 44 * k;
    panes.forEach((p) => w.push([942 + 33 * p, top + 12, 29, 30, 0.55 + ((k + p) % 3) * 0.15]));
  });
  w.push([886, 118, 12, 40, 0.45], [1066, 306, 72, 52, 0.75]); // stairwell, lobby
  // neighbouring block and its shopfronts
  w.push([614, 211, 30, 24, 0.6], [746, 211, 30, 24, 0.5], [680, 263, 30, 24, 0.7], [608, 318, 52, 26, 0.45]);
  w.push([1314, 38, 10, 8, 0.9]); // crane cab
  return w;
}

const SHAPES = elevation();
const WINDOWS = windows();
// light the windows in a scattered, deterministic order
const ORDER = WINDOWS.map((_, n) => n).sort((a, b) => ((a * 7) % 11) - ((b * 7) % 11));
const STARS: [number, number, number][] = [
  [64, 40, 1.4], [168, 96, 1], [262, 28, 1.2], [356, 150, 1], [430, 62, 1.5], [520, 190, 1],
  [588, 34, 1], [812, 58, 1.3], [770, 150, 1], [1020, 16, 1], [1172, 90, 1.2], [1420, 120, 1],
];

/**
 * Hero line drawing, set at night. Pure SVG + CSS: every stroke is normalised
 * to length 1 and drawn in with a staggered `stroke-dashoffset` animation (see
 * `.draw`); then windows light up one by one, stars breathe and the crane load
 * sways. No JavaScript, and fully drawn and lit under reduced motion.
 * The ground line is the bottom edge of the box — give the parent a border.
 */
export function HeroDrawing({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMaxYMax slice"
      fill="none"
      stroke="currentColor"
      aria-hidden
      className={`draw block aspect-[5/3] w-full [stroke-width:2] md:aspect-[4/1] md:[stroke-width:1.2] rtl:-scale-x-100 ${className}`}
    >
      <g className="stars" stroke="none">
        {STARS.map(([cx, cy, r], n) => (
          <circle key={n} cx={cx} cy={cy} r={r} style={{ '--d': `${2 + (n % 5) * 0.9}s` } as CSSProperties} />
        ))}
      </g>
      <defs>
        <radialGradient id="moon-glow">
          <stop offset="0" stopColor="rgb(var(--glow))" stopOpacity="0.22" />
          <stop offset="1" stopColor="rgb(var(--glow))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={700} cy={96} r={70} fill="url(#moon-glow)" stroke="none" />
      <circle cx={700} cy={96} r={22} pathLength={1} strokeOpacity={0.5} style={{ '--i': 6 } as CSSProperties} />

      <g className="lights" stroke="none">
        {ORDER.map((n, k) => {
          const [x, y, w, h, lit] = WINDOWS[n];
          return <rect key={n} x={x} y={y} width={w} height={h} style={{ '--d': `${2.1 + k * 0.17}s`, '--lit': lit } as CSSProperties} />;
        })}
      </g>

      {SHAPES.map((sh, n) => (
        <Stroke key={n} sh={sh} />
      ))}
      <g className="crane-load">
        {LOAD.map((sh, n) => (
          <Stroke key={n} sh={sh} />
        ))}
      </g>
    </svg>
  );
}

function Stroke({ sh }: { sh: Shape }) {
  const common = {
    pathLength: 1,
    strokeOpacity: sh.soft ? 0.4 : undefined,
    style: { '--i': sh.i } as CSSProperties,
  };
  if (sh.k === 'line') return <line {...common} x1={sh.d[0]} y1={sh.d[1]} x2={sh.d[2]} y2={sh.d[3]} />;
  if (sh.k === 'rect') return <rect {...common} x={sh.d[0]} y={sh.d[1]} width={sh.d[2]} height={sh.d[3]} />;
  if (sh.k === 'circle') return <circle {...common} cx={sh.d[0]} cy={sh.d[1]} r={sh.d[2]} />;
  return <path {...common} d={sh.d} />;
}
