'use client';
import { useTranslations } from 'next-intl';
import { Link as ScrollLink } from 'react-scroll';
import ButtonMainPage from '@/components/common/button-main-page';

export default function HeroContent() {
  const t = useTranslations('Hero');

  return (
    <div className="absolute	 start-1/2 top-[76px]	z-10 w-full -translate-x-1/2 tablet:top-[191px]  tablet:w-[660px]">
      <div className="text-center text-white max-tablet:container">
        <h1>
          {t('title')
            .split(' ')
            .map((word, index) => (
              <span
                key={index}
                className={`font-ubuntu text-[40px] font-bold leading-[1.1] tablet:text-[57px] ${index === 2 ? 'text-dark-accent' : ''}`}
              >
                {word} {index !== 0 && ' '}
              </span>
            ))}
        </h1>
        <p className="mx-auto mb-8 mt-3 font-roboto leading-[1.4] tablet:w-[475px]">
          {t('subtitle')}
        </p>
        <ScrollLink
          to="gallery"
          smooth={true}
          duration={500}
          spy={true}
          exact="true"
        >
          <ButtonMainPage variant="accent" className="w-[257px] text-base">
            {t('button')}{' '}
          </ButtonMainPage>
        </ScrollLink>
      </div>
    </div>
  );
}
