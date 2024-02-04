import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import './globals.css';
import { ReduxProvider } from '@/providers/redux-provider';
import { locales } from '@/config';
import { exo_2, roboto, source_sans_3, ubuntu } from '@/app/fonts';
import NextThemeProvider from '@/providers/theme-providers';

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
    <html
      lang={locale}
      className={` ${roboto.variable} ${ubuntu.variable} ${exo_2.variable} ${source_sans_3.variable}`}
    >
      <body className="bg-light-primary font-source_sans_3 text-light-head dark:bg-dark-primary dark:text-dark-head">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextThemeProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </NextThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
