import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section
      className="relative z-30 bg-gray/5 pb-[32px] pt-[22px] text-gray/100 
      dark:bg-gray/100 dark:text-gray/5 
      tablet:pb-[38px] tablet:pt-[16px] 
      desktop:z-0 desktop:pb-[44px] desktop:pt-[32px]"
    >
      <div className="container max-tablet:max-w-full">
        <h1
          className="mb-[12px] text-center font-heading text-[34px] font-light leading-[1.2] -tracking-[0.528px]
          desktop:text-[64px]"
        >
          {t('title')}
        </h1>
        <h2
          className=" text-center text-[20px]  leading-[1.5] -tracking-[0.264px]
                  desktop:text-[24px]"
        >
          {t('subtitle')}
        </h2>
      </div>
    </section>
  );
};
export default Hero;
