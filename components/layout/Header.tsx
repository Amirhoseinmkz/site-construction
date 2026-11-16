'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';
import { site } from '@/data/site';
import { localizeDigits } from '@/lib/i18n';
import { Logo } from './Logo';
import { useLenis } from '@/components/motion/MotionProvider';
import { SocialLinks } from '@/components/ui/Social';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

type NavKey = 'home' | 'services' | 'projects' | 'about' | 'collaboration' | 'contact';
const NAV: { key: NavKey; path: string }[] = [
  { key: 'home', path: '' },
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'collaboration', path: '/collaboration' },
  { key: 'contact', path: '/contact' },
];

export function Header({ locale, t }: { locale: Locale; t: Pick<Dictionary, 'nav' | 'a11y'> }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light' | null>(null);
  const lastY = useRef(0);
  const button = useRef<HTMLButtonElement>(null);

  const rest = pathname.replace(/^\/(fa|en)/, '');
  const other: Locale = locale === 'fa' ? 'en' : 'fa';
  const isActive = (path: string) => (path === '' ? rest === '' : rest === path || rest.startsWith(`${path}/`));

  // Hide on the way down, return on the way up; take the tone of whatever is under the bar
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 300 && y > lastY.current + 6) setHidden(true);
        else if (y < lastY.current - 6 || y <= 300) setHidden(false);
        lastY.current = y;
        const under = [...document.querySelectorAll<HTMLElement>('[data-header-tone]')].find((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 40 && r.bottom > 40;
        });
        setTone(under ? ((under.dataset.tone ?? under.dataset.headerTone) as 'dark' | 'light') : null);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  // While the menu is open: stop scrolling, close on Escape
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  const rememberLocale = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
  };
  const toneClass = open || tone === 'dark' ? 'theme-dark' : tone === 'light' ? 'theme-light' : '';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] !bg-transparent transition-transform duration-700 ease-cine ${toneClass} ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={`/${locale}`} aria-label={t.nav.home} className="shrink-0">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/${other}${rest}`}
              hrefLang={other}
              lang={other}
              onClick={rememberLocale}
              aria-label={t.a11y.switchLang}
              className="nav-link px-2 text-[0.95rem]"
            >
              {t.nav.langShort}
            </Link>
            <button
              ref={button}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group inline-flex items-center gap-3 rounded-full border border-fg/25 py-2.5 ps-5 pe-4 text-[0.95rem] transition-colors duration-500 ease-cine hover:border-fg"
            >
              <span>{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden className="relative block h-2.5 w-5">
                <span className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-cine ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-cine ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
        className="menu theme-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto pt-[var(--header-h)]"
      >
        <div className="container grid flex-1 content-center gap-12 py-10 lg:grid-cols-12">
          <nav aria-label={t.a11y.mainNav} className="lg:col-span-8">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.key} className="menu-item overflow-hidden" style={{ ['--i' as string]: i }}>
                  <Link
                    href={`/${locale}${item.path}`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className="group flex items-baseline gap-5 py-1.5 transition-opacity duration-500 aria-[current=page]:text-glow"
                  >
                    <span className="num w-8 shrink-0 text-xs text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                    <span className="display t-1 transition-transform duration-700 ease-cine [font-size:clamp(2.3rem,min(7vw,9.5svh),6.25rem)] group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                      {t.nav[item.key]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-item flex flex-col justify-end gap-8 lg:col-span-4" style={{ ['--i' as string]: 6 }}>
            <div>
              <p className="label !flex">{t.nav.contact}</p>
              <a href={`tel:${site.phones.office.tel}`} className="nav-link ltr display t-3 mt-3">
                {localizeDigits(site.phones.office.display, locale)}
              </a>
              <br />
              <a href={`tel:${site.phones.mobile.tel}`} className="nav-link ltr display t-3 mt-1">
                {localizeDigits(site.phones.mobile.display, locale)}
              </a>
              <p className="mt-3 text-sm text-muted">{site.hours[locale]}</p>
            </div>
            <SocialLinks />
            <ThemeToggle dayLabel={t.nav.day} nightLabel={t.nav.night} />
          </div>
        </div>
      </div>
    </>
  );
}
