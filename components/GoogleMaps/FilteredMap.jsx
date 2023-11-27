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

function FilteredMap() {
  const [filters, setFilters] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const searchParams = useSearchParams();
  const locale = useLocale();

  const currentLocale =
    locale === LOCALE.uk.forIntl ? LOCALE.uk.forRequest : LOCALE.en.forRequest;

  useEffect(() => {
    const getAllFilters = async () => {
      const filters = await getFilters({ locale: currentLocale });
      setFilters(filters);
    };

    getAllFilters();
  }, [currentLocale]);

  useEffect(() => {
    const getEventsByFilter = async () => {
      const events = await getEventsBySearchParams({
        searchParams: searchParams.toString(),
        locale: currentLocale,
      });
      setFilteredEvents(events);
    };

    if (searchParams.size !== 0) {
      getEventsByFilter();
    } else {
      setFilteredEvents([]);
    }
  }, [currentLocale, searchParams]);

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
