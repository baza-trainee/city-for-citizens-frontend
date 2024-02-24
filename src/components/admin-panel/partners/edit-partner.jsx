'use client';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import PartnerForm from '@/components/admin-panel/partners/partner-form';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import {
  useGetPartnersByIdForUpdateFormQuery,
  useUpdatePartnerMutation,
} from '@/redux/api/partnersApi';
import { BasicModalWindows } from '@/components/common';

export default function EditPartner({ partnerId }) {
  console.log('id', partnerId);
  const [editPartner] = useUpdatePartnerMutation();
  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const { data: serverData } = useGetPartnersByIdForUpdateFormQuery(partnerId);
  const router = useRouter();
  const defaultValue = {
    name: '',
    link: '',
    image: '',
  };
  const [initialData, setInitialData] = useState(defaultValue);
  useEffect(() => {
    console.log('serverData', serverData);
    if (serverData) {
      setInitialData(() => ({
        name: serverData.name,
        link: serverData.link,
        image: serverData.image,
      }));
    }
  }, [serverData]);
  async function handleSubmit(data, resetForm) {
    try {
      let formData = new FormData();
      formData.append('image', data?.image[0]);
      formData.append('name', data.name);
      formData.append('link', data.link);

      await editPartner({ body: formData, partnerId }).unwrap();
      resetForm();
      setStatusMessage('Ваші зміни успішно збережено');
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
        <AdminHeader title={'Редагувати партнера'} />
      </div>
      <div className="">
        {initialData && (
          <PartnerForm
            onSubmit={handleSubmit}
            isLoading={false}
            nameButtonSubmit="Зберегти"
            onClose={() => setIsConfirmationModalVisible(true)}
            initialData={initialData}
          />
        )}
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
              className="button-close"
              onClick={() => setIsConfirmationModalVisible(false)}
              type="button"
            >
              Скасувати
            </button>
            <button
              className="button-confirm"
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
