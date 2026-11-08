'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/data/translations';
import { site } from '@/data/site';
import { Logo } from './Logo';
import { useLenis } from '@/components/motion/MotionProvider';

type NavKey = 'services' | 'projects' | 'process' | 'about' | 'collaboration' | 'contact';
const NAV: { key: NavKey; path: string }[] = [
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'process', path: '/process' },
  { key: 'about', path: '/about' },
  { key: 'collaboration', path: '/collaboration' },
  { key: 'contact', path: '/contact' },
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

  // Solid background after leaving the top; hide while scrolling down, reveal on scroll up
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 400 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y <= 400) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + Esc to close while menu is open
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

  const setLocaleCookie = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-cine ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled && !open ? 'border-b border-bone/10 bg-ink-950/75 backdrop-blur-md' : 'border-b border-transparent'}`}
      >
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={`/${locale}`} aria-label={t.nav.home} className="relative z-10 shrink-0 text-bone">
            <Logo />
          </Link>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem] text-bone-muted">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.path}`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className="link-underline pb-1 transition-colors hover:text-bone aria-[current=page]:text-bone"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              href={`/${otherLocale}${rest}`}
              hrefLang={otherLocale}
              onClick={setLocaleCookie}
              aria-label={t.a11y.switchLang}
              className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-sm text-bone-muted transition-colors hover:border-ember hover:text-ember"
            >
              <span className={otherLocale === 'fa' ? 'font-sans' : 'font-brand text-xs font-semibold tracking-widest'}>
                {t.nav.langShort}
              </span>
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
              className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-bone transition-transform duration-500 ease-cine ${
                    open ? 'translate-y-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-bone transition-transform duration-500 ease-cine ${
                    open ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet full-screen menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-ink-950/98 pt-[var(--header-h)] lg:hidden"
      >
        <nav aria-label={t.a11y.mainNav} className="container flex flex-1 flex-col justify-center">
          <ul className="space-y-2">
            {[{ key: 'home' as const, path: '' }, ...NAV].map((item, i) => (
              <li key={item.key} className="overflow-hidden">
                <Link
                  href={`/${locale}${item.path}`}
                  aria-current={(item.path === '' ? rest === '' : isActive(item.path)) ? 'page' : undefined}
                  className="menu-item flex items-baseline gap-4 py-2 text-4xl font-bold text-bone/90 transition-colors aria-[current=page]:text-ember sm:text-5xl"
                  style={{ animationDelay: `${80 + i * 55}ms` }}
                >
                  <span className="font-brand text-xs font-semibold text-bone-dim">0{i + 1}</span>
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 py-6 text-sm text-bone-muted">
          <a href={`tel:${site.phones.office.tel}`} className="ltr-nums">
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
