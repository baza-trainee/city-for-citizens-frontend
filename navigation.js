import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { LOCALE } from './helpers/constants';

export const locales = [LOCALE.en.forIntl, LOCALE.uk.forIntl];

export const pathnames = {
  '/': '/',
};

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
