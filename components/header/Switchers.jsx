'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import IconSelectArrow from '../IconSelectArrow';

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const [screenSize, setScreenSize] = useState('tablet'); // Default to tablet size
  const [accordionHeight, setAccordionHeight] = useState('0px');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= parseInt(tailwindScreens.mobile)) {
        setScreenSize('mobile');
      } else if (screenWidth <= parseInt(tailwindScreens.tablet)) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setAccordionHeight(isDropdownVisible ? '84px' : '0');
  };

  return (
    <div
      className="dropdown-block flex justify-between flex-wrap text-base p-2.5 first:mb-4
       border border-gray/10 rounded-lg relative tablet:w-[89px] tablet:px-4 tablet:pb-1"
      onClick={toggleDropdown}
    >
      <span className="title-switcher relative cursor-pointer leading-normal">
        {content}
      </span>
      <IconSelectArrow
        width={screenSize === 'mobile' ? '20px' : '24px'}
        height={screenSize === 'mobile' ? '20px' : '24px'}
        className={`inline-block ml-1 transition-transform duration-300 
        ${
          resolvedTheme === 'dark'
            ? 'stroke-gray/5'
            : 'stroke-gray/20 tablet:stroke-gray/100'
        }
        ${isDropdownVisible ? 'transform rotate-180' : ''}`}
      />
      <div
        className={`dropdown w-full  top-7 left-0 flex flex-col items-center gap-[10px] tablet:rounded-lg border-solid border-gray p-4 transition-opacity duration-300 
         ${isDropdownVisible ? 'visible opacity-100' : 'invisible opacity-0'} `}
      >
        {options}
      </div>
    </div>
  );
};

const Switchers = () => {
  return (
    <div className="flex-col tablet:flex px-4 max-tablet:mt-[225px] ">
      <DropdownSwitcher content="Тема" options={<ThemeSwitcher />} />
      <DropdownSwitcher content="Мова" options={<LanguageSwitcher />} />
    </div>
  );
};

export default Switchers;
