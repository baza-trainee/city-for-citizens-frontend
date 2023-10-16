'use client';
import Link from 'next-intl/link';
import { useLocale } from 'next-intl';

const LanguageSwitcher = () => {
  const locale = useLocale();
  return (
    <>
      <Link
        href="/"
        locale="uk-UA"
        className={`h-5 text-center leading-normal ${
          locale.includes('uk-UA')
            ? 'border-b border-primary/100 text-primary/100'
            : ''
        }`}
      >
        Укр
      </Link>

      <Link
        href="/"
        locale="en-US"
        className={`h-5 text-center leading-normal ${
          locale.includes('en-US')
            ? 'border-b border-primary/100 text-primary/100'
            : ''
        }`}
      >
        Eng
      </Link>
    </>
  );
};

export default LanguageSwitcher;
