'use client';

import { useActionState, useId } from 'react';
import { submitLead, type LeadState } from '@/app/actions/lead';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';

type RequestType = keyof Dictionary['form']['types'];

interface Props {
  locale: Locale;
  t: Dictionary['form'];
  source: string;
  types?: RequestType[];
  defaultType?: RequestType;
  showArea?: boolean;
}

const initial: LeadState = { status: 'idle' };
const labelClass = 'block text-sm text-muted';

export function LeadForm({
  locale,
  t,
  source,
  types = ['consultation', 'management', 'partnership', 'renovation', 'trading'],
  defaultType,
  showArea = true,
}: Props) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const id = useId();

  if (state.status === 'success') {
    return (
      <div role="status" className="enter border-t border-fg pt-8">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden className="draw h-12 w-12">
          <circle pathLength={1} cx={24} cy={24} r={22} />
          <path pathLength={1} d="M15 24.5l6.5 6.5L33.5 18" style={{ ['--i' as string]: 8 }} />
        </svg>
        <p className="statement statement-sm mt-6 max-w-md">{t.success}</p>
      </div>
    );
  }

  const err = state.status === 'error' ? state : null;
  const v = err?.values ?? {};
  const nameErr = !!err?.fields?.fullName;
  const phoneErr = !!err?.fields?.phone;
  const general = err && err.code === 'rate' ? t.errorRate : err && err.code === 'server' ? t.errorGeneric : null;

  return (
    <form key={JSON.stringify(v)} action={action} noValidate className="relative grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>
          {t.name} <span aria-hidden>*</span>
        </label>
        <input
          id={`${id}-name`}
          name="fullName"
          defaultValue={v.fullName}
          required
          autoComplete="name"
          aria-invalid={nameErr || undefined}
          aria-describedby={nameErr ? `${id}-name-err` : undefined}
          className="field aria-[invalid]:border-danger"
        />
        {nameErr && (
          <p id={`${id}-name-err`} className="mt-2 text-sm text-danger">
            {t.errorName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          {t.phone} <span aria-hidden>*</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          defaultValue={v.phone}
          type="tel"
          inputMode="tel"
          dir="ltr"
          required
          autoComplete="tel"
          placeholder={t.phoneHint}
          aria-invalid={phoneErr || undefined}
          aria-describedby={phoneErr ? `${id}-phone-err` : undefined}
          className="field text-left aria-[invalid]:border-danger rtl:text-right"
        />
        {phoneErr && (
          <p id={`${id}-phone-err`} className="mt-2 text-sm text-danger">
            {t.errorPhone}
          </p>
        )}
      </div>

      <div className={showArea ? '' : 'sm:col-span-2'}>
        <label htmlFor={`${id}-type`} className={labelClass}>
          {t.type}
        </label>
        <select id={`${id}-type`} name="requestType" defaultValue={v.requestType ?? defaultType ?? types[0]} className="field cursor-pointer">
          {types.map((k) => (
            <option key={k} value={k}>
              {t.types[k]}
            </option>
          ))}
        </select>
      </div>

      {showArea && (
        <div>
          <label htmlFor={`${id}-area`} className={labelClass}>
            {t.area}
          </label>
          <input id={`${id}-area`} name="area" defaultValue={v.area} inputMode="numeric" className="field" />
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-msg`} className={labelClass}>
          {t.message}
        </label>
        <textarea id={`${id}-msg`} name="message" defaultValue={v.message} rows={3} className="field resize-none" />
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-muted">{t.privacy}</p>
        <button type="submit" disabled={pending} className="btn-primary shrink-0 disabled:pointer-events-none disabled:opacity-60">
          {pending ? t.sending : t.submit}
          {!pending && (
            <span aria-hidden className="arrow">
              →
            </span>
          )}
        </button>
      </div>
      {general && (
        <p role="alert" className="text-sm text-danger sm:col-span-2">
          {general}
        </p>
      )}
    </form>
  );
}
