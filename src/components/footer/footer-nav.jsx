'use client';
import { useTranslations } from 'next-intl';
import { Link as ScrollLink } from 'react-scroll';

export default function FooterNav() {
  const t = useTranslations('MenuItems');

  const menuItems = [
    { id: 'map', label: t('map') },
    { id: 'gallery', label: t('gallery') },
    { id: 'partners', label: t('partners') },
  ];

  return (
    <nav>
      <ul
        className="inline-flex flex-col gap-3 text-center font-roboto text-base font-normal leading-[1.4] text-light-main
       dark:text-dark-main tablet:text-left"
      >
        {menuItems.map(item => (
          <li
            key={item.id}
            className="cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent"
          >
            <ScrollLink
              to={item.id}
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              {item.label}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
