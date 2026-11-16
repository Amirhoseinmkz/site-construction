import { Heading } from './Heading';

/** Opening of an inner page: one label, one very large title, optional short line. */
export function PageHead({ label, title, lead, children }: { label: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="pb-12 pt-[calc(var(--header-h)+clamp(3rem,10svh,8rem))] md:pb-20">
      <div className="container">
        <p className="label enter">{label}</p>
        <Heading as="h1" size="t-1" text={title} css delay={0.05} className="mt-6 max-w-[16ch]" />
        {lead && (
          <p className="lead enter mt-8 max-w-xl" style={{ animationDelay: '0.3s' }}>
            {lead}
          </p>
        )}
        {children}
        <span aria-hidden className="rule-in mt-14 block h-px bg-fg/30 md:mt-20" />
      </div>
    </section>
  );
}
