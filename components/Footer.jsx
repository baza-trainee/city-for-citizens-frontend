import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray/100 py-[20px] text-gray/5 dark:bg-gray/100 tablet:py-[72px]">
      <div
        className="container flex flex-wrap items-center justify-center gap-[8px] 
      tracking-[-0.176px] tablet:gap-[49px]"
      >
        <Link className="tablet:text-[20px]" href={'/'}>
          Місто для містян
        </Link>
        <p className="text-sm tablet:text-base">
          {`${t('company')} ${t('year')}  ${t('copyrightText')}`}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
