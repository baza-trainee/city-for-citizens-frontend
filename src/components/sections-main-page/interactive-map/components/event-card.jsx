'use client';

import { formatDateSeparatorDot, formatDateToTime } from '@/helpers';

import Image from 'next/image';
import CloseIcon from '@/assets/icons/event-card/close-icon.svg';
import CalendarIcon from '@/assets/icons/event-card/calendar-icon.svg';
import ClockIcon from '@/assets/icons/event-card/clock-icon.svg';
import LocationIcon from '@/assets/icons/event-card/location-icon.svg';
import { IMAGE_BASE_URL } from '@/helpers/constants';
import { useState } from 'react';
import { mockEvent } from './mock-event';
import { TypeList } from './type-list';

export function EventCard({ event = mockEvent, onClose }) {
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

  function handleImageError() {
    setIsImageError(true);
  }

  return (
    <div className="flex w-[400px] flex-col rounded-lg bg-light-secondary p-4 font-roboto text-[14px]/[1.4] text-light-head dark:bg-dark-secondary dark:text-dark-head">
      <CloseIcon
        onClick={onClose}
        className="mb-2.5 ml-auto size-6 cursor-pointer text-icon transition-colors hover:text-light-head"
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

      <p className="mb-4 h-[124px] overflow-auto text-[16px] text-light-main dark:text-dark-main">
        {description}
      </p>

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
