'use client';

import { NAVIGATION } from '@/helpers/constants';
import { privateRoute } from '../../privateRoute';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getAllEvents } from '@/services/eventAPI';
import { useCurrentLocale, useStyleMediaQuery } from '@/hooks';
import ShowEventList from './ShowEventList';
import IconSearch from '../../UI/icons/IconSearch';
import IconPlus from '../../UI/icons/IconPlus';
import SortedControl from './SortedControl';
import { Link } from '@/navigation';

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const { localeForRequest } = useCurrentLocale();
  const { resolvedTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [statusEventSorted, setStatusEventSorted] = useState({
    isSorted: false,
    direction: '',
    sort: '',
  });
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const { matches: isMobile } = useStyleMediaQuery({
    mixOrMax: 'max',
    widthOrHeight: 'width',
    value: 767,
  });

  useEffect(() => {
    const getAll = async () => {
      try {
        const allEvents = await getAllEvents(
          new URLSearchParams({ locale: localeForRequest })
        );
        setEventList(allEvents);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    getAll();
    setDeleteEvent(false);
  }, [localeForRequest, deleteEvent]);

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
    <div className="mx-auto mb-4 grid w-[90%] grid-cols-1 rounded px-1 ">
      <div className="mb-2 grid grid-cols-[auto_20%]">
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
            placeholder="Search event"
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
          href={NAVIGATION.admin}
        >
          <button type="button" className="" title="Add event">
            {!isMobile ? (
              'Add event'
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
      <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-y-3 rounded-lg border border-gray/10 p-4">
        <div
          className={`grid grid-cols-[10px_4fr_2fr_2fr_1fr] content-center justify-items-center gap-x-3 px-3 ${
            resolvedTheme === 'dark' ? ' bg-gray/80' : ' bg-gray/10'
          }`}
        >
          <div className="self-center text-sm">&#8470;</div>
          <div className="flex items-center gap-2" data-eventname>
            <span className="">Назва</span>
            <SortedControl
              handleClickSortZA={e =>
                handleClickSort('eventTitle', 'za', 'name')
              }
              handleClickSortAZ={e =>
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
            <span className="">Місто</span>
            <SortedControl
              handleClickSortZA={e =>
                handleClickSort('eventAddress.city', 'za', 'city')
              }
              handleClickSortAZ={e =>
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
            <span className="">Дата</span>
            <SortedControl
              handleClickSortZA={e => handleClickSort('dateTime', 'za', 'date')}
              handleClickSortAZ={e => handleClickSort('dateTime', 'az', 'date')}
              direction={
                statusEventSorted.sort === 'date'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <button
            className={`rounded-lg  px-[9px]  ${
              resolvedTheme === 'dark'
                ? ' bg-[#d43c3c] text-gray/5 hover:bg-[red] disabled:bg-gray/80 disabled:text-gray/50 disabled:hover:bg-gray/80'
                : ' bg-[#d43c3c] text-gray/100 hover:bg-[red] disabled:bg-gray/10 disabled:text-gray/20 disabled:hover:bg-gray/10'
            }`}
            onClick={handleClearSorted}
            disabled={disabledBtn}
          >
            Clear sorted
          </button>
        </div>

        <ol className="grid list-decimal auto-rows-auto gap-y-2">
          <div id="portal" />
          <div id="message-portal" />
          {!inputValue ? (
            statusEventSorted.isSorted ? (
              <ShowEventList
                eventsData={sortedEvents}
                needDeleteEvent={setDeleteEvent}
              />
            ) : (
              <ShowEventList
                eventsData={eventList}
                needDeleteEvent={setDeleteEvent}
              />
            )
          ) : (
            <ShowEventList
              eventsData={filteredEvents}
              needDeleteEvent={setDeleteEvent}
            />
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
