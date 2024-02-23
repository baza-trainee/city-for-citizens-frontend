'use client';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import PartnerForm from '@/components/admin-panel/partners/partner-form';
import { useState } from 'react';
import { useCreatePartnerMutation } from '@/redux/api/partnersApi';
import { useCreateImageMutation } from '@/redux/api/imageApi';
import { BasicModalWindows } from '@/components/common';

export default function AddPartner() {
  const [addPartner] = useCreatePartnerMutation();
  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [addImage, { isLoading: isLoadingAddImage }] = useCreateImageMutation();
  async function handleSubmit(data) {
    try {
      let formDataImage = new FormData();
      formDataImage.append('file', data?.partnerImage[0]);

      const imageNameForRequest = await addImage(formDataImage).unwrap();
      console.log('image name for request', imageNameForRequest);
      const localeFormData = {
        name: data.partnerName,
        link: data.partnerLink,
        image: imageNameForRequest.eventImage,
      };
      console.log('formDataToSend', localeFormData);
      await addPartner(localeFormData).unwrap();
      setStatusMessage('Партнера успішно додано');
      setIsShowSuccessMessage(true);
    } catch (err) {
      setStatusMessage('Щось пішло не так... Спробуйте піздніше');
      setIsShowErrorMessage(true);
      console.log(err);
    }
  }

  return (
    <div className="ml-[42px]">
      <div className="-mb-[5px] -ml-5">
        <AdminHeader title={'Додати партнера'} />
      </div>
      <div className="">
        <PartnerForm
          onSubmit={handleSubmit}
          isLoading={false}
          nameButtonSubmit="Додати"
        />
      </div>
      {isShowSuccessMessage && (
        <BasicModalWindows
          onClose={() => setIsShowSuccessMessage(false)}
          title={'Успіx!'}
          type="success"
          message={statusMessage}
        ></BasicModalWindows>
      )}
      {isShowErrorMessage && (
        <BasicModalWindows
          onClose={() => setIsShowErrorMessage(false)}
          title={'Помилка'}
          type={'error'}
          message={statusMessage}
        ></BasicModalWindows>
      )}
    </div>
  );
}
