'use client';

import ShevronIcon from '@/assets/icons/common/chevron-icon.svg';
import ScrollToTop from 'react-scroll-up';

export default function ScrollToTopButton() {
  return (
    <ScrollToTop
      showUnder={160}
      duration={1000}
      easing={'easeInOutCubic'}
      style={{ zIndex: 9999, bottom: 254, right: 40 }}
    >
      <div
        className="active:opacity-100; flex  h-[48px]  w-[48px] items-center justify-center 
      rounded-full bg-dark-button-default bg-light-button-default opacity-50  hover:bg-dark-button-hover hover:bg-light-button-hover 
      hover:opacity-100 active:bg-dark-button-pressed active:bg-light-button-pressed"
      >
        <ShevronIcon className="h-6 w-6 rotate-180" />
      </div>
    </ScrollToTop>
  );
}
