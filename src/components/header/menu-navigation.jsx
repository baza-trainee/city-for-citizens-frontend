'use client';
import { useTranslations } from 'next-intl';
import { Link as ScrollLink } from 'react-scroll';

export default function MenuNavigation() {
  const t = useTranslations('MenuItems');

  const menuItems = [
    { id: 'map', label: t('map') },
    { id: 'gallery', label: t('gallery') },
    { id: 'partners', label: t('partners') },
    { id: 'offerEvent', label: t('offerEvent') },
  ];

  return (
    <nav className="max-laptop:hidden">
      <ul className="flex gap-8 font-roboto leading-[1.4] text-light-main dark:text-dark-main">
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
