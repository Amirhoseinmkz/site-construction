import { Heading } from './Heading';

/** Opening of an inner page: a label, a very large title, and a short explanation beside it. */
export function PageHead({ label, title, lead, compact, children }: { label: string; title: string; lead?: string; compact?: boolean; children?: React.ReactNode }) {
  return (
    <section
      className={`pb-12 md:pb-20 ${
        compact ? 'pt-[calc(var(--header-h)+clamp(1.25rem,4svh,3rem))]' : 'pt-[calc(var(--header-h)+clamp(3rem,10svh,8rem))]'
      }`}
    >
      <div className="container">
        <p className="label enter">{label}</p>
        <div className="mt-6 grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <Heading as="h1" size="t-1" text={title} css delay={0.05} className="lg:col-span-8" />
          {lead && (
            <p className="lead enter lg:col-span-4" style={{ animationDelay: '0.3s' }}>
              {lead}
            </p>
          )}
        </div>
        {children}
        <span aria-hidden className={`rule-in block h-px bg-fg/30 ${compact ? 'mt-10 md:mt-14' : 'mt-14 md:mt-20'}`} />
      </div>
    </section>
  );
}
