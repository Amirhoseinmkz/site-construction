'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

export interface IndexProject {
  slug: string;
  num: string;
  category: string;
  categoryLabel: string;
  inProgress: boolean;
  statusLabel: string;
  title: string;
  meta: string;
  image: { src: string; width: number; height: number };
}

interface Props {
  locale: string;
  items: IndexProject[];
  filters: { key: string; label: string; count: string }[];
  filterLabel: string;
  emptyLabel: string;
}

/**
 * Projects as a typographic index: very large titles, and the image follows the
 * pointer on hover. On touch there is no hover, so every row carries a thumbnail.
 */
export function ProjectIndex({ locale, items, filters, filterLabel, emptyLabel }: Props) {
  const [active, setActive] = useState('all');
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const list = useMemo(() => (active === 'all' ? items : items.filter((p) => p.category === active)), [active, items]);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !preview.current) return;
    preview.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <div onPointerMove={move} onPointerLeave={() => setHover(null)}>
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
        <ul key={active} className="mt-10 border-t border-fg md:mt-14">
          {list.map((p, i) => (
            <li key={p.slug} className="proj-in border-b border-line" style={{ animationDelay: `${i * 60}ms` }}>
              <Link
                href={`/${locale}/projects/${p.slug}`}
                onPointerEnter={() => setHover(p.slug)}
                onFocus={() => setHover(p.slug)}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-6 md:grid-cols-[5rem_1fr_auto] md:gap-x-10 md:py-9"
              >
                <span className="relative row-span-2 h-20 w-16 overflow-hidden rounded-lg md:hidden">
                  <Image src={p.image.src} alt="" fill sizes="64px" className="photo-live object-cover" />
                </span>
                <span className="num hidden self-start pt-3 text-sm text-muted md:block">{p.num}</span>
                <span className="display t-1 transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                  {p.title}
                </span>
                <span className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted md:col-start-3 md:flex-col md:items-end md:gap-1">
                  <span>{p.categoryLabel}</span>
                  <span>{p.meta}</span>
                  {p.inProgress && <span className="text-glow">{p.statusLabel}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* hover preview that trails the pointer (desktop only) */}
      <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <div
          className="relative ml-10 -mt-[7rem] h-56 w-[22rem] overflow-hidden rounded-2xl transition-[opacity,scale] duration-500 ease-cine"
          style={{ opacity: hover ? 1 : 0, scale: hover ? '1' : '0.85' }}
        >
          {list.map((p) => (
            <Image
              key={p.slug}
              src={p.image.src}
              alt=""
              fill
              sizes="352px"
              className="object-cover transition-opacity duration-500"
              style={{ opacity: hover === p.slug ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
