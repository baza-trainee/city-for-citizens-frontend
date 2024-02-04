'use client';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from '@/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Cookies from 'js-cookie';

import { NAVIGATION } from '@/helpers/constants';
import { useLogoutMutation } from '@/redux/api/authApi';
import { resetState } from '@/redux/slice/authSlice';
import { BasicModalWindows, LoadingButton } from '@/components/common';

import logotype from '@/assets/icons/common/logotype.svg?url';
import LogoutIcon from '@/assets/icons/common/logout-icon.svg';
import { adminNavigation } from './navigation';

export function AdminSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const buttonRef = useRef(null);

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [logout, { isLoading }] = useLogoutMutation();

  async function handleLogout() {
    await logout();
    dispatch(resetState());
    Cookies.remove('accessToken');
    router.push(NAVIGATION.login);
  }

  function isActivePage(href) {
    const isAddOrEditEvent =
      href === '/admin' &&
      (pathname.startsWith('/admin/event/') || pathname === '/admin/event');

    const isAddOrEditPartner =
      href === '/admin/partners' &&
      (pathname.startsWith('/admin/partner/') || pathname === '/admin/partner');

    return isAddOrEditEvent || isAddOrEditPartner || pathname === href;
  }

  return (
    <aside className="flex max-h-[1025px] flex-col gap-20 bg-admin-side_bar p-4 pb-10">
      <Link
        href={'/'}
        className="flex items-center justify-center gap-2 rounded bg-admin-light_3 py-11 font-roboto text-lg font-black uppercase leading-6 text-black"
      >
        <Image src={logotype} alt="logotype" />
        <p>MistoFest</p>
      </Link>

      <div className="flex h-full flex-col justify-between gap-4">
        <nav>
          <ul className="flex flex-col gap-4">
            {adminNavigation.map(({ href, name, icon: Icon }) => (
              <Link href={href} key={href}>
                <li
                  className={`flex items-center gap-3 rounded px-1.5 py-[9px] 
                    ${clsx(
                      isActivePage(href) && 'bg-admin-light_3 text-admin-dark',
                      !isActivePage(href) &&
                        'bg-[transparent] text-admin-light_3'
                    )}`}
                >
                  <Icon className={'h-8'} />

                  <p className="font-exo_2 text-base font-semibold leading-loose ">
                    {name}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          onClick={() => setIsConfirmationModalVisible(true)}
          className="border--admin-dark mx-auto flex h-[52px] w-[213px]
          items-center justify-center gap-2 rounded border bg-white px-8 text-xl font-bold leading-tight text-admin-dark"
        >
          {<LogoutIcon className={'h-6 w-6'} />}
          {isLoading ? <LoadingButton /> : <span>Вийти</span>}
        </button>

        {isConfirmationModalVisible && (
          <BasicModalWindows
            onClose={() => setIsConfirmationModalVisible(false)}
            title={'Дійсно вийти?'}
          >
            <div className="flex gap-[15px]">
              <button
                disabled={isLoading}
                className="button-close"
                onClick={() => setIsConfirmationModalVisible(false)}
                type="button"
              >
                Скасувати
              </button>
              <button
                disabled={isLoading}
                className="button-confirm"
                onClick={handleLogout}
                type="button"
              >
                Підтвердити
              </button>
            </div>
          </BasicModalWindows>
        )}
      </div>
    </aside>
  );
}
