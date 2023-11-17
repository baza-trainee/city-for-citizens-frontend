import { getRequestConfig } from 'next-intl/server';
import { LOCALE } from './helpers/constants.js';

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    await (locale === LOCALE.uk.forIntl
      ? import(`./messages/${LOCALE.uk.forIntl}.js`)
      : import(`./messages/${locale}.js`))
  ).default,
}));
