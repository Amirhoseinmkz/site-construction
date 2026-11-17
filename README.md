# Mirkazemi Construction Group — website

Bilingual (Persian RTL / English LTR) site built with Next.js 15, Tailwind and GSAP.
Content lives in SQLite (seeded from `data/seed`), UI strings in `dictionaries/`.

```bash
npm install
npm run dev      # http://localhost:3000   (Node >= 22.5)
npm run build && npm start
```

## Design in one paragraph

Night is the default theme (a day theme is the sun/moon toggle in the header). The home page is
ordinary scrolling, one section after another, and nothing holds or pins the scroll. The hero is a
morning on a building site that turns to night once, in CSS (`@property` variables `--p` build and
`--n` nightfall, `components/home/SiteArt.tsx`). The four process stages are normal sections whose
drawing builds as each scrolls past (`Chapters.tsx`, `ChapterArt.tsx`), and the finished drawing is
what you get with no JS or with reduced motion. Persian is set entirely in Vazirmatn; English in
Instrument Serif and Inter. All fonts are open-source and self-hosted from `app/fonts`.

## Where things are

| What | Where |
| --- | --- |
| Texts (fa / en) | `dictionaries/fa.ts`, `dictionaries/en.ts` |
| Projects, services, process, FAQ | `data/seed/*` (seeded into `data/mirkazemi.db`; `npm run db:reseed` to reload) |
| Phone, hours, social links | `data/site.ts` |
| Leads (form submissions) | `leads` table in the database; optional `LEAD_WEBHOOK_URL` in `.env` |
