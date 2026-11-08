export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const dirOf = (locale: Locale) => (locale === 'fa' ? 'rtl' : 'ltr');

/** Bilingual string helper type used across data files */
export type L<T = string> = Record<Locale, T>;

const numberFormatters: Record<Locale, Intl.NumberFormat> = {
  fa: new Intl.NumberFormat('fa-IR', { useGrouping: true }),
  en: new Intl.NumberFormat('en-US', { useGrouping: true }),
};

export function formatNumber(n: number, locale: Locale) {
  return numberFormatters[locale].format(n);
}

/** Converts latin digits inside an arbitrary string to Persian digits when locale is fa */
export function localizeDigits(s: string, locale: Locale) {
  if (locale !== 'fa') return s;
  return s.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

/** Build a localized path. `path` should start with "/" (e.g. "/projects") or be "" for home */
export function href(locale: Locale, path = '') {
  return `/${locale}${path === '/' ? '' : path}`;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirkazemigroup.com';
