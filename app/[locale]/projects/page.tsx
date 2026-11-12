import type { Metadata } from 'next';
import { formatNumber } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProjects, type ProjectCategory } from '@/lib/db/content';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectGrid } from '@/components/ui/ProjectGrid';

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
    statusLabel: p.status[pr.status],
    inProgress: pr.status === 'inProgress',
    title: pr.title,
    location: pr.location,
    meta: `${formatNumber(pr.area, locale)} ${p.sqm}`,
    image: pr.image,
  }));

  // Only offer categories that actually have projects
  const categories = (Object.keys(p.categories) as ProjectCategory[]).filter((c) => projects.some((pr) => pr.category === c));
  const filters = [
    { key: 'all', label: p.all, count: formatNumber(projects.length, locale) },
    ...categories.map((c) => ({
      key: c,
      label: p.categories[c],
      count: formatNumber(projects.filter((pr) => pr.category === c).length, locale),
    })),
  ];

  return (
    <>
      <PageHero label={p.label} title={p.title} lead={p.lead} />
      <section className="py-14 pb-section md:py-20">
        <div className="container">
          <ProjectGrid locale={locale} items={items} filters={filters} filterLabel={p.filterLabel} emptyLabel={p.empty} />
        </div>
      </section>
    </>
  );
}
