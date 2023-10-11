'use client';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import { uk } from 'date-fns/locale';
import IconSelectArrow from '../icons/IconSelectArrow';

const activeDates = [
  '2023-10-10',
  '2023-10-15',
  '2023-10-20',
  '2023-10-12',
  '2023-10-17',
  '2023-10-21',
  '2023-10-04',
  '2023-10-19',
  '2023-10-29',
];

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: 'Оберіть час',
  InputText: 'Час',
};

const isDateActive = date => activeDates.includes(format(date, 'yyyy-MM-dd'));

const DatePicker = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const [isDateVisible, setIsDateVisible] = useState(false);

  const selectedDateInputText = selectedDay ? (
    <span
      className={`${
        isDateVisible
          ? 'text-gray/100 dark:text-gray/5'
          : 'text-gray/50 dark:text-gray/10'
      }`}
    >
      {format(selectedDay, 'dd/MM/yy')}
    </span>
  ) : (
    <span
      className={`${
        isDateVisible
          ? 'text-gray/100 dark:text-gray/5'
          : 'text-gray/30 dark:text-gray/20'
      }`}
    >
      {ukr.InputText}
    </span>
  );

  const setColorSelectArrowIcon = selectedDay
    ? isDateVisible
      ? 'stroke-gray/100 dark:stroke-gray/5'
      : 'stroke-gray/50 dark:stroke-gray/10'
    : isDateVisible
    ? 'stroke-gray/100 dark:stroke-gray/5'
    : 'stroke-gray/30 dark:stroke-gray/20';

  const handleDateChange = date => {
    setSelectedDay(date);
    setHasFocus(true);
  };

  const handleDataInputClick = () => {
    if (hasFocus) {
      setIsDateVisible(false);
      setHasFocus(false);
    } else {
      setHasFocus(true);
      setIsDateVisible(true);
    }
  };

  const handleLostFocus = () => {
    setIsDateVisible(false);
    setHasFocus(false);
  };

  const handleFocus = () => {
    setIsDateVisible(true);
  };

  const handleMouseHover = () => {
    setIsDateVisible(true);
  };

  const handleMouseLeave = () => {
    if (hasFocus) {
      return;
    }
    setIsDateVisible(false);
  };

  return (
    <>
      <div className="relative">
        <p className="text-gray/100 dark:text-gray/5 text-[14px] leading-[1.5] -tracking-[0.154px] mb-[8px]">
          {ukr.label}
        </p>
        <div
          tabIndex="0"
          onFocus={handleFocus}
          onBlur={handleLostFocus}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          <div
            onClick={handleDataInputClick}
            className={`transition-all flex gap-[5px] p-[10px] rounded-[8px] border-black border-[1px]   w-[164px] h-[44px]
              ${
                isDateVisible
                  ? 'rounded-bl-none rounded-br-none border-gray/80 dark:border-gray/5'
                  : 'border-gray/20'
              } `}
          >
            <p className="text-[16px] leading-[1.5] -tracking-[0.176px]">
              {selectedDateInputText}
            </p>
            <IconSelectArrow
              className={`transition-all  ${setColorSelectArrowIcon} ${
                isDateVisible && '-rotate-180'
              }`}
              width="24"
              height="24"
            />
          </div>

          <div
            className={`p-[10px] border-[1px] rounded-bl-[8px] rounded-br-[8px] border-t-0 bg-gray/5 
            dark:bg-gray/100 dark:border-gray/5
             border-gray/100  transition-all w-full absolute z-10 ${
               isDateVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
             }`}
          >
            <DayPicker
              locale={uk}
              mode="single"
              showOutsideDays
              classNames={{
                root: 'text-gray/80 dark:text-gray/5 w-full',
                caption: 'hidden',
                table: 'w-full',
                head_cell: 'text-[12px] font-normal select-none capitalize',
                cell: 'p-0 text-center  ',
                button:
                  'block w-full h-[20px] hover:text-primary/100 hover:dark:text-primary/80',
                day: 'text-[12px] select-none',
                day_selected: 'text-primary/100 dark:text-primary/80',
                day_outside:
                  'text-gray/20 dark:text-gray/50 pointer-events-none',
                day_disabled:
                  'text-gray/20 dark:text-gray/50 pointer-events-none',
              }}
              disabled={date => !isDateActive(date)}
              selected={selectedDay}
              onSelect={handleDateChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DatePicker;
