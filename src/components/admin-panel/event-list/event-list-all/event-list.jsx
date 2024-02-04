'use client';

import { useState } from 'react';
import { NAVIGATION } from '@/helpers/constants';
import { useCurrentLocale } from '@/hooks';
import { Link } from '@/navigation';
import { useGetAllEventsByLocaleQuery } from '@/redux/api/eventsApi';
import { privateRoute } from '@/app/private-route';
import AdminHeader from '@/components/admin-panel/common/admin-header';
import DisplayEventList from './display-event-list';
import Image from 'next/image';
import IconSearch from '@/assets/icons/common/search-icon.svg';
//import IconSearch from '@/assets/icons/common/search-icon.svg?url';
//import IconSearch from '../../UI/icons/IconSearch';
import EventPagination from './event-pagination';

export default function EventList() {
  const { localeForRequest } = useCurrentLocale();
  const [inputValue, setInputValue] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: eventList = [] } = useGetAllEventsByLocaleQuery({
    locale: localeForRequest,
  });

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
  function AddEventButton() {
    return (
      <Link
        className="group block self-center rounded-lg bg-admin-dark px-[1.88rem] py-2.5
        text-center text-xl font-bold text-admin-light_3 transition duration-200 hover:bg-admin-darkgray hover:text-[#ffffff]"
        href={'/admin/event'}
      >
        <button type="button" title="Додати подію">
          Додати подію
        </button>
      </Link>
    );
  }
  function TableHeader() {
    return (
      <div
        className="text-dark mb-4 grid grid-cols-[4fr_2fr_3fr_2fr_1fr] justify-items-center
          gap-x-3 bg-admin-menu py-3 font-source_sans_3 text-lg"
      >
        <span className="">Назва</span>
        <span className="">Місто</span>
        <span className="">Тип події</span>
        <span className="">Дата та час</span>
      </div>
    );
  }
  function TableBody() {
    return (
      <ol className="grid auto-rows-auto gap-y-3 font-exo_2 text-base">
        {!inputValue ? (
          <DisplayEventList eventsData={eventList} />
        ) : (
          <DisplayEventList eventsData={filteredEvents} />
        )}
      </ol>
    );
  }
  return (
    <div className="font-source_sans_3">
      <AdminHeader title="Всі події">
        <div className="flex gap-x-14">
          <div className="group flex h-[2.9rem] justify-between rounded-md border border-admin-dark_2 hover:border-admin-gray mobile:w-60 tablet:w-72 desktop:w-[28rem]">
            <input
              type="search"
              placeholder="Введіть ключове слово для пошуку"
              value={inputValue}
              onChange={handleChangeSearch}
              className="flex-grow rounded-md  bg-admin-light_1 p-2 pl-3.5 transition duration-200 placeholder:text-lg placeholder:text-admin-dark_2
          hover:bg-[#ffffff] focus:outline-none tablet:placeholder-shown:overflow-hidden tablet:placeholder-shown:text-ellipsis"
            />
            <div className="flex h-full w-[2.9rem] items-center justify-center bg-admin-dark group-hover:bg-admin-darkgray">
              <IconSearch width="25px" height="26px" />
            </div>
          </div>
          <AddEventButton />
        </div>
      </AdminHeader>
      <div id="portal" />
      <div id="message-portal" />
      <div className="ml-5 grid grid-cols-1 grid-rows-[auto_auto] pb-4 tablet:mr-10 desktop:mr-20 ">
        <TableHeader />
        <TableBody />
      </div>
      <EventPagination currentPage={currentPage} onClick={setCurrentPage} />
    </div>
  );
}
