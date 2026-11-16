'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/** Day / night switch. The choice is remembered in this browser only. */
export function ThemeToggle({ dayLabel, nightLabel }: { dayLabel: string; nightLabel: string }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const set = (t: Theme) => {
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem('mkz-theme', t);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
  };

  return (
    <div role="group" className="inline-flex rounded-full border border-fg/20 p-1 text-sm">
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => set(t)}
          className="rounded-full px-4 py-1.5 text-muted transition-colors duration-300 aria-pressed:bg-fg aria-pressed:text-bg"
        >
          {t === 'light' ? dayLabel : nightLabel}
        </button>
      ))}
    </div>
  );
}
