import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getServices } from '@/lib/db/content';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { SplitText } from '@/components/motion/SplitText';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/services', title: t.services.label, description: t.services.lead, image: '/images/svc-consulting.jpg' });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const s = t.services;
  const services = getServices(locale);
  const total = localizeDigits(String(services.length).padStart(2, '0'), locale);

  return (
    <>
      <PageHero label={s.label} title={s.title} lead={s.lead}>
        <nav aria-label={s.label} className="enter mt-12 flex flex-wrap gap-2" style={{ animationDelay: '0.4s' }}>
          {services.map((svc) => (
            <a key={svc.slug} href={`#${svc.slug}`} className="chip">
              <span className="num text-xs opacity-60">{localizeDigits(svc.index, locale)}</span>
              {svc.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((svc, si) => (
        <section
          key={svc.slug}
          id={svc.slug}
          aria-labelledby={`${svc.slug}-title`}
          className={`scroll-mt-20 py-section ${si % 2 ? 'theme-surface' : ''}`}
        >
          <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="num text-sm text-muted" data-reveal>
                  {localizeDigits(svc.index, locale)} / {total}
                </p>
                <SplitText id={`${svc.slug}-title`} text={svc.title} className="display t-h2 mt-5" />
                <p className="mt-6 max-w-lg text-muted" data-reveal>
                  {svc.description}
                </p>
                <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-2xl" data-reveal="clip">
                  <Image data-zoom src={svc.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="photo object-cover" />
                </div>
                <Link href={`/${locale}/contact?subject=${svc.slug}`} className="btn-primary mt-9" data-reveal>
                  {svc.cta}
                  <span aria-hidden className="arrow">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="label" data-reveal>
                {s.stages}
              </p>
              <div className="mt-6 border-t border-fg">
                {svc.stages.map((stage, i) => (
                  <details key={i} className="border-b border-line" open={i === 0} data-reveal>
                    <summary className="flex items-start gap-5 py-7">
                      <span className="num pt-1.5 text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                      <span className="flex-1">
                        <span className="display t-h3 block">{stage.title}</span>
                        <span className="mt-2.5 block text-muted">{stage.summary}</span>
                      </span>
                      <span aria-hidden className="plus" />
                    </summary>
                    <div className="pb-9 ps-9 md:ps-10">
                      <h4 className="text-sm font-medium">{s.actions}</h4>
                      <ul className="mt-4 space-y-3 text-muted">
                        {stage.actions.map((a) => (
                          <li key={a} className="flex gap-3.5">
                            <span aria-hidden className="mt-[0.85em] h-px w-4 shrink-0 bg-fg/40" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className={`mt-7 rounded-2xl p-6 ${si % 2 ? 'bg-bg' : 'bg-surface'}`}>
                        <p className="text-sm text-muted">{s.deliverable}</p>
                        <p className="mt-1.5 text-lg font-medium">{stage.deliverable.title}</p>
                        <p className="mt-1.5 text-muted">{stage.deliverable.text}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand locale={locale} title={s.ctaTitle} lead={s.ctaLead} cta={t.nav.cta} />
    </>
  );
}
