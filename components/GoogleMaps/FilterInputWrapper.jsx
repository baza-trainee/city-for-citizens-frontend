'use client';

import { useState } from 'react';

const FilterInputWrapper = ({
  inputLabel,
  children,
  inputTextDefault,
  inputTextFirst,
  inputTextSecond,
  iconSelect: IconSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const selectedInputText = [inputTextDefault, inputTextFirst, inputTextSecond];

  const handleInputClick = () => {
    if (hasFocus) {
      setIsVisible(false);
      setHasFocus(false);
    } else {
      setHasFocus(true);
      setIsVisible(true);
    }
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleLostFocus = () => {
    setIsVisible(false);
    setHasFocus(false);
  };

  const setTextColor = inputTextDefault
    ? isVisible
      ? 'text-gray/100 dark:text-gray/5'
      : 'text-gray/30 dark:text-gray/20'
    : isVisible
    ? 'text-gray/100 dark:text-gray/5'
    : 'text-gray/50 dark:text-gray/10';

  const setIconColor = inputTextDefault
    ? isVisible
      ? 'stroke-gray/100 dark:stroke-gray/5'
      : 'stroke-gray/30 dark:stroke-gray/20'
    : isVisible
    ? 'stroke-gray/100 dark:stroke-gray/5'
    : 'stroke-gray/50 dark:stroke-gray/10';

  const commonStyles = {
    text: `max-w-[87%] mobile:max-w-[346px] select-none truncate whitespace-nowrap text-[16px] leading-[1.5] -tracking-[0.176px] ${setTextColor}  tablet:max-w-[212px] desktop:max-w-[112px]`,
    icon: `w-[24px] h-[24px] cursor-pointer transition-all ${setIconColor} `,
  };

  return (
    <div className="relative">
      <p className="mb-[8px] text-[14px] leading-[1.5] -tracking-[0.154px] text-gray/100 dark:text-gray/5">
        {inputLabel}
      </p>
      <div tabIndex="0" onFocus={handleFocus} onBlur={handleLostFocus}>
        <div
          onClick={handleInputClick}
          className={`flex h-[44px] gap-[50px] rounded-[8px] border-[1px] p-[10px] transition-all tablet:gap-[20px] desktop:gap-[30px] ${
            isVisible
              ? 'rounded-bl-none rounded-br-none border-gray/80 dark:border-gray/5'
              : 'border-gray/20'
          }`}
        >
          {selectedInputText.map(
            (inputText, index) =>
              inputText && (
                <div
                  className="flex w-full justify-between"
                  key={inputText + index}
                >
                  <p className={commonStyles.text}>{inputText}</p>
                  <IconSelect
                    width={24}
                    height={24}
                    className={`${commonStyles.icon} ${
                      isVisible ? '-rotate-180' : ''
                    }`}
                  />
                </div>
              )
          )}
        </div>
        <div
          className={`absolute z-10 w-full rounded-bl-[8px] rounded-br-[8px] border-[1px] border-t-0 border-gray/100 bg-gray/0 transition-all  dark:border-gray/5 dark:bg-gray/100 tablet:bg-gray/5 ${
            isVisible ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default FilterInputWrapper;
