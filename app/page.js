import { LOCALE } from '@/helpers/constants';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(`/${LOCALE.uk.forIntl}`);
}
