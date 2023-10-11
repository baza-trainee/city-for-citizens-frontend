'use client';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import { uk } from 'date-fns/locale';
import IconSelectArrow from '../icons/IconSelectArrow';
import FilterInputWrapper from './FilterInputWrapper';
import IconReset from '../icons/IconReset';
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

export const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState('');

  const handleResetButton = () => {
    setSelectedDay('');
  };

  const isDateActive = date => activeDates.includes(format(date, 'yyyy-MM-dd'));

  const handleDateChange = date => {
    setSelectedDay(date);
  };

  const inputText = selectedDay ? format(selectedDay, 'dd/MM/yy') : '';

  return (
    <>
      <FilterInputWrapper
        label={ukr.label}
        inputTextDefault={selectedDay ? '' : ukr.InputText}
        inputText={inputText}
        iconSelect={IconSelectArrow}
        iconReset={IconReset}
        handleResetButton={handleResetButton}
      >
        <DayPicker
          IconDropdown
          locale={uk}
          mode="single"
          showOutsideDays
          classNames={{
            root: 'text-gray/80 dark:text-gray/5 w-full p-[10px]',
            caption: 'hidden',
            table: 'w-full',
            head_cell: 'text-[12px] font-normal select-none capitalize',
            cell: 'p-0 text-center',
            button:
              'block w-full h-[20px] hover:text-primary/100 hover:dark:text-primary/80',
            day: 'text-[12px] select-none',
            day_selected:
              'text-primary/100 dark:text-primary/80 pointer-events-none',
            day_outside: 'text-gray/20 dark:text-gray/50 pointer-events-none',
            day_disabled: 'text-gray/20 dark:text-gray/50 pointer-events-none',
          }}
          disabled={date => !isDateActive(date)}
          selected={selectedDay}
          onSelect={handleDateChange}
        />
      </FilterInputWrapper>
    </>
  );
};

export default DatePicker;
