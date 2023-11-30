import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { LOCALE, NAVIGATION } from './helpers/constants';

export const locales = [LOCALE.en.forIntl, LOCALE.uk.forIntl];

export const pathnames = {
  [NAVIGATION.home]: NAVIGATION.home,
  [NAVIGATION.admin]: NAVIGATION.admin,
  [NAVIGATION.login]: NAVIGATION.login,
  [NAVIGATION.register]: NAVIGATION.register,
  '/admin/events': '/admin/events',
  // '/events:id': '/events:id',
};

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
