'use client';
import Link from 'next/link';
import Switchers from './Switchers';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import IconClose from '../IconClose';
import IconBurger from '../IconBurger';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-[35px] relative text-sm leading-6 bg-gray/5 text-gray/100 dark:bg-gray/100 dark:text-gray/5 max-tablet:py-1.5">
      <div className="container flex justify-center gap-[50px] items-baseline max-tablet:justify-end max-tablet:max-w-full">
        <Link
          className="hidden tablet:inline-block text-xl leading-normal"
          href="/"
        >
          Місто для містян
        </Link>

        <div
          className={`fixed top-0 left-0 right-0 bottom-0 w-screen bg-gray/5 z-20
            tablet:static 
           transition-all duration-300 tablet:flex  tablet:w-auto tablet:opacity-100 tablet:translate-y-0 ${
             isMenuOpen
               ? 'opacity-100 translate-y-0'
               : 'opacity-0 translate-y-full'
           }`}
        >
          <Switchers />
        </div>
        <button
          type="button"
          className="inline-block tablet:hidden w-[32px] h-[32px] z-30"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_781_3499)">
                <path
                  d="M30.6992 24.0337L9.36587 24.0337"
                  stroke="#121923"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.6992 16.0337L9.36587 16.0337"
                  stroke="#121923"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.6992 8.03369L9.36587 8.03369"
                  stroke="#121923"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_781_3499">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(32 32) rotate(-180)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
