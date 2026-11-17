import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localizeDigits } from '@/lib/i18n';
import { Heading } from '@/components/ui/Heading';

export interface ShowcaseItem {
  slug: string;
  title: string;
  place: string;
  meta: string;
  summary: string;
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: Locale;
  label: string;
  title: string;
  allLabel: string;
  items: ShowcaseItem[];
}

/**
 * Selected work as an ordinary vertical section: two staggered columns whose
 * photographs drift at their own speed as you scroll (so the page feels like it
 * is moving), with nothing held or pinned.
 */
export function Showcase({ locale, label, title, allLabel, items }: Props) {
  const column = (parity: 0 | 1) => items.filter((_, i) => i % 2 === parity);
  const tile = (p: ShowcaseItem, n: number, tall: boolean) => (
    <Link key={p.slug} href={`/${locale}/projects/${p.slug}`} className="group block" data-reveal>
      <div className={`relative overflow-hidden rounded-[1.25rem] bg-surface ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <div data-parallax="9" className="absolute inset-[-6%]">
          <Image
            src={p.image.src}
            alt=""
            fill
            sizes="(min-width:768px) 44vw, 92vw"
            className="photo object-cover transition-transform duration-[1.6s] ease-cine group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="mt-5 flex items-baseline gap-4">
        <span className="num label">{localizeDigits(String(n).padStart(2, '0'), locale)}</span>
        <span className="text-sm text-muted">{p.meta}</span>
      </div>
      <h3 className="display t-3 mt-2">{p.title}</h3>
      <p className="mt-2 line-clamp-2 max-w-md text-sm text-muted">{p.summary}</p>
    </Link>
  );

  return (
    <section aria-labelledby="work-title" className="py-section">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className="label" data-reveal>
              {label}
            </p>
            <Heading id="work-title" text={title} size="t-2" className="mt-5" />
          </div>
          <Link href={`/${locale}/projects`} className="btn-ghost" data-reveal>
            {allLabel}
            <span aria-hidden className="arrow">
              →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2">
          <div className="space-y-14 md:space-y-24">{column(0).map((p, i) => tile(p, i * 2 + 1, i % 2 === 0))}</div>
          <div className="space-y-14 md:mt-[14vw] md:space-y-24">{column(1).map((p, i) => tile(p, i * 2 + 2, i % 2 === 1))}</div>
        </div>
      </div>
    </section>
  );
}
