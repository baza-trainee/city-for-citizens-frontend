import { getRequestConfig } from 'next-intl/server';

import { notFound } from 'next/navigation';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: {
      ...(await import(`../messages/${locale}/ErrorPage.json`)).default,
      ...(await import(`../messages/${locale}/Filters.json`)).default,
      ...(await import(`../messages/${locale}/Footer.json`)).default,
      ...(await import(`../messages/${locale}/MenuItems.json`)).default,
      ...(await import(`../messages/${locale}/Hero.json`)).default,
      ...(await import(`../messages/${locale}/Metadata.json`)).default,
      ...(await import(`../messages/${locale}/ModalCookies.json`)).default,
      ...(await import(`../messages/${locale}/EventCard.json`)).default,
      ...(await import(`../messages/${locale}/Admin.json`)).default,
      ...(await import(`../messages/${locale}/EventForm.json`)).default,
      ...(await import(`../messages/${locale}/Common.json`)).default,
      ...(await import(`../messages/${locale}/DocumentsFooter.json`)).default,
      ...(await import(`../messages/${locale}/ProposeEvent.json`)).default,
      ...(await import(`../messages/${locale}/Partners.json`)).default,
    },
  };
});
