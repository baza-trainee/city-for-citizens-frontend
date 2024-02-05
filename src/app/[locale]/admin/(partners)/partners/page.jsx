import Partners from '@/components/admin-panel/partners/partners';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  return <Partners />;
}
