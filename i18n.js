import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: {
    ...(await import(`./messages/${locale}/ErrorPage.json`)).default,
    ...(await import(`./messages/${locale}/Filters.json`)).default,
    ...(await import(`./messages/${locale}/Footer.json`)).default,
    ...(await import(`./messages/${locale}/Header.json`)).default,
    ...(await import(`./messages/${locale}/Hero.json`)).default,
    ...(await import(`./messages/${locale}/Metadata.json`)).default,
    ...(await import(`./messages/${locale}/ModalCookies.json`)).default,
  },
}));
