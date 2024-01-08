import { LOCALE } from '@/helpers/constants';
import { useLocale } from 'next-intl';

export function useCurrentLocale() {
  const localeForIntl = useLocale();

  const localeForRequest =
    localeForIntl === LOCALE.uk.forIntl
      ? LOCALE.uk.forRequest
      : LOCALE.en.forRequest;

  return { localeForIntl, localeForRequest };
}
