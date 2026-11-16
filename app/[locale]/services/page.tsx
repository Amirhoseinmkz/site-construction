import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getServices } from '@/lib/db/content';
import { PageHead } from '@/components/ui/PageHead';
import { SplitText } from '@/components/motion/SplitText';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/services', title: t.services.label, description: t.services.lead, image: '/images/svc-consulting.jpg' });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const s = t.services;
  const services = getServices(locale);

  return (
    <>
      <PageHead label={s.label} title={s.title}>
        <nav aria-label={s.label} className="enter mt-10 flex flex-wrap gap-2" style={{ animationDelay: '0.4s' }}>
          {services.map((svc) => (
            <a key={svc.slug} href={`#${svc.slug}`} className="chip">
              <span className="num text-xs opacity-60">{localizeDigits(svc.index, locale)}</span>
              {svc.title}
            </a>
          ))}
        </nav>
      </PageHead>

      {services.map((svc, si) => (
        <section key={svc.slug} id={svc.slug} aria-labelledby={`${svc.slug}-title`} className={`scroll-mt-16 py-section ${si % 2 ? 'theme-surface' : ''}`}>
          <div className="container grid gap-x-10 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="num display t-1 text-muted/50" data-reveal>
                  {localizeDigits(svc.index, locale)}
                </p>
                <SplitText id={`${svc.slug}-title`} text={svc.title} className="display t-2 mt-4" />
                <p className="mt-5 max-w-md text-muted" data-reveal>
                  {svc.tagline}
                </p>
                <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl" data-reveal="clip">
                  <Image data-zoom src={svc.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="photo object-cover" />
                </div>
                <Link href={`/${locale}/contact?subject=${svc.slug}`} className="btn-glow mt-8" data-reveal>
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
                  <details key={i} className="border-b border-line" data-reveal>
                    <summary className="flex items-center gap-5 py-6">
                      <span className="num w-8 shrink-0 text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                      <span className="display t-3 flex-1">{stage.short}</span>
                      <span aria-hidden className="plus" />
                    </summary>
                    <div className="pb-8 ps-[3.25rem]">
                      <p className="text-muted">{stage.summary}</p>
                      <ul className="mt-5 space-y-3 text-sm text-muted">
                        {stage.actions.map((a) => (
                          <li key={a} className="flex gap-3.5">
                            <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-glow" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 rounded-2xl border border-line p-5">
                        <p className="label">{s.deliverable}</p>
                        <p className="mt-2 text-lg font-medium">{stage.deliverable.title}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
