'use client';

import { useActionState, useId } from 'react';
import { submitLead, type LeadState } from '@/app/actions/lead';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/data/translations';

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

export function LeadForm({
  locale,
  t,
  source,
  types = ['consultation', 'architecture', 'management', 'partnership', 'renovation'],
  defaultType,
  showArea = true,
}: Props) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const id = useId();

  if (state.status === 'success') {
    return (
      <div role="status" className="border-s-2 border-ember py-6 ps-6">
        <p className="text-2xl font-bold text-bone">✓</p>
        <p className="mt-3 text-lg text-bone">{t.success}</p>
      </div>
    );
  }

  const err = state.status === 'error' ? state : null;
  const v = err?.values ?? {};
  const nameErr = !!err?.fields?.fullName;
  const phoneErr = !!err?.fields?.phone;
  const general =
    err && err.code === 'rate' ? t.errorRate : err && err.code === 'server' ? t.errorGeneric : null;

  return (
    <form key={JSON.stringify(v)} action={action} noValidate className="grid gap-8 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={`${id}-name`} className="text-sm text-bone-muted">
          {t.name} <span className="text-ember">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="fullName"
          defaultValue={v.fullName}
          required
          autoComplete="name"
          aria-invalid={nameErr || undefined}
          aria-describedby={nameErr ? `${id}-name-err` : undefined}
          className="field"
        />
        {nameErr && (
          <p id={`${id}-name-err`} className="mt-2 text-sm text-red-300">
            {t.errorName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="text-sm text-bone-muted">
          {t.phone} <span className="text-ember">*</span>
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
          className="field text-start rtl:text-right"
        />
        {phoneErr && (
          <p id={`${id}-phone-err`} className="mt-2 text-sm text-red-300">
            {t.errorPhone}
          </p>
        )}
      </div>

      <div className={showArea ? '' : 'sm:col-span-2'}>
        <label htmlFor={`${id}-type`} className="text-sm text-bone-muted">
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
          <label htmlFor={`${id}-area`} className="text-sm text-bone-muted">
            {t.area}
          </label>
          <input id={`${id}-area`} name="area" defaultValue={v.area} inputMode="numeric" className="field" />
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-msg`} className="text-sm text-bone-muted">
          {t.message}
        </label>
        <textarea id={`${id}-msg`} name="message" defaultValue={v.message} rows={3} className="field resize-none" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-bone-dim">{t.privacy}</p>
        <button type="submit" disabled={pending} className="btn-primary shrink-0 disabled:opacity-60">
          {pending ? t.sending : t.submit}
          {!pending && (
            <span aria-hidden className="flip-x-rtl">
              →
            </span>
          )}
        </button>
      </div>
      {general && (
        <p role="alert" className="text-sm text-red-300 sm:col-span-2">
          {general}
        </p>
      )}
    </form>
  );
}
