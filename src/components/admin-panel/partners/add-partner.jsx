'use client';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import PartnerForm from '@/components/admin-panel/partners/partner-form';
import { useState } from 'react';
import { useCreatePartnerMutation } from '@/redux/api/partnersApi';
import { BasicModalWindows } from '@/components/common';
import { useRouter } from '@/navigation';

export default function AddPartner() {
  const [addPartner] = useCreatePartnerMutation();
  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const router = useRouter();

  async function handleSubmit(data, resetForm) {
    try {
      let formDataImage = new FormData();
      formDataImage.append('image', data?.image[0]);
      formDataImage.append('name', data.name);
      formDataImage.append('link', data.link);

      await addPartner(formDataImage).unwrap();
      resetForm();
      setStatusMessage('Партнера успішно додано');
      setIsShowSuccessMessage(true);
    } catch (err) {
      setStatusMessage('Щось пішло не так... Спробуйте піздніше');
      setIsShowErrorMessage(true);
      console.log(err);
    }
  }
  const initialFormData = {
    name: '',
    link: '',
    image: '',
  };

  return (
    <div className="ml-[42px]">
      <div className="-mb-[5px] -ml-5">
        <AdminHeader title={'Додати партнера'} />
      </div>
      <div className="">
        <PartnerForm
          onSubmit={handleSubmit}
          onClose={() => router.back()}
          isLoading={false}
          initialData={initialFormData}
          nameButtonSubmit="Додати"
          type="add"
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
