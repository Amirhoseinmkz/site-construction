import Image from 'next/image';
import Link from 'next/link';
import { formatNumber, localizeDigits } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProcessPhases, getProjects, getServices } from '@/lib/db/content';
import { site } from '@/data/site';
import { SplitText } from '@/components/motion/SplitText';
import { Heading } from '@/components/ui/Heading';
import { LeadForm } from '@/components/ui/LeadForm';
import { HeroDrawing } from '@/components/home/HeroDrawing';
import { PlotDrawing } from '@/components/home/PlotDrawing';
import { HorizontalProjects } from '@/components/home/HorizontalProjects';

export default async function HomePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const h = t.home;
  const services = getServices(locale);
  const phases = getProcessPhases(locale);

  const slides = getProjects(locale).map((p) => ({
    slug: p.slug,
    code: p.code,
    title: p.title,
    location: p.location,
    category: t.projects.categories[p.category],
    meta: `${formatNumber(p.area, locale)} ${t.projects.sqm}`,
    image: p.image,
  }));

  return (
    <>
      {/* ───────────── HERO (night elevation) ───────────── */}
      <section
        aria-labelledby="hero-title"
        data-header-dark
        className="theme-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-fg pt-[calc(var(--header-h)+clamp(1.5rem,4.5vw,3.5rem))]"
      >
        {/* low warm haze along the skyline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(55%_55%_at_70%_100%,rgb(var(--glow)/0.11),transparent_70%)] rtl:bg-[radial-gradient(55%_55%_at_30%_100%,rgb(var(--glow)/0.11),transparent_70%)]"
        />
        <div className="container flex flex-1 flex-col">
          <div data-drift="-35" data-drift-fade="0">
            <p className="label enter">{h.hero.label}</p>
            <SplitText
              as="h1"
              id="hero-title"
              css
              delay={0.1}
              className="display t-hero mt-6"
              lines={[
                h.hero.title[0],
                <span key="accent" className="accent">
                  {h.hero.title[1]}
                </span>,
              ]}
            />
          </div>

          {/* Lead and drawing share one cell on desktop: text top-start, drawing on the ground line */}
          <div className="mt-8 grid flex-1 lg:mt-10">
            <div className="z-10 col-start-1 row-start-1 self-start lg:max-w-[22rem] xl:max-w-[26rem]" data-drift="-40" data-drift-fade="0">
              <p className="lead enter" style={{ animationDelay: '0.35s' }}>
                {h.hero.lead}
              </p>
              <div className="enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.45s' }}>
                <Link href={`/${locale}/contact`} className="btn-primary">
                  {h.hero.primary}
                  <span aria-hidden className="arrow">
                    →
                  </span>
                </Link>
                <Link href={`/${locale}/projects`} className="btn-ghost">
                  {h.hero.secondary}
                </Link>
              </div>
            </div>
            <div className="col-start-1 mt-12 self-end lg:row-start-1 lg:mt-0" data-drift="10">
              <HeroDrawing />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FIGURES ───────────── */}
      <section aria-label={locale === 'fa' ? 'آمار' : 'Key figures'} className="border-b border-line">
        <dl className="container grid grid-cols-2 lg:grid-cols-4">
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`flex flex-col-reverse justify-end gap-2 border-line py-9 md:py-14 ${i % 2 === 1 ? 'border-s ps-5 md:ps-8' : ''} ${
                i >= 2 ? 'border-t lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-s lg:ps-8' : ''}`}
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="display t-stat">
                <span data-count={s.value}>{localizeDigits(String(s.value), locale)}</span>
                <span className="[unicode-bidi:isolate]">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── MANIFESTO ───────────── */}
      <section className="py-section">
        <div className="container grid gap-y-8 lg:grid-cols-12">
          <p className="label self-start lg:col-span-3 lg:mt-3" data-reveal>
            {t.nav.about}
          </p>
          <div className="lg:col-span-9">
            <p className="statement" data-scrub-words>
              {h.manifesto.split(' ').map((w, i) => (
                <span key={i}>{w} </span>
              ))}
            </p>
            <Link href={`/${locale}/about`} className="link mt-10 inline-flex items-center gap-2" data-reveal>
              {t.about.storyLabel}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section aria-labelledby="services-title" className="pb-section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="label" data-reveal>
                {h.services.label}
              </p>
              <Heading id="services-title" text={h.services.title} className="mt-6" />
            </div>
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
                  className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-7 md:grid-cols-[6rem_1fr_auto_auto] md:gap-x-8 md:py-9"
                >
                  <span className="num self-start pt-2 text-sm text-muted">{localizeDigits(s.index, locale)}</span>
                  <span className="transition-transform duration-700 ease-cine group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                    <span className="display t-h3 block">{s.title}</span>
                    <span className="mt-2 block text-muted">{s.tagline}</span>
                  </span>
                  <span className="relative hidden h-20 w-32 overflow-hidden rounded-lg transition-[clip-path] duration-700 ease-cine [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)] md:block">
                    <Image src={s.image} alt="" fill sizes="128px" className="photo object-cover" />
                  </span>
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-full border border-fg/20 transition-colors duration-500 ease-cine group-hover:border-fg group-hover:bg-fg group-hover:text-bg md:h-14 md:w-14"
                  >
                    <span className="arrow">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── SELECTED WORK (pinned horizontal gallery) ───────────── */}
      <HorizontalProjects locale={locale} label={h.projects.label} title={h.projects.title} allLabel={h.projects.all} slides={slides} />

      {/* ───────────── PROCESS ───────────── */}
      <section aria-labelledby="process-title" className="py-section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="label" data-reveal>
                {h.process.label}
              </p>
              <Heading id="process-title" text={h.process.title} className="mt-6" />
            </div>
            <Link href={`/${locale}/process`} className="btn-ghost" data-reveal>
              {h.process.link}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>
          <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {phases.map((p) => (
              <li key={p.index} className="border-t border-fg pt-5" data-reveal>
                <span className="num text-sm text-muted">{localizeDigits(p.index, locale)}</span>
                <h3 className="display t-h3 mt-10 md:mt-16 lg:min-h-[2.3em]">{p.title}</h3>
                <p className="mt-4 text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── PRINCIPLES ───────────── */}
      <section aria-labelledby="principles-title" className="theme-surface py-section">
        <div className="container">
          <p className="label" data-reveal>
            {h.principles.label}
          </p>
          <Heading id="principles-title" text={h.principles.title} className="mt-6" />
          <div className="mt-12 grid items-start gap-x-8 gap-y-12 md:mt-16 lg:grid-cols-12">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl lg:col-span-6" data-reveal="clip">
              <div data-parallax="10" className="absolute inset-[-7%]">
                <Image src="/images/story-main.jpg" alt="" fill sizes="(min-width:1024px) 46vw, 100vw" className="photo object-cover" />
              </div>
            </div>
            <dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              {h.principles.items.map((it, i) => (
                <div key={it.title} className="border-t border-fg/25 pb-9 pt-5" data-reveal>
                  <span className="num text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                  <dt className="mt-6 text-lg font-medium">{it.title}</dt>
                  <dd className="mt-2 text-muted">{it.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────── JOINT VENTURE ───────────── */}
      <section aria-labelledby="venture-title" className="py-section">
        <div className="container">
          <div className="theme-dark grid items-center gap-10 overflow-hidden rounded-[1.75rem] p-8 md:p-14 lg:grid-cols-12 lg:p-20">
            <div className="lg:col-span-7">
              <p className="label" data-reveal>
                {h.venture.label}
              </p>
              <Heading id="venture-title" text={h.venture.title} className="mt-6" />
              <p className="lead mt-6 max-w-md" data-reveal>
                {h.venture.text}
              </p>
              <Link href={`/${locale}/collaboration#calculator`} className="btn-primary mt-9" data-reveal>
                {h.venture.cta}
                <span aria-hidden className="arrow">
                  →
                </span>
              </Link>
            </div>
            <PlotDrawing className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9" />
          </div>
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <section aria-labelledby="contact-title" className="pb-section">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label" data-reveal>
              {h.contact.label}
            </p>
            <Heading id="contact-title" text={h.contact.title} className="mt-6" />
            <p className="lead mt-6 max-w-md" data-reveal>
              {h.contact.lead}
            </p>
            <p className="mt-10 flex flex-col items-start gap-1" data-reveal>
              <a href={`tel:${site.phones.office.tel}`} className="nav-link ltr display t-h3">
                {localizeDigits(site.phones.office.display, locale)}
              </a>
              <span className="text-sm text-muted">{site.hours[locale]}</span>
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <LeadForm locale={locale} t={t.form} source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
