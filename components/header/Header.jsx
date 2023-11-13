'use client';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import Switchers from './Switchers';
import IconClose from '../icons/IconClose';
import IconBurger from '../icons/IconBurger';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="relative bg-gray/5 pb-1.5  pt-1.5 text-sm leading-6
      text-gray/100 dark:bg-gray/100 dark:text-gray/5 desktop:pb-[35px] desktop:pt-[35px]
     landscape:pb-0 landscape:pt-[22px] landscape:desktop:pb-[35px] landscape:desktop:pt-[35px]"
    >
      <div
        className="container flex max-w-full justify-end gap-[50px] 
      desktop:items-baseline desktop:justify-center"
      >
        <Link
          className="hidden text-xl leading-normal desktop:inline-block"
          href="/"
        >
          Місто для містян
        </Link>

        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-20 w-screen bg-gray/5 transition-all
            duration-300 
           dark:bg-gray/100 desktop:static desktop:flex  desktop:w-auto desktop:translate-y-0 
           desktop:opacity-100 ${
             isMenuOpen
               ? 'translate-y-0 opacity-100'
               : 'translate-y-full opacity-0'
           }`}
        >
          <Switchers />
        </div>
        <button
          type="button"
          className="z-30 inline-block h-[32px] w-[32px] desktop:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <IconClose
              width="32"
              height="32"
              className={`${
                resolvedTheme === 'dark' ? 'stroke-gray/5' : 'stroke-gray/100'
              }`}
            />
          ) : (
            <IconBurger
              width="32"
              height="32"
              className={`${
                resolvedTheme === 'dark' ? 'stroke-gray/5' : 'stroke-gray/100'
              }`}
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
