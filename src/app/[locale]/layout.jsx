import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import './globals.css';
import { ReduxProvider } from '@/providers/redux-provider';
import { locales } from '@/config';
import { exo_2, roboto, source_sans_3, ubuntu, oswald } from '@/app/fonts';

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
      className={` ${roboto.variable} ${ubuntu.variable} ${exo_2.variable} ${source_sans_3.variable} ${oswald.variable}`}
    >
      <body className="bg-light-primary font-source_sans_3 text-light-head">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
