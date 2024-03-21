import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { IMAGE_BASE_URL } from '../../helpers/constants';
import {
  formatDateSeparatorDot,
  formatDateToTime,
} from '../../helpers/formatDate';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import IconCalendar from '../UI/icons/IconCalendar';
import IconClock from '../UI/icons/IconClock';
import CloseButton from '../UI/icons/IconClose';
import IconMarkerPlace from '../UI/icons/IconPlace';
import ShareIcon from '../UI/icons/IconShare';
import TagItem from './TagItem';
import EventShareComp from './eventShare/EventShareCard';

import IconNavigationArrow from '../UI/icons/IconNavigationArrow';

const EventCard = ({ onClose, event }) => {
  if (event.sameAddress) {
    return <EventCardSlider events={event.sameAddress} onClose={onClose} />;
  }
  return <EventItem onClose={onClose} event={event} />;
};

export default EventCard;

const EventCardSlider = ({ events, onClose }) => {
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
    'h-[100px] w-[100px] stroke-gray/50 hover:stroke-gray/5 hover:text-gray/50 transition-all text-gray/5 dark:stroke-gray/10 dark:hover:stroke-gray/100 dark:hover:text-gray/10 dark:text-gray/80';

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
          <EventItem onClose={onClose} key={event.idIdentifier} event={event} />
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
};

const EventItem = ({ event, onClose }) => {
  const {
    eventAddress,
    eventTitle,
    eventUrl,
    eventTypes,
    eventImage,
    description,
    dateTime,
  } = event;

  const { resolvedTheme } = useTheme();
  const t = useTranslations('EventCard');
  const [showEventLink, setShowEventLink] = useState(false);

  const eventShareCompRef = useRef(null);

  return (
    <div className="relative w-[280px] rounded-[8px] border border-solid border-gray/100 bg-gray/5 px-5 py-6 dark:border-gray/5 dark:bg-gray/80 mobile:w-[398px]">
      <CloseButton
        onClick={onClose}
        className={`absolute right-[20px] top-[20px] h-[28px] w-[28px] cursor-pointer ${
          resolvedTheme === 'dark' ? 'stroke-gray/5' : 'stroke-gray/100'
        }  transition-colors hover:stroke-gray/30`}
      />
      <div className="mb-[12px] mt-[38px] flex flex-wrap gap-[8px]">
        {eventTypes.map(({ eventType, id }) => {
          return <TagItem key={id} tagMassage={eventType} />;
        })}
      </div>
      {eventImage ? (
        <div className="mb-[20px]">
          <Image
            width={240}
            height={105}
            alt={eventTitle}
            src={`${IMAGE_BASE_URL}${eventImage}`}
            className=" h-[108px] w-[240px] rounded-[4px] border object-cover dark:border-gray/80 mobile:w-[358px]"
          />
        </div>
      ) : null}
      <div className="relative flex items-start">
        <h3 className="mr-2 font-heading text-[24px] font-light leading-[1.5] -tracking-[0.264px] dark:text-gray/5">
          {eventTitle}
        </h3>

        <div ref={eventShareCompRef} className="relative cursor-pointer">
          <div onClick={() => setShowEventLink(p => !p)}>
            <ShareIcon className="stroke-primary/100 dark:stroke-gray/5" />
          </div>
          {showEventLink ? (
            <EventShareComp
              eventShareCompRef={eventShareCompRef}
              setShowEventLink={setShowEventLink}
              eventUrl={eventUrl}
            />
          ) : null}
        </div>
      </div>
      <p className="mb-[16px] max-h-[288px] overflow-auto text-[16px] leading-[1.5] -tracking-[0.176px]">
        {description}
      </p>

      <div className="mb-[6px] flex  gap-[11px]">
        <IconMarkerPlace className="h-[22px] w-[22px] stroke-gray/100 dark:stroke-gray/5" />
        <p className="text-[16px] leading-[1.5] dark:text-gray/5">
          {eventAddress.street}
        </p>
      </div>

      <div className="mb-[32px] flex gap-[16px]">
        <div className="flex  gap-[11px]">
          <IconCalendar className="h-[22px] w-[22px] stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[16px] leading-[1.5] dark:text-gray/5">
            {formatDateSeparatorDot(dateTime)}
          </p>
        </div>

        <div className="flex  gap-[11px]">
          <IconClock className="h-[22px] w-[22px] stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[16px] leading-[1.5] dark:text-gray/5">
            {formatDateToTime(dateTime)}
          </p>
        </div>
      </div>

      <div>
        <a target="_blank" rel="noreferrer noopener" href={eventUrl}>
          <PrimaryButton message={t('buttonName')} />
        </a>
        {/* <div className="mt-4">
      <SecondaryButton message={'Add to calledar'} />
    </div> */}
      </div>
    </div>
  );
};
