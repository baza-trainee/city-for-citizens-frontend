'use client';

import { useState } from 'react';

const FilterInputWrapper = ({
  inputLabel,
  children,
  inputTextDefault,
  inputTextFirst,
  inputTextSecond,
  iconSelect: IconSelect,
  inputIcon: InputIcon,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const selectedInputText = [
    inputTextDefault,
    inputTextFirst,
    inputTextSecond,
  ].filter(Boolean);
  const formatSelectInputText =
    type === 'date'
      ? selectedInputText.join(' - ')
      : selectedInputText.join(', ');

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

  const setColor = () => {
    if (isVisible) {
      return inputTextDefault
        ? `text-light-input-default dark:text-dark-input-default`
        : `text-light-input-focus dark:text-dark-input-focus`;
    }
    return inputTextDefault
      ? `text-light-input-default dark:text-dark-input-default`
      : `text-light-input-focus dark:text-dark-input-focus`;
  };

  const commonStyles = {
    text: `text-base truncate select-none leading-[1.5] -tracking-[0.176px] ${setColor()}`,
    icon: `w-[24px] h-[24px] cursor-pointer transition-all} `,
  };

  return (
    <div className=" relative flex w-full  flex-col">
      <p className="mb-1 font-roboto text-sm text-light-main dark:text-dark-main">
        {inputLabel}
      </p>
      <div tabIndex="0" onFocus={handleFocus} onBlur={handleLostFocus}>
        {/* All list styles */}

        <div
          onClick={handleInputClick}
          className="flex h-[48px]  items-center justify-between rounded-lg bg-light-secondary
        p-[12px_12px_12px_16px] leading-[22.4px]
        shadow-[0_5px_12px_rgba(115,115,115,0.1)]  transition-all 
          dark:border dark:border-dark-border
         dark:bg-dark-secondary dark:text-dark-input-default
          dark:shadow-none "
        >
          {/* Inner input space */}
          <div className="flex w-full cursor-pointer gap-x-2">
            <InputIcon width={24} height={24} />
            <span
              contentEditable={false}
              className={`${commonStyles.text} font-roboto
              ${
                type === 'type'
                  ? 'w-[calc(100vw-32px-16px-12px-24px-24px-16px)] laptop:w-[calc(100vw-80px-16px-12px-24px-24px-16px)]'
                  : 'w-[calc(100%--16px-12px-24px-24px-16px)]'
              }  grow overflow-clip pr-2 text-left desktop:w-[calc((100vw-112px)/3-92px)]  desktop:max-w-[376px]`}
            >
              {formatSelectInputText}
            </span>
          </div>
          <IconSelect
            width={24}
            height={24}
            className={`${commonStyles.icon} ${isVisible ? '-rotate-180' : ''}`}
          />
        </div>

        <div
          className={`absolute mt-[15px] rounded-lg bg-light-secondary font-roboto
          shadow-[0_5px_12px_rgba(115,115,115,0.1)] transition-all dark:border 
          dark:border-dark-border  dark:bg-dark-secondary dark:shadow-none 
           ${type == 'date' ? 'inset-x-0 mx-auto w-fit' : 'w-full'}
           ${isVisible ? 'visible opacity-100' : 'invisible opacity-0'}         
           `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default FilterInputWrapper;
