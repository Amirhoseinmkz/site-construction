import 'server-only';
import { getDb } from './connection';

export interface LeadInput {
  fullName: string;
  phone: string;
  requestType: string;
  area?: string;
  message?: string;
  locale: string;
  source: string;
}

export function saveLead(lead: LeadInput): string {
  const id = `lead_${Date.now().toString(36)}_${crypto.randomUUID().slice(0, 8)}`;
  getDb()
    .prepare(
      `INSERT INTO leads (id, full_name, phone, request_type, area, message, locale, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(id, lead.fullName, lead.phone, lead.requestType, lead.area ?? null, lead.message ?? null, lead.locale, lead.source);
  return id;
}
