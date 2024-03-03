'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import HeroContent from './hero-content';
import HeroImageFestOne from '@/assets/images/fest-leopolis.jpg';
import HeroImageFestThree from '@/assets/images/fest-kyiv.jpg';
import HeroImageFestTwo from '@/assets/images/fest-wine.jpeg';
import ArrowSwiper from '@/assets/icons/common/chevron-icon.svg';
import Image from 'next/image';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export default function HeroSlider() {
  const t = useTranslations('Hero');

  const heroContent = [
    {
      id: 1,
      title: t('title.slide-1'),
      subtitle: t('subtitle.slide-1'),
      src: HeroImageFestOne,
      alt: 'festival',
    },
    {
      id: 2,
      title: t('title.slide-2'),
      subtitle: t('subtitle.slide-2'),
      src: HeroImageFestTwo,
      alt: 'festival',
    },
    {
      id: 3,
      title: t('title.slide-3'),
      subtitle: t('subtitle.slide-3'),
      src: HeroImageFestThree,
      alt: 'festival',
    },
  ];

  const customPagination = (swiper, current, total) => {
    return (
      <div className="swiper-pagination custom-pagination">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={`pagination-${i}`}
            className={` ${current === i ? 'swiper-pagination-bullet-active' : ''}`}
            onClick={() => swiper.slideTo(i)}
          />
        ))}
      </div>
    );
  };

  const customNavigation = () => {
    return (
      <div className="custom-swiper-buttons">
        <div className="swiper-button-prev">
          <ArrowSwiper />
        </div>

        <div className="swiper-button-next">
          <ArrowSwiper />
        </div>
      </div>
    );
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      loop={true}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
        renderCustom: (swiper, current, total) =>
          customPagination(swiper, current, total),
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      {heroContent.map(content => {
        return (
          <SwiperSlide key={content.id}>
            <div className="z-15 absolute bottom-0 left-0 right-0 top-0 w-full bg-black bg-opacity-50"></div>
            <Image
              className="h-[540px] w-full object-cover tablet:h-[720px]"
              src={content.src}
              alt={content.alt}
            />
            <HeroContent title={content.title} subtitle={content.subtitle} />
          </SwiperSlide>
        );
      })}
      {customNavigation()}
      {customPagination()}
    </Swiper>
  );
}
