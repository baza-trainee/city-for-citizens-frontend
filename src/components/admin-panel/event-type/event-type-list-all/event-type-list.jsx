'use client';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import {
  useGetTypesEventQuery,
  useDeleteTypeEventMutation,
} from '@/redux/api/typesEventApi';
import { useLazyGetTypesEventByIdForUpdateFormQuery } from '@/redux/api/typesEventApi';
import { useState } from 'react';

import { BasicModalWindows } from '@/components/common';

import DisplayList from './display-list';
import CreateTypeEvent from './helpers/create-type-event';
import EditTypeEvent from './helpers/edit-type-event';

export default function EventTypeList() {
  const [idDeleteTypeEvent, setIdDeleteTypeEvent] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isCreateTypeModalVisible, setIsCreateTypeModalVisible] =
    useState(false);
  const [isEditTypeModalVisible, setIsEditTypeModalVisible] = useState(false);
  const [editTypeData, setEditTypeData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteTypeEvent, { isLoading }] = useDeleteTypeEventMutation();
  const { data: serverData } = useGetTypesEventQuery();
  const [getTypesEventById] = useLazyGetTypesEventByIdForUpdateFormQuery();

  const typesList = serverData?.eventTypes;

  async function handleConfirmDelete() {
    setDeleteType(null);
    setStatusMessage('');
    setIsConfirmationModalVisible(false);
    try {
      await deleteTypeEvent(idDeleteTypeEvent).unwrap();

      setStatusMessage('Тип події видалено');

      setIsShowSuccessMessage(true);
    } catch (error) {
      setStatusMessage('Сталася помилка. Спробуйте ще раз.');
      setIsShowErrorMessage(true);
      console.log(error);
    } finally {
      setIdDeleteTypeEvent(null);
    }
  }
  async function handleEdit(id) {
    try {
      const types = await getTypesEventById(id).unwrap();
      setIsEditTypeModalVisible(true);
      setEditTypeData(types);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="">
      <AdminHeader title={'Типи подій'}>
        <button
          onClick={() => setIsCreateTypeModalVisible(true)}
          className="button-common-header bg-admin-dark px-[27px] py-[10px] font-source_sans_3 text-white laptop:text-base desktop:text-xl"
        >
          Додати новий тип подій
        </button>
      </AdminHeader>
      <div className="ml-5 tablet:mr-5 desktop:mr-20">
        <DisplayList
          showConfirmationModal={(eventTypeId, typeName) => {
            setIsConfirmationModalVisible(true);
            setIdDeleteTypeEvent(eventTypeId);
            setDeleteType(typeName);
          }}
          edit={id => handleEdit(id)}
          typesData={typesList}
        />
      </div>
      {isCreateTypeModalVisible && (
        <CreateTypeEvent
          close={() => setIsCreateTypeModalVisible(false)}
          success={() => {
            setIsShowSuccessMessage(true);
            setStatusMessage('Тип події успішно додано');
          }}
          error={() => {
            setIsShowErrorMessage(true);
            setStatusMessage('Щось пішло не так... Спробуйте піздніше');
          }}
        />
      )}
      {isEditTypeModalVisible && (
        <>
          {console.log('handle editTypeData to editTypeEvent', editTypeData)}
          <EditTypeEvent
            typeEvent={editTypeData}
            close={() => setIsEditTypeModalVisible(false)}
            success={() => {
              setIsShowSuccessMessage(true);
              setStatusMessage('Тип події успішно відредаговано');
            }}
            error={() => {
              setIsShowErrorMessage(true);
              setStatusMessage('Щось пішло не так... Спробуйте піздніше');
            }}
          />
        </>
      )}
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => {
            setIsConfirmationModalVisible(false);
            setDeleteType(null);
          }}
          title={`Видалити "${deleteType}"`}
        >
          <div>Ви точно хочете видалити цей тип подій?</div>
          <div className="flex gap-[15px]">
            <button
              disabled={isLoading}
              className="button-close"
              onClick={() => {
                setIsConfirmationModalVisible(false);
                setDeleteType(null);
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
