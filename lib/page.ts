import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './i18n';
import { getDictionary } from '@/dictionaries';

/** Resolves and validates the locale param for a page. */
export async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale: locale as Locale, t: getDictionary(locale) };
}

export type LocaleParams = { params: Promise<{ locale: string }> };
