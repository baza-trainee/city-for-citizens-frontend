'use client';

import { v4 as uuidv4 } from 'uuid';
import { NAVIGATION } from '@/helpers/constants';

import { privateRoute } from '../privateRoute';

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
import EventForm from './EventForm/EventForm';

import { useLazyRefreshQuery } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { resetState, setCredentials } from '@/redux/slice/authSlice';
import { useRouter } from '@/navigation';
import Cookies from 'js-cookie';

const AddEvent = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusRefreshMessage, setStatusRefreshMessage] = useState('');

  const [addEvent, { isLoading: isLoadingAddEvent }] = useCreateEventMutation();
  const [addImage, { isLoading: isLoadingAddImage }] = useCreateImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();
  const [deleteEvent, { isLoading: isLoadingDeleteEvent }] =
    useDeleteEventMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const [refresh, { isLoading: isLoadingRefresh, isError: isErrorRefresh }] =
    useLazyRefreshQuery();

  const t = useTranslations('Admin.addEvent');
  const handleSubmit = async (
    { common, firstLocale, secundLocale },
    resetForm
  ) => {
    const idIdentifier = uuidv4();
    const initialData = {
      image: {
        uk: {},
        en: {},
      },
      eventData: {
        uk: {},
        en: {},
      },
    };

    let tempData = {
      image: {
        uk: {},
        en: {},
      },
      eventData: {
        uk: {},
        en: {},
      },
    };

    try {
      let formDataImageUk = new FormData();
      let formDataImageEn = new FormData();

      formDataImageUk.append('file', firstLocale?.eventImage[0]);
      formDataImageEn.append('file', secundLocale?.eventImage[0]);

      const imageNameForRequestUk = await addImage(formDataImageUk).unwrap();

      if (imageNameForRequestUk) {
        tempData.image.uk = imageNameForRequestUk;
      }
      const imageNameForRequestEn = await addImage(formDataImageEn).unwrap();

      if (imageNameForRequestEn) {
        tempData.image.en = imageNameForRequestEn;
      }
      const firstLocaleFormData = {
        ...common,
        ...firstLocale,
        idIdentifier,
        locale: 'uk_UA',
        ...imageNameForRequestUk,
      };

      const secundLocaleFormData = {
        ...common,
        ...secundLocale,
        idIdentifier,
        locale: 'en_US',
        ...imageNameForRequestEn,
      };

      const responseDataUk = await addEvent(firstLocaleFormData).unwrap();
      if (responseDataUk) {
        tempData.eventData.uk = responseDataUk;
      }

      const responseDataEn = await addEvent(secundLocaleFormData).unwrap();
      if (responseDataEn) {
        tempData.eventData.en = responseDataEn;
      }
      resetForm();
      tempData = { ...initialData };
      setStatusRefreshMessage('');
      setStatusMessage(t('message.success'));
    } catch (error) {
      if (error.status === 401) {
        try {
          const response = await refresh().unwrap();
          if (!isErrorRefresh) {
            dispatch(setCredentials(response));
          }

          setStatusRefreshMessage(t('message.refresh'));
        } catch {
          if (isErrorRefresh) {
            dispatch(resetState());
            Cookies.remove('accessToken');
            router.push('/login');
          }
        }
      }
      if (!statusRefreshMessage) {
        setStatusMessage(t('message.error'));
      }
      if (tempData.eventData.uk.id) {
        deleteEvent(tempData.eventData.uk.id);
      } else if (tempData.image.uk.eventImage) {
        deleteImage(tempData.image.uk);
      }
      if (tempData.eventData.en.id) {
        deleteEvent(tempData.eventData.en.id);
      } else if (tempData.image.en.eventImage) {
        deleteImage(tempData.image.en);
      }
    } finally {
      tempData = { ...initialData };
    }
  };

  return (
    <>
      <div className="container">
        <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
        <EventForm
          onSubmit={handleSubmit}
          buttonNameSubmit={t('buttonName.add')}
          buttonNameReset={t('buttonName.cancel')}
        />
      </div>

      {isLoadingRefresh ||
      isLoadingAddEvent ||
      isLoadingAddImage ||
      isLoadingDeleteImage ||
      isLoadingDeleteEvent ? (
        <div className="fixed flex h-full w-full items-center justify-center bg-primary/0/20">
          <Loader />
        </div>
      ) : null}

      {statusRefreshMessage || statusMessage ? (
        <BasicModalWindows
          onClose={() => {
            setStatusMessage('');
            setStatusRefreshMessage('');
          }}
          message={statusRefreshMessage || statusMessage}
        />
      ) : null}
    </>
  );
};

export default privateRoute({
  component: AddEvent,
  redirectTo: NAVIGATION.login,
});
