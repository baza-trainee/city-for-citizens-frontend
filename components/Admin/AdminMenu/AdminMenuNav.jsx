import { NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { logout } from '@/services/authAPI';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export const AdminMenuNav = () => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({});

  const router = useRouter();

  const buttonRef = useRef(null);

  const t = useTranslations('Admin.navMenu');

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    router.push(NAVIGATION.login);
  };

  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current) {
        const { bottom } = buttonRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (bottom + 200 > windowHeight) {
          setModalPosition({ bottom: 'calc(100% + 10px)' });
        } else {
          setModalPosition({ top: 'calc(100% + 10px)' });
        }
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-between gap-[30px]">
      <div className="flex flex-col gap-[10px] text-[18px] ">
        <Link
          className="rounded-[5px] border-[1px] border-[transparent] px-[10px] py-[4px] text-center hover:border-gray/80"
          href="/admin"
        >
          {t('nav.addEvent')}
        </Link>
        <Link
          className="rounded-[5px] border-[1px] border-[transparent] px-[10px] py-[4px] text-center hover:border-gray/80"
          href="/admin/events"
        >
          {t('nav.allEvents')}
        </Link>
      </div>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsConfirmationModalVisible(p => !p)}
          className="block cursor-pointer rounded-[10px] bg-primary/100 px-[20px] py-[8px] text-center text-[16px]  text-gray/5 transition-colors hover:bg-primary/80"
        >
          {t('buttons.logout')}
        </button>

        <div
          style={modalPosition}
          className={clsx(
            `absolute  left-1/2 -translate-x-1/2 rounded-[10px] border-[1px] bg-gray/5 px-[40px] py-[15px] text-gray/80 dark:bg-gray/100 dark:text-gray/10`,
            !isConfirmationModalVisible && 'hidden'
          )}
        >
          <p className="mb-[20px] w-max text-[16px]">
            {t('confirmationModal.title')}
          </p>
          <div className="flex gap-[15px]">
            <button
              className="min-w-[50px] rounded-[5px] border-[1px] bg-primary/100  px-[12px] py-[4px]  text-center text-[16px]  text-gray/5 transition-colors hover:bg-primary/80"
              onClick={() => setIsConfirmationModalVisible(false)}
              type="button"
            >
              {t('confirmationModal.buttons.cancel')}
            </button>
            <button
              className="min-w-[50px] rounded-[5px] border-[1px] bg-primary/100  px-[12px] py-[4px] text-center text-[16px]  text-gray/5 transition-colors hover:bg-[#d43c3c]"
              onClick={handleLogout}
              type="button"
            >
              {t('confirmationModal.buttons.ok')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
