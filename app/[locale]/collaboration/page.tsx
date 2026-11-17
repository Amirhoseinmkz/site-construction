import type { Metadata } from 'next';
import { plain } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHead } from '@/components/ui/PageHead';
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
      <PageHead compact label={c.label} title={c.title} lead={c.lead} />

      {/* The two main ways to work with us */}
      <section className="pb-[clamp(2rem,5vw,4rem)]">
        <div className="container grid gap-6 md:grid-cols-2 md:gap-8">
          {c.tracks.slice(0, 2).map((tr, i) => (
            <article key={tr.title} className="rounded-[1.75rem] border border-line p-7 md:p-12" data-reveal>
              <span className="num text-sm text-muted">{plain(i + 1, locale)}</span>
              <h2 className="display t-2 mt-10 md:mt-20">{tr.title}</h2>
              <p className="mt-5 max-w-md text-muted">{tr.text}</p>
              <ul className="mt-8 border-t border-fg">
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

      {/* More ways in */}
      <section className="pb-section">
        <div className="container grid gap-6 md:grid-cols-3 md:gap-8">
          {c.tracks.slice(2).map((tr, i) => (
            <article key={tr.title} className="group rounded-[1.5rem] border border-line p-7 transition-colors duration-500 ease-cine hover:border-fg/50" data-reveal>
              <span className="num text-sm text-muted">{plain(i + 3, locale)}</span>
              <h2 className="display t-3 mt-8">{tr.title}</h2>
              <p className="mt-4 text-sm text-muted">{tr.text}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {tr.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-glow" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* How a partnership works */}
      <section aria-labelledby="steps-title" className="theme-surface py-section">
        <div className="container">
          <p className="label" data-reveal>
            {c.stepsLabel}
          </p>
          <Heading id="steps-title" text={c.stepsTitle} size="t-2" className="mt-5" />
          <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {c.steps.map((st, i) => (
              <li key={st.title} className="border-t border-fg pt-5" data-reveal>
                <span className="display t-stat block text-fg/25">{plain(i + 1, locale)}</span>
                <h3 className="display t-3 mt-6">{st.title}</h3>
                <p className="mt-3 text-muted">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="calculator" aria-labelledby="calc-title" className="scroll-mt-16 py-section">
        <div className="container">
          <Heading id="calc-title" text={c.calcTitle} size="t-2" className="mb-12 md:mb-16" />
          <div data-reveal>
            <PartnershipCalculator locale={locale} t={t.calc} />
          </div>
        </div>
      </section>

      <section aria-labelledby="collab-form-title" className="theme-surface py-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading id="collab-form-title" text={c.formTitle} size="t-2" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source="collaboration" types={['partnership', 'subcontractor', 'consultation']} defaultType="partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
