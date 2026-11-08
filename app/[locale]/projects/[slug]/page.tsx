import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { getDictionary } from '@/data/translations';
import { formatNumber, isLocale, locales, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { SplitText } from '@/components/motion/SplitText';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { LeadForm } from '@/components/ui/LeadForm';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  return { locale: locale as Locale, project, t: getDictionary(locale as Locale) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, project } = await resolve(params);
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title[locale],
    description: project.summary[locale],
    image: project.image.src,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { locale, project, t } = await resolve(params);
  const p = t.projects;
  const idx = projects.findIndex((x) => x.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const specs: [string, string][] = [
    [p.category, p.categories[project.category]],
    [p.location, project.location[locale]],
    [p.area, `${formatNumber(project.area, locale)} ${p.sqm}`],
    ...(project.floors ? ([[p.floors, formatNumber(project.floors, locale)]] as [string, string][]) : []),
    [p.structure, project.structure[locale]],
  ];

  return (
    <article>
      {/* Cinematic full-bleed hero */}
      <header className="relative isolate flex min-h-[92svh] items-end overflow-hidden pb-16 pt-40">
        <div className="absolute inset-0 -z-10">
          <div data-parallax="16" className="absolute inset-[-10%]">
            <Image src={project.image.src} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />
          <div className="vignette absolute inset-0" />
        </div>
        <div className="container">
          <Link href={`/${locale}/projects`} className="hero-in link-underline text-sm text-bone-muted hover:text-bone">
            <span aria-hidden className="flip-x-rtl me-2 inline-block">←</span>
            {p.back}
          </Link>
          <div className="hero-in mt-8 flex flex-wrap items-center gap-4">
            <span className="font-brand text-sm tracking-[0.3em] text-ember" dir="ltr">
              {project.code}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                project.status === 'inProgress' ? 'bg-ember text-ink-950' : 'border border-bone/25 text-bone'
              }`}
            >
              {p.status[project.status]}
            </span>
          </div>
          <SplitText as="h1" text={project.title[locale]} className="mt-5 max-w-5xl text-display-xl font-black" delay={0.1} css />
          <p className="hero-in mt-6 text-lg text-bone-muted" style={{ animationDelay: '0.3s' }}>
            {project.location[locale]}
          </p>
        </div>
      </header>

      {/* Overview + specs */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-2xl leading-relaxed text-bone md:text-3xl md:leading-relaxed" data-reveal>
              {project.summary[locale]}
            </p>
            <h2 className="mt-16 text-sm text-bone-dim" data-reveal>
              {p.highlights}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.highlights[locale].map((hl, i) => (
                <li key={hl} className="border-t border-bone/10 pt-4" data-reveal>
                  <span className="font-brand text-xs text-ember" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-bone">{hl}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="specs-title">
            <div className="border border-bone/10 bg-ink-900/60 p-8 lg:sticky lg:top-28" data-reveal>
              <h2 id="specs-title" className="text-sm text-ember">
                {p.specs}
              </h2>
              <dl className="mt-6 divide-y divide-bone/10">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-4">
                    <dt className="text-sm text-bone-dim">{k}</dt>
                    <dd className="text-end text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/${locale}/contact`} className="btn-primary mt-8 w-full">
                {t.nav.cta}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Wide image band */}
      <section aria-hidden className="relative h-[70vh] overflow-hidden" data-reveal="clip">
        <Image data-zoom src={project.image.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink-950/20" />
      </section>

      {project.beforeAfter && (
        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="mb-10 text-display-md font-bold">{p.beforeAfter}</h2>
            <BeforeAfterSlider
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              beforeLabel={p.before}
              afterLabel={p.after}
              label={p.sliderLabel}
            />
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 md:py-28" aria-labelledby="gallery-title">
          <div className="container">
            <h2 id="gallery-title" className="mb-10 text-display-md font-bold">
              {p.gallery}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((g, i) => (
                <li key={g.src} className="relative aspect-[4/3] overflow-hidden" data-reveal="clip">
                  <Image src={g.src} alt={`${project.title[locale]} — ${i + 1}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Consultation */}
      <section className="border-t border-bone/10 py-20 md:py-28">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitText text={t.home.ctaTitle} className={`text-display-md ${locale === 'en' ? 'font-serif italic' : 'font-black'}`} />
            <p className="mt-6 text-bone-muted" data-reveal>
              {t.home.ctaLead}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source={`project:${project.slug}`} />
          </div>
        </div>
      </section>

      {/* Next project */}
      <Link
        href={`/${locale}/projects/${next.slug}`}
        className="group relative block h-[60vh] overflow-hidden border-t border-bone/10"
      >
        <Image
          src={next.image.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 transition-all duration-[1.4s] ease-cine group-hover:scale-105 group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-14">
          <p className="eyebrow">{p.next}</p>
          <p className="mt-4 text-display-lg font-black transition-colors group-hover:text-ember-soft">{next.title[locale]}</p>
        </div>
      </Link>
    </article>
  );
}
