'use client';

import BackIcon from '@/assets/icons/common/back-icon.svg';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/common';

export default function ButtonBack() {
  const router = useRouter();

  return (
    <Button
      variant={'outlined'}
      onClick={() => {
        router.back();
      }}
      className={'h-[51px] w-[185px] gap-[10px] pr-[15px]'}
    >
      <BackIcon className={'h-7 w-7 scale-y-[-1]'} />
      <p>Назад</p>
    </Button>
  );
}
