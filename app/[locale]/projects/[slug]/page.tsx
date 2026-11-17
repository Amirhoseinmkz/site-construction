import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { getProject, getProjects, getProjectSlugs } from '@/lib/db/content';
import { formatNumber, isLocale, localizeDigits, locales, plain } from '@/lib/i18n';
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
  return buildMetadata({ locale, path: `/projects/${project.slug}`, title: project.title, description: project.summary, image: project.image.src });
}

export default async function ProjectPage({ params }: Params) {
  const { locale, project, t } = await resolve(params);
  const p = t.projects;
  const all = getProjects(locale);
  const next = all[(all.findIndex((x) => x.slug === project.slug) + 1) % all.length];

  // four facts, not a table
  const facts: [string, string][] = [
    [p.category, p.categories[project.category]],
    [p.location, project.location],
    [p.area, `${formatNumber(project.area, locale)} ${p.sqm}`],
    ...(project.floors ? ([[p.floors, formatNumber(project.floors, locale)]] as [string, string][]) : []),
    [p.structure, project.structure],
    [p.statusLabel, p.status[project.status]],
  ];

  return (
    <article>
      {/* full-bleed opening */}
      <header className="theme-dark relative isolate flex min-h-[100svh] items-end overflow-hidden pb-[clamp(2.5rem,8svh,5rem)] pt-40" data-header-tone="dark">
        <div className="absolute inset-0 -z-10">
          <div data-parallax="14" className="absolute inset-[-8%]">
            <Image src={project.image.src} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/25" />
        </div>
        <div className="container">
          <Link href={`/${locale}/projects`} className="enter inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <span aria-hidden className="rtl:-scale-x-100">
              ←
            </span>
            {p.back}
          </Link>
          <p className="enter num label mt-8 !flex" style={{ animationDelay: '0.1s' }}>
            {project.code} · {project.location}
          </p>
          <SplitText as="h1" text={project.title} className="display t-1 mt-5 max-w-[14ch]" delay={0.1} css />
        </div>
      </header>

      {/* the facts */}
      <section className="py-12 md:py-16">
        <dl className="container grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k} data-reveal>
              <dt className="label">{k}</dt>
              <dd className="mt-2 text-xl font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* one paragraph, four highlights */}
      <section className="py-section pt-8">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <p className="statement lg:col-span-10" data-reveal>
            {project.summary}
          </p>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {project.highlights.map((hl, i) => (
              <li key={hl} className="border-t border-fg/25 pb-8 pt-5" data-reveal>
                <span className="num text-sm text-muted">{plain(i + 1, locale)}</span>
                <p className="mt-6 text-lg">{hl}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.beforeAfter && (
        <section className="pb-section" aria-labelledby="ba-title">
          <div className="container">
            <Heading id="ba-title" text={p.beforeAfter} size="t-2" className="mb-10" />
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
        <section className="pb-section" aria-label={p.gallery}>
          <div className="container grid gap-6 md:grid-cols-2 md:gap-8">
            {project.gallery.map((g, i) => (
              <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface" data-reveal="clip">
                <Image src={g.src} alt={`${project.title} — ${formatNumber(i + 1, locale)}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ask about this project */}
      <section className="theme-surface py-section" aria-labelledby="project-contact-title">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading id="project-contact-title" text={t.home.contact.title} size="t-2" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source={`project:${project.slug}`} />
          </div>
        </div>
      </section>

      {/* next */}
      <Link href={`/${locale}/projects/${next.slug}`} data-header-tone="dark" className="theme-dark group block py-section">
        <div className="container flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div>
            <p className="label">{p.next}</p>
            <p className="display t-1 mt-5 transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">{next.title}</p>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-2xl bg-surface">
            <Image src={next.image.src} alt="" fill sizes="320px" className="photo object-cover group-hover:scale-[1.05]" />
          </div>
        </div>
      </Link>
    </article>
  );
}
