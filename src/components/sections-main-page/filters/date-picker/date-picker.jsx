'use client';

import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { uk, enUS } from 'date-fns/locale';

import IconSelectArrow from '@/assets/icons/filters/drop-down-icon.svg';
import IconInputCalendar from '@/assets/icons/filters/calendar-input-icon.svg';
import FilterInputWrapper from '../filter-input-wrapper';
import { formatDateSeparatorDash, generateDateRange } from '@/helpers';
import { customStylesDatePicker } from './custom-styles-date-picker';
import { customComponents } from './custom-components';
import { useQueryParam } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';

export const DatePicker = ({ filtersEventDates }) => {
  const [range, setRange] = useState({});
  const [inputText, setInputText] = useState([]);
  //const [dateToFilter, setDateToFilter] = useQueryParam('date');
  const [dateToFilter, setDateToFilter] = useState([]);

  const t = useTranslations('Filters.DatePicker');
  const locale = useLocale();

  useEffect(() => {
    if (range == undefined) {
      setDateToFilter([]);
      setInputText([]);
      return;
    }
    if (dateToFilter.length === 0) {
      setInputText([]);
      if (range?.from) {
        setRange({});
      }
      return;
    }
    if (range?.from) {
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

        setDateToFilter(dateRange);

        setInputText([from, to]);
      }
    }
  }, [filtersEventDates, range, setDateToFilter]);

  const isDateActive = (date, activeDates = []) =>
    activeDates.includes(formatDateSeparatorDash(date));

  return (
    <div className="w-full">
      <FilterInputWrapper
        inputLabel={t('label')}
        inputTextDefault={inputText.length !== 0 ? '' : t('defaultValue')}
        inputTextFirst={inputText[0]}
        inputTextSecond={inputText[1]}
        iconSelect={IconSelectArrow}
        inputIcon={IconInputCalendar}
      >
        <DayPicker
          components={customComponents}
          locale={locale === 'uk' ? uk : enUS}
          mode="range"
          max={61}
          weekStartsOn={1}
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
