'use client';

import { useEffect, useState } from 'react';
import { typeEvents } from './temporaryData/temporaryTypesOfEvents';
import IconSelectArrow from '../icons/IconSelectArrow';
import IconCheckbox from '../icons/IconCheckbox';

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
  const [eventTypes, setEventTypes] = useState(typeEvents);
  const [hasFocus, setHasFocus] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    setEventType(selectedEventTypes);
  }, [selectedEventTypes, setEventType]);

  const setColorSelectArrowIcon =
    selectedEventTypes.length !== 0
      ? isListVisible
        ? 'stroke-gray/100 dark:stroke-gray/5'
        : 'stroke-gray/50 dark:stroke-gray/10'
      : isListVisible
      ? 'stroke-gray/100 dark:stroke-gray/5'
      : 'stroke-gray/30 dark:stroke-gray/20';

  const selectedEvents =
    selectedEventTypes.length !== 0 ? (
      <span
        className={`whitespace-nowrap ${
          isListVisible
            ? 'text-gray/100 dark:text-gray/5'
            : 'text-gray/50 dark:text-gray/10'
        }`}
      >
        {selectedEventTypes.join(', ')}
      </span>
    ) : (
      <span
        className={`${
          isListVisible
            ? 'text-gray/100 dark:text-gray/5'
            : 'text-gray/30 dark:text-gray/20'
        }`}
      >
        {ukr.InputText}
      </span>
    );

  const handleEventTypesInputClick = () => {
    if (hasFocus) {
      setIsListVisible(false);
      setHasFocus(false);
    } else {
      setHasFocus(true);
      setIsListVisible(true);
    }
  };

  const handleMouseHover = () => {
    setIsListVisible(true);
  };

  const handleMouseLeave = () => {
    if (hasFocus) {
      return;
    }
    setIsListVisible(false);
  };

  const handleLostFocus = () => {
    setIsListVisible(false);
    setHasFocus(false);
  };

  const handleFocus = () => {
    setIsListVisible(true);
  };

  const handleChangeEvent = e => {
    const eventName = e.target.name;

    setHasFocus(true);
    setSelectedEventTypes(prev => {
      if (prev.includes(eventName)) {
        return prev.filter(type => type !== eventName);
      } else {
        return [...prev, eventName];
      }
    });
  };

  return (
    <>
      <div className="relative">
        <p className="text-gray/100 dark:text-gray/5 text-[14px] leading-[1.5] -tracking-[0.154px] mb-[8px]">
          {ukr.label}
        </p>
        <div
          className="outline-none"
          tabIndex="0"
          onFocus={handleFocus}
          onBlur={handleLostFocus}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          <div
            onClick={handleEventTypesInputClick}
            className={`transition-all flex gap-[5px] p-[10px] rounded-[8px] border-[1px] w-[164px] h-[44px]
            ${
              isListVisible
                ? 'rounded-bl-none rounded-br-none border-gray/80 dark:border-gray/5'
                : 'border-gray/20'
            }`}
          >
            <p className="select-none leading-[1.5] -tracking-[0.176px] truncate max-w-[113px] text-[16px]">
              {selectedEvents}
            </p>
            <IconSelectArrow
              className={`transition-all  ${setColorSelectArrowIcon} ${
                isListVisible && '-rotate-180 '
              }`}
              width="24"
              height="24"
            />
          </div>

          <ul
            className={`border-[1px] rounded-bl-[8px] rounded-br-[8px] border-t-0 bg-gray/5  dark:bg-gray/100 dark:border-gray/5 border-gray/80  transition-all w-full absolute z-10 ${
              isListVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            {eventTypes.length === 0 ? (
              <p className="p-[10px] text-gray/50 dark:text-gray/10 leading-[1.5] -tracking-[0.176px] text-[16px]">
                {ukr.textIsEmpty}
              </p>
            ) : (
              eventTypes.map(event => (
                <li
                  className="last:border-none p-[10px] border-b-gray/50 dark:border-gray/10 border-b-[1px]"
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
        </div>
      </div>
    </>
  );
};
export default ChooseEventType;
