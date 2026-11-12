/** Brand wordmark, faithful to the original MIRKAZEMI / CONSTRUCTION GROUP logo. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex flex-col font-brand leading-none ${className}`}>
      <span className="text-[1.1rem] font-extralight tracking-[0.4em]">MIRKAZEMI</span>
      <span className="mt-1.5 text-[0.48rem] font-semibold tracking-[0.34em] text-muted">CONSTRUCTION GROUP</span>
    </span>
  );
}
