'use client';

import { useEffect, useState } from 'react';

import IconSearch from '@/assets/icons/common/search-icon.svg';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import { BasicModalWindows } from '@/components/common';
import {
  useDeleteEventMutation,
  useGetAllEventsByPageQuery,
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

  const eventList = serverDataByCurrentPage?.events;

  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  useEffect(() => {
    setTotalItems(serverDataByCurrentPage.totalItems);
    setTotalPages(serverDataByCurrentPage.totalPages);
  }, [serverDataByCurrentPage]);

  async function handleConfirmDelete() {
    setStatusMessage('');
    try {
      await deleteEvent(idDeleteEvent).unwrap();

      setStatusMessage('Подію видалено!');
      const maxPage = Math.ceil((totalItems - 1) / 10);
      currentPage > maxPage && setCurrentPage(prev => prev - 1 || 1);
      setIsShowSuccessMessage(true);
    } catch (error) {
      if (error?.data?.error === 'Image not found') {
        setStatusMessage(
          'Подію видалено! але не видалено стару картинку з бази даних, можливо її і не було, але зверніться у підтримку для перевірки інформації.'
        );
        const maxPage = Math.ceil((totalItems - 1) / 10);
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
    const filteredEvents = eventList.filter(
      event =>
        event.eventTitle.toLowerCase().includes(inputValue.toLowerCase()) ||
        event.eventAddress.city
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        new Date(event.dateTime)
          .toLocaleDateString('uk', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })
          .includes(inputValue.toLowerCase())
    );
    setFilteredEvents(filteredEvents);
  }

  function TableHeader() {
    return (
      <div
        className="mb-[17px] grid grid-cols-[4fr_1.5fr_2fr_2fr_2fr] gap-x-3 bg-admin-menu
          py-3 pl-[10px] font-source_sans_3 text-lg text-admin-dark"
      >
        <span className="">Назва</span>
        <span className="">Місто</span>
        <span className="">Тип події</span>
        <span className="">Дата та час</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-source_sans_3">
      <AdminHeader title="Всі події">
        <div className="flex gap-x-14">
          <div className="group flex h-[2.9rem] justify-between rounded-md border border-admin-gray_2  mobile:w-60 tablet:w-72 laptop:w-[28rem]">
            <input
              type="search"
              placeholder="Введіть ключове слово для пошуку"
              value={inputValue}
              onChange={handleChangeSearch}
              className="flex-grow rounded-md bg-admin-light_1 p-2 pl-3.5 font-source_sans_3 text-lg text-admin-dark transition 
              duration-200 placeholder:text-lg placeholder:text-admin-gray_2 hover:bg-[#ffffff] focus:outline-none
               focus:placeholder:text-admin-dark tablet:placeholder-shown:overflow-hidden tablet:placeholder-shown:text-ellipsis"
            />
            <div className="flex h-full w-[2.9rem] items-center justify-center   bg-admin-dark ">
              <IconSearch width="25px" height="26px" />
            </div>
          </div>
          <AddEventButton />
        </div>
      </AdminHeader>
      <div className="ml-5 mt-2 grid grid-cols-1 grid-rows-[auto_auto]  pb-4 tablet:mr-10 laptop:mr-20 ">
        <TableHeader />
        <ol className="grid auto-rows-auto font-exo_2 text-base">
          <DisplayEventList
            showConfirmationModal={eventId => {
              setIsConfirmationModalVisible(true);
              setIdDeleteEvent(eventId);
            }}
            eventsData={inputValue ? filteredEvents : eventList}
          />
        </ol>
      </div>

      {totalPages > 1 && !inputValue && (
        <EventPagination currentPage={currentPage} onClick={setCurrentPage} />
      )}
      {console.log('filtered Event ', filteredEvents)}
      {console.log('eventList ', eventList)}
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
