import { NAVIGATION } from './helpers/constants';

export const locales = ['en', 'uk'];

export const pathnames = {
  [NAVIGATION.home]: NAVIGATION.home,
  [NAVIGATION.admin]: NAVIGATION.admin,
  [NAVIGATION.login]: NAVIGATION.login,
  [NAVIGATION.register]: NAVIGATION.register,
  '/password-reset/request': '/password-reset/request',
  '/admin/events': '/admin/events',
  // '/events:id': '/events:id',
};
// Use the default: `always`
export const localePrefix = undefined;
