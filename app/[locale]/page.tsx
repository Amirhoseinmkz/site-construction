import Image from 'next/image';
import Link from 'next/link';
import { localizeDigits } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProcessPhases, getProjects, getServices } from '@/lib/db/content';
import { Heading } from '@/components/ui/Heading';
import { Film } from '@/components/home/Film';
import { Reel } from '@/components/home/Reel';

export default async function HomePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const h = t.home;
  const services = getServices(locale);
  const phases = getProcessPhases(locale);
  const projects = getProjects(locale);

  return (
    <>
      {/* The film: a site is surveyed, drawn, built and handed over as you scroll */}
      <Film
        label={h.hero.label}
        title={h.hero.title as [string, string]}
        scroll={h.hero.scroll}
        chapters={phases.map((p) => ({ index: localizeDigits(p.index, locale), title: p.title }))}
        total={localizeDigits(String(phases.length).padStart(2, '0'), locale)}
        finaleTitle={h.contact.title}
        cta={t.nav.cta}
        ctaHref={`/${locale}/contact`}
      />

      {/* One sentence, lit word by word */}
      <section className="py-section">
        <div className="container">
          <p className="statement max-w-6xl" data-scrub-words>
            {h.manifesto.split(' ').map((w, i) => (
              <span key={i}>{w} </span>
            ))}
          </p>
        </div>
      </section>

      {/* Four ways in */}
      <section aria-labelledby="services-title" className="pb-section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading id="services-title" text={h.services.title} size="t-2" />
            <Link href={`/${locale}/services`} className="btn-ghost" data-reveal>
              {h.services.link}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>

          <ul className="mt-12 border-t border-fg md:mt-16">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line" data-reveal>
                <Link
                  href={`/${locale}/services#${s.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 md:grid-cols-[6rem_1fr_auto_auto] md:gap-x-10 md:py-10"
                >
                  <span className="num self-start pt-3 text-sm text-muted">{localizeDigits(s.index, locale)}</span>
                  <span className="transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                    <span className="display t-1 block">{s.title}</span>
                  </span>
                  <span className="relative hidden h-24 w-40 overflow-hidden rounded-xl opacity-0 transition-opacity duration-700 ease-cine group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                    <Image src={s.image} alt="" fill sizes="160px" className="photo object-cover" />
                  </span>
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full border border-fg/25 transition-colors duration-500 ease-cine group-hover:border-glow group-hover:bg-glow group-hover:text-[#0a0e14] md:h-16 md:w-16"
                  >
                    <span className="arrow">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work, sideways */}
      <Reel
        locale={locale}
        label={h.projects.label}
        title={h.projects.title}
        allLabel={h.projects.all}
        slides={projects.map((p) => ({ slug: p.slug, code: p.code, title: p.title, place: p.location.split(/[—,،]/).pop()!.trim(), image: p.image }))}
      />
    </>
  );
}
