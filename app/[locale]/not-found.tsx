'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/data/translations';

export default function NotFound() {
  const pathname = usePathname() || '';
  const locale = pathname.startsWith('/en') ? 'en' : 'fa';
  const t = getDictionary(locale).notFound;
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div className="blueprint-bg absolute inset-0 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="container relative text-center">
        <p className="font-brand text-[8rem] font-extralight leading-none text-ember md:text-[12rem]" dir="ltr">
          404
        </p>
        <h1 className="mt-6 text-display-md font-bold">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-bone-muted">{t.text}</p>
        <Link href={`/${locale}`} className="btn-primary mt-10">
          {t.back}
        </Link>
      </div>
    </section>
  );
}
