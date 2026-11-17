'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries';
import { Logo } from './Logo';
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

/**
 * The bar is always visible: a floating glass pill with the six pages, a
 * sliding highlight that follows the pointer (and rests on the current page),
 * the language switch, the day/night toggle and the call to action.
 * On phones the pill drops under the logo as a swipeable row — no hidden menu.
 */
export function Header({ locale, t }: { locale: Locale; t: Pick<Dictionary, 'nav' | 'a11y'> }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light' | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const lastY = useRef(0);
  const list = useRef<HTMLUListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  const rest = pathname.replace(/^\/(fa|en)/, '');
  const other: Locale = locale === 'fa' ? 'en' : 'fa';
  const isActive = (path: string) => (path === '' ? rest === '' : rest === path || rest.startsWith(`${path}/`));
  const activeIndex = NAV.findIndex((n) => isActive(n.path));

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

  // Place the highlight under the hovered link, or the current page
  const target = hover ?? (activeIndex >= 0 ? activeIndex : null);
  useLayoutEffect(() => {
    const place = () => {
      const el = target === null ? null : items.current[target];
      setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [target, locale]);

  // On phones the row scrolls: keep the current page in view
  useEffect(() => {
    const el = activeIndex >= 0 ? items.current[activeIndex] : null;
    if (el && list.current?.parentElement) {
      const box = list.current.parentElement;
      box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [activeIndex, pathname]);

  const rememberLocale = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
  };
  const toneClass = tone === 'dark' ? 'theme-dark' : tone === 'light' ? 'theme-light' : '';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] !bg-transparent transition-transform duration-700 ease-cine ${toneClass} ${
        hidden ? '-translate-y-full' : ''
      }`}
    >
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-3.5 md:h-[var(--header-h)] md:flex-nowrap md:py-0">
        <Link href={`/${locale}`} aria-label={t.nav.home} className="shrink-0">
          <Logo />
        </Link>

        <nav
          aria-label={t.a11y.mainNav}
          className="order-3 -mx-[var(--gutter)] w-[calc(100%+var(--gutter)*2)] overflow-x-auto px-[var(--gutter)] pb-3 [scrollbar-width:none] md:order-none md:mx-0 md:w-auto md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <ul
            ref={list}
            onPointerLeave={() => setHover(null)}
            className="relative mx-auto flex w-max items-center gap-0.5 rounded-full border border-fg/15 bg-bg/70 p-1 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl"
          >
            {pill && (
              <span
                aria-hidden
                className="absolute inset-y-1 left-0 rounded-full bg-fg/10 transition-[transform,width] duration-500 ease-cine"
                style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
              />
            )}
            {NAV.map((item, i) => (
              <li key={item.key} ref={(el) => void (items.current[i] = el)} className="relative">
                <Link
                  href={`/${locale}${item.path}`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  onPointerEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="relative block whitespace-nowrap rounded-full px-4 py-2 text-[0.92rem] text-muted transition-colors duration-300 hover:text-fg aria-[current=page]:text-fg"
                >
                  {t.nav[item.key]}
                  {isActive(item.path) && (
                    <span aria-hidden className="absolute inset-x-4 bottom-1 h-px bg-glow" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle dayLabel={t.nav.day} nightLabel={t.nav.night} />
          <Link
            href={`/${other}${rest}`}
            hrefLang={other}
            lang={other}
            onClick={rememberLocale}
            aria-label={t.a11y.switchLang}
            className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-[0.92rem] text-muted transition-colors duration-300 hover:bg-fg/10 hover:text-fg"
          >
            {t.nav.langShort}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-glow ms-1 hidden !px-6 !py-2.5 text-sm xl:inline-flex">
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
