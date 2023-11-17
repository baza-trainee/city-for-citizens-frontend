import createMiddleware from 'next-intl/middleware';

import { locales, pathnames } from './navigation';
import { LOCALE } from './helpers/constants';

export default createMiddleware({
  defaultLocale: LOCALE.uk.forIntl,
  locales,
  pathnames,
});

export const config = {
  matcher: ['/', '/(uk|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
