'use client';

import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

import { useEffect, useState } from 'react';

import { AdminMenuNav } from './AdminMenuNav';
import { DropDownWrapper } from './DropDownWrapper';

const AdminMenu = () => {
  const { isLoggedIn, userData } = useIsLoggedIn();

  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    if (!screenWidth) {
      setScreenWidth(window.innerWidth);
    }
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  return (
    <>
      {isLoggedIn && (
        <>
          {screenWidth > 1440 ? (
            <DropDownWrapper
              buttonContent={
                <>
                  <p className="transition-transform first-letter:capitalize group-hover:scale-[1.05]">
                    {userData.email}
                  </p>
                  <div className="flex h-[36px] w-[36px] cursor-pointer  items-center justify-center rounded-[50%] bg-primary/80 font-[sans-serif] text-[20px] font-bold uppercase text-gray/10 transition-colors group-hover:bg-primary/100">
                    {userData.email[0]}
                  </div>
                </>
              }
              dropdownContent={<AdminMenuNav />}
            />
          ) : null}
        </>
      )}
    </>
  );
};
export default AdminMenu;
