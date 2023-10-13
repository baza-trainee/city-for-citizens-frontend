'use client';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { uk, en } from 'date-fns/locale';

import IconSelectArrow from '../../icons/IconSelectArrow';
import FilterInputWrapper from '../FilterInputWrapper';
import IconReset from '../../icons/IconReset';

import { customComponents } from './customComponents';

const activeDates = [
  '2023-10-10',
  '2023-10-15',
  '2023-10-20',
  '2023-10-12',
  '2023-10-17',
  '2023-10-21',
  '2023-10-04',
  '2023-10-19',
  '2023-11-05',
];

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: 'Оберіть час',
  inputText: 'Час',
};

const formatDate = date => {
  return format(date, 'yyyy-MM-dd');
};

const generateDateRange = (start, end, activeDates) => {
  const dateRange = [];
  let currentDate = new Date(start);
  const lastDate = new Date(end);

  while (currentDate <= lastDate) {
    const date = formatDate(currentDate);
    if (!activeDates) {
      dateRange.push(date);
    } else if (activeDates.includes(date)) {
      dateRange.push(date);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};

export const DatePicker = ({ setDate }) => {
  const [range, setRange] = useState({});
  const [dateToFilter, setDateToFilter] = useState([]);
  const [inputText, setInputText] = useState([]);

  useEffect(() => {
    setDate(dateToFilter);
  }, [dateToFilter, setDate]);

  useEffect(() => {
    setDateToFilter([]);
    setInputText([]);
    if (range?.from) {
      const from = formatDate(range.from);
      const to = range.to ? formatDate(range.to) : null;

      if (!to) {
        setDateToFilter([from]);
        setInputText([from]);
      } else {
        const dateRange = generateDateRange(from, to, activeDates);

        const dateForFilter = dateRange;
        setDateToFilter(dateForFilter);

        setInputText([from, to]);
      }
    }
  }, [range]);

  const handleResetButton = () => {
    setDateToFilter([]);
    setInputText([]);
    setRange({});
  };

  const isDateActive = date => activeDates.includes(formatDate(date));

  const customStylesDatePicker = {
    root: 'text-gray/80 dark:text-gray/5 p-[16px] tablet:p-[12px] desktop:p-[10px]', // calendar wrap

    caption: 'relative mb-[20px] tablet:mb-[10px] h-[22px]', // mouth, nav button
    caption_label:
      'text-center capitalize text-[14px] leading-[1.5] -tracking-[0.154px]  text-gray/100 dark:text-gray/5 ', //mouth title
    nav: 'absolute top-0 w-full flex justify-between', // nav button wrap
    nav_button: 'w-auto', // nav button

    table:
      'w-full flex flex-col gap-[20px] tablet:gap-[10px] desktop:gap-[5px]', // wrap - day week name, day mouth number
    tbody: 'flex flex-col gap-[20px] tablet:gap-[10px] desktop:gap-[5px]', // wrap day mouth number
    head_row: 'flex justify-between', // row with day week name
    row: 'flex justify-between ', // rows with day mouth number

    head_cell:
      'w-[25px] desktop:w-[20px] p-0 text-[12px] font-normal select-none capitalize ', // wrap/item day week name
    cell: 'p-0 text-center', // wrap/item day mouth number
    button:
      'w-[25px] desktop:w-[20px] block hover:text-primary/100 hover:dark:text-primary/80 text-[12px] select-none leading-[1.5] -tracking-[0.132px]', // button day mouth number

    day_selected: 'text-primary/100 dark:text-primary/80 ', // selected day mouth number
    day_disabled:
      'opacity-100 !text-gray/20  dark:!text-gray/50 pointer-events-none', // disabled day mouth number
  };

  return (
    <>
      <FilterInputWrapper
        label={ukr.label}
        inputTextDefault={inputText.length !== 0 ? '' : ukr.inputText}
        inputTextFirst={inputText[0]}
        inputTextSecond={inputText[1]}
        iconSelect={IconSelectArrow}
        iconReset={IconReset}
        handleResetButton={handleResetButton}
      >
        <DayPicker
          components={customComponents}
          locale={uk}
          mode="range"
          max={21}
          showOutsideDays
          disabled={date => !isDateActive(date)}
          selected={range}
          onSelect={setRange}
          classNames={customStylesDatePicker}
        />
      </FilterInputWrapper>
    </>
  );
};

export default DatePicker;
