'use client';

import { useTranslations } from 'next-intl';

export default function PartnersTitle() {
  const t = useTranslations('Partners');
  return (
    <h2 className="mb-[32px] font-ubuntu text-[43px] font-bold leading-[47.30px] text-light-head dark:text-dark-accent">
      {t('title')}
    </h2>
  );
}