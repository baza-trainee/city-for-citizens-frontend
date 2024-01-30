import createMiddleware from 'next-intl/middleware';
import { locales, pathnames, localePrefix } from './config';

export default createMiddleware({
  defaultLocale: 'uk',
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
