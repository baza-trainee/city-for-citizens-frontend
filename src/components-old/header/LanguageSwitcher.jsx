'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useTransition } from 'react';

const LanguageSwitcher = ({ buttonStyle, icon }) => {
  const locale = useLocale();

  const langs = [
    { name: 'Укр', value: 'uk' },
    { name: 'Eng', value: 'en' },
  ];

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(value) {
    const nextLocale = value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <>
      {langs.map(langItem => (
        <div
          disabled={isPending}
          onClick={() => onSelectChange(langItem.value)}
          locale={langItem.value}
          key={langItem.value}
          className={`${buttonStyle} ${
            locale === langItem.value
              ? 'desktop:border-b desktop:border-active desktop:text-active'
              : ''
          }`}
        >
          {langItem.name}

          <div
            className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] border-[1px] 
          border-gray/50 dark:border-gray/20 desktop:hidden"
          >
            {locale === langItem.value ? icon : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default LanguageSwitcher;
