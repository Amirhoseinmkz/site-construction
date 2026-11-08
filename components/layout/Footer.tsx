import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/data/translations';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from './Logo';
import { BackToTop } from './BackToTop';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();
  const pages = [
    ['projects', '/projects'],
    ['process', '/process'],
    ['about', '/about'],
    ['collaboration', '/collaboration'],
    ['contact', '/contact'],
  ] as const;

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink-950">
      <div className="container pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-bone" />
            <p className="mt-8 max-w-sm text-bone-muted">{t.footer.tagline}</p>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm">
              {(
                [
                  ['Instagram', site.social.instagram],
                  ['Telegram', site.social.telegram],
                  ['WhatsApp', site.social.whatsapp],
                  ['LinkedIn', site.social.linkedin],
                ] as const
              ).map(([label, url]) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-bone/15 px-4 py-1.5 font-brand text-xs tracking-wider text-bone-muted transition-colors hover:border-ember hover:text-ember"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t.footer.explore} className="md:col-span-2">
            <h2 className="text-sm font-semibold text-bone">{t.footer.explore}</h2>
            <ul className="mt-5 space-y-3 text-bone-muted">
              {pages.map(([key, path]) => (
                <li key={key}>
                  <Link href={`/${locale}${path}`} className="link-underline hover:text-bone">
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.services} className="md:col-span-2">
            <h2 className="text-sm font-semibold text-bone">{t.footer.services}</h2>
            <ul className="mt-5 space-y-3 text-bone-muted">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services#${s.slug}`} className="link-underline hover:text-bone">
                    {s.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold text-bone">{t.footer.contact}</h2>
            <ul className="mt-5 space-y-3 text-bone-muted">
              <li>
                <a href={`tel:${site.phones.office.tel}`} className="ltr-nums hover:text-ember">
                  {site.phones.office.display}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phones.mobile.tel}`} className="ltr-nums hover:text-ember">
                  {site.phones.mobile.display}
                </a>
              </li>
              <li className="text-sm">{site.hours[locale]}</li>
              <li className="text-sm">{site.city[locale]}</li>
            </ul>
          </div>
        </div>

        <div
          aria-hidden
          data-text="MIRKAZEMI"
          className="pointer-events-none mt-20 select-none text-center font-brand text-[18vw] font-extralight leading-none tracking-[0.08em] text-bone/[0.04] after:content-[attr(data-text)] md:text-[14vw]"
          dir="ltr"
        />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 border-t border-bone/10 pt-6 text-sm text-bone-dim md:flex-row md:items-center">
          <p>
            © {locale === 'fa' ? new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(year) : year} {site.name[locale]}. {t.footer.rights}
          </p>
          <BackToTop label={t.a11y.backToTop} />
        </div>
      </div>
    </footer>
  );
}
