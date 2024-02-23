'use client';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import {
  useGetAllTypeEventsByPageQuery,
  useDeleteTypeEventMutation,
} from '@/redux/api/typesEventApi';
import { useLazyGetTypesEventByIdForUpdateFormQuery } from '@/redux/api/typesEventApi';
import { useState, useEffect } from 'react';

import { BasicModalWindows } from '@/components/common';
import { useCreatePagination } from '@/hooks';
import DisplayList from './display-list';
import CreateTypeEvent from './helpers/create-type-event';
import EditTypeEvent from './helpers/edit-type-event';
import Pagination from '@/components/admin-panel/common/pagination';

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
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteTypeEvent, { isLoading }] = useDeleteTypeEventMutation();

  const limit = 10;
  const { data: serverDataByCurrentPage } = useGetAllTypeEventsByPageQuery({
    limit,
    page: currentPage,
  });
  const [
    newCurrentPage,
    totalPages,
    handleSetCurrentPage,
    checkCurrentPageAfterDelete,
  ] = useCreatePagination({
    serverTotalItems: serverDataByCurrentPage?.totalEventTypes,
    serverTotalPages: serverDataByCurrentPage?.totalPages,
  });
  const [getTypesEventById] = useLazyGetTypesEventByIdForUpdateFormQuery();

  const typesList = serverDataByCurrentPage?.eventTypes;
  useEffect(() => {
    setCurrentPage(newCurrentPage);
  }, [newCurrentPage]);

  async function handleConfirmDelete() {
    setDeleteType(null);
    setStatusMessage('');
    setIsConfirmationModalVisible(false);
    try {
      await deleteTypeEvent(idDeleteTypeEvent).unwrap();

      setStatusMessage('Тип події видалено');
      checkCurrentPageAfterDelete();
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
          className="button-common-hover-dark min-h-[47px] min-w-[182px] bg-admin-dark px-[27px] py-2.5  font-source_sans_3 text-white  tablet:text-base desktop:text-xl"
        >
          Додати новий тип подій
        </button>
      </AdminHeader>
      <div className="flex  min-h-[986px] flex-col justify-between pb-4">
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onClick={handleSetCurrentPage}
          />
        )}
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
