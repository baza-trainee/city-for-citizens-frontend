import EditEvent from '@/components/admin-panel/event-list/edit-event';

export default function Page({ params: { id: eventId } }) {
  return <EditEvent eventId={eventId} />;
}
