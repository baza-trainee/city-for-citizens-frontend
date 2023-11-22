'use client';

import Providers from '@/components/Providers';
import Error from 'next/error';
import { LOCALE } from '@/helpers/constants';

export default function NotFound() {
  return (
    <html lang={LOCALE.uk.forIntl}>
      <body>
        <Providers>
          <Error statusCode={404} />
        </Providers>
      </body>
    </html>
  );
}
