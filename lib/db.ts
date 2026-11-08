import 'server-only';
import path from 'node:path';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export interface LeadInput {
  fullName: string;
  phone: string;
  requestType: string;
  area?: string;
  message?: string;
  locale: string;
  source: string;
}

const DB_DIR = process.env.LEADS_DB_DIR || path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'mirkazemi.db');

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  db = new DatabaseSync(DB_PATH);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      request_type TEXT NOT NULL,
      area TEXT,
      message TEXT,
      locale TEXT,
      source TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
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
