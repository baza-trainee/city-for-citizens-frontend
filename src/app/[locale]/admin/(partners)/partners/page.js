import Partners from '@/components/Admin/partners/Partners';
import { unstable_setRequestLocale } from 'next-intl/server';

const Page = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return <Partners />;
};
export default Page;
