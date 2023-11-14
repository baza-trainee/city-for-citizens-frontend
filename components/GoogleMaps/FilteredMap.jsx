'use client';
import { useState, useEffect } from 'react';

import ChooseCity from './ChooseCity';
import DatePicker from './DatePicker/DatePicker';
import ChooseEventType from './ChooseEventType';
import Map from './Map';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getEvents, getFilters } from '@/services';

function FilteredMap() {
  const [filters, setFilters] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const searchParams = useSearchParams();
  const locale = useLocale();

  useEffect(() => {
    const getAllFilters = async () => {
      const filters = await getFilters({ locale });
      setFilters(filters);
    };
    getAllFilters();
  }, [locale]);

  useEffect(() => {
    const getEventsByFilter = async () => {
      const events = await getEvents({
        searchParams: searchParams.toString(),
        locale,
      });
      setFilteredEvents(events);
    };

    if (searchParams.size !== 0) {
      getEventsByFilter();
    } else {
      setFilteredEvents([]);
    }
  }, [locale, searchParams]);

  return (
    <>
      <section className="container relative z-10 mb-[29px] mt-11 flex flex-col justify-center gap-5 tablet:flex-row">
        <ChooseCity filtersEventCities={filters?.eventCities || []} />
        <DatePicker filtersEventDates={filters?.eventDates || []} />
        <ChooseEventType filtersEventTypes={filters?.eventTypes || []} />
      </section>

      <Map filteredEvents={filteredEvents} />
    </>
  );
}

export default FilteredMap;
