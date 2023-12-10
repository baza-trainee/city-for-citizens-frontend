'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

import { useSearchParams } from 'next/navigation';
import ChooseCity from './ChooseCity';
import ChooseEventType from './ChooseEventType';
import DatePicker from './DatePicker/DatePicker';
import Map from './Map';
import { LOCALE } from '@/helpers/constants';

import { getEventsBySearchParams } from '@/services/eventAPI';
import { getFilters } from '@/services/getFilters';
import { useCurrentLocale } from '@/hooks';

function FilteredMap() {
  const [filters, setFilters] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { localeForRequest } = useCurrentLocale();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllFilters = async () => {
      const filters = await getFilters({ locale: localeForRequest });
      setFilters(filters);
    };

    getAllFilters();
  }, [localeForRequest]);

  useEffect(() => {
    const getEventsByFilter = async () => {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.append('locale', localeForRequest);

      const events = await getEventsBySearchParams(urlSearchParams);
      setFilteredEvents(events);
    };

    if (searchParams.size !== 0) {
      getEventsByFilter();
    } else {
      setFilteredEvents([]);
    }
  }, [localeForRequest, searchParams]);

  return (
    <>
      <section className="container relative z-10 mb-[20px] flex flex-col justify-center gap-5 tablet:mb-[28px] tablet:flex-row">
        <ChooseCity filtersEventCities={filters?.eventCities || []} />
        <DatePicker filtersEventDates={filters?.eventDates || []} />
        <ChooseEventType filtersEventTypes={filters?.eventTypes || []} />
      </section>

      <Map filteredEvents={filteredEvents} />
    </>
  );
}

export default FilteredMap;
