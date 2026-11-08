'use client';

import { usePathname } from 'next/navigation';
import { getDictionary } from '@/data/translations';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const pathname = usePathname() || '';
  const t = getDictionary(pathname.startsWith('/en') ? 'en' : 'fa').error;
  return (
    <section className="flex min-h-[70svh] items-center pt-24">
      <div className="container text-center">
        <h1 className="text-display-md font-bold">{t.title}</h1>
        <button type="button" onClick={reset} className="btn-primary mt-10">
          {t.retry}
        </button>
      </div>
    </section>
  );
}
