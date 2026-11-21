import Image from 'next/image';
import Link from 'next/link';
import { formatNumber, localizeDigits, plain } from '@/lib/i18n';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getProcessPhases, getProjects, getServices } from '@/lib/db/content';
import { site } from '@/data/site';
import { Heading } from '@/components/ui/Heading';
import { LeadForm } from '@/components/ui/LeadForm';
import { SiteArt } from '@/components/home/SiteArt';
import { HeroTone } from '@/components/home/HeroTone';
import { Chapters } from '@/components/home/Chapters';
import { Showcase } from '@/components/home/Showcase';
import { SplitText } from '@/components/motion/SplitText';
import { PlotDrawing } from '@/components/home/PlotDrawing';

export default async function HomePage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const h = t.home;
  const services = getServices(locale);
  const phases = getProcessPhases(locale);
  const projects = getProjects(locale);

  return (
    <>
      {/* 1 · HERO — a morning on site that turns to night. Text and drawing sit in their own columns. */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        data-header-tone="light"
        data-tone="light"
        className="hero-stage relative isolate overflow-hidden border-b border-fg/20 pt-[calc(var(--header-h)+1rem)]"
      >
        <HeroTone stageId="hero" />
        {/* a warm horizon that glows up as it gets dark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-[radial-gradient(60%_70%_at_70%_100%,rgb(var(--glow)/0.3),transparent_72%)] rtl:bg-[radial-gradient(60%_70%_at_30%_100%,rgb(var(--glow)/0.3),transparent_72%)]"
          style={{ opacity: 'clamp(0.25, calc(0.25 + var(--n, 0) * 0.9), 1)' }}
        />
        <div className="container grid min-h-[calc(100svh-var(--header-h)-1rem)] items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="pb-2 lg:col-span-6 lg:self-center lg:pb-[6svh]">
            <p className="label enter">{h.hero.label}</p>
            <SplitText
              as="h1"
              id="hero-title"
              css
              delay={0.1}
              className="display t-hero mt-5"
              lines={[
                h.hero.title[0],
                <span key="accent" className="accent">
                  {h.hero.title[1]}
                </span>,
              ]}
            />
            <p className="lead enter mt-7 max-w-[28rem]" style={{ animationDelay: '0.45s' }}>
              {h.hero.lead}
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.55s' }}>
              <Link href={`/${locale}/contact`} className="btn-glow">
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
          <div className="lg:col-span-6">
            <SiteArt id="hero" view="640 30 1000 816" className="rtl:-scale-x-100" />
          </div>
        </div>
      </section>

      {/* 2 · THE FOUR STAGES — each its own section, the drawing builds as you scroll past */}
      <Chapters
        locale={locale}
        label={h.process.label}
        title={h.process.title}
        stageWord={h.process.stage}
        chapters={phases.map((p) => ({ title: p.title, text: p.text, points: p.points }))}
      />

      {/* 3 · WHO WE ARE — one sentence, lit word by word, and the numbers behind it */}
      <section aria-label={t.nav.about} className="py-section">
        <div className="container grid gap-y-10 lg:grid-cols-12">
          <p className="label self-start lg:col-span-3 lg:mt-4" data-reveal>
            {t.nav.about}
          </p>
          <div className="lg:col-span-9">
            <p className="statement" data-scrub-words>
              {h.manifesto.split(' ').map((w, i) => (
                <span key={i}>{w} </span>
              ))}
            </p>
            <p className="lead mt-10 max-w-2xl" data-reveal>
              {t.about.lead}
            </p>
            <Link href={`/${locale}/about`} className="link mt-8 inline-flex items-center gap-2" data-reveal>
              {t.about.storyLabel}
              <span aria-hidden className="arrow">
                →
              </span>
            </Link>
          </div>
        </div>
        <dl className="container mt-section grid grid-cols-2 gap-y-12 border-t border-line pt-12 lg:grid-cols-4 lg:pt-16">
          {h.stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col-reverse justify-end gap-3">
              <dt className="max-w-[16rem] text-sm text-muted">{s.label}</dt>
              <dd className="display t-stat">
                <span data-count={s.value}>{localizeDigits(String(s.value), locale)}</span>
                <span className="[unicode-bidi:isolate]">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 4 · SERVICES — four ways in, each in a sentence */}
      <section aria-labelledby="services-title" className="theme-surface py-section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label" data-reveal>
                {h.services.label}
              </p>
              <Heading id="services-title" text={h.services.title} size="t-2" className="mt-5" />
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
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-3 py-8 md:grid-cols-[6rem_1fr_11rem_auto] md:gap-x-10 md:py-11"
                >
                  <span className="num self-start pt-2 text-sm text-muted">{plain(s.index, locale)}</span>
                  <span className="transition-transform duration-700 ease-cine group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                    <span className="display t-2 block">{s.title}</span>
                    <span className="mt-3 block text-glow">{s.tagline}</span>
                    <span className="mt-3 block max-w-2xl text-muted">{s.description}</span>
                  </span>
                  <span className="relative hidden h-28 w-44 overflow-hidden rounded-xl md:block">
                    <Image src={s.image} alt="" fill sizes="176px" className="photo object-cover transition-transform duration-[1.4s] ease-cine group-hover:scale-105" />
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

      {/* 5 · PRINCIPLES — how we work */}
      <section aria-labelledby="principles-title" className="py-section">
        <div className="container">
          <p className="label" data-reveal>
            {h.principles.label}
          </p>
          <Heading id="principles-title" text={h.principles.title} size="t-2" className="mt-5" />
          <div className="mt-12 grid items-start gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-5" data-reveal="clip">
              <div data-parallax="10" className="absolute inset-[-7%]">
                <Image src="/images/story-main.jpg" alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="photo object-cover" />
              </div>
            </div>
            <dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {h.principles.items.map((it, i) => (
                <div key={it.title} className="border-t border-fg/25 pb-10 pt-5" data-reveal>
                  <span className="num text-sm text-muted">{plain(i + 1, locale)}</span>
                  <dt className="display t-3 mt-6">{it.title}</dt>
                  <dd className="mt-3 text-muted">{it.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 6 · SELECTED WORK */}
      <Showcase
        locale={locale}
        label={h.projects.label}
        title={h.projects.title}
        allLabel={h.projects.all}
        items={projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          place: p.location,
          meta: `${t.projects.categories[p.category]} · ${p.location}`,
          summary: p.summary,
          image: p.image,
        }))}
      />

      {/* 7 · PARTNERSHIP — own land? */}
      <section aria-labelledby="venture-title" className="py-section">
        <div className="container">
          <div className="theme-dark grid items-center gap-10 overflow-hidden rounded-[1.75rem] p-8 md:p-14 lg:grid-cols-12 lg:p-20">
            <div className="lg:col-span-7">
              <p className="label" data-reveal>
                {h.venture.label}
              </p>
              <Heading id="venture-title" text={h.venture.title} size="t-2" className="mt-5" />
              <p className="lead mt-6 max-w-md" data-reveal>
                {h.venture.text}
              </p>
              <Link href={`/${locale}/collaboration#calculator`} className="btn-glow mt-9" data-reveal>
                {h.venture.cta}
                <span aria-hidden className="arrow">
                  →
                </span>
              </Link>
            </div>
            <PlotDrawing className="mx-auto w-full max-w-sm text-fg lg:col-span-4 lg:col-start-9" />
          </div>
        </div>
      </section>

      {/* 8 · CONTACT */}
      <section aria-labelledby="contact-title" className="theme-surface py-section">
        <div className="container grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label" data-reveal>
              {h.contact.label}
            </p>
            <Heading id="contact-title" text={h.contact.title} size="t-2" className="mt-5" />
            <p className="lead mt-6 max-w-md" data-reveal>
              {h.contact.lead}
            </p>
            <p className="mt-10 flex flex-col items-start gap-1" data-reveal>
              <span className="display t-3">{site.city[locale]}</span>
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
