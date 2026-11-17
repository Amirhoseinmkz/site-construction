import type { Metadata } from 'next';
import { formatNumber } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProjects, type ProjectCategory } from '@/lib/db/content';
import { PageHead } from '@/components/ui/PageHead';
import { ProjectSheets } from '@/components/ui/ProjectSheets';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/projects', title: t.projects.label, description: t.projects.lead, image: '/images/proj-com-1.jpg' });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const p = t.projects;
  const projects = getProjects(locale);

  const items = projects.map((pr) => ({
    slug: pr.slug,
    code: pr.code,
    category: pr.category,
    categoryLabel: p.categories[pr.category],
    inProgress: pr.status === 'inProgress',
    statusLabel: p.status.inProgress,
    title: pr.title,
    place: pr.location,
    facts: [
      { label: p.category, value: p.categories[pr.category] },
      { label: p.area, value: `${formatNumber(pr.area, locale)} ${p.sqm}` },
      { label: p.statusLabel, value: p.status[pr.status] },
    ],
    image: pr.image,
  }));

  const categories = (Object.keys(p.categories) as ProjectCategory[]).filter((c) => projects.some((pr) => pr.category === c));
  const filters = [
    { key: 'all', label: p.all, count: formatNumber(projects.length, locale) },
    ...categories.map((c) => ({ key: c, label: p.categories[c], count: formatNumber(projects.filter((pr) => pr.category === c).length, locale) })),
  ];

  const totalArea = projects.reduce((n, pr) => n + pr.area, 0);
  const underway = projects.filter((pr) => pr.status === 'inProgress').length;
  const summary = [
    [formatNumber(projects.length, locale), p.label],
    [`${formatNumber(totalArea, locale)} ${p.sqm}`, p.area],
    ...(underway ? [[formatNumber(underway, locale), p.status.inProgress]] : []),
  ];

  return (
    <>
      <PageHead compact label={p.label} title={p.title} lead={p.lead} />
      <section className="pb-section">
        <div className="container">
          <dl className="mb-12 grid max-w-2xl grid-cols-3 gap-6 md:mb-16" data-reveal>
            {summary.map(([v, k]) => (
              <div key={k}>
                <dd className="display t-3">{v}</dd>
                <dt className="mt-1 text-xs text-muted">{k}</dt>
              </div>
            ))}
          </dl>
          <ProjectSheets locale={locale} items={items} filters={filters} filterLabel={p.filterLabel} emptyLabel={p.empty} />
        </div>
      </section>
    </>
  );
}
