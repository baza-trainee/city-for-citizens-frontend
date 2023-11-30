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
    <div className="container flex">
      <ul className="mx-auto flex flex-col gap-[5px]">
        {eventList.map(event => (
          <li
            className="rounded-[15px] bg-gray/10 p-[15px]"
            key={event.id + event.idIdentifier}
          >
            <p className="mb-[10px]">{event.eventTitle}</p>
            <Link
              className="mx-auto my-0 inline-block rounded-[10px] bg-primary/80 px-[40px] py-[5px]"
              href={`/admin/events/${event.id}`}
            >
              Update
            </Link>
            <button
              className="mx-auto my-0 rounded-[10px] bg-[red] px-[40px] py-[5px]"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
