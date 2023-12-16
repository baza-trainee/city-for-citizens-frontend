import IconCalendar from '@/components/UI/IconCalendar';
import IconClock from '@/components/UI/IconClock';
import IconMarkerPlace from '@/components/UI/IconPlace';
import { formatDateSeparatorDot, formatDateToTime } from '@/helpers';

const ModalOnHover = ({ event }) => {
  const { eventAddress, eventTitle, dateTime } = event;
  return (
    <div className="max-w-[280px] rounded-[8px] border border-solid border-gray/100 bg-gray/5 p-[10px] dark:border-gray/5 dark:bg-gray/80">
      <h3 className="mb-[12px] font-heading text-[14px] font-light leading-[1.5] -tracking-[0.264px] dark:text-gray/5">
        {eventTitle}
      </h3>

      <div className="mb-[6px] flex items-center gap-[4px]">
        <IconMarkerPlace className="stroke-gray/100 dark:stroke-gray/5" />
        <p className="text-[14px] leading-[1.5] dark:text-gray/5">
          {eventAddress.street}
        </p>
      </div>

      <div className="flex gap-[16px]">
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
    </div>
  );
};
export default ModalOnHover;
