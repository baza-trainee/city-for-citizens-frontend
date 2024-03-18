'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMedia } from 'react-use';

export default function PartnersSwiper({ partners }) {
  const isTablet = useMedia('(min-width: 768px)');
  const spaceBetween = isTablet ? 120 : 60;
  const imageHeight = isTablet ? '100' : '62';
  const imageWidth = isTablet ? '160' : '100';

  return (
    <div className="py-[20px]">
      <Swiper
        className="marquee"
        modules={[Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={'auto'}
        centeredSlides={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={10000}
        loop={true}
        allowTouchMove={true}
      >
        {partners?.map((partner, index) => {
          return (
            <SwiperSlide
              key={`${partner.id}${index}`}
              style={{
                width: 'auto',
              }}
            >
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex h-[${imageHeight}px] w-[${imageWidth}px] items-center justify-center overflow-hidden`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_PARTNERS_IMAGE_BASE_URL}/${partner.image}`}
                  alt={partner.name}
                  width={imageWidth}
                  height={imageHeight}
                  className="object-cover"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
