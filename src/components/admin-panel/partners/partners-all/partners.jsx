'use client';
import { Link } from '@/navigation';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import {
  useGetPartnersQuery,
  useDeletePartnerMutation,
} from '@/redux/api/partnersApi';
import { useState } from 'react';
import { BasicModalWindows } from '@/components/common';
import DisplayList from './display-list';

export default function Partners() {
  const [idDeletePartner, setIdDeletePartner] = useState(null);
  const [deletePartnerName, setDeletePartnerName] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [deletePartner, { isLoading }] = useDeletePartnerMutation();

  const { data: serverData } = useGetPartnersQuery();
  console.log('data', serverData);

  async function handleConfirmDelete() {
    setDeletePartnerName(null);
    setStatusMessage('');
    setIsConfirmationModalVisible(false);
    try {
      await deletePartner(idDeletePartner).unwrap();

      setStatusMessage('Партнера видалено');

      setIsShowSuccessMessage(true);
    } catch (error) {
      setStatusMessage('Сталася помилка. Спробуйте ще раз.');
      setIsShowErrorMessage(true);
      console.log(error);
    } finally {
      setIdDeletePartner(null);
    }
  }

  return (
    <div>
      <AdminHeader title={'Партнери'}>
        <Link
          className="button-common-hover-dark bg-admin-dark px-[30px] py-2.5 font-source_sans_3 text-white tablet:text-base desktop:text-xl"
          href={'/admin/partner'}
        >
          Додати партнера
        </Link>
      </AdminHeader>

      <div className="ml-5 tablet:mr-5 desktop:mr-20">
        <DisplayList
          showConfirmationModal={(partnerId, partnerName) => {
            setIsConfirmationModalVisible(true);
            setIdDeletePartner(partnerId);
            setDeletePartnerName(partnerName);
          }}
          serverData={serverData}
        />
      </div>
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => {
            setIsConfirmationModalVisible(false);
            setDeletePartnerName(null);
          }}
          title={`Видалити ${deletePartnerName}`}
        >
          <div>Ви точно хочете видалити цей тип подій?</div>
          <div className="flex gap-[15px]">
            <button
              disabled={isLoading}
              className="button-close"
              onClick={() => {
                setIsConfirmationModalVisible(false);
                setDeletePartnerName(null);
              }}
              type="button"
            >
              Скасувати
            </button>
            <button
              disabled={isLoading}
              className="button-confirm"
              onClick={handleConfirmDelete}
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
