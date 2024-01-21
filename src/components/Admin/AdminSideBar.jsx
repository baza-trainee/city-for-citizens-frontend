'use client';
import { NAVIGATION } from '@/helpers/constants';
import { usePathname, useRouter } from '@/navigation';
import { useLogoutMutation } from '@/redux/api/authApi';
import { resetState } from '@/redux/slice/authSlice';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../UI/LoadingButton';
import BasicModalWindows from './ModalWindow/BasicModalWindows';

const ADMIN_NAVIGATION = [
  { href: '/admin', name: 'Всі події' },
  { href: '/admin/event-types', name: 'Типи подій' },
  { href: '/admin/documents', name: 'Документи' },
  { href: '/admin/partners', name: 'Партнери' },
  { href: '/admin/contacts', name: 'Контакти' },
  { href: '/admin/password-change', name: 'Змінити пароль' },
];

export function AdminSideBar() {
  const pathname = usePathname();

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  const [logout, { isLoading }] = useLogoutMutation();

  const t = useTranslations('Admin.navMenu');

  const handleLogout = async () => {
    await logout();
    dispatch(resetState());
    Cookies.remove('accessToken');
    router.push(NAVIGATION.login);
  };

  return (
    <aside className="flex flex-col">
      <Link href={'/'} className="py-[42px]">
        LOGO
      </Link>
      <div className="flex h-full flex-col justify-between bg-primary/80 pb-[36px]">
        <nav className="p-[16px]">
          <ul className="flex flex-col gap-[6px]">
            {ADMIN_NAVIGATION.map(({ href, name }) => {
              return (
                <li
                  className={`${clsx(
                    'flex items-center gap-[12px] rounded-[4px] px-[6px] py-[9px]',
                    pathname === href && 'bg-gray/5 text-gray/100',
                    pathname !== href && 'bg-[transparent] text-gray/0'
                  )}`}
                  key={href}
                >
                  <span className="h-[33px] w-[33px] bg-[currentColor] text-[24px]"></span>
                  <Link href={href}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          ref={buttonRef}
          onClick={() => setIsConfirmationModalVisible(true)}
          className="mt-auto h-[52px] w-[213px] self-center rounded-[4px] border-[1px] border-gray/100 bg-gray/5"
        >
          {isLoading ? <LoadingButton /> : <>{t('buttons.logout')}</>}
        </button>

        {isConfirmationModalVisible && (
          <BasicModalWindows
            onClose={() => setIsConfirmationModalVisible(false)}
          >
            <p className="mb-[20px] w-max text-[16px]">
              {t('confirmationModal.title')}
            </p>
            <div className="flex gap-[15px]">
              <button
                disabled={isLoading}
                className="min-w-[50px] rounded-[5px] border-[1px] bg-primary/100  px-[12px] py-[4px]  text-center text-[16px]  text-gray/5 transition-colors hover:bg-primary/80"
                onClick={() => setIsConfirmationModalVisible(false)}
                type="button"
              >
                {t('confirmationModal.buttons.cancel')}
              </button>
              <button
                disabled={isLoading}
                className="min-w-[50px] rounded-[5px] border-[1px] bg-primary/100  px-[12px] py-[4px] text-center text-[16px]  text-gray/5 transition-colors hover:bg-[#d43c3c]"
                onClick={handleLogout}
                type="button"
              >
                {t('confirmationModal.buttons.ok')}
              </button>
            </div>
          </BasicModalWindows>
        )}
      </div>
    </aside>
  );
}
