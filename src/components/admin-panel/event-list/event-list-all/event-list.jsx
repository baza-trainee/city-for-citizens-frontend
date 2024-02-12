'use client';

import { useEffect, useState } from 'react';

import IconSearch from '@/assets/icons/common/search-icon.svg';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import { BasicModalWindows } from '@/components/common';

import {
  useDeleteEventMutation,
  useGetAllEventsByPageQuery,
  useGetEventsBySearchByPageQuery,
} from '@/redux/api/eventsApi';
import AddEventButton from './add-event-button';
import DisplayEventList from './display-event-list';
import EventPagination from './event-pagination';

export default function EventList() {
  const [inputValue, setInputValue] = useState('');

  const [filteredEvents, setFilteredEvents] = useState([]);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [idDeleteEvent, setIdDeleteEvent] = useState(null);
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const { data: serverDataByCurrentPage = [] } = useGetAllEventsByPageQuery({
    page: currentPage,
  });

  const { data: filteredData = [] } = useGetEventsBySearchByPageQuery({
    page: currentPage,
    search: inputValue,
  });

  const eventList = serverDataByCurrentPage?.events;

  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalSearchItems, setTotalSearchItems] = useState(null);
  const [totalSearchPages, setTotalSearchPages] = useState(null);

  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  useEffect(() => {
    setTotalItems(serverDataByCurrentPage.totalItems);
    setTotalPages(serverDataByCurrentPage.totalPages);
  }, [serverDataByCurrentPage]);

  useEffect(() => {
    if (inputValue) {
      setFilteredEvents(filteredData.events);
      setTotalSearchItems(filteredData.totalItems);
      setTotalSearchPages(filteredData.totalPages);
      setCurrentPage(filteredData.currentPage);
    } else {
      setCurrentPage(serverDataByCurrentPage.currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, filteredData]);

  async function handleConfirmDelete() {
    setStatusMessage('');
    try {
      await deleteEvent(idDeleteEvent).unwrap();

      setStatusMessage('Подію видалено!');
      const maxPage = Math.ceil(
        ((inputValue ? totalSearchItems : totalItems) - 1) / 10
      );
      currentPage > maxPage && setCurrentPage(prev => prev - 1 || 1);

      setIsShowSuccessMessage(true);
    } catch (error) {
      if (error?.data?.error === 'Image not found') {
        setStatusMessage(
          'Подію видалено! але не видалено стару картинку з бази даних, можливо її і не було, але зверніться у підтримку для перевірки інформації.'
        );

        const maxPage = Math.ceil(
          ((inputValue ? totalSearchItems : totalItems) - 1) / 10
        );
        currentPage > maxPage && setCurrentPage(prev => prev - 1 || 1);

        setIsShowSuccessMessage(true);
      } else {
        setStatusMessage('Сталася помилка. Спробуйте ще раз.');
        setIsShowErrorMessage(true);
      }
    } finally {
      setIsConfirmationModalVisible(false);
      setIdDeleteEvent(null);
    }
  }

  function handleChangeSearch(event) {
    const inputValue = event.target.value.trim();
    setInputValue(inputValue);
  }

  function handleSetCurrentPage(newCurrentPage) {
    setCurrentPage(newCurrentPage);
  }

  return (
    <div className="flex flex-col font-source_sans_3">
      <AdminHeader title="Всі події">
        <div className="grid w-2/3 items-center tablet:grid-cols-[auto_64px] laptop:grid-cols-[1.83fr_1fr] laptop_xl:grid-cols-[auto_188px]">
          <div className=" group flex h-[2.9rem]  w-full max-w-[449px] items-center justify-between  rounded-md border  border-admin-gray_2 desktop:mr-[57px] desktop:justify-self-end">
            <input
              type="search"
              placeholder="Введіть ключове слово для пошуку"
              value={inputValue}
              onChange={handleChangeSearch}
              className="flex-grow rounded-md bg-admin-light_1 p-2 pl-3.5 font-source_sans_3 text-lg text-admin-dark 
              transition duration-200 placeholder:text-lg placeholder:text-admin-gray_2 placeholder-shown:overflow-hidden
               placeholder-shown:text-ellipsis hover:bg-[#ffffff] focus:outline-none focus:placeholder:text-admin-dark "
            />
            <div className="flex h-full w-[2.9rem] items-center justify-center   bg-admin-dark ">
              <IconSearch width="25px" height="26px" />
            </div>
          </div>
          <AddEventButton />
        </div>
      </AdminHeader>
      <div className="ml-5 mt-2 grid grid-cols-1 grid-rows-[auto_auto] pb-4 ">
        <div className="box-border grid auto-rows-auto font-exo_2 text-base tablet:mr-5 desktop:mr-20">
          <DisplayEventList
            showConfirmationModal={eventId => {
              setIsConfirmationModalVisible(true);
              setIdDeleteEvent(eventId);
            }}
            currentPage={currentPage}
            eventsData={inputValue ? filteredEvents : eventList}
          />
        </div>
      </div>

      {((totalPages > 1 && !inputValue) ||
        (inputValue && totalSearchPages > 1)) && (
        <EventPagination
          currentPage={currentPage}
          inputValue={inputValue}
          onClick={handleSetCurrentPage}
        />
      )}
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => setIsConfirmationModalVisible(false)}
          title={'Видалити подію'}
          message={'Ви точно хочете видалити подію?'}
        >
          <div className="flex gap-[15px]">
            <button
              disabled={isLoading}
              className="button-close"
              onClick={() => setIsConfirmationModalVisible(false)}
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
          title={'Успішно'}
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
