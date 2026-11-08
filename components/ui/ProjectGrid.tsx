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
  filters: { key: string; label: string }[];
  filterLabel: string;
  emptyLabel: string;
}

/** Editorial asymmetric grid with an accessible category filter. */
export function ProjectGrid({ locale, items, filters, filterLabel, emptyLabel }: Props) {
  const [active, setActive] = useState('all');
  const list = useMemo(() => (active === 'all' ? items : items.filter((p) => p.category === active)), [active, items]);

  return (
    <>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f.key === 'all' ? items.length : items.filter((p) => p.category === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active === f.key}
              onClick={() => setActive(f.key)}
              className="rounded-full border border-bone/15 px-5 py-2 text-sm text-bone-muted transition-colors hover:border-bone/40 aria-pressed:border-ember aria-pressed:bg-ember aria-pressed:text-ink-950"
            >
              {f.label}
              <sup className="ms-1 text-[0.65rem] opacity-70">{count}</sup>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-bone-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {list.map((p, i) => (
            <li key={p.slug} className={`proj-in ${i % 2 === 1 ? 'md:mt-24' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>
              <Link href={`/${locale}/projects/${p.slug}`} className="group block">
                <div className={`relative overflow-hidden bg-ink-800 ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={p.image.src}
                    alt={p.title}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-cine group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-ink-950/20 transition-colors duration-700 group-hover:bg-transparent" />
                  <span
                    className={`absolute start-4 top-4 rounded-full px-3 py-1 text-xs backdrop-blur-sm ${
                      p.inProgress ? 'bg-ember/90 text-ink-950' : 'border border-bone/25 bg-ink-950/40 text-bone'
                    }`}
                  >
                    {p.statusLabel}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-brand text-xs tracking-[0.25em] text-ember" dir="ltr">
                      {p.code}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold transition-colors group-hover:text-ember-soft">{p.title}</h2>
                    <p className="mt-1 text-sm text-bone-muted">
                      {p.location} · {p.meta}
                    </p>
                  </div>
                  <span className="mt-6 shrink-0 text-sm text-bone-dim">{p.categoryLabel}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
