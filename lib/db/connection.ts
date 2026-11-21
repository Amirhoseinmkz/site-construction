import 'server-only';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import type { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from './schema';
import { seedContent } from './seed';

const DB_DIR = process.env.DB_DIR || process.env.LEADS_DB_DIR || path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'mirkazemi.db');

/**
 * Bump this whenever the seed files in /data/seed change in a way that must reach existing databases.
 * On a mismatch the content tables (never `leads`) are dropped and re-seeded.
 */
const SEED_VERSION = 2;
const CONTENT_TABLES = [
  'faq_translations', 'faqs',
  'process_phase_translations', 'process_phases',
  'service_stage_translations', 'service_stages', 'service_translations', 'services',
  'project_translations', 'projects',
];

let db: DatabaseSync | null = null;

/** Opens (and on first use creates + seeds) the SQLite database. Requires Node >= 22.5. */
export function getDb(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  const { DatabaseSync: Sqlite } = createRequire(import.meta.url)('node:sqlite') as typeof import('node:sqlite');
  const conn = new Sqlite(DB_PATH);
  // Several build workers may open the file at once: wait for locks instead of failing
  conn.exec('PRAGMA busy_timeout = 10000; PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  const have = (conn.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
  if (have !== SEED_VERSION) {
    conn.exec('BEGIN IMMEDIATE');
    try {
      const now = (conn.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
      if (now !== SEED_VERSION) {
        for (const t of CONTENT_TABLES) conn.exec(`DROP TABLE IF EXISTS ${t}`);
        conn.exec(`PRAGMA user_version = ${SEED_VERSION}`);
      }
      conn.exec('COMMIT');
    } catch (err) {
      conn.exec('ROLLBACK');
      throw err;
    }
  }
  conn.exec(SCHEMA);
  seedContent(conn);
  db = conn;
  return db;
}
