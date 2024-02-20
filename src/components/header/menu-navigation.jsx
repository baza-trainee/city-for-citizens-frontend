import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MenuNavigation() {
  const t = useTranslations('MenuItems');
  const styleLink =
    'border-b border-black hover:border-light-accent dark:hover:border-dark-accent hover:transition-all';

  return (
    <nav className="max-[769px]:hidden">
      <ul className="flex gap-8 font-roboto leading-[1.4] text-light-main dark:text-dark-main">
        <li className={styleLink}>
          <Link href="#map">{t('map')}</Link>
        </li>
        <li className={styleLink}>
          <Link href="#gallery">{t('gallery')}</Link>
        </li>
        <li className={styleLink}>
          <Link href="#partners">{t('partners')}</Link>
        </li>
        <li className={styleLink}>
          <Link href="#offerEvent">{t('offerEvent')}</Link>
        </li>
      </ul>
    </nav>
  );
}
