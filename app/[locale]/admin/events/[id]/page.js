'use client';

import UpdateEventForm from '@/components/Admin/UpdateEvent';
import { useCurrentLocale } from '@/hooks';
import { getAllEvents } from '@/services/eventAPI';
import { useEffect, useState } from 'react';

const Event = ({ params: { id: eventId } }) => {
  const [eventByIdUk, setEventByIdUk] = useState(null);
  const [eventByIdEn, setEventByIdEn] = useState(null);

  const { localeForRequest } = useCurrentLocale();

  useEffect(() => {
    const getAll = async () => {
      try {
        const allEvents = await getAllEvents();

        const eventFirst = allEvents.find(({ id }) => id === Number(eventId));
        const eventSecond = allEvents.find(
          ({ idIdentifier, id }) =>
            idIdentifier === eventFirst.idIdentifier && id !== Number(eventId)
        );
        if (eventFirst.locale === 'uk_UA') {
          setEventByIdUk(eventFirst);
          setEventByIdEn(eventSecond);
        } else {
          setEventByIdUk(eventSecond);
          setEventByIdEn(eventFirst);
        }
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    getAll();
  }, [eventId, localeForRequest]);
  return <UpdateEventForm eventUk={eventByIdUk} eventEn={eventByIdEn} />;
};
export default Event;
