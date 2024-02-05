'use client';

import NextThemeProvider from '@/providers/theme-providers';
import Error from 'next/error';
import { LOCALE } from '@/helpers/constants';

export default function NotFound() {
  return (
    <html lang={LOCALE.uk.forIntl}>
      <body>
        <NextThemeProvider>
          <Error statusCode={404} />
        </NextThemeProvider>
      </body>
    </html>
  );
}
