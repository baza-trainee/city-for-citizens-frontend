import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Providers from '@/components/Providers';

import './globals.css';
import { ReduxProvider } from '@/redux/Provider/ReduxProvider';
import { locales } from '@/config';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className="bg-gray/5 text-gray/100 dark:bg-gray/100 dark:text-gray/5">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
