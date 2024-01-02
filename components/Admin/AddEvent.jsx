'use client';

import { v4 as uuidv4 } from 'uuid';
import { NAVIGATION } from '@/helpers/constants';

import { privateRoute } from '../privateRoute';

import {
  createEvent,
  createEventImage,
  deleteEvent,
  deleteEventImage,
} from '@/services/eventAPI';
import EventForm from './EventForm/EventForm';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import BasicModalWindows from './ModalWindow/BasicModalWindows';
import Loader from '../UI/Loader';

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);

  const t = useTranslations('Admin.addEvent');
  const handleSubmit = async (
    e,
    formDataUk,
    formDataEn,

    formDataImageUk,
    formDataImageEn,
    resetForm
  ) => {
    e.preventDefault();
    const idIdentifier = uuidv4();

    let responseUk;
    let responseEn;
    let requestUk;
    let requestEn;
    try {
      setIsLoading(true);
      setStatusMessage('');
      setIsStatusMessageVisible(false);
      const imageNameForRequestUk = await createEventImage(formDataImageUk);

      const imageNameForRequestEn = await createEventImage(formDataImageEn);

      requestUk = {
        idIdentifier,
        ...formDataUk,

        ...imageNameForRequestUk,
      };
      requestEn = {
        idIdentifier,
        ...formDataEn,

        ...imageNameForRequestEn,
      };

      responseUk = await createEvent(requestUk);
      responseEn = await createEvent(requestEn);
      setStatusMessage('Подію успішно додано.');
      setIsStatusMessageVisible(true);
      resetForm();
    } catch (error) {
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (responseUk?.id) {
        deleteEvent(responseUk?.id);
      } else if (requestUk?.eventImage) {
        deleteEventImage({ eventImage: requestUk?.eventImage });
      }

      if (responseEn?.id) {
        deleteEvent(responseEn?.id);
      } else if (requestEn?.eventImage) {
        deleteEventImage({ eventImage: requestEn?.eventImage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
        <EventForm onSubmit={handleSubmit} buttonName={t('buttonName.add')} />
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
  component: AddEvent,
  redirectTo: NAVIGATION.login,
});
