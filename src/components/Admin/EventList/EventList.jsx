'use client';

import { NAVIGATION } from '@/helpers/constants';
import { privateRoute } from '../../privateRoute';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { useCurrentLocale, useStyleMediaQuery } from '@/hooks';
import ShowEventList from './ShowEventList';
import IconSearch from '../../UI/icons/IconSearch';
import IconPlus from '../../UI/icons/IconPlus';
import SortedControl from './SortedControl';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import IconCloseButton from '@/components/UI/icons/IconClose';
import { useGetAllEventsByLocaleQuery } from '@/redux/api/eventsApi';
import AdminHeader from '../AdminHeader';

const EventList = () => {
  const { localeForRequest } = useCurrentLocale();
  const { resolvedTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [statusEventSorted, setStatusEventSorted] = useState({
    isSorted: false,
    direction: '',
    sort: '',
  });

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
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

  function handleClearSorted() {
    setStatusEventSorted(() => ({
      isSorted: false,
      direction: '',
      sort: '',
    }));
    setDisabledBtn(true);
  }

  function handleClickSort(eventProperty, direction, typeSort) {
    const sortEvent =
      direction === 'az'
        ? sortedAZ(eventProperty, typeSort)
        : sortedZA(eventProperty, typeSort);

    setSortedEvents(sortEvent);

    setStatusEventSorted(() => ({
      isSorted: true,
      direction,
      sort: typeSort,
    }));
    setDisabledBtn(false);
  }

  function sortedAZ(eventProperty, typeSort) {
    if (typeSort === 'city') {
      return [...eventList].sort((a, b) => {
        if (a.eventAddress.city < b.eventAddress.city) {
          return -1;
        }
        if (a.eventAddress.city > b.eventAddress.city) {
          return 1;
        }
        return 0;
      });
    }
    return [...eventList].sort((a, b) => {
      if (a[eventProperty] < b[eventProperty]) {
        return -1;
      }
      if (a[eventProperty] > b[eventProperty]) {
        return 1;
      }
      return 0;
    });
  }

  function sortedZA(eventProperty, typeSort) {
    if (typeSort === 'city') {
      return [...eventList].sort((a, b) => {
        if (a.eventAddress.city < b.eventAddress.city) {
          return 1;
        }
        if (a.eventAddress.city > b.eventAddress.city) {
          return -1;
        }
        return 0;
      });
    }
    return [...eventList].sort((a, b) => {
      if (a[eventProperty] < b[eventProperty]) {
        return 1;
      }
      if (a[eventProperty] > b[eventProperty]) {
        return -1;
      }
      return 0;
    });
  }

  return (
    <div>
      <AdminHeader title={'Всі події'}>
        <div className="flex">
          <div className="relative">
            <IconSearch
              width="16"
              height="16"
              className={`${
                resolvedTheme === 'dark' ? 'fill-gray/20' : 'fill-gray/30'
              } absolute left-3 inline translate-y-[calc(50%+4px)]`}
            />
            <input
              type="search"
              placeholder={t('searchEvent.placeholder')}
              value={inputValue}
              onChange={handleChangeSearch}
              className={`${
                resolvedTheme === 'dark'
                  ? 'hover:bg-gray/50'
                  : 'bg-gray/5 hover:bg-[#ffffff]'
              } rounded-full border border-gray/20 p-2 pl-[35px] transition duration-200 focus:outline-none`}
            />
          </div>
          <Link
            className="group block self-center rounded-lg bg-[#6589e3] py-1 text-center transition duration-200 hover:bg-primary/100 hover:text-[#ffffff]"
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
        </div>
      </AdminHeader>
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-y-3 rounded-lg border border-gray/10 px-4 pb-4">
        <div
          className={`grid grid-cols-[10px_4fr_2fr_2fr_1fr] content-center items-center  
          justify-items-center gap-x-3 border-b-[1px] border-gray/10 p-3`}
        >
          <div className="self-center text-sm">&#8470;</div>
          <div className="flex items-center gap-2" data-eventname>
            <span>{t('table.name')}</span>
            <SortedControl
              handleClickSortZA={() =>
                handleClickSort('eventTitle', 'za', 'name')
              }
              handleClickSortAZ={() =>
                handleClickSort('eventTitle', 'az', 'name')
              }
              direction={
                statusEventSorted.sort === 'name'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <div className="flex items-center gap-2" data-eventcity>
            <span className="">{t('table.city')}</span>
            <SortedControl
              handleClickSortZA={() =>
                handleClickSort('eventAddress.city', 'za', 'city')
              }
              handleClickSortAZ={() =>
                handleClickSort('eventAddress.city', 'az', 'city')
              }
              direction={
                statusEventSorted.sort === 'city'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <div className="flex items-center gap-2" data-eventdate>
            <span className="">{t('table.date')}</span>
            <SortedControl
              handleClickSortZA={() =>
                handleClickSort('dateTime', 'za', 'date')
              }
              handleClickSortAZ={() =>
                handleClickSort('dateTime', 'az', 'date')
              }
              direction={
                statusEventSorted.sort === 'date'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <button
            className={`group rounded-lg  px-[9px] text-sm ${
              isMobile
                ? null
                : resolvedTheme === 'dark'
                ? ' bg-[#d43c3c] text-gray/5 hover:bg-[red] disabled:bg-gray/100 disabled:text-gray/50 disabled:hover:bg-gray/100'
                : ' bg-[#d43c3c] text-gray/100 hover:bg-[red] disabled:bg-gray/5 disabled:text-gray/20 disabled:hover:bg-gray/5'
            }`}
            onClick={handleClearSorted}
            disabled={disabledBtn}
          >
            {!isMobile ? (
              t('table.clearSorted')
            ) : (
              <IconCloseButton
                width="18"
                height="18"
                className={`inline stroke-[#d43c3c] transition duration-200 group-enabled:hover:scale-105 group-enabled:hover:stroke-[red] ${
                  resolvedTheme === 'dark'
                    ? 'group-disabled:stroke-gray/80'
                    : 'group-disabled:stroke-gray/10'
                }
                 `}
              />
            )}
          </button>
        </div>

        <ol className="grid list-decimal auto-rows-auto gap-y-2">
          <div id="portal" />
          <div id="message-portal" />
          {!inputValue ? (
            statusEventSorted.isSorted ? (
              <ShowEventList eventsData={sortedEvents} />
            ) : (
              <ShowEventList eventsData={eventList} />
            )
          ) : (
            <ShowEventList eventsData={filteredEvents} />
          )}
        </ol>
      </div>
    </div>
  );
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
