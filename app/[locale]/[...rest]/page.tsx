import { notFound } from 'next/navigation';

/** Routes unknown paths to the localized not-found page (rendered inside the locale layout). */
export default function CatchAll() {
  notFound();
}
