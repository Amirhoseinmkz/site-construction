import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { fontVariables } from '@/lib/fonts';
import { dirOf, isLocale, locales, siteUrl, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/dictionaries';
import { site } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuickContact } from '@/components/layout/QuickContact';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F0E6',
  colorScheme: 'light',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    applicationName: site.name[locale],
    ...buildMetadata({ locale, path: '', title: t.meta.title, description: t.meta.description, absoluteTitle: true }),
  };
}

/**
 * Runs before paint: enables the hidden initial states of scroll reveals when motion is allowed.
 * Fails safe: if the app bundle never boots, the class is removed after 3.5s so content is always visible.
 */
const bootScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');setTimeout(function(){if(!window.__mkzMotion){d.classList.remove('js-motion')}},3500)}}catch(e){}})();`;

function jsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: site.name[locale],
    alternateName: site.name[locale === 'fa' ? 'en' : 'fa'],
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/proj-villa-1.jpg`,
    foundingDate: String(site.foundedYear),
    telephone: site.phones.office.tel,
    areaServed: { '@type': 'City', name: locale === 'fa' ? 'تهران' : 'Tehran' },
    address: { '@type': 'PostalAddress', addressLocality: 'Tehran', addressCountry: 'IR' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [site.social.instagram, site.social.linkedin, site.social.telegram],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }} />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          {t.a11y.skip}
        </a>
        <MotionProvider>
          <Header locale={locale} t={{ nav: t.nav, a11y: t.a11y }} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} t={t} />
        </MotionProvider>
        <QuickContact locale={locale} />
      </body>
    </html>
  );
}
