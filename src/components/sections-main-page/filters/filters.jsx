'use client';
import ChooseCity from './choose-city/choose-city';
import ChooseEventType from './choose-event-type/choose-event-type';
import DatePicker from './date-picker/date-picker';
import { useCurrentLocale } from '@/hooks';
import { useGetAllFiltersByLocaleQuery } from '@/redux/api/filtersApi';
import { useTranslations } from 'next-intl';

export function Filters() {
  const { localeForRequest } = useCurrentLocale();
  const t = useTranslations('Filters');
  const { data } = useGetAllFiltersByLocaleQuery({ locale: localeForRequest });

  return (
    <section className="relative z-10 mt-20 flex flex-col items-center justify-center bg-light-primary dark:bg-dark-primary tablet:mt-40">
      <div className="px-4 text-center font-ubuntu text-[30px] font-bold leading-[33px] tablet:text-[43px] tablet:leading-[47.3px]">
        {t('header')}
      </div>
      <div className="desktop_l:mx-auto desktop_l:w-fit mb-8 mt-6 flex w-full flex-col flex-wrap gap-4 px-4 laptop:px-10 desktop:flex-row">
        <div className="relative z-10 flex grow flex-col gap-4 tablet:flex-row">
          <div className="desktop_l:w-[469px] relative z-10 tablet:w-[calc(50%-8px)] desktop:w-[calc((100vw-112px)/3)] desktop:max-w-[469px]">
            <ChooseCity filtersEventCities={data?.eventCities || []} />
          </div>
          <div className="desktop_l:w-[469px] relative z-0 tablet:w-[calc(50%-8px)]  desktop:w-[calc((100vw-112px)/3)] desktop:max-w-[469px]">
            <DatePicker filtersEventDates={data?.eventDates || []} />
          </div>
        </div>
        <div className="desktop_l:w-[469px] relative z-0  grow  desktop:w-[calc((100vw-112px)/3)] desktop:max-w-[469px] ">
          <ChooseEventType filtersEventTypes={data?.eventTypes || []} />
        </div>
      </div>
    </section>
  );
}
