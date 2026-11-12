/**
 * Content model: every entity has a language-neutral base table and a
 * `*_translations` table keyed by (entity, locale). Adding a language means
 * adding rows, not columns. List-type fields are stored as JSON arrays.
 */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS projects (
  slug          TEXT PRIMARY KEY,
  code          TEXT NOT NULL,
  category      TEXT NOT NULL,
  status        TEXT NOT NULL,
  area          INTEGER NOT NULL,
  floors        INTEGER,
  image_src     TEXT NOT NULL,
  image_width   INTEGER NOT NULL,
  image_height  INTEGER NOT NULL,
  before_src    TEXT,
  after_src     TEXT,
  gallery_json  TEXT NOT NULL DEFAULT '[]',
  sort_order    INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS project_translations (
  project_slug    TEXT NOT NULL REFERENCES projects(slug) ON DELETE CASCADE,
  locale          TEXT NOT NULL,
  title           TEXT NOT NULL,
  location        TEXT NOT NULL,
  structure       TEXT NOT NULL,
  summary         TEXT NOT NULL,
  highlights_json TEXT NOT NULL DEFAULT '[]',
  PRIMARY KEY (project_slug, locale)
);

CREATE TABLE IF NOT EXISTS services (
  slug       TEXT PRIMARY KEY,
  idx        TEXT NOT NULL,
  image      TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS service_translations (
  service_slug TEXT NOT NULL REFERENCES services(slug) ON DELETE CASCADE,
  locale       TEXT NOT NULL,
  title        TEXT NOT NULL,
  tagline      TEXT NOT NULL,
  description  TEXT NOT NULL,
  cta          TEXT NOT NULL,
  PRIMARY KEY (service_slug, locale)
);
CREATE TABLE IF NOT EXISTS service_stages (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL REFERENCES services(slug) ON DELETE CASCADE,
  sort_order   INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS service_stage_translations (
  stage_id          INTEGER NOT NULL REFERENCES service_stages(id) ON DELETE CASCADE,
  locale            TEXT NOT NULL,
  short             TEXT NOT NULL,
  title             TEXT NOT NULL,
  summary           TEXT NOT NULL,
  actions_json      TEXT NOT NULL DEFAULT '[]',
  deliverable_title TEXT NOT NULL,
  deliverable_text  TEXT NOT NULL,
  PRIMARY KEY (stage_id, locale)
);

CREATE TABLE IF NOT EXISTS process_phases (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  idx        TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS process_phase_translations (
  phase_id    INTEGER NOT NULL REFERENCES process_phases(id) ON DELETE CASCADE,
  locale      TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  points_json TEXT NOT NULL DEFAULT '[]',
  PRIMARY KEY (phase_id, locale)
);

CREATE TABLE IF NOT EXISTS faqs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS faq_translations (
  faq_id   INTEGER NOT NULL REFERENCES faqs(id) ON DELETE CASCADE,
  locale   TEXT NOT NULL,
  question TEXT NOT NULL,
  answer   TEXT NOT NULL,
  PRIMARY KEY (faq_id, locale)
);

CREATE TABLE IF NOT EXISTS leads (
  id           TEXT PRIMARY KEY,
  full_name    TEXT NOT NULL,
  phone        TEXT NOT NULL,
  request_type TEXT NOT NULL,
  area         TEXT,
  message      TEXT,
  locale       TEXT,
  source       TEXT,
  status       TEXT NOT NULL DEFAULT 'new',
  created_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;
