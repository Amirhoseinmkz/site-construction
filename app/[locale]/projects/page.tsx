import type { Metadata } from 'next';
import { formatNumber, localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProjects, type ProjectCategory } from '@/lib/db/content';
import { PageHead } from '@/components/ui/PageHead';
import { ProjectIndex } from '@/components/ui/ProjectIndex';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/projects', title: t.projects.label, description: t.projects.lead, image: '/images/proj-com-1.jpg' });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const p = t.projects;
  const projects = getProjects(locale);

  const items = projects.map((pr, i) => ({
    slug: pr.slug,
    num: localizeDigits(String(i + 1).padStart(2, '0'), locale),
    category: pr.category,
    categoryLabel: p.categories[pr.category],
    inProgress: pr.status === 'inProgress',
    statusLabel: p.status.inProgress,
    title: pr.title,
    meta: `${formatNumber(pr.area, locale)} ${p.sqm}`,
    image: pr.image,
  }));

  const categories = (Object.keys(p.categories) as ProjectCategory[]).filter((c) => projects.some((pr) => pr.category === c));
  const filters = [
    { key: 'all', label: p.all, count: formatNumber(projects.length, locale) },
    ...categories.map((c) => ({ key: c, label: p.categories[c], count: formatNumber(projects.filter((pr) => pr.category === c).length, locale) })),
  ];

  return (
    <>
      <PageHead label={p.label} title={p.title} />
      <section className="pb-section">
        <div className="container">
          <ProjectIndex locale={locale} items={items} filters={filters} filterLabel={p.filterLabel} emptyLabel={p.empty} />
        </div>
      </section>
    </>
  );
}
