import TagList from '../UI/TagList';
import CloseButton from '../UI/buttons/IconClose';
import Image from 'next/image';
import MockImage from '../../public/mockEventCardImage.png';
import ShareIcon from '../UI/IconShare';
import IconMarkerPlace from '../UI/IconPlace';
import IconCalendar from '../UI/IconCalendar';
import IconClock from '../UI/IconClock';
import PrimaryButton from '../UI/buttons/PrimaryButton';
import SecondaryButton from '../UI/buttons/SecondaryButton';
import EventShareComp from './eventShare/EventShareCard';

const mockTagsData = [
  { id: 1, message: 'Music' },
  { id: 2, message: 'Pet-friendly' },
  { id: 3, message: 'Nature' },
];

const EventCard = () => {
  return (
    <div className="max-w-[434px] px-5 py-6 border border-solid border-gray/100 rounded-lg dark:bg-gray/80 dark:border-gray/5">
      <div className="flex justify-end">
        <div className="w-8 h-8 cursor-pointer flex justify-center items-center">
          <CloseButton className="stroke-gray/100 dark:stroke-gray/5" />
        </div>
      </div>
      <div className="mt-3">
        {mockTagsData.map(tag => {
          return <TagList key={tag.id} tagMassage={tag.message} />;
        })}
      </div>
      <div className="h-[108px] mt-3">
        <Image
          alt="Current event image"
          src={MockImage}
          className="h-full border rounded dark:border-gray/80"
        />
      </div>
      <div className="flex items-center mt-4">
        <h3 className="text-[24px] leading-9 font-light dark:text-gray/5 font-heading mr-2">
          Harmony Festival
        </h3>

        <div className="cursor-pointer">
          <ShareIcon className="stroke-primary/100 dark:stroke-gray/5" />
        </div>
      </div>
      <p>
        Join us at the Harmony Festival! Immerse yourself in the soothing
        melodies of live bands, explore captivating art installations, and
        connect with nature&apos;s beauty.
      </p>
      <div className="flex mt-4">
        <div>
          <IconMarkerPlace className="stroke-gray/100 dark:stroke-gray/5" />
        </div>
        <p className="text-[14px] leading-[150%] ml-1 dark:text-gray/5">
          Riverside Park, Tranquil Meadows 144
        </p>
      </div>
      <div className="flex mt-2">
        <div className="flex mr-4">
          <IconCalendar className="stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[14px] leading-[150%] ml-1 dark:text-gray/5">
            26.09.23
          </p>
        </div>
        <div className="flex">
          <IconClock className="stroke-gray/100 dark:stroke-gray/5" />
          <p className="text-[14px] leading-[150%] ml-1 dark:text-gray/5">
            6 PM
          </p>
        </div>
      </div>
      <div className="mt-8">
        <PrimaryButton message={'See cite of the event'} />
        <div className="mt-4">
          <SecondaryButton message={'Add to calledar'} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
