import 'server-only';
import { cache } from 'react';
import type { Locale } from '@/lib/i18n';
import { getDb } from './connection';

/* ───────── Localized content types (what pages consume) ───────── */

export type ProjectCategory = 'residential' | 'commercial' | 'renovation' | 'villa';
export type ProjectStatus = 'completed' | 'inProgress';
export interface ImageRef {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  code: string;
  category: ProjectCategory;
  status: ProjectStatus;
  area: number;
  floors: number | null;
  image: ImageRef;
  gallery: ImageRef[];
  beforeAfter: { before: string; after: string } | null;
  title: string;
  location: string;
  structure: string;
  summary: string;
  highlights: string[];
}

export interface ServiceStage {
  short: string;
  title: string;
  summary: string;
  actions: string[];
  deliverable: { title: string; text: string };
}

export interface Service {
  slug: string;
  index: string;
  image: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  stages: ServiceStage[];
}

export interface ProcessPhase {
  index: string;
  title: string;
  text: string;
  points: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

/* ───────── Helpers ───────── */

type Row = Record<string, string | number | null>;

/**
 * Picks the requested locale's translation row; if it is missing, falls back
 * to whichever translation exists so a page never renders empty.
 */
const pick = (table: string, fk: string, owner: string) =>
  `(SELECT locale FROM ${table} WHERE ${fk} = ${owner} ORDER BY (locale = ?) DESC LIMIT 1)`;

const json = <T>(v: unknown): T => JSON.parse(String(v ?? '[]')) as T;

function toProject(r: Row): Project {
  return {
    slug: String(r.slug),
    code: String(r.code),
    category: r.category as ProjectCategory,
    status: r.status as ProjectStatus,
    area: Number(r.area),
    floors: r.floors === null ? null : Number(r.floors),
    image: { src: String(r.image_src), width: Number(r.image_width), height: Number(r.image_height) },
    gallery: json<ImageRef[]>(r.gallery_json),
    beforeAfter: r.before_src && r.after_src ? { before: String(r.before_src), after: String(r.after_src) } : null,
    title: String(r.title),
    location: String(r.location),
    structure: String(r.structure),
    summary: String(r.summary),
    highlights: json<string[]>(r.highlights_json),
  };
}

const PROJECT_SQL = `
  SELECT p.*, t.title, t.location, t.structure, t.summary, t.highlights_json
  FROM projects p
  JOIN project_translations t
    ON t.project_slug = p.slug AND t.locale = ${pick('project_translations', 'project_slug', 'p.slug')}`;

/* ───────── Queries ───────── */

export const getProjects = cache((locale: Locale): Project[] => {
  const rows = getDb().prepare(`${PROJECT_SQL} ORDER BY p.sort_order`).all(locale) as Row[];
  return rows.map(toProject);
});

export const getProject = cache((slug: string, locale: Locale): Project | null => {
  const row = getDb().prepare(`${PROJECT_SQL} WHERE p.slug = ?`).get(locale, slug) as Row | undefined;
  return row ? toProject(row) : null;
});

export function getProjectSlugs(): string[] {
  return (getDb().prepare('SELECT slug FROM projects ORDER BY sort_order').all() as { slug: string }[]).map((r) => r.slug);
}

export const getServices = cache((locale: Locale): Service[] => {
  const db = getDb();
  const services = db
    .prepare(
      `SELECT s.slug, s.idx, s.image, t.title, t.tagline, t.description, t.cta
       FROM services s
       JOIN service_translations t
         ON t.service_slug = s.slug AND t.locale = ${pick('service_translations', 'service_slug', 's.slug')}
       ORDER BY s.sort_order`
    )
    .all(locale) as Row[];
  const stages = db
    .prepare(
      `SELECT st.service_slug, t.short, t.title, t.summary, t.actions_json, t.deliverable_title, t.deliverable_text
       FROM service_stages st
       JOIN service_stage_translations t
         ON t.stage_id = st.id AND t.locale = ${pick('service_stage_translations', 'stage_id', 'st.id')}
       ORDER BY st.sort_order`
    )
    .all(locale) as Row[];

  return services.map((s) => ({
    slug: String(s.slug),
    index: String(s.idx),
    image: String(s.image),
    title: String(s.title),
    tagline: String(s.tagline),
    description: String(s.description),
    cta: String(s.cta),
    stages: stages
      .filter((st) => st.service_slug === s.slug)
      .map((st) => ({
        short: String(st.short),
        title: String(st.title),
        summary: String(st.summary),
        actions: json<string[]>(st.actions_json),
        deliverable: { title: String(st.deliverable_title), text: String(st.deliverable_text) },
      })),
  }));
});

export const getProcessPhases = cache((locale: Locale): ProcessPhase[] => {
  const rows = getDb()
    .prepare(
      `SELECT p.idx, t.title, t.body, t.points_json
       FROM process_phases p
       JOIN process_phase_translations t
         ON t.phase_id = p.id AND t.locale = ${pick('process_phase_translations', 'phase_id', 'p.id')}
       ORDER BY p.sort_order`
    )
    .all(locale) as Row[];
  return rows.map((r) => ({ index: String(r.idx), title: String(r.title), text: String(r.body), points: json<string[]>(r.points_json) }));
});

export const getFaqs = cache((locale: Locale): Faq[] => {
  const rows = getDb()
    .prepare(
      `SELECT t.question, t.answer
       FROM faqs f
       JOIN faq_translations t
         ON t.faq_id = f.id AND t.locale = ${pick('faq_translations', 'faq_id', 'f.id')}
       ORDER BY f.sort_order`
    )
    .all(locale) as Row[];
  return rows.map((r) => ({ question: String(r.question), answer: String(r.answer) }));
});
