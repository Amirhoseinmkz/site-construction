import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { Heading } from './Heading';

interface Props {
  locale: Locale;
  title: string;
  lead?: string;
  cta: string;
  href?: string;
}

/** Closing call-to-action: a quiet dark band that leads into the footer. */
export function CtaBand({ locale, title, lead, cta, href = '/contact' }: Props) {
  return (
    <section className="theme-dark py-section">
      <div className="container flex flex-col items-center text-center">
        <Heading text={title} size="t-h1" className="max-w-4xl" />
        {lead && (
          <p className="lead mt-7 max-w-xl" data-reveal>
            {lead}
          </p>
        )}
        <Link href={`/${locale}${href}`} className="btn-primary mt-10" data-reveal>
          {cta}
          <span aria-hidden className="arrow">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
