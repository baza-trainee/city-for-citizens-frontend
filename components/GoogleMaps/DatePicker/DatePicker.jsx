'use client';

import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { uk, en } from 'date-fns/locale';

import IconSelectArrow from '../../icons/IconSelectArrow';
import FilterInputWrapper from '../FilterInputWrapper';
import { customComponents } from './customComponents';

import { formatDate, generateDateRange } from '@/helpers';
import { activeDates } from '../temporaryData/temporaryActiveDate';

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: 'Оберіть час',
  inputText: 'Час',
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

  const isDateActive = date => activeDates.includes(formatDate(date));

  const customStylesDatePicker = {
    root: 'text-gray/80 dark:text-gray/5 p-[16px] ', // calendar wrap

    caption:
      'relative mb-[20px] tablet:mb-[10px] h-[24px] flex justify-center items-end', // mouth, nav button
    caption_label:
      'text-center capitalize text-[14px] leading-[1.5] -tracking-[0.154px]  text-gray/100 dark:text-gray/5 ', //mouth title
    nav: 'absolute top-0 w-full flex justify-between', // nav button wrap
    nav_button: 'w-auto', // nav button

    table:
      'w-full flex flex-col gap-[20px] tablet:gap-[15px] desktop:gap-[20px]', // wrap - day week name, day mouth number
    tbody: 'flex flex-col gap-[20px] tablet:gap-[15px] desktop:gap-[20px]', // wrap day mouth number
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
    <div className="tablet:w-[264px] desktop:w-[305px]">
      <FilterInputWrapper
        inputLabel={ukr.label}
        inputTextDefault={inputText.length !== 0 ? '' : ukr.inputText}
        inputTextFirst={inputText[0]}
        inputTextSecond={inputText[1]}
        iconSelect={IconSelectArrow}
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
    </div>
  );
};

export default DatePicker;
