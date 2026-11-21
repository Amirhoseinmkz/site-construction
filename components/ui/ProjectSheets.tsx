'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface SheetProject {
  slug: string;
  code: string;
  category: string;
  categoryLabel: string;
  inProgress: boolean;
  statusLabel: string;
  title: string;
  place: string;
  facts: { label: string; value: string }[];
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: string;
  items: SheetProject[];
  filters: { key: string; label: string; count: string }[];
  filterLabel: string;
  emptyLabel: string;
}

const Corner = ({ className }: { className: string }) => (
  <span aria-hidden className={`pointer-events-none absolute h-3 w-3 border-fg/40 ${className}`} />
);

/**
 * Projects as drawing sheets: each is a framed plate with crop marks, the
 * photograph, and a small title block (type, area, structure) the way an
 * architect's sheet is annotated. Titles stay modest; the image leads.
 * Works with touch: nothing depends on hover.
 */
export function ProjectSheets({ locale, items, filters, filterLabel, emptyLabel }: Props) {
  const [active, setActive] = useState('all');
  const list = useMemo(() => (active === 'all' ? items : items.filter((p) => p.category === active)), [active, items]);

  return (
    <>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.key} type="button" aria-pressed={active === f.key} onClick={() => setActive(f.key)} className="chip">
            {f.label}
            <span className="num text-xs opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-muted">{emptyLabel}</p>
      ) : (
        <ul key={active} className="mt-10 grid gap-x-6 gap-y-10 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug} className="proj-in" style={{ animationDelay: `${i * 70}ms` }}>
              <Link
                href={`/${locale}/projects/${p.slug}`}
                className="group relative block rounded-[1.25rem] border border-line p-3 transition-colors duration-500 ease-cine hover:border-fg/50"
              >
                <Corner className="-start-px -top-px border-s border-t" />
                <Corner className="-end-px -top-px border-e border-t" />
                <Corner className="-bottom-px -start-px border-b border-s" />
                <Corner className="-bottom-px -end-px border-b border-e" />

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={p.image.src}
                    alt=""
                    fill
                    priority={i < 3}
                    sizes="(min-width:1280px) 30vw, (min-width:768px) 46vw, 92vw"
                    className="photo object-cover group-hover:scale-[1.05]"
                  />
                  {p.code && <span className="theme-dark num absolute start-3 top-3 rounded-full px-3 py-1 text-xs">{p.code}</span>}
                  {p.inProgress && <span className="theme-dark absolute end-3 top-3 rounded-full px-3 py-1 text-xs text-glow">{p.statusLabel}</span>}
                  <span
                    aria-hidden
                    className="absolute bottom-3 end-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-glow text-[#0a0e14] opacity-0 transition-[opacity,transform] duration-500 ease-cine group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    <span className="arrow">→</span>
                  </span>
                </div>

                <div className="px-2 pb-1 pt-5">
                  <h2 className="display t-3">{p.title}</h2>
                  <p className="mt-1.5 text-sm text-muted">{p.place}</p>
                </div>

                <dl className="mx-2 mt-5 flex border-t border-line pt-3 text-sm">
                  {p.facts.map((f, k) => (
                    <div key={f.label} className={`min-w-0 flex-1 ${k > 0 ? 'border-s border-line ps-3' : ''}`}>
                      <dt className="text-xs text-muted">{f.label}</dt>
                      <dd className="mt-0.5 truncate" title={f.value}>
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
