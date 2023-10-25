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
      className="pt-1.5 pb-1.5 landscape:pt-[22px]  landscape:pb-0 desktop:pt-[35px] desktop:pb-[35px]
      landscape:desktop:pt-[35px] landscape:desktop:pb-[35px] relative text-sm leading-6
     bg-gray/5 text-gray/100 dark:bg-gray/100 dark:text-gray/5"
    >
      <div
        className="container flex desctop:justify-center gap-[50px]
      justify-end max-w-full desktop:justify-center"
      >
        <Link
          className="hidden desktop:inline-block text-xl leading-normal"
          href="/"
        >
          Місто для містян
        </Link>

        <div
          className={`fixed top-0 left-0 right-0 bottom-0 w-screen bg-gray/5 dark:bg-gray/100 z-20
            desktop:static 
           transition-all duration-300 desktop:flex  desktop:w-auto desktop:opacity-100 
           desktop:translate-y-0 ${
             isMenuOpen
               ? 'opacity-100 translate-y-0'
               : 'opacity-0 translate-y-full'
           }`}
        >
          <Switchers />
        </div>
        <button
          type="button"
          className="inline-block desktop:hidden w-[32px] h-[32px] z-30"
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
