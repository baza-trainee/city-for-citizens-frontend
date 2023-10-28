'use client';
import Link from 'next-intl/link';
import { useLocale } from 'next-intl';

const LanguageSwitcher = () => {
  return (
    <>
      {langs.map(langItem => (
        <Link
          href="/"
          locale={langs.value}
          type="button"
          key={langItem.value}
          className={`${buttonStyle} 
            `}
        >
          {langItem.name}
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20 desktop:hidden">
            {icon}
          </div>
        </Link>
      ))}
    </>
  );
};

export default LanguageSwitcher;
