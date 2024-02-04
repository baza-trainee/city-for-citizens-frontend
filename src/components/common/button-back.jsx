'use client';

import BackIcon from '@/assets/icons/common/back-icon.svg';

import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button
      className="button-common flex items-center justify-start gap-6  pl-6 text-admin-dark"
      type="button"
      onClick={() => router.back()}
    >
      <BackIcon className={'h-6 w-6 scale-y-[-1] text-admin-dark'} />
      Назад
    </button>
  );
}
