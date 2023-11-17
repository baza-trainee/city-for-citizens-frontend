'use client';

import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { uk, en } from 'date-fns/locale';

import IconSelectArrow from '../../icons/IconSelectArrow';
import FilterInputWrapper from '../FilterInputWrapper';
import { formatDateSeparatorDash, generateDateRange } from '@/helpers';
import { customStylesDatePicker } from './customStylesDatePicker';
import { customComponents } from './customComponents';
import { useQueryParam } from '@/hooks';

const ukr = {
  label: 'Оберіть час',
  inputText: 'Час',
};

export const DatePicker = ({ filtersEventDates }) => {
  const [range, setRange] = useState({});
  const [inputText, setInputText] = useState([]);
  const [dateToFilter, setDateToFilter] = useQueryParam('date');

  useEffect(() => {
    if (dateToFilter.length === 0) {
      return;
    }
    if (range?.from) {
      return;
    }
    if (range === undefined) {
      setDateToFilter([]);
      setInputText([]);
      return;
    }
    setRange({
      from: new Date(dateToFilter[0]),
      to:
        dateToFilter[0] === dateToFilter.at(-1)
          ? undefined
          : new Date(dateToFilter.at(-1)),
    });
  }, [dateToFilter, range, setDateToFilter]);

  useEffect(() => {
    if (range?.from) {
      const from = formatDateSeparatorDash(range.from);
      const to = range.to ? formatDateSeparatorDash(range.to) : null;

      if (!to) {
        setDateToFilter([from]);
        setInputText([from]);
      } else {
        const dateRange = generateDateRange(from, to, filtersEventDates);

        const dateForFilter = dateRange;
        setDateToFilter(dateForFilter);

        setInputText([from, to]);
      }
    }
  }, [filtersEventDates, range, setDateToFilter]);

  const isDateActive = (date, activeDates = []) =>
    activeDates.includes(formatDateSeparatorDash(date));

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
          disabled={date => !isDateActive(date, filtersEventDates)}
          selected={range}
          onSelect={setRange}
          classNames={customStylesDatePicker}
        />
      </FilterInputWrapper>
    </div>
  );
};

export default DatePicker;
