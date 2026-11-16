import type { MetadataRoute } from 'next';
import { locales, siteUrl } from '@/lib/i18n';
import { getProjectSlugs } from '@/lib/db/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/services', '/projects', '/about', '/collaboration', '/contact', ...getProjectSlugs().map((slug) => `/projects/${slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path.startsWith('/projects/') ? 0.6 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l === 'fa' ? 'fa-IR' : 'en', `${siteUrl}/${l}${path}`])) },
    }))
  );
}
