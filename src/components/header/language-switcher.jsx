'use client';
import { useTransition, useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import clsx from 'clsx';
import IconFlagUa from '@/assets/icons/flags/flag-ua.svg';
import IconFlagEn from '@/assets/icons/flags/flag-en.svg';
import ChevronIcon from '@/assets/icons/common/chevron-icon.svg';

export default function LanguageSwitcher() {
  const iconFlagUa = <IconFlagUa />;
  const iconFlagEn = <IconFlagEn />;

  const langs = [
    { name: 'UA', value: 'uk', icon: iconFlagUa },
    { name: 'EN', value: 'en', icon: iconFlagEn },
  ];

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageClick = value => {
    const nextLocale = value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLanguageName = value => {
    const language = langs.find(lang => lang.value === value);
    return language ? language.name : value.toUpperCase();
  };

  const getLanguageIcon = value => {
    const language = langs.find(lang => lang.value === value);
    return language && language.icon;
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-[77px] font-roboto  text-sm leading-[1.3]"
    >
      <button
        className="flex w-full  items-center items-center text-light-main dark:text-dark-main"
        onClick={toggleMenu}
      >
        <span>{getLanguageIcon(locale)}</span>
        <span className="ml-2 mr-1  ">{getLanguageName(locale)}</span>
        <ChevronIcon
          className={`absolute right-[5px] top-1/2  h-6 w-6 -translate-y-1/2  transition-transform
          ${clsx(isOpen && 'rotate-180')}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full origin-top-right rounded bg-white py-4 pl-4 pr-2 transition-opacity dark:bg-dark-border">
          <div className="flex flex-col gap-3 ">
            {langs.map(langItem => (
              <button
                key={langItem.value}
                disabled={isPending}
                locale={langItem.value}
                onClick={() => {
                  handleLanguageClick(langItem.value);
                }}
                className={`flex gap-2 pb-1 ${clsx(
                  langItem.value === locale
                    ? 'border-b border-light-border text-light-main dark:border-dark-main dark:text-dark-main'
                    : 'text-black dark:text-white'
                )}`}
              >
                <span>{langItem.icon}</span>
                <span>{langItem.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
