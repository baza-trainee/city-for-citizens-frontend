import IconCalendar from '../UI/icons/IconCalendar';
import IconClock from '../UI/icons/IconClock';
import IconMarkerPlace from '../UI/icons/IconPlace';
import { formatDateSeparatorDot, formatDateToTime } from '../../helpers';

const ModalOnHover = ({ event }) => {
  if (event.sameAddress) {
    return <ModalOnHoverSlider events={event.sameAddress} />;
  }
  return <ModalOnHoverItem event={event} />;
};
export default ModalOnHover;

const ModalOnHoverSlider = ({ events }) => {
  return (
    <div className="gap-[5px] tablet:grid tablet:grid-cols-2">
      {events.map(event => (
        <ModalOnHoverItem key={event.idIdentifier} event={event} />
      ))}
    </div>
  );
};

const ModalOnHoverItem = ({ event }) => {
  const { eventAddress, eventTitle, dateTime } = event;
  return (
    <div className="max-w-[280px] rounded-[8px] border border-solid border-gray/100 bg-gray/5 p-[10px] dark:border-gray/5 dark:bg-gray/80">
      <h3 className="mb-[12px] font-heading text-[14px] font-light leading-[1.5] -tracking-[0.264px] dark:text-gray/5">
        {eventTitle}
      </h3>

      <div className="mb-[6px] flex  gap-[10px]">
        <IconMarkerPlace className=" h-[22px] w-[22px] stroke-gray/100 text-[16px] dark:stroke-gray/5" />
        <p className="text-[14px] leading-[1.5] dark:text-gray/5">
          {eventAddress.street}
        </p>
      </div>

      <div className="flex gap-[16px]">
        <div className="flex  gap-[10px]">
          <IconCalendar className="h-[22px] w-[22px] stroke-gray/100 text-[16px] dark:stroke-gray/5" />
          <p className="text-[14px] leading-[1.5] dark:text-gray/5">
            {formatDateSeparatorDot(dateTime)}
          </p>
        </div>

        <div className="flex  gap-[10px]">
          <IconClock className="h-[22px] w-[22px] stroke-gray/100 text-[16px] dark:stroke-gray/5" />
          <p className="text-[14px] leading-[1.5] dark:text-gray/5">
            {formatDateToTime(dateTime)}
          </p>
        </div>
      </div>
    </div>
  );
};
