'use client';

import { useTranslations } from 'next-intl';
import NextThemeProvider from '@/providers/theme-providers';
import { LOCALE } from '@/helpers/constants';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');
  return (
    <html lang={LOCALE.uk.forIntl}>
      <body>
        <NextThemeProvider>
          <main>
            <div className="grid h-screen w-full place-content-center bg-light-primary dark:bg-dark-primary">
              <div className="flex flex-col items-center justify-center">
                <h1 className="mb-3 text-center font-ubuntu text-[57px] font-bold leading-[62.70px] text-light-head dark:text-dark-head">
                  404
                </h1>
                <p className="mb-[32px] text-center font-roboto text-base font-normal leading-snug text-light-head dark:text-dark-head">
                  {t('title')}
                </p>

                <a
                  href="/"
                  className="inline-flex min-h-[43px] min-w-[240px] cursor-pointer items-center justify-center rounded-md 
  bg-light-button-default font-roboto text-base font-medium  leading-[1.2] text-light-button-text transition-all 
   hover:bg-light-button-hover active:bg-light-button-pressed disabled:cursor-not-allowed  dark:bg-dark-button-default
    dark:text-dark-button-text dark:hover:bg-dark-button-hover dark:active:bg-dark-button-pressed"
                >
                  {t('button')}
                </a>
              </div>
            </div>
          </main>
        </NextThemeProvider>
      </body>
    </html>
  );
}
