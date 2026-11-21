'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { saveLead } from '@/lib/db/leads';

export type LeadState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'invalid' | 'rate' | 'server';
      fields?: Partial<Record<'fullName' | 'phone', true>>;
      /** echo of submitted values so the form can be restored (React resets forms after actions) */
      values?: Record<string, string>;
    };

const REQUEST_TYPES = ['consultation', 'management', 'partnership', 'renovation', 'trading', 'subcontractor'] as const;

const toLatinDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform((v) => toLatinDigits(v).replace(/[\s\-()]/g, ''))
    .pipe(z.string().regex(/^(\+?\d{8,15})$/)),
  requestType: z.enum(REQUEST_TYPES).catch('consultation'),
  area: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
  locale: z.enum(['fa', 'en']).catch('fa'),
  source: z.string().max(40).catch('site'),
});

// Simple in-memory rate limit: 5 submissions / 10 minutes / IP (per server instance)
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: bots fill hidden fields — pretend success
  if (formData.get('company')) return { status: 'success' };

  const raw = Object.fromEntries(
    ['fullName', 'phone', 'requestType', 'area', 'message', 'locale', 'source'].map((k) => {
      const v = formData.get(k);
      return [k, typeof v === 'string' && v.length ? v : undefined];
    })
  );
  const values = Object.fromEntries(
    Object.entries(raw).filter((e): e is [string, string] => typeof e[1] === 'string')
  );
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<'fullName' | 'phone', true>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === 'fullName' || key === 'phone') fields[key] = true;
    }
    return { status: 'error', code: 'invalid', fields, values };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local';
  if (rateLimited(ip)) return { status: 'error', code: 'rate', values };

  try {
    const id = saveLead(parsed.data);
    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      // Fire-and-forget notification (e.g. email relay / chat bot). Lead is already stored.
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...parsed.data, createdAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(5000),
      }).catch((err) => console.error('[lead] webhook failed', err));
    }
    return { status: 'success' };
  } catch (err) {
    console.error('[lead] save failed', err);
    return { status: 'error', code: 'server', values };
  }
}
