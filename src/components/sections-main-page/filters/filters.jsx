'use client';
import ChooseCity from './choose-city/choose-city';
import ChooseEventType from './choose-event-type/choose-event-type';
import DatePicker from './date-picker/date-picker';
import { useCurrentLocale } from '@/hooks';
import { useGetAllFiltersQuery } from '@/redux/api/filtersApi';

export function Filters() {
  //const { localeForRequest } = useCurrentLocale();

  // const { data } = useGetAllFiltersQuery({ locale: localeForRequest });
  const data = {
    eventCities: ['Київ', 'Харків', "Куп'янськ", 'Чернівці'],
    eventDates: [],
    eventTypes: [
      'квитковий фестиваль',
      'марафон',
      'спорт',
      'регата',
      'пісений фестиваль',
    ],
  };
  return (
    <section className="relative z-10 mt-20 flex flex-col items-center justify-center bg-light-primary dark:bg-dark-primary tablet:mt-40">
      <div className="px-4 text-center font-ubuntu text-[30px] font-bold leading-[33px] tablet:text-[43px] tablet:leading-[47.3px]">
        Оберіть локацію, час та тип події
      </div>
      <div className="mb-8 mt-6 flex w-full flex-col flex-wrap gap-4 px-4 laptop:px-10 desktop:flex-row desktop:justify-center">
        <div className="relative z-10 flex grow flex-col gap-4 tablet:flex-row">
          <div className="relative z-10 tablet:w-[calc(50%-8px)] desktop:max-w-[469px]">
            <ChooseCity filtersEventCities={data?.eventCities || []} />
          </div>
          <div className="relative z-0 tablet:w-[calc(50%-8px)] desktop:max-w-[469px]">
            <DatePicker filtersEventDates={data?.eventDates || []} />
          </div>
        </div>
        <div className="relative z-0 grow  desktop:max-w-[469px] ">
          <ChooseEventType filtersEventTypes={data?.eventTypes || []} />
        </div>
      </div>
    </section>
  );
}
