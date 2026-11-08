import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { SplitText } from '@/components/motion/SplitText';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/services', title: t.services.eyebrow, description: t.services.lead, image: '/images/svc-consulting.jpg' });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const s = t.services;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.lead} image="/images/svc-turnkey.jpg">
        <nav aria-label={s.eyebrow} className="mt-12 flex flex-wrap gap-3" data-reveal>
          {services.map((svc) => (
            <a
              key={svc.slug}
              href={`#${svc.slug}`}
              className="rounded-full border border-bone/15 px-5 py-2 text-sm text-bone-muted transition-colors hover:border-ember hover:text-bone"
            >
              <span className="me-2 font-brand text-xs text-ember" dir="ltr">
                {localizeDigits(svc.index, locale)}
              </span>
              {svc.title[locale]}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((svc, si) => (
        <section
          key={svc.slug}
          id={svc.slug}
          aria-labelledby={`${svc.slug}-title`}
          className={`scroll-mt-24 border-t border-bone/10 py-24 md:py-32 ${si % 2 ? 'bg-ink-900' : ''}`}
        >
          <div className="container grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="font-brand text-sm tracking-[0.3em] text-ember" dir="ltr">
                  {localizeDigits(svc.index, locale)} / {localizeDigits('04', locale)}
                </p>
                <SplitText id={`${svc.slug}-title`} text={svc.title[locale]} className="mt-4 text-display-md font-bold" />
                <p className="mt-6 text-bone-muted" data-reveal>
                  {svc.description[locale]}
                </p>
                <div className="relative mt-10 aspect-[16/11] overflow-hidden" data-reveal="clip">
                  <Image
                    data-zoom
                    src={svc.image}
                    alt={svc.title[locale]}
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Link href={`/${locale}/contact?subject=${svc.slug}`} className="btn-primary mt-10" data-reveal>
                  {svc.cta[locale]}
                  <span aria-hidden className="flip-x-rtl">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-sm text-bone-dim" data-reveal>
                {s.stagesLabel}
              </p>
              <div className="mt-6 border-t border-bone/10">
                {svc.stages.map((stage, i) => (
                  <details key={i} className="group border-b border-bone/10" open={i === 0} data-reveal>
                    <summary className="flex cursor-pointer list-none items-start gap-5 py-7 [&::-webkit-details-marker]:hidden">
                      <span className="mt-1 font-brand text-sm text-ember" dir="ltr">
                        {localizeDigits(`0${i + 1}`, locale)}
                      </span>
                      <span className="flex-1">
                        <span className="block text-xl font-bold md:text-2xl">{stage.title[locale]}</span>
                        <span className="mt-2 block text-bone-muted">{stage.summary[locale]}</span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-bone/20 text-lg transition-transform duration-500 ease-cine group-open:rotate-45 group-open:border-ember group-open:text-ember"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-8 ps-10">
                      <p className="text-sm font-semibold text-bone">{s.actions}</p>
                      <ul className="mt-4 space-y-3 text-bone-muted">
                        {stage.actions[locale].map((a) => (
                          <li key={a} className="flex gap-3">
                            <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-ember" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 border-s-2 border-ember bg-ember/[0.06] p-5">
                        <p className="text-xs text-ember">{s.deliverable}</p>
                        <p className="mt-1 font-bold text-bone">{stage.deliverable.title[locale]}</p>
                        <p className="mt-1 text-sm text-bone-muted">{stage.deliverable.text[locale]}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-bone/10 py-24 md:py-32">
        <div className="container text-center">
          <SplitText text={s.ctaTitle} className="mx-auto max-w-3xl text-display-lg font-bold" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-bone-muted" data-reveal>
            {s.ctaLead}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary mt-10" data-reveal>
            {t.nav.cta}
            <span aria-hidden className="flip-x-rtl">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
