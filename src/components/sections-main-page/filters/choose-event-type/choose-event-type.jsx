'use client';

import IconSelectArrow from '@/assets/icons/filters/drop-down-icon.svg';
import IconInputTypeEvent from '@/assets/icons/filters/type-event-input-icon.svg';
import FilterInputWrapper from '../filter-input-wrapper';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/redux/slice/filters';

const ChooseEventType = ({ filtersEventTypes }) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState('');
  const dispatch = useDispatch();
  const t = useTranslations('Filters.ChooseEventType');

  useEffect(() => {
    selectedEventTypes &&
      dispatch(setFilters({ eventType: selectedEventTypes.join(',') }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventTypes]);

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
        type={'type'}
      >
        <ul className="custom-scroll flex max-h-[300px] w-full flex-col gap-3 overflow-y-auto px-4 py-3">
          {filtersEventTypes.length === 0 ? (
            <p className="text-[16px] leading-[1.5] -tracking-[0.176px] text-light-input-default dark:text-dark-input-default">
              {t('textIsEmpty')}
            </p>
          ) : (
            filtersEventTypes.map(event => {
              return (
                <li className="" key={event}>
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
