'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import IconSelectArrow from '../icons/IconSelectArrow';

const buttonStyle = `w-full flex justify-between p-2.5 desctop:h-5 border-t
  border-gray/80 dark:border-gray/10 text-gray/50 dark:text-gray/20 leading-normal ${
    theme === 'dark' ? 'desctop:border-b border-active text-active' : ''
  }`;

const iconCheckBoxStyle = `stroke-gray/50 dark:stroke-gray/20 transition-all ${
  theme === 'dark' ? 'opacity-100' : 'opacity-0'
}`;

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const [screenSize, setScreenSize] = useState('tablet'); // Default to tablet size

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
  };

  return (
    <div
      className={`dropdown-block  text-base max-tablet:first:mb-4 bg-gray/5 dark:bg-gray/5
       border  rounded-lg relative tablet:w-[35%] landscape:w-[35%] desktop:w-[89px] desktop:px-4 desktop:pb-1
       ${
         isDropdownVisible
           ? 'border-gray/80 text-gray/80 dark:border-gray-10'
           : 'border-gray/10 text-gray/20'
       }`}
      onClick={toggleDropdown}
    >
      <div
        className={`flex  p-2.5   ${
          isDropdownVisible ? '' : 'justify-between'
        }`}
      >
        <span
          className={`title-switcher relative cursor-pointer leading-normal 
        ${isDropdownVisible ? 'dark:text-gray/30' : ''}`}
        >
          {content}
        </span>
        <IconSelectArrow
          width={screenSize < 'desctop' ? '24px' : '20px'}
          height={screenSize < 'desctop' ? '24px' : '20px'}
          className={`inline-block ml-1 transition-transform duration-300 
        ${
          resolvedTheme === 'dark'
            ? 'stroke-gray/20 desktop:stroke-gray/5'
            : `${
                isDropdownVisible ? 'stroke-gray/80' : 'stroke-gray/20'
              } desktop:stroke-gray/100`
        }
        ${isDropdownVisible ? 'transform rotate-180' : ''}`}
        />
      </div>

      <div
        className={`dropdown w-full  top-7 left-0 flex flex-col items-start
         desktop:items-center desktop:gap-[10px] desktop:rounded-lg 
         border-solid border-gray desktop:p-4 transition-opacity duration-300 
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
    <div
      className="max-tablet:flex-col tablet:flex justify-center gap-4
     landscape:flex px-4 mt-[170px] landscape:mt-[190px]"
    >
      <DropdownSwitcher content="Тема" options={<ThemeSwitcher />} />
      <DropdownSwitcher content="Мова" options={<LanguageSwitcher />} />
    </div>
  );
};

export default Switchers;
