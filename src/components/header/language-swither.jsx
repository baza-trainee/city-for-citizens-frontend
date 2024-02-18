'use client';
import { useTransition, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import IconFlagUa from '@/assets/icons/flags/flag-ua.svg';
import IconFlagEn from '@/assets/icons/flags/flag-en.svg';

export default function LanguageSwitcher({ icon }) {
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
    <div className="relative w-[77px] leading-[1.4]">
      <button className="text-gray/30 flex w-full" onClick={toggleMenu}>
        <span>{getLanguageIcon(locale)}</span>
        <span className="ml-2 mr-1">{getLanguageName(locale)}</span>
        <span className={`${isOpen ? 'rotate-180' : ''}`}>{icon}</span>
      </button>
      {isOpen && (
        <div className="bg-gray/5 absolute right-0 mt-2 w-full origin-top-right rounded py-4 pl-4 pr-2">
          <div className="flex flex-col gap-3 py-1">
            {langs.map(langItem => (
              <button
                key={langItem.value}
                disabled={isPending}
                locale={langItem.value}
                onClick={() => {
                  handleLanguageClick(langItem.value);
                }}
                className={`${
                  langItem.value === locale
                    ? 'border-gray/30 text-gray/30 border-b'
                    : 'text-gray/80'
                } flex gap-2`}
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
