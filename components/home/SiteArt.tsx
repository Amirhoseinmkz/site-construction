import type { CSSProperties } from 'react';

/**
 * The building site, as plain SVG geometry. Used by the home hero and by the
 * four process chapters; it holds no state of its own.
 *
 * It responds to two CSS variables set on any ancestor:
 *  - `--p` (0 → 1) build progress: `.film-draw` strokes draw themselves between
 *    `--a` and `--a + --d`; the crane leaves at the end; the camera pushes in.
 *  - `--n` (0 → 1) nightfall: sun sets, moon and stars appear, windows light up
 *    one by one (each at its own `--t`).
 * Elements inside `.draw` groups draw in on load (pure CSS).
 * Both variables default (via @property) to the finished building in daylight,
 * so without JS or animation the drawing is complete.
 */

const GY = 760; // ground line
const COLS = [760, 860, 960, 1060, 1160]; // structural columns
const N = 10; // floors
const FH = 54; // floor height
const TOP = GY - N * FH; // 220
/** The building and its crane sit this far right, so the text column on the other side never touches the drawing */
const SHIFT = 240;

const v = (o: Record<string, number | string>) => o as CSSProperties;

function Ln({ x1, y1, x2, y2, a, d, o, w }: { x1: number; y1: number; x2: number; y2: number; a: number; d: number; o?: number; w?: number }) {
  return <line className="film-draw" pathLength={1} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={o} strokeWidth={w} style={v({ '--a': a, '--d': d })} />;
}
function Rc({ x, y, w, h, a, d, o, sw }: { x: number; y: number; w: number; h: number; a: number; d: number; o?: number; sw?: number }) {
  return <rect className="film-draw" pathLength={1} x={x} y={y} width={w} height={h} strokeOpacity={o} strokeWidth={sw} style={v({ '--a': a, '--d': d })} />;
}
/** Load-in stroke (CSS animation, staggered by `i`) */
const Li = ({ i, children }: { i: number; children: React.ReactNode }) => <g style={v({ '--i': i })}>{children}</g>;

const floors = Array.from({ length: N }, (_, k) => k + 1);
const bays = [0, 1, 2, 3];

// which windows are lit, in a scattered order
const LIT: { x: number; y: number; t: number; lit: number }[] = [];
for (const k of floors)
  for (const i of bays) {
    if ((k * 5 + i * 3) % 7 >= 4) continue;
    const order = (k * 13 + i * 7) % 40;
    LIT.push({ x: COLS[i] + 14, y: GY - k * FH + 12, t: 0.2 + order * 0.019, lit: 0.55 + ((k + i) % 4) * 0.12 });
  }

/** Stars stay inside the part of the sky the crops show, so none ever drifts behind the hero text */
const STARS: [number, number, number][] = [
  [760, 70, 1.6], [820, 160, 1.1], [900, 60, 1.3], [1000, 130, 1], [1100, 40, 1.5], [1180, 100, 1],
  [1260, 50, 1.2], [1420, 130, 1], [1480, 56, 1.4], [1560, 96, 1.1], [1520, 250, 1.3], [780, 300, 1],
];

export function SiteArt({ id, view = '0 0 1600 900', className = '' }: { id: string; view?: string; className?: string }) {
  return (
    <svg
      className={`site-art ${className}`}
      viewBox={view}
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-moon`}>
          <stop offset="0" stopColor="rgb(var(--glow))" stopOpacity="0.32" />
          <stop offset="1" stopColor="rgb(var(--glow))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g>
        {/* sun, then moon */}
        <g className="film-sun">
          <circle cx={1340} cy={104} r={32} strokeOpacity={0.55} />
          <circle cx={1340} cy={104} r={50} strokeOpacity={0.18} />
        </g>
        <g className="film-night" style={v({ '--t': 0.28 })}>
          <circle cx={1340} cy={104} r={88} fill={`url(#${id}-moon)`} stroke="none" />
          <circle cx={1340} cy={104} r={24} strokeOpacity={0.6} />
        </g>
        <g className="film-night film-stars" stroke="none" style={v({ '--t': 0.4 })}>
          {STARS.map(([cx, cy, r], n) => (
            <circle key={n} cx={cx} cy={cy} r={r} style={v({ '--d': `${(n % 5) * 0.9}s` })} />
          ))}
        </g>

        {/* far skyline — low rooftops only, so nothing sits under the text column */}
        <g className="film-far draw" strokeOpacity={0.4}>
          <Li i={4}>
            <rect pathLength={1} x={120} y={700} width={190} height={60} />
            <rect pathLength={1} x={340} y={722} width={130} height={38} />
            <rect pathLength={1} x={1530} y={650} width={140} height={110} />
          </Li>
        </g>

        <g className="film-dolly">
          {/* ground */}
          <g className="draw">
            <Li i={0}>
              <line pathLength={1} x1={-900} y1={GY} x2={2500} y2={GY} />
            </Li>
            <Li i={3}>
              <line pathLength={1} x1={-900} y1={GY + 34} x2={2500} y2={GY + 34} strokeOpacity={0.25} />
            </Li>
          </g>

          {/* site hoarding on the text side, a little closer than the building */}
          <g className="film-near draw">
            <Li i={5}>
              <line pathLength={1} x1={-300} y1={GY - 34} x2={430} y2={GY - 34} strokeOpacity={0.55} />
              {[-300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300, 360, 430].map((x) => (
                <line key={x} pathLength={1} x1={x} y1={GY - 34} x2={x} y2={GY} strokeOpacity={0.55} />
              ))}
            </Li>
          </g>

          {/* everything below belongs to the building: it is shifted away from the text */}
          <g transform={`translate(${SHIFT} 0)`}>
          <g className="film-near draw">
            <Li i={5}>
              <circle pathLength={1} cx={1390} cy={GY - 92} r={46} />
              <line pathLength={1} x1={1390} y1={GY - 46} x2={1390} y2={GY} />
              <circle pathLength={1} cx={1228} cy={GY - 58} r={26} strokeOpacity={0.8} />
              <line pathLength={1} x1={1228} y1={GY - 32} x2={1228} y2={GY} strokeOpacity={0.8} />
              <line pathLength={1} x1={560} y1={GY - 34} x2={700} y2={GY - 34} strokeOpacity={0.55} />
              <line pathLength={1} x1={560} y1={GY - 34} x2={560} y2={GY} strokeOpacity={0.55} />
              <line pathLength={1} x1={630} y1={GY - 34} x2={630} y2={GY} strokeOpacity={0.55} />
              <line pathLength={1} x1={700} y1={GY - 34} x2={700} y2={GY} strokeOpacity={0.55} />
              <circle pathLength={1} cx={500} cy={GY - 66} r={32} strokeOpacity={0.7} />
              <line pathLength={1} x1={500} y1={GY - 34} x2={500} y2={GY} strokeOpacity={0.7} />
            </Li>
          </g>

          {/* 1 · SURVEY — dimension lines frame the plot */}
          <Ln x1={760} y1={GY + 78} x2={1160} y2={GY + 78} a={0.1} d={0.07} o={0.7} />
          <Ln x1={760} y1={GY + 66} x2={760} y2={GY + 90} a={0.15} d={0.03} o={0.7} />
          <Ln x1={1160} y1={GY + 66} x2={1160} y2={GY + 90} a={0.16} d={0.03} o={0.7} />
          <Ln x1={1262} y1={GY} x2={1262} y2={TOP} a={0.13} d={0.12} o={0.7} />
          <Ln x1={1250} y1={GY} x2={1274} y2={GY} a={0.22} d={0.03} o={0.7} />
          <Ln x1={1250} y1={TOP} x2={1274} y2={TOP} a={0.24} d={0.03} o={0.7} />
          <Rc x={756} y={GY - 4} w={8} h={8} a={0.12} d={0.03} />
          <Rc x={1156} y={GY - 4} w={8} h={8} a={0.13} d={0.03} />

          {/* 2 · DESIGN — the blueprint: thin lines on the grid the building will follow */}
          <Rc x={760} y={TOP} w={400} h={N * FH} a={0.3} d={0.1} o={0.28} sw={1} />
          {floors.map((k) => (
            <Ln key={k} x1={740} y1={GY - k * FH} x2={1180} y2={GY - k * FH} a={0.31 + k * 0.01} d={0.05} o={0.22} w={1} />
          ))}
          {COLS.map((x, i) => (
            <Ln key={x} x1={x} y1={GY + 14} x2={x} y2={TOP - 28} a={0.33 + i * 0.012} d={0.1} o={0.22} w={1} />
          ))}

          {/* tower crane */}
          <g className="film-out" style={v({ '--a': 0.76, '--d': 0.08 })}>
            <Ln x1={632} y1={GY} x2={632} y2={118} a={0.4} d={0.12} />
            <Ln x1={650} y1={GY} x2={650} y2={118} a={0.41} d={0.12} />
            <path className="film-draw" pathLength={1} strokeOpacity={0.5} style={v({ '--a': 0.42, '--d': 0.14 })}
              d={`M632 ${GY}${Array.from({ length: 31 }, (_, n) => ` L${n % 2 ? 632 : 650} ${GY - (n + 1) * 20}`).join('')}`} />
            <Ln x1={520} y1={118} x2={1010} y2={118} a={0.45} d={0.1} />
            <Ln x1={540} y1={104} x2={1010} y2={104} a={0.46} d={0.1} o={0.6} />
            <path className="film-draw" pathLength={1} strokeOpacity={0.5} style={v({ '--a': 0.47, '--d': 0.1 })}
              d={`M540 118${Array.from({ length: 24 }, (_, n) => ` L${540 + (n + 1) * 20} ${n % 2 ? 118 : 104}`).join('')}`} />
            <Ln x1={641} y1={50} x2={540} y2={104} a={0.5} d={0.05} o={0.7} />
            <Ln x1={641} y1={50} x2={1010} y2={104} a={0.5} d={0.07} o={0.7} />
            <Ln x1={632} y1={118} x2={641} y2={50} a={0.48} d={0.04} />
            <Ln x1={650} y1={118} x2={641} y2={50} a={0.48} d={0.04} />
            <Rc x={520} y={118} w={44} h={30} a={0.5} d={0.05} />
            <Rc x={618} y={124} w={26} h={22} a={0.52} d={0.04} />
            {/* trolley, cable and the load that rises with the building */}
            <g className="film-fade" style={v({ '--a': 0.47, '--d': 0.04 })}>
            <g className="film-crane-load">
              <line x1={880} y1={118} x2={880} y2={742} strokeOpacity={0.7} style={{ transformBox: 'view-box', transformOrigin: '880px 118px', transform: 'scaleY(calc(1 - clamp(0, (var(--p, 0) - 0.5) / 0.24, 1) * 0.74))' }} />
              <g style={{ transform: 'translateY(calc(clamp(0, (var(--p, 0) - 0.5) / 0.24, 1) * -440px))' }}>
                <path d="M880 722 L862 742 M880 722 L898 742" strokeOpacity={0.8} />
                <rect x={852} y={742} width={56} height={14} />
              </g>
            </g>
            </g>
          </g>

          {/* 3 · CONSTRUCTION — the frame rises floor by floor, then the facade closes in */}
          {COLS.map((x, i) => (
            <Ln key={x} x1={x} y1={GY} x2={x} y2={TOP} a={0.5 + i * 0.008} d={0.16} w={2.4} />
          ))}
          {floors.map((k) => (
            <Ln key={k} x1={760} y1={GY - k * FH} x2={1160} y2={GY - k * FH} a={0.5 + (k - 1) * 0.016} d={0.045} w={2.4} />
          ))}
          {floors.map((k) =>
            bays.map((i) => (
              <Rc key={`${k}-${i}`} x={COLS[i] + 14} y={GY - k * FH + 12} w={72} h={30} a={0.62 + (k - 1) * 0.012} d={0.04} o={0.85} sw={1.4} />
            ))
          )}
          {[3, 5, 7, 9].map((k) => (
            <g key={k}>
              <Ln x1={1160} y1={GY - k * FH} x2={1204} y2={GY - k * FH} a={0.66 + k * 0.006} d={0.04} />
              <Ln x1={1204} y1={GY - k * FH} x2={1204} y2={GY - k * FH + 22} a={0.68 + k * 0.006} d={0.03} />
              <Ln x1={1160} y1={GY - k * FH + 22} x2={1204} y2={GY - k * FH + 22} a={0.69 + k * 0.006} d={0.03} o={0.7} />
            </g>
          ))}
          <Ln x1={744} y1={TOP - 12} x2={1176} y2={TOP - 12} a={0.72} d={0.05} w={2.4} />
          <Ln x1={960} y1={TOP - 12} x2={960} y2={TOP - 78} a={0.76} d={0.04} />
          <Rc x={920} y={TOP - 48} w={80} h={36} a={0.74} d={0.04} />

          {/* 4 · HANDOVER — the windows come on one by one */}
          <g className="film-lights" stroke="none">
            {LIT.map((w, n) => (
              <rect key={n} x={w.x} y={w.y} width={72} height={30} style={v({ '--t': w.t, '--lit': w.lit })} />
            ))}
          </g>
          <circle className="film-night" cx={960} cy={TOP - 84} r={5} fill="rgb(var(--glow))" stroke="none" style={v({ '--t': 0.85 })} />
          </g>
        </g>
      </g>
    </svg>
  );
}
