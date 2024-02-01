'use client';

import BackIcon from '/public/icons/back-icon.svg';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();

  const t = useTranslations('Admin.navMenu.buttons');

  return (
    <button
      className="button-common flex items-center justify-start gap-6 bg-admin-dark pl-6 text-white"
      type="button"
      onClick={() => router.back()}
    >
      <BackIcon className={'h-6 w-6 scale-y-[-1] text-white'} />
      {t('back')}
    </button>
  );
}
