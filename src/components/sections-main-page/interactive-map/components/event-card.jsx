'use client';

import { formatDateSeparatorDot, formatDateToTime } from '@/helpers';

import Image from 'next/image';
import CloseIcon from '@/assets/icons/event-card/close-icon.svg';
import CalendarIcon from '@/assets/icons/event-card/calendar-icon.svg';
import ClockIcon from '@/assets/icons/event-card/clock-icon.svg';
import LocationIcon from '@/assets/icons/event-card/location-icon.svg';
import { IMAGE_BASE_URL } from '@/helpers/constants';
import { useState } from 'react';
import IconNavigationArrow from '@/assets/icons/event-card/icon-navigation-arrow.svg';

import { TypeList } from './type-list';
import { Popup, useMap } from 'react-leaflet';

export function EventCard({ event, isClicked }) {
  return (
    <Popup
      interactive
      maxWidth={400}
      closeButton={false}
      pane="tooltipPane"
      autoPan={!isClicked}
    >
      {event.sameAddress ? (
        <EventCardSlider events={event.sameAddress} />
      ) : (
        <EventItem event={event} />
      )}
    </Popup>
  );
}

function EventCardSlider({ events }) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const nextEvent = () => {
    setActiveEventIndex(prevIndex =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevEvent = () => {
    setActiveEventIndex(prevIndex =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const iconNavigationArrowClassNames =
    'h-[100px] w-[100px] stroke-light-border hover:stroke-light-border hover:text-light-border transition-all text-light-secondary dark:stroke-light-button-hover dark:hover:stroke-light-border dark:hover:text-dark-border dark:text-dark-secondary';

  const buttonIconNavigationArrowClassNames =
    'absolute bottom-0 z-10 translate-y-[calc(100%+15px)] tablet:static tablet:translate-y-0';

  return (
    <div className="relative tablet:flex">
      <button
        className={`${buttonIconNavigationArrowClassNames} left-0`}
        onClick={prevEvent}
      >
        <IconNavigationArrow
          className={`${iconNavigationArrowClassNames} rotate-180`}
        />
      </button>
      {events.map((event, index) => {
        return index === activeEventIndex ? (
          <EventItem key={event.idIdentifier + event.id} event={event} />
        ) : null;
      })}

      <button
        className={`${buttonIconNavigationArrowClassNames} right-0`}
        onClick={nextEvent}
      >
        <IconNavigationArrow className={`${iconNavigationArrowClassNames}`} />
      </button>
    </div>
  );
}

function EventItem({ event }) {
  const {
    eventTitle,
    description,
    eventAddress,
    eventTypes,
    eventImage,
    dateTime,
  } = event;
  const { city, street } = eventAddress;

  const [isImageError, setIsImageError] = useState(false);

  const map = useMap();

  function handleImageError() {
    setIsImageError(true);
  }

  function onClose() {
    map.closePopup();
  }

  return (
    <div className="shadow-eventCard flex w-[300px] flex-col rounded-lg bg-light-secondary p-4 font-roboto text-[14px]/[1.4] text-light-head dark:bg-dark-secondary dark:text-dark-head tablet:w-[400px]">
      <CloseIcon
        onClick={onClose}
        className="mb-2.5 ml-auto size-6 cursor-pointer text-icon transition-colors hover:text-light-head hover:dark:text-dark-head"
      />
      <TypeList className={'mb-2'} eventTypes={eventTypes} />
      <div className="relative mb-4 h-[220px] overflow-hidden rounded-lg bg-admin-backdrop/20">
        <Image
          onError={handleImageError}
          className="h-full w-auto object-cover"
          src={
            isImageError ? '/mock-img.webp' : `${IMAGE_BASE_URL}${eventImage}`
          }
          alt={eventTitle}
          fill
        />
      </div>
      <h3 className="mb-2 font-ubuntu text-[24px]/[1.1] font-medium">
        {eventTitle}
      </h3>

      <div className="mb-4 h-[124px] overflow-auto text-[16px] text-light-main dark:text-dark-main">
        {description}
      </div>

      <div className={'mb-2 flex items-center gap-2'}>
        <LocationIcon className="size-6" />
        <address className="not-italic">
          м. {city}, вул. {street}
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
