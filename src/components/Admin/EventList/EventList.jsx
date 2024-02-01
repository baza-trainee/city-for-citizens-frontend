'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { NAVIGATION } from '@/helpers/constants';
import { useCurrentLocale, useStyleMediaQuery } from '@/hooks';
import { Link } from '@/navigation';
import { useGetAllEventsByLocaleQuery } from '@/redux/api/eventsApi';

import { privateRoute } from '../../privateRoute';
import AdminHeader from '../AdminHeader';
import ShowEventList from './ShowEventList';
import IconSearch from '../../UI/icons/IconSearch';
import IconPlus from '../../UI/icons/IconPlus';

const EventList = () => {
  const { localeForRequest } = useCurrentLocale();
  const [inputValue, setInputValue] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { matches: isMobile } = useStyleMediaQuery({
    mixOrMax: 'max',
    widthOrHeight: 'width',
    value: 767,
  });
  const t = useTranslations('EventList');
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
  function SearchField() {
    return (
      <div className="border-admin-dark_2 flex h-[2.9rem] w-[28rem] justify-between rounded-md border">
        <input
          type="search"
          placeholder={t('searchEvent.placeholder')}
          value={inputValue}
          onChange={handleChangeSearch}
          className="flex-grow rounded-md bg-admin-light_1 p-2 pl-3.5 transition duration-200 hover:bg-[#ffffff] focus:outline-none"
        />
        <div className="flex h-full w-[2.9rem] items-center justify-center bg-admin-dark">
          <IconSearch width="25" height="26" className="" />
        </div>
      </div>
    );
  }

  function AddEventButton() {
    return (
      <Link
        className="group block self-center rounded-lg bg-admin-dark px-[1.88rem] py-2.5
        text-center text-xl font-bold text-admin-light_3 transition duration-200 hover:bg-primary/100 hover:text-[#ffffff]"
        href={'/admin/event'}
      >
        <button type="button" title={t('addEvent')}>
          {!isMobile ? (
            t('addEvent')
          ) : (
            <IconPlus
              width="14"
              height="14"
              className="inline fill-gray/80 transition duration-200 group-hover:fill-[#ffffff]"
            />
          )}
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
        <div className="">{t('table.name')}</div>
        <div className="">{t('table.city')}</div>
        <div className="">{t('table.type')}</div>
        <div className="">{t('table.date')}</div>
      </div>
    );
  }
  function TableBody() {
    return (
      <ol className="grid auto-rows-auto gap-y-3 font-exo_2 text-base">
        {!inputValue ? (
          <ShowEventList eventsData={eventList} />
        ) : (
          <ShowEventList eventsData={filteredEvents} />
        )}
      </ol>
    );
  }

  return (
    <div className="ml-5 mr-20 ">
      <AdminHeader title={t('pageName')}>
        <div className="flex gap-x-14">
          <SearchField />
          <AddEventButton />
        </div>
      </AdminHeader>
      <div id="portal" />
      <div id="message-portal" />
      <div className="grid grid-cols-1 grid-rows-[auto_auto] pb-4">
        <TableHeader />
        <TableBody />
      </div>
    </div>
  );
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
