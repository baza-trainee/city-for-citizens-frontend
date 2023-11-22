import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray/100 py-[20px] text-gray/5 dark:bg-gray/100 dark:text-gray/5 tablet:py-[72px]">
      <div
        className="container flex flex-wrap items-center justify-center gap-[8px] 
      tracking-[-0.176px] tablet:gap-[49px]"
      >
        <Link href={'/'}>{t('logotype')}</Link>
        <p className="text-sm tablet:text-base">
          {`${t('company')} ${t('year')}  ${t('copyrightText')}`}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
