import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localizeDigits } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';
import { site } from '@/data/site';
import { Logo } from './Logo';
import { Heading } from '@/components/ui/Heading';
import { SocialLinks } from '@/components/ui/Social';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = locale === 'fa'
    ? Number(new Intl.DateTimeFormat('en-US-u-ca-persian', { year: 'numeric' }).format(new Date()).replace(/\D/g, ''))
    : new Date().getFullYear();

  return (
    <footer data-header-tone="dark" className="theme-dark">
      <div className="container pb-8 pt-section">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
          <Heading text={t.home.contact.title} size="t-1" className="max-w-4xl" />
          <Link href={`/${locale}/contact`} className="btn-glow" data-reveal>
            {t.nav.cta}
            <span aria-hidden className="arrow">
              →
            </span>
          </Link>
        </div>

        <div className="mt-section grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-5">
            <a href={`tel:${site.phones.office.tel}`} className="nav-link ltr display t-3">
              {localizeDigits(site.phones.office.display, locale)}
            </a>
            <p className="mt-2 text-sm text-muted">{site.hours[locale]}</p>
          </div>
          <div className="md:col-span-3 md:justify-self-end">
            <SocialLinks />
          </div>
        </div>

        <p className="mt-12 text-sm text-muted">
          © {localizeDigits(String(year), locale)} {site.name[locale]}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
