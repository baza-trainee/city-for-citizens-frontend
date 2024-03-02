import { mockEvent } from './mock-event';
import { TypeList } from './type-list';
import CalendarIcon from '@/assets/icons/event-card/calendar-icon.svg';
import ClockIcon from '@/assets/icons/event-card/clock-icon.svg';
import LocationIcon from '@/assets/icons/event-card/location-icon.svg';
import { formatDateSeparatorDot, formatDateToTime } from '@/helpers';

export function HoverEventCard({ event = mockEvent }) {
  const { eventTitle, eventAddress, eventTypes, dateTime } = event;
  const { city, street } = eventAddress;

  return (
    <div className="text-[14px]/[1.4 flex w-[400px] flex-col rounded-lg bg-light-secondary p-4 font-roboto text-light-head dark:bg-dark-secondary dark:text-dark-head">
      <TypeList className={'mb-4'} eventTypes={eventTypes} />
      <h3 className="mb-4 font-ubuntu text-[24px]/[1.1] font-medium">
        {eventTitle}
      </h3>
      <div className={'mb-2 flex items-center gap-2'}>
        <LocationIcon className="size-6" />
        <address className="not-italic">
          м. {city}, вул. {street}
        </address>
      </div>

      <div className={'mb-2 flex items-center gap-2'}>
        <CalendarIcon className="size-6" />
        <p>{formatDateSeparatorDot(dateTime)}</p>
      </div>

      <div className={'flex items-center gap-2'}>
        <ClockIcon className="size-6" />
        <p>{formatDateToTime(dateTime)}</p>
      </div>
    </div>
  );
}
