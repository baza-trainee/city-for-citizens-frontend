'use client';

import { NAVIGATION } from '@/helpers/constants';
import { useState } from 'react';
import { privateRoute } from '../privateRoute';

import { useRouter } from '@/navigation';
import { useLazyRefreshQuery } from '@/redux/api/authApi';
import {
  useGetEventsByIdForUpdateFormQuery,
  useUpdateEventMutation,
} from '@/redux/api/eventsApi';
import {
  useCreateImageMutation,
  useDeleteImageMutation,
} from '@/redux/api/imageApi';
import { resetState, setCredentials } from '@/redux/slice/authSlice';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import Loader from '../UI/Loader';
import EventForm from './EventForm/EventForm';
import BasicModalWindows from './ModalWindow/BasicModalWindows';

const UpdateEventForm = ({ eventId }) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusRefreshMessage, setStatusRefreshMessage] = useState('');
  const [statusImageMessage, setStatusImageMessage] = useState('');

  const [updateEvent, { isLoading: isLoadingUpdateEvent }] =
    useUpdateEventMutation();

  const [addImage, { isLoading: isLoadingAddImage }] = useCreateImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const [refresh, { isLoading: isLoadingRefresh, isError: isErrorRefresh }] =
    useLazyRefreshQuery();

  const t = useTranslations('Admin.updateEvent');

  const { data: initialData } = useGetEventsByIdForUpdateFormQuery(eventId);

  const handleSubmit = async ({ common, firstLocale, secundLocale }) => {
    let tempData = {
      image: {
        uk: {},
        en: {},
      },
    };

    try {
      if (firstLocale.eventImage.length > 0 && firstLocale?.eventImage[0]) {
        let formDataImageUk = new FormData();
        formDataImageUk.append('file', firstLocale?.eventImage[0]);
        const imageNameForRequestUk = await addImage(formDataImageUk).unwrap();
        if (imageNameForRequestUk) {
          tempData.image.uk = imageNameForRequestUk;
        }
        const firstLocaleFormData = {
          ...common,
          ...firstLocale,

          locale: 'uk_UA',
          ...imageNameForRequestUk,
        };

        delete firstLocaleFormData.id;
        delete firstLocaleFormData.eventImageName;

        await updateEvent({
          body: firstLocaleFormData,
          eventId: firstLocale.id,
        }).unwrap();

        try {
          await deleteImage({
            eventImage: firstLocale.eventImageName,
          }).unwrap();
        } catch (error) {
          setStatusImageMessage(t('message.errorImage'));
        }
      } else {
        const firstLocaleFormData = {
          ...common,
          ...firstLocale,
          locale: 'uk_UA',
          eventImage: firstLocale.eventImageName,
        };
        delete firstLocaleFormData.id;
        delete firstLocaleFormData.eventImageName;
        await updateEvent({
          body: firstLocaleFormData,
          eventId: firstLocale.id,
        }).unwrap();
      }
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
      if (tempData.image.uk.eventImage) {
        deleteImage(tempData.image.uk);
      }
      tempData.image.uk = {};
      return;
    }

    try {
      if (secundLocale.eventImage.length > 0 && secundLocale?.eventImage[0]) {
        let formDataImageEn = new FormData();
        formDataImageEn.append('file', secundLocale?.eventImage[0]);

        const imageNameForRequestEn = await addImage(formDataImageEn).unwrap();

        if (imageNameForRequestEn) {
          tempData.image.en = imageNameForRequestEn;
        }
        const secundLocaleFormData = {
          ...common,
          ...secundLocale,

          locale: 'en_US',
          ...imageNameForRequestEn,
        };
        delete secundLocaleFormData.id;
        delete secundLocaleFormData.eventImageName;

        await updateEvent({
          body: secundLocaleFormData,
          eventId: secundLocale.id,
        }).unwrap();

        try {
          await deleteImage({
            eventImage: secundLocale.eventImageName,
          }).unwrap();
        } catch (error) {
          if (!statusImageMessage) {
            setStatusImageMessage(t('message.errorImage'));
          }
        }
      } else {
        const secundLocaleFormData = {
          ...common,
          ...secundLocale,
          locale: 'en_US',
          eventImage: secundLocale.eventImageName,
        };
        delete secundLocaleFormData.id;
        delete secundLocaleFormData.eventImageName;
        await updateEvent({
          body: secundLocaleFormData,
          eventId: secundLocale.id,
        }).unwrap();
      }

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
      if (tempData.image.en.eventImage) {
        deleteImage(tempData.image.en);
      }
      tempData.image.en = {};
    }
  };

  return (
    <>
      <div className="container">
        <h1 className=" mb-[30px] text-center text-[34px]">{t('title')}</h1>
        {initialData && (
          <EventForm
            onSubmit={handleSubmit}
            buttonNameSubmit={t('buttonName.update')}
            buttonNameReset={t('buttonName.cancel')}
            initialData={initialData}
          />
        )}
      </div>
      {isLoadingRefresh ||
      isLoadingAddImage ||
      isLoadingDeleteImage ||
      isLoadingUpdateEvent ? (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-primary/0/20">
          <Loader />
        </div>
      ) : null}

      {statusRefreshMessage || statusMessage ? (
        <BasicModalWindows
          onClose={() => {
            setStatusMessage('');
            setStatusRefreshMessage('');
            setStatusImageMessage('');
          }}
          message={statusRefreshMessage || statusMessage + statusImageMessage}
          detailsMessage={statusImageMessage}
        />
      ) : null}
    </>
  );
};

export default privateRoute({
  component: UpdateEventForm,
  redirectTo: NAVIGATION.login,
});
