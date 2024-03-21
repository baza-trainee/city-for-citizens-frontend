'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

import IconSelectArrow from '../UI/icons/IconSelectArrow';

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const [fontSize, setFontSize] = useState('24px');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateFontSize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1440) {
        setFontSize('20px');
      } else {
        setFontSize('24px');
      }
    };

    window.addEventListener('resize', updateFontSize);

    updateFontSize();

    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  useEffect(() => {
    // Event listener to close the dropdown when clicking outside
    const closeDropdownOnOutsideClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative h-max w-full max-w-[398px] rounded-lg border
      bg-gray/5 text-base dark:bg-gray/5
      tablet:w-[33%] tablet:w-full tablet:max-w-[264px] desktop:w-[89px] desktop:border-none 
        desktop:pb-1 desktop:text-gray/100 desktop:dark:bg-gray/100 desktop:dark:text-gray/5 
       landscape:w-[33%] landscape:desktop:w-[89px]
       ${
         isDropdownVisible
           ? 'border-gray/80 text-gray/80 dark:border-gray/10 dark:text-gray/30'
           : 'border-gray/10 text-gray/20'
       }`}
      onClick={toggleDropdown}
    >
      <div
        className={`flex items-center gap-[4px] p-2.5 desktop:justify-center desktop:p-0 ${
          isDropdownVisible ? '' : 'justify-between'
        }`}
      >
        <span
          className={`title-switcher desktop:text:left relative cursor-pointer leading-normal
        ${
          isDropdownVisible ? 'dark:text-gray/100 desktop:dark:text-gray/5' : ''
        }`}
        >
          {content}
        </span>
        <IconSelectArrow
          width={fontSize}
          height={fontSize}
          className={`ml-1 inline-block transition-transform duration-300 
        ${
          resolvedTheme === 'dark'
            ? 'stroke-gray/20 desktop:stroke-gray/5'
            : `${
                isDropdownVisible ? 'stroke-gray/100' : 'stroke-gray/20'
              } desktop:stroke-gray/100`
        }
        ${isDropdownVisible ? 'rotate-180 transform' : ''}`}
        />
      </div>

      <div
        className={`left-0 top-[26px] flex w-full flex-col
         items-start rounded-lg bg-gray/5 transition-opacity duration-300
         dark:bg-gray/100 dark:bg-gray/5 desktop:absolute 
         desktop:items-center desktop:gap-[10px] desktop:border 
         desktop:border-gray/100 desktop:bg-gray/5 desktop:p-4  desktop:dark:border-gray/5  desktop:dark:bg-gray/100
         ${
           isDropdownVisible
             ? 'visible h-[88px] opacity-100'
             : 'invisible h-0 opacity-0'
         } `}
      >
        {options}
      </div>
    </div>
  );
};

export default DropdownSwitcher;
