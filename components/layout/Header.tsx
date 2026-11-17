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
 * The bar is always visible: the six pages as plain links, with a thin line
 * that slides to the hovered link and rests under the current page, then the
 * day/night toggle, the language switch and the call to action. No frame
 * around the links. On phones the links spread evenly across a second row
 * under the logo (nothing scrolls sideways, nothing is hidden). Once the page
 * has moved, the bar gets a soft backdrop so it never overprints content.
 */
export function Header({ locale, t }: { locale: Locale; t: Pick<Dictionary, 'nav' | 'a11y'> }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light' | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const lastY = useRef(0);
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
        setScrolled(y > 12);
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

  const rememberLocale = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
  };
  const toneClass = tone === 'dark' ? 'theme-dark' : tone === 'light' ? 'theme-light' : '';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] border-b transition-[transform,background-color,border-color] duration-500 ease-cine ${toneClass} ${
        scrolled ? '!bg-bg/85 border-line backdrop-blur-md' : '!bg-transparent border-transparent'
      } ${hidden ? '-translate-y-full' : ''}`}
    >
      <div className="container flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 pt-3.5 md:h-[var(--header-h)] md:gap-x-6 md:flex-nowrap md:py-0">
        <Link href={`/${locale}`} aria-label={t.nav.home} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t.a11y.mainNav} className="order-3 w-full overflow-x-auto pb-1 [scrollbar-width:none] md:order-none md:w-auto md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          <ul onPointerLeave={() => setHover(null)} className="relative flex w-full min-w-max items-center justify-between md:w-auto md:min-w-0 md:justify-start md:gap-1">
            {pill && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px bg-glow transition-[transform,width] duration-500 ease-cine md:bottom-1"
                style={{ width: Math.max(pill.w - 16, 8), transform: `translateX(${pill.x + 8}px)` }}
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
                  className="block whitespace-nowrap px-1 py-2.5 text-[clamp(0.72rem,3.2vw,0.85rem)] text-muted transition-colors duration-300 hover:text-fg aria-[current=page]:text-fg md:px-4 md:py-2 md:text-[0.95rem]"
                >
                  {t.nav[item.key]}
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
