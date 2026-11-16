# Mirkazemi Construction Group — website

Bilingual (Persian RTL / English LTR) site built with Next.js 15, Tailwind and GSAP.
Content lives in SQLite (seeded from `data/seed`), UI strings in `dictionaries/`.

```bash
npm install
npm run dev      # http://localhost:3000   (Node >= 22.5)
npm run build && npm start
```

## Design in one paragraph

The home page is a scroll-driven film: a building site is surveyed, drawn, built and handed over
while the light goes from morning to night (`components/home/Film.tsx`, art in `FilmArt.tsx`).
Scenes are held with CSS `position: sticky` and driven by CSS variables — never a GSAP pin, which
injects wrapper elements into DOM that React owns. Night is the default theme; a day theme is a toggle
in the menu. Persian is set in Vazirmatn; English in Instrument Serif and Inter. All fonts are
open-source and self-hosted from `app/fonts`.

## Where things are

| What | Where |
| --- | --- |
| Texts (fa / en) | `dictionaries/fa.ts`, `dictionaries/en.ts` |
| Projects, services, process, FAQ | `data/seed/*` (seeded into `data/mirkazemi.db`; `npm run db:reseed` to reload) |
| Phone, hours, social links | `data/site.ts` |
| Leads (form submissions) | `leads` table in the database; optional `LEAD_WEBHOOK_URL` in `.env` |
