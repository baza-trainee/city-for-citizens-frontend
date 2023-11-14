import Providers from '@/components/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import './globals.css';
import { LOCALE } from '@/helpers/constants';

export function generateStaticParams() {
  return [{ locale: LOCALE.en }, { locale: LOCALE.uk }];
}

export const metadata = {
  title: 'Мiсто для мiстян',
  description: 'Мiсто для мiстян',
};

export default async function RootLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-gray/5 text-gray/100 dark:bg-gray/100 dark:text-gray/5">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <main>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
