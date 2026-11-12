// Clears the content tables so they are re-seeded from /data/seed on the next start.
// Leads are never touched. Usage: npm run db:reseed
import path from 'node:path';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const TABLES = [
  'faq_translations', 'faqs',
  'process_phase_translations', 'process_phases',
  'service_stage_translations', 'service_stages', 'service_translations', 'services',
  'project_translations', 'projects',
];

const file = path.join(process.env.DB_DIR || path.join(process.cwd(), 'data'), 'mirkazemi.db');
if (!fs.existsSync(file)) {
  console.log('No database yet — it will be created and seeded on first start.');
  process.exit(0);
}
const db = new DatabaseSync(file);
db.exec('BEGIN IMMEDIATE');
for (const t of TABLES) db.exec(`DROP TABLE IF EXISTS ${t}`);
db.exec('COMMIT');
console.log('Content tables cleared. They will be re-seeded on the next start/build.');
