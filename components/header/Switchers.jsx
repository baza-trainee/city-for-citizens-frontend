'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import IconSelectArrow from '../icons/IconSelectArrow';

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      className="dropdown-block relative w-[89px] whitespace-nowrap px-4 pb-1 "
      onClick={toggleDropdown}
    >
      <span className="title-switcher relative cursor-pointer leading-normal">
        {content}
      </span>
      <IconSelectArrow
        width="20"
        height="20"
        className={`ml-1 inline-block transition-transform duration-300 
        ${resolvedTheme === 'dark' ? 'stroke-gray/5' : 'stroke-gray/100'}
        ${isDropdownVisible ? 'rotate-180 transform' : ''}`}
      />
      <div
        className={`dropdown border-gray absolute left-0 top-7 flex w-full flex-col items-center gap-[10px] rounded-lg border border-solid p-4 transition-opacity duration-300 
         ${isDropdownVisible ? 'visible opacity-100' : 'invisible opacity-0'} `}
      >
        {options}
      </div>
    </div>
  );
};

const Switchers = () => {
  const t = useTranslations('Switchers');

  return (
    <div className="flex">
      <DropdownSwitcher content={t('titleTheme')} options={<ThemeSwitcher />} />
      <DropdownSwitcher
        content={`${t('titleLang')}`}
        options={<LanguageSwitcher />}
      />
    </div>
  );
};

export default Switchers;
