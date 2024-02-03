'use client';

import ChooseCity from '../Filters/ChooseCity/ChooseCity';
import ChooseEventType from '../Filters/ChooseEventType/ChooseEventType';
import DatePicker from '../Filters/DatePicker/DatePicker';

import { useCurrentLocale } from '../../hooks';
import InteractiveMap from './InteractiveMap/InteractiveMap';
import { useGetAllFiltersQuery } from '@/redux/api/filtersApi';

function FilteredMap() {
  const { localeForRequest } = useCurrentLocale();

  const { data } = useGetAllFiltersQuery({ locale: localeForRequest });

  return (
    <>
      <section className="container relative z-10 mb-[20px] flex flex-col justify-center gap-5 tablet:mb-[28px] tablet:flex-row">
        <ChooseCity filtersEventCities={data?.eventCities || []} />
        <DatePicker filtersEventDates={data?.eventDates || []} />
        <ChooseEventType filtersEventTypes={data?.eventTypes || []} />
      </section>

      <InteractiveMap />
    </>
  );
}

export default FilteredMap;
