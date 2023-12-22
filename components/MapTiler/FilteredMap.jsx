'use client';
import { useEffect, useState } from 'react';

import ChooseCity from '../Filters/ChooseCity/ChooseCity';
import ChooseEventType from '../Filters/ChooseEventType/ChooseEventType';
import DatePicker from '../Filters/DatePicker/DatePicker';

import { getFilters } from '../../services/getFilters';
import { useCurrentLocale } from '../../hooks';
import InteractiveMap from './InteractiveMap/InteractiveMap';

function FilteredMap() {
  const [filters, setFilters] = useState({});

  const { localeForRequest } = useCurrentLocale();

  useEffect(() => {
    const getAllFilters = async () => {
      const filters = await getFilters({ locale: localeForRequest });
      setFilters(filters);
    };

    getAllFilters();
  }, [localeForRequest]);

  return (
    <>
      <section className="container relative z-10 mb-[20px] flex flex-col justify-center gap-5 tablet:mb-[28px] tablet:flex-row">
        <ChooseCity filtersEventCities={filters?.eventCities || []} />
        <DatePicker filtersEventDates={filters?.eventDates || []} />
        <ChooseEventType filtersEventTypes={filters?.eventTypes || []} />
      </section>

      <InteractiveMap />
    </>
  );
}

export default FilteredMap;
