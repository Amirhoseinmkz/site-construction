import 'server-only';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import type { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from './schema';
import { seedContent } from './seed';

const DB_DIR = process.env.DB_DIR || process.env.LEADS_DB_DIR || path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'mirkazemi.db');

let db: DatabaseSync | null = null;

/** Opens (and on first use creates + seeds) the SQLite database. Requires Node >= 22.5. */
export function getDb(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  const { DatabaseSync: Sqlite } = createRequire(import.meta.url)('node:sqlite') as typeof import('node:sqlite');
  const conn = new Sqlite(DB_PATH);
  // Several build workers may open the file at once: wait for locks instead of failing
  conn.exec('PRAGMA busy_timeout = 10000; PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  conn.exec(SCHEMA);
  seedContent(conn);
  db = conn;
  return db;
}
