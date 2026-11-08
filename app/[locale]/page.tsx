import Image from 'next/image';
import Link from 'next/link';
import { isLocale, formatNumber, localizeDigits, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/data/translations';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { processPhases } from '@/data/process';
import { SplitText } from '@/components/motion/SplitText';
import { HeroVisual } from '@/components/home/HeroVisual';
import { HorizontalProjects } from '@/components/home/HorizontalProjects';
import { Intro } from '@/components/home/Intro';
import { PartnershipCalculator } from '@/components/ui/PartnershipCalculator';
import { LeadForm } from '@/components/ui/LeadForm';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const h = t.home;

  const slides = projects.map((p) => ({
    slug: p.slug,
    code: p.code,
    title: p.title[locale],
    location: p.location[locale].split(/[—,،]/).pop()!.trim(),
    category: t.projects.categories[p.category],
    meta: `${formatNumber(p.area, locale)} ${t.projects.sqm}`,
    image: p.image,
  }));

  return (
    <>
      <Intro skipLabel={t.a11y.skipIntro} />

      {/* ───────────── HERO ───────────── */}
      <section id="hero" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/proj-villa-1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-[kenburns_14s_ease-out_both] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
          <div className="blueprint-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(var(--ember)/0.12),transparent)]" />
        </div>

        {/* WebGL tower (desktop / capable devices) */}
        <div className="pointer-events-none absolute inset-y-0 end-0 -z-10 hidden w-full md:block lg:w-[62%]">
          <HeroVisual triggerId="hero" />
        </div>
        <div className="vignette pointer-events-none absolute inset-0 -z-10" />

        <div className="container">
          <p className="eyebrow hero-in">
            {h.heroEyebrow}
          </p>
          <SplitText
            as="h1"
            id="hero-title"
            lines={[
              h.heroTitle[0],
              <span key="l2" className={locale === 'en' ? 'font-serif font-normal italic text-ember-soft' : 'text-ember-soft'}>
                {h.heroTitle[1]}
              </span>,
            ]}
            className="mt-6 max-w-5xl text-display-xl font-black"
            delay={0.1}
            css
          />
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p className="hero-in max-w-xl text-lg text-bone-muted md:text-xl" style={{ animationDelay: '0.3s' }}>
              {h.heroLead}
            </p>
            <div className="hero-in flex flex-wrap gap-3" style={{ animationDelay: '0.4s' }}>
              <Link href={`/${locale}/contact`} className="btn-primary">
                {h.heroPrimary}
                <span aria-hidden className="flip-x-rtl">→</span>
              </Link>
              <Link href={`/${locale}/projects`} className="btn-ghost">
                {h.heroSecondary}
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs tracking-[0.3em] text-bone-dim md:flex rtl:translate-x-1/2">
          <span>{h.scroll}</span>
          <span className="relative h-12 w-px overflow-hidden bg-bone/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-ember" />
          </span>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section aria-label={locale === 'fa' ? 'آمار' : 'Key figures'} className="border-y border-bone/10 bg-ink-950">
        <dl className="container grid grid-cols-2 md:grid-cols-4">
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`flex flex-col-reverse py-10 md:py-14 ${i % 2 === 1 ? 'border-s border-bone/10 ps-6' : ''} ${i >= 1 ? 'md:border-s md:border-bone/10 md:ps-8' : ''} ${i >= 2 ? 'border-t border-bone/10 md:border-t-0' : ''}`}
            >
              <dt className="mt-2 text-sm text-bone-muted">{s.label}</dt>
              <dd className="text-5xl font-black text-bone md:text-6xl">
                <span data-count={s.value}>{localizeDigits(String(s.value), locale)}</span>
                <span className="text-ember">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div aria-hidden className="overflow-hidden border-b border-bone/10 py-8">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-5xl font-black text-transparent [-webkit-text-stroke:1px_rgb(var(--bone)/0.25)] md:text-7xl">
          {[...h.marquee, ...h.marquee].map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              {w}
              <span className="h-3 w-3 rotate-45 bg-ember/70" />
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── SERVICES ───────────── */}
      <section aria-labelledby="services-title" className="py-24 md:py-36">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow" data-reveal>
                {h.servicesEyebrow}
              </p>
              <SplitText id="services-title" text={h.servicesTitle} className="mt-5 text-display-lg font-bold" />
            </div>
            <p className="self-end text-lg text-bone-muted md:col-span-5" data-reveal>
              {h.servicesLead}
            </p>
          </div>

          <ul className="mt-16 border-t border-bone/10 md:mt-24">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-bone/10" data-reveal>
                <Link
                  href={`/${locale}/services#${s.slug}`}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden py-8 md:gap-10 md:py-12"
                >
                  {/* hover image band */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 transition-[clip-path] duration-700 ease-cine [clip-path:inset(50%_0_50%_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
                  >
                    <Image src={s.image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
                    <span className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-ink-950" />
                  </span>
                  <span className="font-brand text-sm text-bone-dim transition-colors group-hover:text-ember" dir="ltr">
                    {localizeDigits(s.index, locale)}
                  </span>
                  <span className="transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                    <span className="block text-2xl font-bold md:text-4xl">{s.title[locale]}</span>
                    <span className="mt-2 block text-bone-muted">{s.tagline[locale]}</span>
                  </span>
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 transition-all duration-500 ease-cine group-hover:border-ember group-hover:bg-ember group-hover:text-ink-950 md:h-16 md:w-16"
                  >
                    <span className="flip-x-rtl">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── FEATURED PROJECTS (pinned horizontal) ───────────── */}
      <HorizontalProjects
        locale={locale}
        eyebrow={h.projectsEyebrow}
        title={h.projectsTitle}
        allLabel={h.projectsAll}
        slides={slides}
      />

      {/* ───────────── PROCESS (sticky) ───────────── */}
      <section aria-labelledby="process-title" className="relative bg-ink-900 py-24 md:py-36" data-progress-root>
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow" data-reveal>
                {h.processEyebrow}
              </p>
              <SplitText id="process-title" text={h.processTitle} className="mt-5 text-display-lg font-bold" />
              <p className="mt-6 max-w-md text-lg text-bone-muted" data-reveal>
                {h.processLead}
              </p>
              <Link href={`/${locale}/process`} className="btn-ghost mt-10" data-reveal>
                {t.nav.process}
                <span aria-hidden className="flip-x-rtl">→</span>
              </Link>
            </div>
          </div>
          <ol className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute inset-y-0 start-[1.375rem] w-px bg-bone/10" />
            <span aria-hidden data-progress="vertical" className="absolute inset-y-0 start-[1.375rem] w-px origin-top bg-ember" />
            {processPhases.map((p) => (
              <li key={p.index} className="relative pb-16 ps-20 last:pb-0" data-reveal>
                <span className="absolute start-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-bone/20 bg-ink-900 font-brand text-sm text-ember" dir="ltr">
                  {localizeDigits(p.index, locale)}
                </span>
                <h3 className="text-2xl font-bold md:text-3xl">{p.title[locale]}</h3>
                <p className="mt-4 text-bone-muted">{p.text[locale]}</p>
                <ul className="mt-6 grid gap-2 text-sm text-bone-muted sm:grid-cols-2">
                  {p.points[locale].map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-ember" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── WHY US ───────────── */}
      <section aria-labelledby="why-title" className="relative overflow-hidden py-24 md:py-36">
        <div className="container grid items-center gap-16 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
            <div data-parallax="14" className="absolute inset-[-10%]">
              <Image src="/images/story-main.jpg" alt={h.whyTitle} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            <p className="absolute bottom-6 start-6 font-brand text-xs tracking-[0.3em] text-bone/80" dir="ltr">
              EST. 2009 — TEHRAN
            </p>
          </div>
          <div>
            <p className="eyebrow" data-reveal>
              {h.whyEyebrow}
            </p>
            <SplitText id="why-title" text={h.whyTitle} className="mt-5 text-display-lg font-bold" />
            <p className="mt-6 text-lg text-bone-muted" data-reveal>
              {h.whyLead}
            </p>
            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {h.why.map((w, i) => (
                <div key={w.title} data-reveal className="border-t border-bone/10 pt-6">
                  <dt className="flex items-baseline gap-3 text-lg font-bold">
                    <span className="font-brand text-xs text-ember" dir="ltr">
                      {localizeDigits(`0${i + 1}`, locale)}
                    </span>
                    {w.title}
                  </dt>
                  <dd className="mt-3 text-bone-muted">{w.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────── CALCULATOR ───────────── */}
      <section id="calculator" aria-labelledby="calc-title" className="bg-ink-900 py-24 md:py-36">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <p className="eyebrow" data-reveal>
              {h.calcEyebrow}
            </p>
            <SplitText id="calc-title" text={h.calcTitle} className="mt-5 text-display-lg font-bold" />
            <p className="mt-6 text-lg text-bone-muted" data-reveal>
              {h.calcLead}
            </p>
          </div>
          <div data-reveal>
            <PartnershipCalculator locale={locale} t={t.calc} />
          </div>
        </div>
      </section>

      {/* ───────────── CTA + FORM ───────────── */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 md:py-36">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60vh] bg-[radial-gradient(50%_60%_at_50%_100%,rgb(var(--ember)/0.1),transparent)]" />
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              {h.ctaEyebrow}
            </p>
            <SplitText
              id="cta-title"
              text={h.ctaTitle}
              className={`mt-5 text-display-lg ${locale === 'en' ? 'font-serif italic' : 'font-black'}`}
            />
            <p className="mt-6 text-lg text-bone-muted" data-reveal>
              {h.ctaLead}
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
