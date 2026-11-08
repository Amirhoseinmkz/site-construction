import type { Metadata } from 'next';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { SplitText } from '@/components/motion/SplitText';
import { LeadForm } from '@/components/ui/LeadForm';
import { PartnershipCalculator } from '@/components/ui/PartnershipCalculator';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/collaboration', title: t.collaboration.eyebrow, description: t.collaboration.lead });
}

export default async function CollaborationPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const c = t.collaboration;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} image="/images/proj-res-2.jpg" />

      <section className="pb-24 md:pb-32">
        <div className="container grid gap-8 md:grid-cols-2">
          {c.tracks.map((tr) => (
            <article key={tr.code} className="group relative border border-bone/10 bg-ink-900/60 p-8 transition-colors duration-500 hover:border-ember/40 md:p-12" data-reveal>
              <span className="font-brand text-sm tracking-[0.3em] text-ember" dir="ltr">
                {localizeDigits(tr.code, locale)}
              </span>
              <h2 className="mt-8 text-display-md font-bold">{tr.title}</h2>
              <p className="mt-4 text-bone-muted">{tr.text}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {tr.items.map((it) => (
                  <li key={it} className="rounded-full border border-bone/15 px-4 py-1.5 text-sm text-bone-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="calculator" className="border-t border-bone/10 bg-ink-900 py-24 md:py-32">
        <div className="container">
          <p className="eyebrow" data-reveal>
            {t.home.calcEyebrow}
          </p>
          <SplitText text={t.home.calcTitle} className="mb-12 mt-5 text-display-md font-bold" />
          <div data-reveal>
            <PartnershipCalculator locale={locale} t={t.calc} />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SplitText text={c.formTitle} className="text-display-md font-bold" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <LeadForm
              locale={locale}
              t={t.form}
              source="collaboration"
              types={['partnership', 'subcontractor', 'consultation']}
              defaultType="partnership"
            />
          </div>
        </div>
      </section>
    </>
  );
}
