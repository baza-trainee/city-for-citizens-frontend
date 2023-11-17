'use client';

import Providers from '@/components/Providers';
import Error from './[locale]/not-found';
import { LOCALE } from '@/helpers/constants';

export default function NotFound() {
  return (
    <html lang={LOCALE.uk.forIntl}>
      <body>
        <Providers>
          <Error />
        </Providers>
      </body>
    </html>
  );
}
