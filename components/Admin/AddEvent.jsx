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
import EventForm from './EventForm';
import { useTranslations } from 'next-intl';

const AddEvent = () => {
  const t = useTranslations('Admin.addEvent');
  const handleSubmit = async (
    e,
    formDataUk,
    formDataEn,

    formDataImageUk,
    formDataImageEn
  ) => {
    e.preventDefault();
    const idIdentifier = uuidv4();

    let responseUk;
    let responseEn;
    let requestUk;
    let requestEn;
    try {
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
    } catch (error) {
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
    }
  };

  return (
    <div className="container">
      <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
      <EventForm onSubmit={handleSubmit} buttonName={t('buttonName.add')} />
    </div>
  );
};

export default privateRoute({
  component: AddEvent,
  redirectTo: NAVIGATION.login,
});
