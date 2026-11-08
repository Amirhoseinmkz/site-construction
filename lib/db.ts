import path from 'node:path';
import fs from 'node:fs';
// @ts-ignore
import { DatabaseSync } from 'node:sqlite';
import { ProjectItem, projectsData } from '../data/projects';

export interface LeadItem {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  projectType: string;
  areaApprox?: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'archived';
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'mirkazemi.db');

let _db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!_db) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    _db = new DatabaseSync(DB_PATH);
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      region TEXT NOT NULL,
      status TEXT NOT NULL,
      year TEXT,
      area TEXT,
      floors INTEGER DEFAULT 1,
      data_json TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      project_type TEXT,
      area_approx TEXT,
      message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed projects if empty
  const countRow = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (countRow.count === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO projects (id, slug, category, region, status, year, area, floors, data_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of projectsData) {
      insertStmt.run(
        p.id,
        p.slug,
        p.category,
        p.region,
        p.status,
        p.year,
        p.area,
        p.floors,
        JSON.stringify(p)
      );
    }
  }
}

export function getAllProjects(): ProjectItem[] {
  const db = getDb();
  const rows = db.prepare('SELECT data_json FROM projects ORDER BY rowid ASC').all() as { data_json: string }[];
  return rows.map((r) => JSON.parse(r.data_json) as ProjectItem);
}

export function getProjectBySlug(slug: string): ProjectItem | null {
  const db = getDb();
  const row = db.prepare('SELECT data_json FROM projects WHERE slug = ?').get(slug) as { data_json: string } | undefined;
  if (!row) return null;
  return JSON.parse(row.data_json) as ProjectItem;
}

export function upsertProject(project: ProjectItem): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO projects (id, slug, category, region, status, year, area, floors, data_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      category = excluded.category,
      region = excluded.region,
      status = excluded.status,
      year = excluded.year,
      area = excluded.area,
      floors = excluded.floors,
      data_json = excluded.data_json
  `);

  stmt.run(
    project.id,
    project.slug,
    project.category,
    project.region,
    project.status,
    project.year,
    project.area,
    project.floors,
    JSON.stringify(project)
  );
}

export function deleteProject(id: string): void {
  const db = getDb();
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
}

export function saveLead(lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>): string {
  const db = getDb();
  const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const stmt = db.prepare(`
    INSERT INTO leads (id, full_name, phone, email, project_type, area_approx, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
  `);
  stmt.run(
    id,
    lead.fullName,
    lead.phone,
    lead.email || null,
    lead.projectType || 'general',
    lead.areaApprox || null,
    lead.message || null
  );
  return id;
}

export function getAllLeads(): LeadItem[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as Array<{
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    project_type: string | null;
    area_approx: string | null;
    message: string | null;
    created_at: string;
    status: string;
  }>;

  return rows.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    email: r.email ?? undefined,
    projectType: r.project_type ?? 'general',
    areaApprox: r.area_approx ?? undefined,
    message: r.message ?? undefined,
    createdAt: r.created_at,
    status: (r.status as LeadItem['status']) || 'new',
  }));
}
