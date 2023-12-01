'use client';

import UpdateEventForm from '@/components/Admin/UpdateEvent';

const Event = ({ params: { id: eventId } }) => {
  return <UpdateEventForm eventId={eventId} />;
};
export default Event;
