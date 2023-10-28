'use client';
import Link from 'next-intl/link';
import { useLocale } from 'next-intl';

const LanguageSwitcher = ({ buttonStyle, icon }) => {
  const locale = useLocale();
  console.log(locale);
  const langs = [
    { name: 'Укр', value: 'uk-UA' },
    { name: 'Eng', value: 'en-US' },
  ];
  return (
    <>
      {langs.map(langItem => (
        <Link
          href="/"
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
        </Link>
      ))}
    </>
  );
};

export default LanguageSwitcher;
