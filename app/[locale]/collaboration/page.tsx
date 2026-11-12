import type { Metadata } from 'next';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { Heading } from '@/components/ui/Heading';
import { LeadForm } from '@/components/ui/LeadForm';
import { PartnershipCalculator } from '@/components/ui/PartnershipCalculator';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/collaboration', title: t.collaboration.label, description: t.collaboration.lead });
}

export default async function CollaborationPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const c = t.collaboration;

  return (
    <>
      <PageHero label={c.label} title={c.title} lead={c.lead} />

      {/* Two ways to work with us */}
      <section className="py-section">
        <div className="container grid gap-6 md:grid-cols-2 md:gap-8">
          {c.tracks.map((tr, i) => (
            <article key={tr.title} className="flex flex-col rounded-[1.75rem] border border-line p-7 md:p-12" data-reveal>
              <span className="num text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
              <h2 className="display t-h2 mt-10 md:mt-20">{tr.title}</h2>
              <p className="mt-5 max-w-md text-muted">{tr.text}</p>
              <ul className="mt-10 border-t border-fg">
                {tr.items.map((it) => (
                  <li key={it} className="border-b border-line py-3.5">
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" aria-labelledby="calc-title" className="theme-surface scroll-mt-20 py-section">
        <div className="container">
          <p className="label" data-reveal>
            {c.calcLabel}
          </p>
          <Heading id="calc-title" text={c.calcTitle} className="mb-12 mt-6 md:mb-16" />
          <div data-reveal>
            <PartnershipCalculator locale={locale} t={t.calc} />
          </div>
        </div>
      </section>

      {/* Request */}
      <section aria-labelledby="collab-form-title" className="py-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading id="collab-form-title" text={c.formTitle} />
            <p className="lead mt-6 max-w-md" data-reveal>
              {t.home.contact.lead}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source="collaboration" types={['partnership', 'subcontractor', 'consultation']} defaultType="partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
