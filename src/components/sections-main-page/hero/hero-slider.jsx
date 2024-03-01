'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import HeroContent from './hero-content';
import HeroImage from '@/assets/images/hero-slide.jpg';
import ArrowSwiper from '@/assets/icons/common/chevron-icon.svg';
import Image from 'next/image';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const images = [
  {
    id: 1,
    src: HeroImage,
    alt: 'festival',
  },
  {
    id: 2,
    src: HeroImage,
    alt: 'festival',
  },
  {
    id: 3,
    src: HeroImage,
    alt: 'festival',
  },
];

export default function HeroSlider() {
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
      {images.map(img => {
        return (
          <SwiperSlide key={img.id}>
            <div className="z-15 absolute bottom-0 left-0 right-0 top-0 w-full bg-black bg-opacity-50"></div>
            <Image
              className="h-[540px] w-full object-cover tablet:h-[720px]"
              src={img.src}
              alt={img.alt}
            />
            <HeroContent />
          </SwiperSlide>
        );
      })}
      {customNavigation()}
      {customPagination()}
    </Swiper>
  );
}
