'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

import CloseButton from '../UI/buttons/IconClose';

const buttonStyle =
  'w-full rounded-lg border border-primary/100  p-2.5 hover:border-primary/80 focus:underline focus:underline-offset-1 transition-colors';

const ModalCookies = () => {
  const [showModal, setShowModal] = useState(false);
  const { resolvedTheme } = useTheme();
  const t = useTranslations('ModalCookies');
  let hasAcceptedCookies = Cookies.get('acceptedCookies');

  useEffect(() => {
    if (!hasAcceptedCookies) {
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set('acceptedCookies', 'accept');
    setShowModal(false);
  };

  const handleRejectCookies = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50  bg-gray/100 bg-opacity-70 ${
        showModal ? 'block' : 'hidden'
      }
    `}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        className="bg-gray-5 fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2  transform flex-col items-center rounded-lg border border-gray/100 bg-gray/0 px-5 py-6 text-center dark:border-gray/5 dark:bg-gray/0 dark:bg-gray/100 "
      >
        <CloseButton
          width={32}
          hight={32}
          onClick={handleRejectCookies}
          className={`cursor-pointer ${
            resolvedTheme === 'dark' ? 'stroke-gray/5' : 'stroke-gray/100'
          } mb-3 place-self-end transition-colors hover:stroke-gray/30`}
        />
        <p className="mb-4 px-8 font-heading text-2xl">{t('title')}</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/policy/privacy-policy.pdf"
          className="font-NewMexika mb-8 underline hover:text-gray/30"
        >
          {t('privacy')}{' '}
        </a>
        <button
          onClick={handleAcceptCookies}
          className={`${buttonStyle}   dark:border:gray/5	 mb-4 bg-primary/100 p-2.5 text-gray/0 hover:bg-primary/80 dark:bg-gray/5 dark:text-gray/100 dark:hover:border-gray/10 dark:hover:bg-gray/10 `}
        >
          {t('accept')}
        </button>
        <button
          onClick={handleRejectCookies}
          className={`${buttonStyle} bg-gray/0 p-2.5 text-primary/100 hover:text-primary/80 dark:border-gray/5 dark:bg-gray/100  dark:text-gray/5 dark:text-gray/5 dark:hover:border-gray/10 dark:hover:text-gray/10`}
        >
          {t('reject')}{' '}
        </button>
      </div>
    </div>
  );
};

export default ModalCookies;
