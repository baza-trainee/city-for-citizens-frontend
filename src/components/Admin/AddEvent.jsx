'use client';

import { v4 as uuidv4 } from 'uuid';
import { NAVIGATION } from '@/helpers/constants';

import { privateRoute } from '../privateRoute';

import EventForm from './EventForm/EventForm';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import BasicModalWindows from './ModalWindow/BasicModalWindows';
import Loader from '../UI/Loader';
import {
  useCreateEventMutation,
  useDeleteEventMutation,
} from '@/redux/api/eventsApi';
import {
  useCreateImageMutation,
  useDeleteImageMutation,
} from '@/redux/api/imageApi';
import AdminHeader from './AdminHeader';
import ButtonBack from './button-back';

const AddEvent = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);

  const [addEvent, { isLoading }] = useCreateEventMutation();

  const [deleteEvent] = useDeleteEventMutation();
  const [addImage] = useCreateImageMutation();
  const [deleteImage] = useDeleteImageMutation();

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
      setStatusMessage('');
      setIsStatusMessageVisible(false);
      const imageNameForRequestUk = await addImage(formDataImageUk).unwrap();

      const imageNameForRequestEn = await addImage(formDataImageEn).unwrap();

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

      responseUk = await addEvent(requestUk).unwrap();
      responseEn = await addEvent(requestEn).unwrap();
      setStatusMessage('Подію успішно додано.');
      setIsStatusMessageVisible(true);
      resetForm();
    } catch (error) {
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (responseUk?.id) {
        deleteEvent(responseUk?.id);
      } else if (requestUk?.eventImage) {
        deleteImage({ eventImage: requestUk?.eventImage });
      }

      if (responseEn?.id) {
        deleteEvent(responseEn?.id);
      } else if (requestEn?.eventImage) {
        deleteImage({ eventImage: requestEn?.eventImage });
      }
    }
  };

  return (
    <>
      <div>
        <AdminHeader title={t('title')}>
          {' '}
          <ButtonBack />
        </AdminHeader>

        <div className="px-[15px]">
          <EventForm onSubmit={handleSubmit} buttonName={t('buttonName.add')} />
        </div>
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
