import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n';

function preferredLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  if (isLocale(cookie)) return cookie;
  const accept = req.headers.get('accept-language') || '';
  const first = accept.split(',')[0]?.trim().slice(0, 2).toLowerCase();
  // Persian-first site: only switch to English when the browser clearly prefers it
  if (first === 'en') return 'en';
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split('/')[1];
  if (isLocale(segment)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLocale(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API, static files and metadata routes
  matcher: ['/((?!_next|api|images|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\\..*).*)'],
};
