'use client';

import Providers from '@/components/Providers';
import Error from './[locale]/not-found';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Error />
        </Providers>
      </body>
    </html>
  );
}
