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
import Loader from '../UI/Loader';
import BasicModalWindows from './ModalWindow/BasicModalWindows';

const UpdateEventForm = ({ eventId }) => {
  const [eventUk, setEventUk] = useState(null);
  const [eventEn, setEventEn] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);

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
  }, [eventId, localeForRequest, isLoading]);

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

    setIsLoading(true);
    setStatusMessage('');
    setIsStatusMessageVisible(false);

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
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (requestUk?.eventImage) {
        deleteEventImage({ eventImage: requestUk?.eventImage });
      }
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
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

      setStatusMessage('Подію успішно оновлено.');
      setIsStatusMessageVisible(true);
    } catch (error) {
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (requestEn?.eventImage) {
        deleteEventImage({ eventImage: requestEn?.eventImage });
      }
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
        <EventForm
          onSubmit={handleSubmit}
          buttonName={t('buttonName.update')}
          eventUk={eventUk}
          eventEn={eventEn}
        />
      </div>
      {isLoading && (
        <div className="fixed flex h-full w-full items-center justify-center bg-primary/0/20">
          <Loader />
        </div>
      )}

      {isStatusMessageVisible && statusMessage && (
        <BasicModalWindows
          onClose={() => setIsStatusMessageVisible(false)}
          message={statusMessage}
        />
      )}
    </>
  );
};

export default privateRoute({
  component: UpdateEventForm,
  redirectTo: NAVIGATION.login,
});
