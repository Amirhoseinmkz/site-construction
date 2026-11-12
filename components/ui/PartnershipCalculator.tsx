'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';

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
    <div className="grid overflow-hidden rounded-[1.75rem] border border-line bg-bg lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-11 p-7 md:p-12">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${id}-land`} className="text-muted">
              {t.land}
            </label>
            <output htmlFor={`${id}-land`} className="text-xl font-medium">
              {nf.format(land)} <span className="text-sm font-normal text-muted">{t.sqm}</span>
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
            className="range mt-6 w-full"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={`${id}-floors`} className="text-muted">
              {t.floors}
            </label>
            <output htmlFor={`${id}-floors`} className="text-xl font-medium">
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
            className="range mt-6 w-full"
          />
        </div>

        <fieldset>
          <legend className="text-muted">{t.zone}</legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {(Object.keys(t.zones) as Zone[]).map((z) => (
              <button key={z} type="button" aria-pressed={zone === z} onClick={() => setZone(z)} className="chip">
                {t.zones[z]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Result */}
      <div className="theme-dark flex flex-col justify-between gap-12 p-7 md:p-12" aria-live="polite">
        <dl className="space-y-9">
          <div>
            <dt className="text-sm text-muted">{t.gross}</dt>
            <dd className="display t-stat mt-3">
              {nf.format(gross)} <span className="font-sans text-base font-normal tracking-normal text-muted">{t.sqm}</span>
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-6 border-t border-line pt-7">
            <div>
              <dt className="text-sm text-muted">{t.units}</dt>
              <dd className="display t-h2 mt-2">{nf.format(units)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.share}</dt>
              <dd className="display t-h2 mt-2">
                {nf.format(lo)}
                {locale === 'fa' ? ' تا ' : '–'}
                {nf.format(hi)}
                <span className="[unicode-bidi:isolate]">{locale === 'fa' ? '٪' : '%'}</span>
              </dd>
            </div>
          </div>
        </dl>
        <div>
          <p className="text-sm text-muted">{t.disclaimer}</p>
          <Link href={`/${locale}/contact?subject=partnership`} className="btn-primary mt-7">
            {t.cta}
            <span aria-hidden className="arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
