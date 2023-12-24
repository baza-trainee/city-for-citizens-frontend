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
  }, [localeForRequest]);

  function handleChangeSearch(event) {
    const inputValue = event.target.value.trim();
    setInputValue(inputValue);
    const filteredEvents = eventList.filter(
      event =>
        event.eventTitle.toLowerCase().includes(inputValue.toLowerCase()) ||
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

  function handleClickSort(eventProperty, direction, e) {
    const isEventTitleSorted = e.target
      .closest('div')
      .hasAttribute('data-eventname');

    const sortEvent =
      direction === 'az' ? sortedAZ(eventProperty) : sortedZA(eventProperty);
    setSortedEvents(sortEvent);

    setStatusEventSorted(() => ({
      isSorted: true,
      direction,
      sort: isEventTitleSorted ? 'name' : 'date',
    }));
    setDisabledBtn(false);
  }

  function sortedAZ(eventProperty) {
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

  function sortedZA(eventProperty) {
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
        <button
          type="button"
          className="group rounded-lg bg-[#6589e3] py-1 transition duration-200 hover:bg-primary/100 hover:text-[#ffffff]"
          title="Add event"
        >
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
      </div>
      <div className="grid grid-cols-1 grid-rows-[30px_auto] gap-y-3 rounded-lg border border-gray/10 p-4">
        <div
          className={`grid grid-cols-[4fr_2fr_1fr] content-center justify-items-center gap-x-3 ${
            resolvedTheme === 'dark' ? ' bg-gray/80' : ' bg-gray/10'
          }`}
        >
          <div className="col-start-1 flex items-center gap-2" data-eventname>
            <span className="">Назва</span>
            <SortedControl
              handleClickSortZA={e => handleClickSort('eventTitle', 'za', e)}
              handleClickSortAZ={e => handleClickSort('eventTitle', 'az', e)}
              direction={
                statusEventSorted.sort === 'name'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <div className="col-start-2 flex items-center gap-2" data-eventdate>
            <span className="">Дата</span>
            <SortedControl
              handleClickSortZA={e => handleClickSort('eventTitle', 'za', e)}
              handleClickSortAZ={e => handleClickSort('eventTitle', 'az', e)}
              direction={
                statusEventSorted.sort === 'date'
                  ? statusEventSorted.direction
                  : ''
              }
            />
          </div>
          <div>
            <button
              className="inline rounded-lg bg-primary/0 px-2 text-gray/5 disabled:bg-gray/20 "
              onClick={handleClearSorted}
              disabled={disabledBtn}
            >
              Clear sorted
            </button>
          </div>
        </div>
        <ol className="grid list-decimal auto-rows-auto gap-y-2">
          {!inputValue
            ? statusEventSorted.isSorted
              ? ShowEventList(sortedEvents)
              : ShowEventList(eventList)
            : ShowEventList(filteredEvents)}
        </ol>
      </div>
    </div>
  );
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
