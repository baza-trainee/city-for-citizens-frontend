'use client';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section className="bg-gray/5 pt-[44px] text-gray/100 dark:bg-gray/100 dark:text-gray/5">
      <div className="container ">
        <h1 className="mb-[12px] text-center font-heading text-[48px] font-light leading-[1.2] -tracking-[0.528px]">
          {t('title')}
        </h1>
        <h2 className="mb-[32px] text-center text-[24px]  leading-[1.5] -tracking-[0.264px]">
          {t('subtitle')}
        </h2>
      </div>
    </section>
  );
};
export default Hero;
