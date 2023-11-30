'use client';

import { NAVIGATION } from '@/helpers/constants';
import { privateRoute } from '../privateRoute';
import { useEffect, useState } from 'react';
import { deleteEvent, getAllEvents } from '@/services/eventAPI';
import { Link } from '@/navigation';
import { useCurrentLocale } from '@/hooks';

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const { localeForRequest } = useCurrentLocale();

  useEffect(() => {
    const getAll = async () => {
      try {
        const allEvents = await getAllEvents(
          new URLSearchParams({ locale: localeForRequest })
        );
        setEventList(allEvents);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    getAll();
  }, [localeForRequest]);

  const handleDeleteEvent = async eventId => {
    try {
      await deleteEvent(eventId);

      const updatedEventList = await getAllEvents(
        new URLSearchParams({ locale: localeForRequest })
      );
      setEventList(updatedEventList);
    } catch (error) {
      console.error('Помилка видалення події:', error);
    }
  };

  return (
    <ul>
      {eventList.map(event => (
        <li key={event.id + event.idIdentifier}>
          <p>--------------</p>
          <p>{event.eventTitle}</p>
          <Link href={`/admin/events/${event.id}`}>Update</Link>
          <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>

          <p>-------------</p>
        </li>
      ))}
    </ul>
  );
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
