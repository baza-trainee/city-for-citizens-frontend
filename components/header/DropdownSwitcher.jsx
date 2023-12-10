'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

import IconSelectArrow from '../icons/IconSelectArrow';

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const [fontSize, setFontSize] = useState('24px');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to update font size based on window width
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

    // Clean up the event listener on component unmount
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

    // Add the event listener
    document.addEventListener('click', closeDropdownOnOutsideClick);

    return () => {
      // Remove the event listener on component unmount
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown-block  relative h-max rounded-lg border 
      bg-gray/5 text-base dark:bg-gray/5
       max-tablet:first:mb-4  tablet:w-[33%] desktop:w-[89px] desktop:border-none 
        desktop:pb-1 desktop:text-gray/100 desktop:dark:bg-gray/100 desktop:dark:text-gray/5 
       landscape:w-[33%] landscape:desktop:w-[89px]
       ${
         isDropdownVisible
           ? 'dark:border-gray-10 border-gray/80 text-gray/80'
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
          isDropdownVisible ? 'dark:text-gray/30 desktop:dark:text-gray/5' : ''
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
                isDropdownVisible ? 'stroke-gray/80' : 'stroke-gray/20'
              } desktop:stroke-gray/100`
        }
        ${isDropdownVisible ? 'rotate-180 transform' : ''}`}
        />
      </div>

      <div
        className={`dropdown    left-0 top-9 flex w-full flex-col
         items-start transition-opacity 
         duration-300 desktop:absolute desktop:items-center 
         desktop:gap-[10px] desktop:rounded-lg desktop:border 
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