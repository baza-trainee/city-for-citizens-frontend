'use client';

import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import EventForm from '@/components/admin-panel/event-list/event-form/event-form';
import {
  useGetEventsByIdForUpdateFormQuery,
  useUpdateEventMutation,
} from '@/redux/api/eventsApi';
import {
  useCreateImageMutation,
  useDeleteImageMutation,
} from '@/redux/api/imageApi';
import { useDispatch } from 'react-redux';
import { useRouter } from '@/navigation';
import { useLazyRefreshQuery } from '@/redux/api/authApi';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetState, setCredentials } from '@/redux/slice/authSlice';
import Cookies from 'js-cookie';
import { BasicModalWindows } from '@/components/common';

export default function EditEvent({ eventId }) {
  const [statusMessage, setStatusMessage] = useState('');

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isRefreshModalVisible, setIsRefreshModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const page = useSearchParams().get('page');

  const { data: eventDataById } = useGetEventsByIdForUpdateFormQuery({
    eventId,
    page: page || 1,
  });

  const [updateEvent, { isLoading: isLoadingUpdateEvent }] =
    useUpdateEventMutation();

  const [addImage, { isLoading: isLoadingAddImage }] = useCreateImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const [refresh, { isLoading: isLoadingRefresh, isError: isErrorRefresh }] =
    useLazyRefreshQuery();

  const isLoading =
    isLoadingRefresh ||
    isLoadingUpdateEvent ||
    isLoadingAddImage ||
    isLoadingDeleteImage;

  const tempNameImages = [];

  async function handleSubmit(formData) {
    try {
      for (const data of formData) {
        if (typeof data.eventImage === 'string') {
          const localeFormData = {
            ...data,
            eventUrl: 'https://TODO:_delete_this.line',
          };

          delete localeFormData.id;

          await updateEvent({
            body: localeFormData,
            eventId: data.id,
          }).unwrap();

          setStatusMessage('Подію оновлено.');
          setIsSuccessModalVisible(true);
        } else if (Array.isArray(data.eventImage)) {
          let formDataImage = new FormData();
          formDataImage.append('file', data?.eventImage[0]);

          const imageNameForRequest = await addImage(formDataImage).unwrap();
          if (imageNameForRequest) tempNameImages.push(imageNameForRequest);

          const localeFormData = {
            ...data,
            eventUrl: 'https://TODO:_delete_this.line',
            ...imageNameForRequest,
          };

          delete localeFormData.id;

          await updateEvent({
            body: localeFormData,
            eventId: data.id,
          }).unwrap();

          setStatusMessage('Подію оновлено.');
          setIsSuccessModalVisible(true);
        }
      }
    } catch (error) {
      if (error.status === 401) {
        try {
          const response = await refresh().unwrap();
          if (!isErrorRefresh) {
            dispatch(setCredentials(response));
          }

          setStatusMessage(
            "Час Вашої сесії сплив, тому нам довелось перевірити Ваші дані, спробуйте ще раз натиснути на кнопку 'Додати подію'."
          );
          setIsRefreshModalVisible(true);
        } catch {
          if (isErrorRefresh) {
            dispatch(resetState());
            Cookies.remove('accessToken');
            router.push('/login');
          }
        }
      } else {
        setStatusMessage('Щось пішло не так, спробуйте, будь ласка, пізніше.');
        setIsErrorModalVisible(true);
      }

      await Promise.all(tempNameImages.map(file => deleteImage(file)));

      tempNameImages.length = 0;
    }
  }
  return (
    <div>
      <AdminHeader title={'Редагувати подію'}>
        <ButtonBack />
      </AdminHeader>

      <div className="pb-32 pl-5 pr-20">
        {eventDataById && (
          <EventForm
            isLoading={isLoading}
            initialData={eventDataById}
            onSubmit={handleSubmit}
            buttonNameSubmit={'Редагувати подію'}
            buttonNameReset={'Скасувати'}
          />
        )}
      </div>
      {isSuccessModalVisible && (
        <BasicModalWindows
          onClose={() => setIsSuccessModalVisible(false)}
          title={'Успіх!'}
          type="success"
          message={statusMessage}
        ></BasicModalWindows>
      )}
      {isRefreshModalVisible && (
        <BasicModalWindows
          onClose={() => setIsRefreshModalVisible(false)}
          title={'Увага!'}
          type="warn"
          message={statusMessage}
        ></BasicModalWindows>
      )}
      {isErrorModalVisible && (
        <BasicModalWindows
          onClose={() => setIsErrorModalVisible(false)}
          title={'Помилка!'}
          type="error"
          message={statusMessage}
        ></BasicModalWindows>
      )}
    </div>
  );
}
