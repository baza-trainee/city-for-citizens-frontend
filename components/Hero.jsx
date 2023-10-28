'use client';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
<<<<<<< HEAD
    <section
      className="relative pt-[18px] desktop:pt-[52px] bg-gray/5 text-gray/100
     dark:bg-gray/100 dark:text-gray/5 z-30 desktop:z-0"
    >
      <div className="container max-tablet:max-w-full">
        <h1
          className="font-heading text-[48px] text-center mb-[12px] font-light -tracking-[0.528px] leading-[1.2]
        max-tablet:text-[34px]"
        >
          Мiсто для мiстян
        </h1>
        <h2
          className="text-[24px] text-center mb-[32px]  -tracking-[0.264px] leading-[1.5]
                max-tablet:text-[20px]"
        >
          Відкривай. Відчувай. Розслабляйся
=======
    <section className="bg-gray/5 pt-[44px] text-gray/100 dark:bg-gray/100 dark:text-gray/5">
      <div className="container ">
        <h1 className="mb-[12px] text-center font-heading text-[48px] font-light leading-[1.2] -tracking-[0.528px]">
          {t('title')}
        </h1>
        <h2 className="mb-[32px] text-center text-[24px]  leading-[1.5] -tracking-[0.264px]">
          {t('subtitle')}
>>>>>>> dev
        </h2>
      </div>
    </section>
  );
};
export default Hero;
