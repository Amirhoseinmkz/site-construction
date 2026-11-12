import type { Metadata } from 'next';
import Link from 'next/link';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getFaqs, getProcessPhases } from '@/lib/db/content';
import { PageHero } from '@/components/ui/PageHero';
import { Heading } from '@/components/ui/Heading';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/process', title: t.process.label, description: t.process.lead });
}

export default async function ProcessPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const pr = t.process;
  const phases = getProcessPhases(locale);
  const faqs = getFaqs(locale);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero label={pr.label} title={pr.title} lead={pr.lead} />

      <section className="pb-section" data-progress-root>
        <div className="container relative">
          {/* scroll progress along the start edge */}
          <span aria-hidden className="absolute inset-y-0 start-[var(--gutter)] hidden w-px bg-line md:block" />
          <span aria-hidden data-progress="vertical" className="absolute inset-y-0 start-[var(--gutter)] hidden w-px origin-top bg-fg md:block" />
          <ol>
            {phases.map((ph) => (
              <li key={ph.index} className="grid gap-x-8 gap-y-8 border-b border-line py-14 md:grid-cols-12 md:py-24 md:ps-14">
                <div className="md:col-span-5">
                  <span aria-hidden className="display t-stat block text-fg/25" data-reveal>
                    {localizeDigits(ph.index, locale)}
                  </span>
                  <h2 className="display t-h2 mt-6" data-reveal>
                    {ph.title}
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="lead" data-reveal>
                    {ph.text}
                  </p>
                  <h3 className="label mt-10" data-reveal>
                    {pr.whatHappens}
                  </h3>
                  <ul className="mt-5 border-t border-fg">
                    {ph.points.map((pt, i) => (
                      <li key={pt} className="flex items-baseline gap-5 border-b border-line py-4" data-reveal>
                        <span aria-hidden className="num text-xs text-muted">
                          {localizeDigits(`0${i + 1}`, locale)}
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="theme-surface py-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label" data-reveal>
              {pr.faqLabel}
            </p>
            <Heading id="faq-title" text={pr.faqTitle} className="mt-6" />
            <Link href={`/${locale}/contact`} className="btn-ghost mt-9" data-reveal>
              {t.nav.cta}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>
          <div className="border-t border-fg lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.question} className="border-b border-fg/15" data-reveal>
                <summary className="flex items-center justify-between gap-6 py-6 text-lg font-medium">
                  {f.question}
                  <span aria-hidden className="plus" />
                </summary>
                <p className="max-w-2xl pb-7 text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={t.home.contact.title} lead={t.home.contact.lead} cta={t.nav.cta} />
    </>
  );
}
