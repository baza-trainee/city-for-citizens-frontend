'use client';

import { useEffect, useState } from 'react';
import { typeEvents } from './temporaryData/temporaryTypesOfEvents';
import IconSelectArrow from '../IconSelectArrow';
import IconCheckbox from '../IconCheckbox';
import FilterInputWrapper from './FilterInputWrapper';

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: 'Оберіть тип події',
  InputText: 'Подія',
  textIsEmpty: 'Тут порожньо...',
};
const ChooseEventType = ({ setEventType }) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  useEffect(() => {
    setEventType(selectedEventTypes);
  }, [selectedEventTypes, setEventType]);

  const handleChangeEvent = e => {
    const eventName = e.target.name;

    setSelectedEventTypes(prev => {
      if (prev.includes(eventName)) {
        return prev.filter(type => type !== eventName);
      } else {
        return [...prev, eventName];
      }
    });
  };

  return (
    <div>
      <FilterInputWrapper
        label={ukr.label}
        inputTextDefault={selectedEventTypes.length !== 0 ? '' : ukr.InputText}
        inputText={
          selectedEventTypes.length !== 0 ? selectedEventTypes.join(', ') : ''
        }
        iconSelect={IconSelectArrow}
      >
        <ul className="">
          {typeEvents.length === 0 ? (
            <p className="p-[10px] text-gray/50 dark:text-gray/10 leading-[1.5] -tracking-[0.176px] text-[16px]">
              {ukr.textIsEmpty}
            </p>
          ) : (
            typeEvents.map(event => (
              <li
                className="last:border-none p-[10px]   border-b-gray/50 dark:border-gray/10 border-b-[1px]"
                key={event}
              >
                <label className="flex justify-between">
                  <span className="select-none text-gray/50 dark:text-gray/10  leading-[1.5] -tracking-[0.176px] text-[16px]">
                    {event}
                  </span>
                  <input
                    className="hidden"
                    name={event}
                    onChange={handleChangeEvent}
                    type="checkbox"
                  />
                  <div className="rounded-[4px] border-[1px] border-gray/50 dark:border-gray/10 flex justify-center items-center w-[24px] h-[24px]">
                    <IconCheckbox
                      className={`stroke-gray/50 dark:stroke-gray/10 transition-all ${
                        selectedEventTypes.includes(event)
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                      width={16}
                      height={16}
                    />
                  </div>
                </label>
              </li>
            ))
          )}
        </ul>
      </FilterInputWrapper>
    </div>
  );
};
export default ChooseEventType;
