'use client';

import AdminHeader from '@/components/admin-panel/common/admin-header';
import ButtonBack from '@/components/common/button-back';
import EventForm from '@/components/admin-panel/event-list/event-form/event-form';
import { useState } from 'react';
import {
  useCreateEventMutation,
  useDeleteEventMutation,
} from '@/redux/api/eventsApi';
import {
  useCreateImageMutation,
  useDeleteImageMutation,
} from '@/redux/api/imageApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useLazyRefreshQuery } from '@/redux/api/authApi';

import { v4 as uuidv4 } from 'uuid';
import { resetState, setCredentials } from '@/redux/slice/authSlice';
import Cookies from 'js-cookie';
import { BasicModalWindows } from '@/components/common';

// async function uploadAndSetImageUrlsToFormData(file) {
//   const formDataImage = new FormData();
//   formDataImage.append('file', file);

//   const imageName = await addImage(formDataImage).unwrap();
//   tempNameImages.push(imageName);

//   return imageName;
// }

// async function deleteData(dataToDelete) {
//   Promise.all(dataToDelete.map(file => deleteImage(file)));
// }

export default function AddEvent() {
  const [statusMessage, setStatusMessage] = useState('');

  const [clickBack, setClickBack] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isRefreshModalVisible, setIsRefreshModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const [addEvent, { isLoading: isLoadingAddEvent }] = useCreateEventMutation();
  const [addImage, { isLoading: isLoadingAddImage }] = useCreateImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();
  const [deleteEvent, { isLoading: isLoadingDeleteEvent }] =
    useDeleteEventMutation();
  const [refresh, { isLoading: isLoadingRefresh, isError: isErrorRefresh }] =
    useLazyRefreshQuery();

  const isLoading =
    isLoadingRefresh ||
    isLoadingAddEvent ||
    isLoadingAddImage ||
    isLoadingDeleteImage ||
    isLoadingDeleteEvent;

  const dispatch = useDispatch();
  const router = useRouter();

  const tempNameImages = [];
  const tempAddedEvents = [];

  async function handleSubmit(
    { common, firstLocale, secundLocale },
    resetForm
  ) {
    const idIdentifier = uuidv4();

    try {
      let formDataImageUk = new FormData();
      let formDataImageEn = new FormData();

      formDataImageUk.append('file', firstLocale?.eventImage[0]);
      formDataImageEn.append('file', secundLocale?.eventImage[0]);

      const imageNameForRequestUk = await addImage(formDataImageUk).unwrap();
      if (imageNameForRequestUk) tempNameImages.push(imageNameForRequestUk);

      const imageNameForRequestEn = await addImage(formDataImageEn).unwrap();
      if (imageNameForRequestEn) tempNameImages.push(imageNameForRequestEn);

      const firstLocaleFormData = {
        ...common,
        ...firstLocale,
        idIdentifier,
        locale: 'uk_UA',
        eventUrl: 'https://TODO:_delete_this.line',
        ...imageNameForRequestUk,
      };

      const secundLocaleFormData = {
        ...common,
        ...secundLocale,
        idIdentifier,
        locale: 'en_US',
        eventUrl: 'https://TODO:_delete_this.line',
        ...imageNameForRequestEn,
      };

      const responseDataUk = await addEvent(firstLocaleFormData).unwrap();
      if (imageNameForRequestUk) tempAddedEvents.push(responseDataUk);

      const responseDataEn = await addEvent(secundLocaleFormData).unwrap();
      if (imageNameForRequestUk) tempAddedEvents.push(responseDataEn);
      resetForm();

      setStatusMessage('Подію додано.');
      setIsSuccessModalVisible(true);
      tempNameImages.length = 0;
      tempAddedEvents.length = 0;
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

      for (const file of tempNameImages) {
        await deleteImage(file);
      }

      for (const file of tempAddedEvents) {
        await deleteEvent(file.id);
      }
    }
  }

  return (
    <div>
      <AdminHeader title={'Додати подію'}>
        <ButtonBack setClickBack={setClickBack} />
      </AdminHeader>

      <div className="pb-32 pl-5 pr-5 desktop:pr-20">
        <EventForm
          clickBack={clickBack}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          buttonNameSubmit={'Додати подію'}
          buttonNameReset={'Скасувати'}
        />
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
