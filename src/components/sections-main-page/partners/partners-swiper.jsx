'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PartnersSwiper({ partners }) {
  return (
    <div className="">
      <Swiper
        className="marquee"
        modules={[Autoplay]}
        spaceBetween={120}
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
                className="relative flex h-[100px] w-[160px] items-center justify-center overflow-hidden"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_PARTNERS_IMAGE_BASE_URL}/${partner.image}`}
                  alt={partner.name}
                  fill
                  objectFit="cover"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
