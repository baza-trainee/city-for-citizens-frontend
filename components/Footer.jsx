import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const FooterLink = ({ href, label }) => {
  return (
    <a
      href={`${href}#toolbar=0`}
      // onContextMenu={e => e.preventDefault()}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:text-gray/30"
    >
      {label}
    </a>
  );
};

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray/100 py-[20px] text-gray/5 dark:bg-gray/100 tablet:py-[72px]">
      <div className="flex flex-col flex-wrap items-center gap-4 tracking-[-0.176px] tablet:gap-6">
        <Link className="tablet:text-[20px]" href={'/'}>
          Місто для містян
        </Link>
        <div className="flex flex-col items-center justify-center gap-1 tablet:flex-row">
          <FooterLink
            href="/consent/privacy-policy.pdf"
            label={t('labelPrivacyPolicy')}
          />
          <span className="hidden tablet:inline-block">|</span>
          <FooterLink
            href="/consent/personal-data.pdf"
            label={t('labelPersonalData')}
          />
        </div>
        <p className="text-sm tablet:text-base">
          {`${t('company')} ${t('year')}  ${t('copyrightText')}    |   ${t(
            'hosted'
          )}`}{' '}
          <a
            className="hover:text-gray/30"
            href="https://deltahost.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Delta Host
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
