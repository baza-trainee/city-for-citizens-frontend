'use client';

import BackIcon from '@/assets/icons/common/back-icon.svg';

import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button
      className="button-common flex h-[51px] w-[185px] items-center justify-start gap-[7px]  pl-8 text-admin-dark"
      type="button"
      onClick={() => {
        router.back();
      }}
    >
      <BackIcon className={'h-7 w-7 scale-y-[-1] text-admin-dark'} />
      Назад
    </button>
  );
}
