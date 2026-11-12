import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { getProject, getProjects, getProjectSlugs } from '@/lib/db/content';
import { formatNumber, isLocale, localizeDigits, locales } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { SplitText } from '@/components/motion/SplitText';
import { Heading } from '@/components/ui/Heading';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { LeadForm } from '@/components/ui/LeadForm';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug, locale);
  if (!project) notFound();
  return { locale, project, t: getDictionary(locale) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, project } = await resolve(params);
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: project.image.src,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { locale, project, t } = await resolve(params);
  const p = t.projects;
  const all = getProjects(locale);
  const next = all[(all.findIndex((x) => x.slug === project.slug) + 1) % all.length];

  const specs: [string, string][] = [
    [p.category, p.categories[project.category]],
    [p.statusLabel, p.status[project.status]],
    [p.location, project.location],
    [p.area, `${formatNumber(project.area, locale)} ${p.sqm}`],
    ...(project.floors ? ([[p.floors, formatNumber(project.floors, locale)]] as [string, string][]) : []),
    [p.structure, project.structure],
  ];

  return (
    <article>
      <header className="pb-12 pt-[calc(var(--header-h)+clamp(2.5rem,6vw,5rem))] md:pb-16">
        <div className="container">
          <Link href={`/${locale}/projects`} className="enter inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <span aria-hidden className="rtl:-scale-x-100">
              ←
            </span>
            {p.back}
          </Link>
          <p className="enter mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted" style={{ animationDelay: '0.1s' }}>
            <span className="num">{project.code}</span>
            <span aria-hidden className="h-px w-8 bg-fg/30" />
            <span>{p.categories[project.category]}</span>
            {project.status === 'inProgress' && <span className="theme-dark rounded-full px-3 py-1 text-xs">{p.status.inProgress}</span>}
          </p>
          <SplitText as="h1" text={project.title} className="display t-h1 mt-6 max-w-5xl" delay={0.1} css />
        </div>
      </header>

      {/* Image + specification sheet */}
      <section className="pb-section">
        <div className="container grid items-start gap-x-8 gap-y-12 lg:grid-cols-12">
          <figure className="enter relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface lg:col-span-8" style={{ animationDelay: '0.35s' }}>
            <Image
              data-zoom
              src={project.image.src}
              alt={project.title}
              fill
              priority
              sizes="(min-width:1024px) 64vw, 100vw"
              className="object-cover"
            />
          </figure>
          <aside aria-labelledby="specs-title" className="lg:sticky lg:top-28 lg:col-span-4">
            <h2 id="specs-title" className="label">
              {p.specs}
            </h2>
            <dl className="mt-6 border-t border-fg">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="shrink-0 text-sm text-muted">{k}</dt>
                  <dd className="text-end">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/${locale}/contact`} className="btn-primary mt-8 w-full">
              {t.nav.cta}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </aside>
        </div>
      </section>

      {/* Summary + highlights */}
      <section className="theme-surface py-section">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <p className="statement lg:col-span-9" data-reveal>
            {project.summary}
          </p>
          <div className="lg:col-span-12">
            <h2 className="label" data-reveal>
              {p.highlights}
            </h2>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {project.highlights.map((hl, i) => (
                <li key={hl} className="border-t border-fg/25 pb-8 pt-5" data-reveal>
                  <span className="num text-sm text-muted">{localizeDigits(String(i + 1).padStart(2, '0'), locale)}</span>
                  <p className="mt-6 text-lg">{hl}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {project.beforeAfter && (
        <section className="pt-section" aria-labelledby="ba-title">
          <div className="container">
            <Heading id="ba-title" text={p.beforeAfter} className="mb-10" />
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

      {project.gallery.length > 0 && (
        <section className="pt-section" aria-labelledby="gallery-title">
          <div className="container">
            <Heading id="gallery-title" text={p.gallery} className="mb-10" />
            <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
              {project.gallery.map((g, i) => (
                <li key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface" data-reveal="clip">
                  <Image src={g.src} alt={`${project.title} — ${formatNumber(i + 1, locale)}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Consultation */}
      <section className="py-section" aria-labelledby="project-contact-title">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label" data-reveal>
              {t.home.contact.label}
            </p>
            <Heading id="project-contact-title" text={t.home.contact.title} className="mt-6" />
            <p className="lead mt-6 max-w-md" data-reveal>
              {t.home.contact.lead}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source={`project:${project.slug}`} />
          </div>
        </div>
      </section>

      {/* Next project */}
      <Link href={`/${locale}/projects/${next.slug}`} className="theme-dark group block py-section">
        <div className="container flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div>
            <p className="label">{p.next}</p>
            <p className="display t-h1 mt-6 transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
              {next.title}
            </p>
            <p className="mt-4 text-muted">{next.location}</p>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-2xl bg-surface">
            <Image src={next.image.src} alt="" fill sizes="320px" className="photo object-cover group-hover:scale-[1.04]" />
          </div>
        </div>
      </Link>
    </article>
  );
}
