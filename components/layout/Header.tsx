'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';
import { site } from '@/data/site';
import { Logo } from './Logo';
import { useLenis } from '@/components/motion/MotionProvider';

type NavKey = 'services' | 'projects' | 'process' | 'about' | 'collaboration';
const NAV: { key: NavKey; path: string }[] = [
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'process', path: '/process' },
  { key: 'about', path: '/about' },
  { key: 'collaboration', path: '/collaboration' },
];

export function Header({ locale, t }: { locale: Locale; t: Pick<Dictionary, 'nav' | 'a11y'> }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  const rest = pathname.replace(/^\/(fa|en)/, '');
  const otherLocale: Locale = locale === 'fa' ? 'en' : 'fa';
  const isActive = (path: string) => rest === path || rest.startsWith(`${path}/`);

  // Solid bar after leaving the top; hides on scroll down, returns on scroll up
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 400 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 400) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // While the menu is open: lock scrolling, close on Escape
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
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
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-fg transition-[transform,background-color,border-color] duration-500 ease-cine ${
          open ? 'theme-dark !bg-transparent' : ''
        } ${hidden && !open ? '-translate-y-full' : ''} ${
          scrolled && !open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={`/${locale}`} aria-label={t.nav.home} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.95rem]">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.path}`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className="nav-link"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href={`/${otherLocale}${rest}`}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={rememberLocale}
              aria-label={t.a11y.switchLang}
              className="nav-link text-[0.95rem]"
            >
              {t.nav.langShort}
            </Link>
            <Link href={`/${locale}/contact`} className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              {t.nav.cta}
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              className="-me-2 grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className="relative block h-2.5 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-cine ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-cine ${
                    open ? '-translate-y-[4px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (mobile / tablet) */}
      <div id="mobile-menu" hidden={!open} className="theme-dark fixed inset-0 z-40 flex flex-col pt-[var(--header-h)] lg:hidden">
        <nav aria-label={t.a11y.mainNav} className="container flex flex-1 flex-col justify-center">
          <ul>
            {[{ key: 'home' as const, path: '' }, ...NAV, { key: 'contact' as const, path: '/contact' }].map((item, i) => (
              <li key={item.key} className="overflow-hidden border-b border-line">
                <Link
                  href={`/${locale}${item.path}`}
                  aria-current={(item.path === '' ? rest === '' : isActive(item.path)) ? 'page' : undefined}
                  className="menu-item display flex items-baseline justify-between py-3 text-4xl aria-[current=page]:opacity-50 sm:text-5xl"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {t.nav[item.key]}
                  <span className="num font-sans text-xs text-muted">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted">
          <a href={`tel:${site.phones.office.tel}`} className="ltr">
            {site.phones.office.display}
          </a>
          <Link href={`/${locale}/contact`} className="btn-primary !py-2.5">
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
