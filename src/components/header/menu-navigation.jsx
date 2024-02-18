import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MenuNavigation() {
  const t = useTranslations('MenuItems');

  return (
    <nav className="max-[769px]:hidden">
      <ul className="flex gap-8 font-roboto leading-[1.4] text-light-main">
        <li>
          <Link href="#map">{t('map')}</Link>
        </li>
        <li>
          <Link href="#gallery">{t('gallery')}</Link>
        </li>
        <li>
          <Link href="#partners">{t('partners')}</Link>
        </li>
        <li>
          <Link href="#offerEvent">{t('offerEvent')}</Link>
        </li>
      </ul>
    </nav>
  );
}
