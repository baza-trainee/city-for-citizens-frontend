import { TypeList } from './type-list';
import CalendarIcon from '@/assets/icons/event-card/calendar-icon.svg';
import ClockIcon from '@/assets/icons/event-card/clock-icon.svg';
import LocationIcon from '@/assets/icons/event-card/location-icon.svg';
import { formatDateSeparatorDot, formatDateToTime } from '@/helpers';
import { useTranslations } from 'next-intl';

export function TooltipEventCard({ event }) {
  return (
    <>
      {event.sameAddress ? (
        <ModalOnHoverSlider events={event.sameAddress} />
      ) : (
        <TooltipEventCardItem event={event} />
      )}
    </>
  );
}

function ModalOnHoverSlider({ events }) {
  return (
    <div className="flex flex-col gap-[5px] tablet:grid tablet:grid-cols-[1fr_1fr]">
      {events.map(event => (
        <TooltipEventCardItem
          key={event.idIdentifier + event.id}
          event={event}
        />
      ))}
    </div>
  );
}

function TooltipEventCardItem({ event }) {
  const { eventTitle, eventAddress, eventTypes, dateTime } = event;
  const { city, street } = eventAddress;

  const t = useTranslations('EventCard');

  return (
    <div className="flex w-[300px] flex-col rounded-lg bg-light-secondary p-4 font-roboto text-[14px]/[1.4] text-light-head shadow-eventCard dark:bg-dark-secondary dark:text-dark-head tablet:w-[400px]">
      <TypeList className={'mb-4'} eventTypes={eventTypes} />
      <h3 className="mb-4 font-ubuntu text-[24px]/[1.1] font-medium">
        {eventTitle}
      </h3>
      <div className={'mb-2 flex items-center gap-2'}>
        <LocationIcon className="size-6" />
        <address className="not-italic">
          {t('city', { name: city })}, {street}
        </address>
      </div>

      <div className={'mb-2 flex items-center gap-2'}>
        <CalendarIcon className="size-6" />
        <div>{formatDateSeparatorDot(dateTime)}</div>
      </div>

      <div className={'flex items-center gap-2'}>
        <ClockIcon className="size-6" />
        <div>{formatDateToTime(dateTime)}</div>
      </div>
    </div>
  );
}
