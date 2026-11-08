import type { Metadata } from 'next';
import { projects, projectCategories } from '@/data/projects';
import { formatNumber } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectGrid } from '@/components/ui/ProjectGrid';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/projects', title: t.projects.title, description: t.projects.lead, image: '/images/proj-com-1.jpg' });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const p = t.projects;

  const items = projects.map((pr) => ({
    slug: pr.slug,
    code: pr.code,
    category: pr.category,
    categoryLabel: p.categories[pr.category],
    statusLabel: p.status[pr.status],
    inProgress: pr.status === 'inProgress',
    title: pr.title[locale],
    location: pr.location[locale],
    meta: `${formatNumber(pr.area, locale)} ${p.sqm}`,
    image: pr.image,
  }));

  const filters = [{ key: 'all', label: p.all }, ...projectCategories.map((c) => ({ key: c, label: p.categories[c] }))];

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
      <section className="pb-28 md:pb-40">
        <div className="container">
          <ProjectGrid locale={locale} items={items} filters={filters} filterLabel={p.filterLabel} emptyLabel={p.empty} />
        </div>
      </section>
    </>
  );
}
