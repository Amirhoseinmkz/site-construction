import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';
import { site } from '@/data/site';
import { getServices } from '@/lib/db/content';
import { Logo } from './Logo';
import { BackToTop } from './BackToTop';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const services = getServices(locale);
  const year = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR-u-ca-persian' : 'en-US', { useGrouping: false }).format(
    locale === 'fa' ? Number(new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' }).format(new Date()).replace(/\D/g, '')) : new Date().getFullYear()
  );
  const pages = [
    ['projects', '/projects'],
    ['process', '/process'],
    ['about', '/about'],
    ['collaboration', '/collaboration'],
    ['contact', '/contact'],
  ] as const;
  const social = [
    ['Instagram', site.social.instagram],
    ['Telegram', site.social.telegram],
    ['WhatsApp', site.social.whatsapp],
    ['LinkedIn', site.social.linkedin],
  ] as const;

  return (
    <footer className="theme-dark">
      <div className="container pb-10 pt-section">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-8 max-w-xs text-muted">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.pages} className="md:col-span-2">
            <h2 className="text-sm text-muted">{t.footer.pages}</h2>
            <ul className="mt-5 space-y-2.5">
              {pages.map(([key, path]) => (
                <li key={key}>
                  <Link href={`/${locale}${path}`} className="nav-link">
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.services} className="md:col-span-3">
            <h2 className="text-sm text-muted">{t.footer.services}</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services#${s.slug}`} className="nav-link">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-sm text-muted">{t.footer.contact}</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href={`tel:${site.phones.office.tel}`} className="nav-link ltr">
                  {site.phones.office.display}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phones.mobile.tel}`} className="nav-link ltr">
                  {site.phones.mobile.display}
                </a>
              </li>
              {social.map(([label, url]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="nav-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-section flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center">
          <p>
            © {year} {site.name[locale]}. {t.footer.rights}
          </p>
          <BackToTop label={t.a11y.backToTop} />
        </div>
      </div>
    </footer>
  );
}
