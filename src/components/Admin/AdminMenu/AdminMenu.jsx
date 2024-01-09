'use client';

import { useEffect, useState } from 'react';

import { AdminMenuNav } from './AdminMenuNav';
import { DropDownWrapper } from './DropDownWrapper';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectToken,
  selectUserEmail,
} from '@/redux/slice/selectors';

const AdminMenu = () => {
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectUserEmail);

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
      {token && isLoggedIn ? (
        <>
          {screenWidth > 1440 ? (
            <DropDownWrapper
              buttonContent={
                <>
                  <p className="transition-transform first-letter:capitalize group-hover:scale-[1.05]">
                    {userEmail}
                  </p>
                  <div className="flex h-[36px] w-[36px] cursor-pointer  items-center justify-center rounded-[50%] bg-primary/80 font-[sans-serif] text-[20px] font-bold uppercase text-gray/10 transition-colors group-hover:bg-primary/100">
                    {userEmail[0]}
                  </div>
                </>
              }
              dropdownContent={<AdminMenuNav />}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};
export default AdminMenu;
