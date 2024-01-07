import IconSelectArrow from '@/components/UI/icons/IconSelectArrow';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const DropDownWrapper = ({ buttonContent, dropdownContent }) => {
  const [isDropDownListVisible, setIsDropDownListVisible] = useState(false);
  const dropDownWrapperRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    setIsDropDownListVisible(false);
  }, [pathname]);

  useEffect(() => {
    const listener = event => {
      if (
        !dropDownWrapperRef.current ||
        dropDownWrapperRef.current.contains(event.target)
      ) {
        return;
      }
      setIsDropDownListVisible(false);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  return (
    <div ref={dropDownWrapperRef} className="group relative z-40">
      <div
        className="flex items-center gap-[10px]"
        onClick={() => {
          setIsDropDownListVisible(prev => !prev);
        }}
      >
        {buttonContent}
        <IconSelectArrow
          width={24}
          height={24}
          className={`h-[24px] w-[24px] cursor-pointer text-gray/50 transition-all group-hover:text-gray/100 ${
            isDropDownListVisible ? '-rotate-180' : ''
          }`}
        />
      </div>

      {isDropDownListVisible ? (
        <div className="absolute right-0 top-[calc(100%+10px)] min-w-[180px] rounded-[10px] border-[1px] bg-gray/5 px-[15px] py-[30px] text-gray/80 dark:bg-gray/100  dark:text-gray/10">
          {dropdownContent}
        </div>
      ) : null}
    </div>
  );
};
