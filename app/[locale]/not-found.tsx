'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import { localizeDigits } from '@/lib/i18n';

export default function NotFound() {
  const pathname = usePathname() || '';
  const locale = pathname.startsWith('/en') ? 'en' : 'fa';
  const t = getDictionary(locale).notFound;
  return (
    <section className="flex min-h-[86svh] items-center pt-[var(--header-h)]">
      <div className="container">
        <p className="label enter">
          <span className="num">{localizeDigits('404', locale)}</span>
        </p>
        <h1 className="display t-h1 enter mt-7" style={{ animationDelay: '0.1s' }}>
          {t.title}
        </h1>
        <p className="lead enter mt-6 max-w-md" style={{ animationDelay: '0.2s' }}>
          {t.text}
        </p>
        <Link href={`/${locale}`} className="btn-primary enter mt-10" style={{ animationDelay: '0.3s' }}>
          {t.back}
          <span aria-hidden className="arrow">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
