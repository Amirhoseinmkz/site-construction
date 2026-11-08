import type { Metadata } from 'next';
import Link from 'next/link';
import { processPhases, faqs } from '@/data/process';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { SplitText } from '@/components/motion/SplitText';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/process', title: t.process.eyebrow, description: t.process.lead });
}

export default async function ProcessPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const pr = t.process;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero eyebrow={pr.eyebrow} title={pr.title} lead={pr.lead} image="/images/svc-consulting.jpg" />

      <section className="relative pb-24 md:pb-36" data-progress-root>
        <div className="container relative">
          <span aria-hidden className="absolute inset-y-0 start-5 hidden w-px bg-bone/10 md:start-8 md:block xl:start-12" />
          <span
            aria-hidden
            data-progress="vertical"
            className="absolute inset-y-0 start-5 hidden w-px origin-top bg-ember md:start-8 md:block xl:start-12"
          />
          <ol className="space-y-24 md:space-y-36">
            {processPhases.map((ph) => (
              <li key={ph.index} className="relative grid gap-10 md:grid-cols-12 md:ps-16">
                <div className="md:col-span-5">
                  <span
                    aria-hidden
                    className="block font-brand text-[7rem] font-extralight leading-none text-bone/[0.07] md:text-[10rem]"
                    dir="ltr"
                    data-reveal
                  >
                    {ph.index}
                  </span>
                  <h2 className="-mt-10 text-display-md font-bold md:-mt-14" data-reveal>
                    <span className="me-3 font-brand text-base text-ember" dir="ltr">
                      {localizeDigits(ph.index, locale)}
                    </span>
                    {ph.title[locale]}
                  </h2>
                </div>
                <div className="md:col-span-6 md:col-start-7 md:pt-24">
                  <p className="text-lg text-bone-muted" data-reveal>
                    {ph.text[locale]}
                  </p>
                  <h3 className="mt-10 text-sm text-ember" data-reveal>
                    {pr.whatHappens}
                  </h3>
                  <ul className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
                    {ph.points[locale].map((pt) => (
                      <li key={pt} className="flex items-center gap-4 py-4" data-reveal>
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-ember" />
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

      <section aria-labelledby="faq-title" className="border-t border-bone/10 bg-ink-900 py-24 md:py-32">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              {pr.faqEyebrow}
            </p>
            <SplitText id="faq-title" text={pr.faqTitle} className="mt-5 text-display-md font-bold" />
            <Link href={`/${locale}/contact`} className="btn-ghost mt-10" data-reveal>
              {t.nav.cta}
            </Link>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q.en} className="group border-b border-bone/10" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q[locale]}
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-bone/20 transition-transform duration-500 ease-cine group-open:rotate-45 group-open:border-ember group-open:text-ember"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 text-bone-muted">{f.a[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
