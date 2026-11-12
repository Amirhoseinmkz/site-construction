import type { DatabaseSync } from 'node:sqlite';
import { locales } from '@/lib/i18n';
import { projects } from '@/data/seed/projects';
import { services } from '@/data/seed/services';
import { processPhases, faqs } from '@/data/seed/process';

const isEmpty = (db: DatabaseSync, table: string) =>
  (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n === 0;

/**
 * Fills empty content tables from the bilingual seed files in /data/seed.
 * Runs inside one write transaction so parallel processes never seed twice.
 * Existing rows are never touched — edit the database, or run `npm run db:reseed`.
 */
export function seedContent(db: DatabaseSync) {
  db.exec('BEGIN IMMEDIATE');
  try {
    if (isEmpty(db, 'projects')) {
      const base = db.prepare(
        `INSERT INTO projects (slug, code, category, status, area, floors, image_src, image_width, image_height, before_src, after_src, gallery_json, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      const tr = db.prepare(
        `INSERT INTO project_translations (project_slug, locale, title, location, structure, summary, highlights_json)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      );
      projects.forEach((p, i) => {
        base.run(
          p.slug, p.code, p.category, p.status, p.area, p.floors ?? null,
          p.image.src, p.image.width, p.image.height,
          p.beforeAfter?.before ?? null, p.beforeAfter?.after ?? null,
          JSON.stringify(p.gallery ?? []), i
        );
        for (const l of locales) {
          tr.run(p.slug, l, p.title[l], p.location[l], p.structure[l], p.summary[l], JSON.stringify(p.highlights[l]));
        }
      });
    }

    if (isEmpty(db, 'services')) {
      const base = db.prepare(`INSERT INTO services (slug, idx, image, sort_order) VALUES (?, ?, ?, ?)`);
      const tr = db.prepare(
        `INSERT INTO service_translations (service_slug, locale, title, tagline, description, cta) VALUES (?, ?, ?, ?, ?, ?)`
      );
      const stage = db.prepare(`INSERT INTO service_stages (service_slug, sort_order) VALUES (?, ?)`);
      const stageTr = db.prepare(
        `INSERT INTO service_stage_translations (stage_id, locale, short, title, summary, actions_json, deliverable_title, deliverable_text)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      );
      services.forEach((s, i) => {
        base.run(s.slug, s.index, s.image, i);
        for (const l of locales) tr.run(s.slug, l, s.title[l], s.tagline[l], s.description[l], s.cta[l]);
        s.stages.forEach((st, j) => {
          const id = Number(stage.run(s.slug, j).lastInsertRowid);
          for (const l of locales) {
            stageTr.run(id, l, st.short[l], st.title[l], st.summary[l], JSON.stringify(st.actions[l]), st.deliverable.title[l], st.deliverable.text[l]);
          }
        });
      });
    }

    if (isEmpty(db, 'process_phases')) {
      const base = db.prepare(`INSERT INTO process_phases (idx, sort_order) VALUES (?, ?)`);
      const tr = db.prepare(
        `INSERT INTO process_phase_translations (phase_id, locale, title, body, points_json) VALUES (?, ?, ?, ?, ?)`
      );
      processPhases.forEach((p, i) => {
        const id = Number(base.run(p.index, i).lastInsertRowid);
        for (const l of locales) tr.run(id, l, p.title[l], p.text[l], JSON.stringify(p.points[l]));
      });
    }

    if (isEmpty(db, 'faqs')) {
      const base = db.prepare(`INSERT INTO faqs (sort_order) VALUES (?)`);
      const tr = db.prepare(`INSERT INTO faq_translations (faq_id, locale, question, answer) VALUES (?, ?, ?, ?)`);
      faqs.forEach((f, i) => {
        const id = Number(base.run(i).lastInsertRowid);
        for (const l of locales) tr.run(id, l, f.q[l], f.a[l]);
      });
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}
