import { ChapterArt } from './ChapterArt';
import { Heading } from '@/components/ui/Heading';

interface Props {
  label: string;
  title: string;
  total: string;
  chapters: { index: string; title: string; text: string; points: string[] }[];
}

/**
 * Build progress (p) and nightfall (n) the drawing passes through while each
 * chapter's card scrolls by. The four ranges join end to end, so reading down
 * the page you watch one building go from survey to handover.
 */
const STAGES: { p: [number, number]; n?: [number, number]; ground: 'day' | 'dusk' | 'night' }[] = [
  { p: [0, 0.3], ground: 'day' },
  { p: [0.3, 0.52], ground: 'day' },
  { p: [0.52, 0.84], ground: 'dusk' },
  { p: [0.84, 1], n: [0, 1], ground: 'night' },
];

/** The four stages of a project, as ordinary sections: text on one side, its drawing on the other. */
export function Chapters({ label, title, total, chapters }: Props) {
  return (
    <section aria-labelledby="chapters-title" className="py-section">
      <div className="container">
        <p className="label" data-reveal>
          {label}
        </p>
        <Heading id="chapters-title" text={title} size="t-2" className="mt-5 max-w-[18ch]" />

        <ol className="mt-12 md:mt-20">
          {chapters.map((c, i) => {
            const stage = STAGES[i];
            const flip = i % 2 === 1;
            return (
              <li
                key={c.index}
                className="grid items-center gap-x-12 gap-y-10 border-t border-line py-[clamp(3rem,7vw,6.5rem)] lg:grid-cols-12"
              >
                <div className={`lg:col-span-5 ${flip ? 'lg:col-start-8' : ''}`}>
                  <p className="num label" data-reveal>
                    {c.index} / {total}
                  </p>
                  <h3 className="display t-2 mt-5" data-reveal>
                    {c.title}
                  </h3>
                  <p className="lead mt-6" data-reveal>
                    {c.text}
                  </p>
                  <ul className="mt-8 border-t border-line">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex gap-4 border-b border-line py-3.5" data-reveal>
                        <span aria-hidden className="mt-[0.85em] h-px w-5 shrink-0 bg-glow" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <ChapterArt
                  id={`chapter-${i + 1}`}
                  p={stage.p}
                  n={stage.n}
                  ground={stage.ground}
                  className={`lg:col-span-6 ${flip ? 'lg:order-first' : 'lg:col-start-7'}`}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
