import EventList from '@/components/admin-panel/event-list/event-list-all/event-list';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return <EventList />;
}
