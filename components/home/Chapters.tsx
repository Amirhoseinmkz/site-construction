import { ChapterArt, type Pin } from './ChapterArt';
import { Heading } from '@/components/ui/Heading';
import { plain, type Locale } from '@/lib/i18n';

interface Props {
  locale: Locale;
  label: string;
  title: string;
  stageWord: string;
  chapters: { title: string; text: string; points: string[] }[];
}

/**
 * Build progress (p) and nightfall (n) the drawing passes through while each
 * chapter's card scrolls by. The four ranges join end to end, so reading down
 * the page you watch one building go from survey to handover.
 */
const STAGES: { p: [number, number]; n?: [number, number]; ground: 'day' | 'dusk' | 'night' }[] = [
  { p: [0, 0.3], ground: 'day' },
  { p: [0.3, 0.52], ground: 'day' },
  { p: [0.52, 0.76], ground: 'dusk' },
  { p: [0.76, 1], n: [0, 1], ground: 'night' },
];

/**
 * Where each numbered point sits on the drawing (artwork coordinates) and when
 * it appears. Point 1 in the list is pin 1 on the drawing, and so on.
 *   stage 1  survey: plot corners, the dimension line, the height line
 *   stage 2  the blueprint grid
 *   stage 3  the frame going up, floor by floor
 *   stage 4  the finished, lit building
 */
const PINS: { x: number; y: number; a: number }[][] = [
  [{ x: 1000, y: 760, a: 0.1 }, { x: 1200, y: 838, a: 0.14 }, { x: 1502, y: 490, a: 0.18 }, { x: 1400, y: 760, a: 0.22 }],
  [{ x: 1000, y: 330, a: 0.32 }, { x: 1200, y: 220, a: 0.36 }, { x: 1400, y: 520, a: 0.4 }, { x: 1200, y: 760, a: 0.44 }],
  [{ x: 1000, y: 652, a: 0.54 }, { x: 1400, y: 490, a: 0.6 }, { x: 1100, y: 382, a: 0.66 }, { x: 1300, y: 274, a: 0.72 }],
  [{ x: 1000, y: 355, a: 0.78 }, { x: 1400, y: 463, a: 0.82 }, { x: 1200, y: 188, a: 0.86 }, { x: 1200, y: 730, a: 0.9 }],
];

/**
 * The four stages of a project, as ordinary sections. An overview strip first
 * shows the whole sequence; then each stage has its text on one side and its
 * drawing on the other, with numbered pins tying each point to a part of it.
 */
export function Chapters({ locale, label, title, stageWord, chapters }: Props) {
  return (
    <section aria-labelledby="chapters-title" className="py-section">
      <div className="container">
        <p className="label" data-reveal>
          {label}
        </p>
        <Heading id="chapters-title" text={title} size="t-2" className="mt-5 max-w-[18ch]" />

        {/* the whole journey at a glance */}
        <ol className="mt-12 grid gap-x-6 gap-y-8 border-t border-fg pt-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {chapters.map((c, i) => (
            <li key={c.title} className="relative">
              <a href={`#stage-${i + 1}`} className="group flex items-start gap-4">
                <span className="pin-badge !h-9 !w-9 !text-base transition-colors duration-500 group-hover:!bg-fg">{plain(i + 1, locale)}</span>
                <span>
                  <span className="block text-xs text-muted">
                    {stageWord} {plain(i + 1, locale)}
                  </span>
                  <span className="mt-0.5 block font-medium">{c.title}</span>
                </span>
              </a>
              {i < chapters.length - 1 && (
                <span aria-hidden className="absolute -end-3 top-[1.1rem] hidden h-px w-6 bg-fg/30 lg:block" />
              )}
            </li>
          ))}
        </ol>

        <ol className="mt-10 md:mt-16">
          {chapters.map((c, i) => {
            const stage = STAGES[i];
            const flip = i % 2 === 1;
            const pins: Pin[] = PINS[i].map((pin, k) => ({ ...pin, n: plain(k + 1, locale) }));
            return (
              <li
                key={c.title}
                id={`stage-${i + 1}`}
                className="chapter grid scroll-mt-24 items-center gap-x-12 gap-y-10 border-t border-line py-[clamp(3rem,7vw,6.5rem)] lg:grid-cols-12"
              >
                <div className={`lg:col-span-5 ${flip ? 'lg:col-start-8' : ''}`}>
                  <p className="display t-stat text-glow" data-reveal aria-hidden>
                    {plain(i + 1, locale)}
                  </p>
                  <h3 className="display t-2 mt-3" data-reveal>
                    <span className="sr-only">
                      {stageWord} {plain(i + 1, locale)}:{' '}
                    </span>
                    {c.title}
                  </h3>
                  <p className="lead mt-6" data-reveal>
                    {c.text}
                  </p>
                  <ol className="mt-8 border-t border-line">
                    {c.points.map((pt, k) => (
                      <li
                        key={pt}
                        tabIndex={0}
                        data-pin-item={k + 1}
                        className="flex cursor-default items-center gap-4 border-b border-line py-3.5 outline-none"
                        data-reveal
                      >
                        <span className="pin-badge" aria-hidden>
                          {plain(k + 1, locale)}
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className={`lg:col-span-6 ${flip ? 'lg:order-first' : 'lg:col-start-7'}`}>
                  <ChapterArt id={`chapter-${i + 1}`} p={stage.p} n={stage.n} ground={stage.ground} pins={pins} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
