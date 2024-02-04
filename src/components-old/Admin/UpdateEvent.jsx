'use client';

import EventForm from './EventForm/EventForm';
import { privateRoute } from '../private-route';
import { NAVIGATION } from '@/helpers/constants';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Loader from '../UI/Loader';
import BasicModalWindows from '../../components/common/basic-modal-windows';
import {
  useGetEventsByIdQuery,
  useUpdateEventMutation,
} from '@/redux/api/eventsApi';
import {
  useCreateImageMutation,
  useDeleteImageMutation,
} from '@/redux/api/imageApi';
import AdminHeader from '../../components/admin-panel/common/admin-header';
import ButtonBack from '../../components/common/button-back';

const UpdateEventForm = ({ eventId }) => {
  const [eventUk, setEventUk] = useState(null);
  const [eventEn, setEventEn] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);

  const [updateEvent] = useUpdateEventMutation();
  const [addImage] = useCreateImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  const t = useTranslations('Admin.updateEvent');

  const { data } = useGetEventsByIdQuery(eventId);

  useEffect(() => {
    if (data) {
      setEventUk(data.eventUk);
      setEventEn(data.eventEn);
    }
  }, [data, eventId]);

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
        const imageNameForRequestUk = await addImage(formDataImageUk).unwrap();
        requestUk = {
          idIdentifier,
          ...formDataUk,
          ...imageNameForRequestUk,
        };
        await updateEvent({ body: requestUk, eventId: eventUk.id }).unwrap();
        try {
          await deleteImage({ eventImage: formDataUk.eventImage }).unwrap();
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        requestUk = {
          idIdentifier,
          ...formDataUk,
        };
        await updateEvent({ body: requestUk, eventId: eventUk.id }).unwrap();
      }
    } catch (error) {
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (requestUk?.eventImage) {
        deleteImage({ eventImage: requestUk?.eventImage }).unwrap();
      }
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }

    try {
      if (formDataImageEn) {
        const imageNameForRequestEn = await addImage(formDataImageEn).unwrap();
        requestEn = {
          idIdentifier,
          ...formDataEn,
          ...imageNameForRequestEn,
        };
        await updateEvent({ body: requestEn, eventId: eventEn.id }).unwrap();
        try {
          await deleteImage({ eventImage: formDataEn.eventImage }).unwrap();
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        requestEn = {
          idIdentifier,
          ...formDataEn,
        };

        await updateEvent({ body: requestEn, eventId: eventEn.id }).unwrap();
      }

      setStatusMessage('Подію успішно оновлено.');
      setIsStatusMessageVisible(true);
    } catch (error) {
      setStatusMessage(`Сталася помилка: ${error.message}`);
      setIsStatusMessageVisible(true);
      if (requestEn?.eventImage) {
        deleteImage({ eventImage: requestEn?.eventImage }).unwrap();
      }
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <AdminHeader title={t('title')}>
          <ButtonBack />
        </AdminHeader>

        <div className="px-[15px]">
          <EventForm
            onSubmit={handleSubmit}
            buttonName={t('buttonName.update')}
            eventUk={eventUk}
            eventEn={eventEn}
          />
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
  component: UpdateEventForm,
  redirectTo: NAVIGATION.login,
});
