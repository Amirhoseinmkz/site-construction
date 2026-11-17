/**
 * Brand wordmark: MIRKAZEMI with CONSTRUCTION GROUP centred beneath it.
 * Letter-spacing adds a gap after the last letter of each line; the negative
 * end margin removes it so both lines centre on their visible letters.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex flex-col items-center font-brand leading-none ${className}`}>
      <span className="-mr-[0.38em] text-[1.25rem] font-extralight tracking-[0.38em]">MIRKAZEMI</span>
      <span className="-mr-[0.2em] mt-2 text-[0.625rem] font-semibold tracking-[0.2em]">CONSTRUCTION GROUP</span>
    </span>
  );
}
