import { IMAGE_BASE_URL } from '@/helpers/constants';
import { formatDateSeparatorDot, formatDateToTime } from '@/helpers/formatDate';
import Image from 'next/image';
import { useRef, useState } from 'react';
import IconCalendar from '../UI/IconCalendar';
import IconClock from '../UI/IconClock';
import IconMarkerPlace from '../UI/IconPlace';
import ShareIcon from '../UI/IconShare';
import CloseButton from '../UI/buttons/IconClose';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import TagItem from './TagItem';
import EventShareComp from './eventShare/EventShareCard';

const EventCard = ({ setOnShow, event }) => {
  const {
    eventAddress,
    eventTitle,
    eventUrl,
    eventTypes,
    eventImage,
    description,
    dateTime,
  } = event;

  const [showEventLink, setShowEventLink] = useState(false);

  const eventShareCompRef = useRef(null);

  return (
    <div className="relative w-[280px] rounded-[8px] border border-solid border-gray/100 bg-gray/5 px-5 py-6 dark:border-gray/5 dark:bg-gray/80 mobile:w-[398px]">
      <CloseButton
        onClick={() => setOnShow(null)}
        className="absolute right-[20px] top-[20px] h-[28px] w-[28px] cursor-pointer"
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

      <div className="mb-[6px] flex items-center gap-[4px]">
        <IconMarkerPlace className="stroke-gray/100 dark:stroke-gray/5" />
        <p className="text-[14px] leading-[1.5] dark:text-gray/5">
          {eventAddress.street}
        </p>
      </div>

      <div className="mb-[32px] flex gap-[16px]">
        <div className="flex items-center gap-[4px]">
          <IconCalendar className="stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[14px] leading-[1.5] dark:text-gray/5">
            {formatDateSeparatorDot(dateTime)}
          </p>
        </div>

        <div className="flex items-center gap-[4px]">
          <IconClock className="stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[14px] leading-[1.5] dark:text-gray/5">
            {formatDateToTime(dateTime)}
          </p>
        </div>
      </div>

      <div>
        <a target="_blank" rel="noreferrer noopener" href={eventUrl}>
          <PrimaryButton message={'See cite of the event'} />
        </a>
        {/* <div className="mt-4">
          <SecondaryButton message={'Add to calledar'} />
        </div> */}
      </div>
    </div>
  );
};

export default EventCard;
