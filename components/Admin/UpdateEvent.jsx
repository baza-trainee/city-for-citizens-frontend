'use client';

import {
  createEventImage,
  deleteEventImage,
  getAllEvents,
  updateEvent,
} from '@/services/eventAPI';
import EventForm from './EventForm/EventForm';
import { privateRoute } from '../privateRoute';
import { NAVIGATION } from '@/helpers/constants';
import { useEffect, useState } from 'react';
import { useCurrentLocale } from '@/hooks';
import { useTranslations } from 'next-intl';

const UpdateEventForm = ({ eventId }) => {
  const [eventUk, setEventUk] = useState(null);
  const [eventEn, setEventEn] = useState(null);

  const t = useTranslations('Admin.updateEvent');

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
          setEventUk(eventFirst);
          setEventEn(eventSecond);
        } else {
          setEventUk(eventSecond);
          setEventEn(eventFirst);
        }
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    getAll();
  }, [eventId, localeForRequest]);

  const handleSubmit = async (
    e,
    formDataUk,
    formDataEn,
    formDataImageUk,
    formDataImageEn
  ) => {
    e.preventDefault();
    const idIdentifier = eventUk?.idIdentifier || eventEn?.idIdentifier;

    let requestUk;
    let requestEn;

    try {
      if (formDataImageUk) {
        const imageNameForRequestUk = await createEventImage(formDataImageUk);
        requestUk = {
          idIdentifier,
          ...formDataUk,
          ...imageNameForRequestUk,
        };
        await updateEvent(requestUk, eventUk.id);
        try {
          await deleteEventImage({ eventImage: formDataUk.eventImage });
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        requestUk = {
          idIdentifier,
          ...formDataUk,
        };
        await updateEvent(requestUk, eventUk.id);
      }
    } catch (error) {
      if (requestUk?.eventImage) {
        deleteEventImage({ eventImage: requestUk?.eventImage });
      }
    }

    try {
      if (formDataImageEn) {
        const imageNameForRequestEn = await createEventImage(formDataImageEn);
        requestEn = {
          idIdentifier,
          ...formDataEn,
          ...imageNameForRequestEn,
        };
        await updateEvent(requestEn, eventEn.id);
        try {
          await deleteEventImage({ eventImage: formDataEn.eventImage });
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        requestEn = {
          idIdentifier,
          ...formDataEn,
        };

        await updateEvent(requestEn, eventEn.id);
      }
    } catch (error) {
      if (requestEn?.eventImage) {
        deleteEventImage({ eventImage: requestEn?.eventImage });
      }
    }
  };
  return (
    <div className="container">
      <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
      <EventForm
        onSubmit={handleSubmit}
        buttonName={t('buttonName.update')}
        eventUk={eventUk}
        eventEn={eventEn}
      />
    </div>
  );
};

export default privateRoute({
  component: UpdateEventForm,
  redirectTo: NAVIGATION.login,
});
