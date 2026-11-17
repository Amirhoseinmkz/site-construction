'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/** Day / night switch (a sun or a moon). The choice is remembered in this browser only. */
export function ThemeToggle({ dayLabel, nightLabel }: { dayLabel: string; nightLabel: string }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('mkz-theme', next);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? dayLabel : nightLabel}
      title={theme === 'dark' ? dayLabel : nightLabel}
      className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-fg/10 hover:text-fg"
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
          <path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" />
        </svg>
      )}
    </button>
  );
}
