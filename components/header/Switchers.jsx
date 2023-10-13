'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import IconSelectArrow from '../icons/IconSelectArrow';

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
      className={`dropdown-block  text-base first:mb-4
       border  rounded-lg relative tablet:w-[89px] tablet:px-4 tablet:pb-1
       ${
         isDropdownVisible
           ? 'border-gray/80 text-gray/80'
           : 'border-gray/10 text-gray/20'
       }`}
      onClick={toggleDropdown}
    >
      <div className="flex justify-between p-2.5">
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
            : `${
                isDropdownVisible ? 'stroke-gray/80' : 'stroke-gray/20'
              } tablet:stroke-gray/100`
        }
        ${isDropdownVisible ? 'transform rotate-180' : ''}`}
        />
      </div>

      <div
        className={`dropdown w-full  top-7 left-0 flex flex-col items-start
         tablet:items-center tablet:gap-[10px] tablet:rounded-lg border-solid border-gray tablet:p-4 transition-opacity duration-300 
         ${
           isDropdownVisible
             ? 'visible opacity-100 h-[88px]'
             : 'invisible opacity-0 h-0'
         } `}
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
