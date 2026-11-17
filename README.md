# Mirkazemi Construction Group — Corporate Website

A bilingual (Persian RTL / English) website for a Tehran-based construction and engineering group. It presents the company's services, delivery process, project portfolio and partnership model, and lets prospective clients request a consultation.

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS, with a blueprint-inspired visual language, smooth scrolling and a WebGL hero.

## Highlights

- **Fully bilingual** — Persian (RTL) and English, switchable at runtime through a language context; all copy lives in typed data files.
- **Project portfolio** — filterable by category (residential, commercial, renovation, partnership), region and status, with a dedicated detail page per project (`/projects/[slug]`) including drawing metadata and a before/after slider.
- **Services & process pages** — services from architectural design/BIM through turnkey delivery, each with deliverables, plus a step-by-step delivery process.
- **Partnership calculator** — an interactive tool on the collaboration page for estimating a partnership scenario.
- **Lead capture** — contact form with a typed lead model (`new` / `contacted` / `archived`) backed by SQLite (`lib/db.ts`).
- **Motion & 3D** — Three.js architectural hero, GSAP + Framer Motion animations and Lenis smooth scrolling.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, PostCSS |
| Motion / 3D | Framer Motion, GSAP, Lenis, Three.js |
| Icons | lucide-react |
| Storage | SQLite via Node's built-in `node:sqlite` |

## Project structure

```
app/            Routes: home, about, services, projects (+ [slug]), process, collaboration, contact
components/
  3d/           Three.js hero canvas
  motion/       Smooth-scroll provider
  ui/           Navbar, Footer, ProjectCard, BeforeAfterSlider, PartnershipCalculator, ...
data/           Typed content: projects, services, process steps, FA/EN translations
lib/db.ts       SQLite lead storage
images/         Brand assets and project/service imagery
index.html + server.js   Earlier zero-dependency static version of the site
```

## Getting started

Requires Node.js 22+ (the lead store uses the built-in `node:sqlite` module).

```sh
npm install
npm run dev        # http://localhost:3000
```

Production build:

```sh
npm run build
npm start
```

The legacy static version can be served without installing anything:

```sh
node server.js     # http://localhost:3000
```

## Editing content

Projects, services, process steps and all UI strings live in `data/`. Add a project by appending an entry to `data/projects.ts` (it is typed by `ProjectItem`) and dropping its images into `images/`.

> Contact details in `data/translations.ts` (phone numbers, email, address) are placeholders — replace them before going live.
