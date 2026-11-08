import type { Metadata } from 'next';
import { locales, siteUrl, type Locale } from './i18n';
import { site } from '@/data/site';

interface SeoInput {
  locale: Locale;
  /** path after the locale, e.g. "/projects" or "" for home */
  path: string;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}

export function buildMetadata({ locale, path, title, description, image, absoluteTitle }: SeoInput): Metadata {
  const url = `${siteUrl}/${locale}${path}`;
  const languages = Object.fromEntries(locales.map((l) => [l === 'fa' ? 'fa-IR' : 'en', `${siteUrl}/${l}${path}`]));
  const brand = site.name[locale];
  const fullTitle = absoluteTitle ? title : `${title} | ${brand}`;
  const ogImage = image ?? '/images/proj-villa-1.jpg';

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, 'x-default': `${siteUrl}/fa${path}` },
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: brand,
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
