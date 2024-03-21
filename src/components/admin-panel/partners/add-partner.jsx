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
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const router = useRouter();
  function handleClose(isDirty) {
    if (!isDirty) router.back();
    else {
      setIsConfirmationModalVisible(true);
    }
  }
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
          onClose={handleClose}
          isLoading={false}
          initialData={initialFormData}
          nameButtonSubmit="Додати"
          type="add"
        />
      </div>
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => setIsConfirmationModalVisible(false)}
          title={'Скасувати зміни'}
        >
          <div className="text-center font-source_sans_3 text-lg leading-[24.3px]">
            Ви точно хочете скасувати зміни? <br /> Вони не будуть збережені
          </div>
          <div className="flex gap-[15px]">
            <button
              className="button-close-hover  pb-[10px] pt-[7px] leading-8"
              onClick={() => setIsConfirmationModalVisible(false)}
              type="button"
            >
              Скасувати
            </button>
            <button
              className="button-confirm-hover  pb-[10px] pt-[7px] leading-8"
              onClick={() => router.back()}
              type="button"
            >
              Підтвердити
            </button>
          </div>
        </BasicModalWindows>
      )}
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
