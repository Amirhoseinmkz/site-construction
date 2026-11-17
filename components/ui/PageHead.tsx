import { Heading } from './Heading';

/** Opening of an inner page: a label, a very large title, and a short explanation beside it. */
export function PageHead({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="pb-12 pt-[calc(var(--header-h)+clamp(3rem,10svh,8rem))] md:pb-20">
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
        <span aria-hidden className="rule-in mt-14 block h-px bg-fg/30 md:mt-20" />
      </div>
    </section>
  );
}
