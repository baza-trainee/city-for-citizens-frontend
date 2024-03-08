'use client';

import IconSelectArrow from '@/assets/icons/filters/drop-down-icon.svg';
import IconInputTypeEvent from '@/assets/icons/filters/type-event-input-icon.svg';
//import IconCheckbox from '@/assets/icons/common';
import FilterInputWrapper from '../filter-input-wrapper';
import { useQueryParam } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const ChooseEventType = ({ filtersEventTypes }) => {
  // const [selectedEventTypes, setSelectedEventTypes] =
  //   useQueryParam('eventType');
  const [selectedEventTypes, setSelectedEventTypes] = useState('');

  const t = useTranslations('Filters.ChooseEventType');

  // const handleChangeEvent = e => {
  //   const eventName = e.target.name;

  //   setSelectedEventTypes(prev => {
  //     if (prev.includes(eventName)) {
  //       return prev.filter(type => type !== eventName);
  //     } else {
  //       return [...prev, eventName];
  //     }
  //   });
  // };
  function toggleCheck(type) {
    if (selectedEventTypes.includes(type)) {
      setSelectedEventTypes(prev => prev.filter(el => el !== type));
    } else {
      setSelectedEventTypes(prev => [...prev, type]);
    }
  }
  const selectedTypesIsEmpty = selectedEventTypes.length !== 0;
  return (
    <div className="w-full">
      <FilterInputWrapper
        inputLabel={t('label')}
        inputTextDefault={selectedTypesIsEmpty ? '' : t('defaultValue')}
        inputTextFirst={
          selectedTypesIsEmpty ? selectedEventTypes.join(', ') : ''
        }
        iconSelect={IconSelectArrow}
        inputIcon={IconInputTypeEvent}
      >
        <ul className="custom-scroll max-h-[300px] overflow-y-auto">
          {filtersEventTypes.length === 0 ? (
            <p className="p-[10px] text-[16px] leading-[1.5] -tracking-[0.176px] text-light-input-default dark:text-dark-input-default">
              {t('textIsEmpty')}
            </p>
          ) : (
            filtersEventTypes.map(event => {
              return (
                <li className="p-[10px]" key={event}>
                  <label
                    className="flex cursor-pointer justify-between"
                    onClick={() => {
                      toggleCheck(event);
                    }}
                  >
                    <span
                      className={`select-none text-[16px]  leading-[1.5] -tracking-[0.176px] ${
                        selectedEventTypes.includes(event)
                          ? 'text-light-input-focus dark:text-dark-input-focus'
                          : 'text-light-input-default dark:text-dark-input-default'
                      }`}
                    >
                      {event}
                    </span>
                    {/* <input
                      className="hidden"
                      name={event}
                      onChange={handleChangeEvent} 
                      type="checkbox"
                    /> */}
                    <div
                      className={`flex  h-6 w-6 select-none
                       items-center justify-center rounded border-[2px] transition-all ${
                         selectedEventTypes.includes(event)
                           ? 'border-light-checkbox-check dark:border-dark-checkbox-check'
                           : 'border-light-checkbox-non_check dark:border-dark-checkbox-non_check'
                       }`}
                    ></div>
                  </label>
                </li>
              );
            })
          )}
        </ul>
      </FilterInputWrapper>
    </div>
  );
};
export default ChooseEventType;
