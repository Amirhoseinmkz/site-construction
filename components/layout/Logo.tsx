/** Brand wordmark, faithful to the original MIRKAZEMI / CONSTRUCTION GROUP logo (Montserrat). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex flex-col items-center font-brand leading-none ${className}`}>
      <span className="text-[1.15rem] font-extralight tracking-[0.42em] [margin-inline-end:-0.42em]">MIRKAZEMI</span>
      <span className="mt-1.5 flex w-full items-center gap-2 text-[0.5rem] font-semibold tracking-[0.3em] text-bone-muted">
        <span className="h-px flex-1 bg-ember/70" />
        CONSTRUCTION GROUP
        <span className="h-px flex-1 bg-ember/70" />
      </span>
    </span>
  );
}
