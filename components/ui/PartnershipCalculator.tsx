'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/data/translations';

type Zone = 'prime' | 'city' | 'north' | 'other';

/** Indicative owner-share ranges commonly seen in the market (not an offer). */
const SHARE: Record<Zone, [number, number]> = {
  prime: [55, 65],
  city: [45, 55],
  north: [40, 50],
  other: [40, 50],
};

const COVERAGE = 0.6; // typical permitted ground coverage
const AVG_UNIT = 130; // m² average apartment size used for unit estimate

export function PartnershipCalculator({ locale, t }: { locale: Locale; t: Dictionary['calc'] }) {
  const id = useId();
  const [land, setLand] = useState(400);
  const [floors, setFloors] = useState(5);
  const [zone, setZone] = useState<Zone>('prime');

  const nf = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US');
  const gross = Math.round(land * COVERAGE * floors);
  const units = Math.max(1, Math.floor((gross * 0.82) / AVG_UNIT));
  const [lo, hi] = SHARE[zone];

  return (
    <div className="grid gap-12 border border-bone/10 bg-ink-900/60 p-6 md:p-10 lg:grid-cols-2">
      <div className="space-y-10">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor={`${id}-land`} className="text-bone-muted">
              {t.land}
            </label>
            <output htmlFor={`${id}-land`} className="text-2xl font-bold text-bone">
              {nf.format(land)} <span className="text-sm font-normal text-bone-dim">{t.sqm}</span>
            </output>
          </div>
          <input
            id={`${id}-land`}
            type="range"
            min={150}
            max={2000}
            step={25}
            value={land}
            onChange={(e) => setLand(Number(e.target.value))}
            className="range mt-4 w-full"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor={`${id}-floors`} className="text-bone-muted">
              {t.floors}
            </label>
            <output htmlFor={`${id}-floors`} className="text-2xl font-bold text-bone">
              {nf.format(floors)}
            </output>
          </div>
          <input
            id={`${id}-floors`}
            type="range"
            min={2}
            max={12}
            step={1}
            value={floors}
            onChange={(e) => setFloors(Number(e.target.value))}
            className="range mt-4 w-full"
          />
        </div>

        <fieldset>
          <legend className="text-bone-muted">{t.zone}</legend>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {(Object.keys(t.zones) as Zone[]).map((z) => (
              <button
                key={z}
                type="button"
                aria-pressed={zone === z}
                onClick={() => setZone(z)}
                className="rounded-full border border-bone/15 px-4 py-2.5 text-sm text-bone-muted transition-colors hover:border-bone/40 aria-pressed:border-ember aria-pressed:bg-ember/10 aria-pressed:text-bone"
              >
                {t.zones[z]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-10 border-t border-bone/10 pt-10 lg:border-s lg:border-t-0 lg:ps-12 lg:pt-0" aria-live="polite">
        <div className="space-y-8">
          <dl>
            <dt className="text-sm text-bone-muted">{t.gross}</dt>
            <dd className="mt-1 text-display-md font-bold text-bone">
              ~{nf.format(gross)} <span className="text-lg font-normal text-bone-dim">{t.sqm}</span>
            </dd>
          </dl>
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-bone-muted">{t.units}</dt>
              <dd className="mt-1 text-3xl font-bold text-bone">~{nf.format(units)}</dd>
            </div>
            <div>
              <dt className="text-sm text-bone-muted">{t.share}</dt>
              <dd className="mt-1 text-3xl font-bold text-ember">
                {nf.format(lo)}–{nf.format(hi)}
                {locale === 'fa' ? '٪' : '%'}
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="text-sm text-bone-dim">{t.disclaimer}</p>
          <Link href={`/${locale}/contact?subject=partnership`} className="btn-primary mt-6">
            {t.cta}
            <span aria-hidden className="flip-x-rtl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
