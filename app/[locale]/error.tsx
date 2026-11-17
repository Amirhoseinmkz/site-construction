'use client';

import { usePathname } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const pathname = usePathname() || '';
  const t = getDictionary(pathname.startsWith('/en') ? 'en' : 'fa').error;
  return (
    <section data-error-page className="flex min-h-[90svh] items-center pt-[var(--header-h)]">
      <div className="container">
        <h1 className="display t-1">{t.title}</h1>
        <button type="button" onClick={reset} className="btn-glow mt-10">
          {t.retry}
        </button>
      </div>
    </section>
  );
}
