'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface GridProject {
  slug: string;
  code: string;
  category: string;
  categoryLabel: string;
  statusLabel: string;
  inProgress: boolean;
  title: string;
  location: string;
  meta: string;
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: string;
  items: GridProject[];
  filters: { key: string; label: string; count: string }[];
  filterLabel: string;
  emptyLabel: string;
}

/** Editorial two-column grid with an accessible category filter. */
export function ProjectGrid({ locale, items, filters, filterLabel, emptyLabel }: Props) {
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
        <ul key={active} className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20">
          {list.map((p, i) => (
            <li key={p.slug} className={`proj-in ${i % 2 === 1 ? 'md:mt-28' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>
              <Link href={`/${locale}/projects/${p.slug}`} className="group block">
                <div className={`relative overflow-hidden rounded-2xl bg-surface ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={p.image.src}
                    alt=""
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="photo object-cover group-hover:scale-[1.04]"
                  />
                  {p.inProgress && (
                    <span className="theme-dark absolute start-4 top-4 rounded-full px-3.5 py-1.5 text-xs">{p.statusLabel}</span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 text-sm text-muted">
                  <span className="num">{p.code}</span>
                  <span>{p.categoryLabel}</span>
                </div>
                <h2 className="display t-h3 mt-3">{p.title}</h2>
                <p className="mt-2 text-sm text-muted">
                  {p.location} · {p.meta}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
