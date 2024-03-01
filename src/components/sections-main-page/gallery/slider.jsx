'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import './slider.css';
import IconLocation from '@/assets/icons/gallery/location.svg';
import ArrowLeftIcon from '@/assets/icons/gallery/arrow-left.svg';
import ArrowRightIcon from '@/assets/icons/gallery/arrow-right.svg';

import data from '../common/data.json';

import { Grid, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export function ImageGallery() {
  function getWidthByIndex(index) {
    if (index % 3 === 0) {
      return '400px';
    } else if (index % 3 === 1) {
      return '600px';
    } else {
      return '800px';
    }
  }

  return (
    <Swiper
      grid={{
        fill: 'row',
      }}
      slidesPerView={'auto'}
      spaceBetween={16}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      keyboard={true}
      modules={[Grid, Pagination, Navigation]}
      breakpoints={{
        768: {
          navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          },
          grid: {
            rows: 2,
          },
        },
        960: {
          spaceBetween: 30,
          navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          },
          grid: {
            rows: 2,
          },
        },
      }}
      className="mySwiper relative"
    >
      <div className="swiper-button-prev dark:bg-dark-butt absolute  bottom-[53%] z-10 hidden h-12 w-12 rounded-[40px] bg-light-button-default text-center opacity-50 dark:bg-dark-button-default tablet:left-4 tablet:block laptop:left-10 desktop:left-[10px]">
        <ArrowLeftIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
      </div>
      <div className="swiper-button-next absolute bottom-[53%] z-10 h-12 w-12 rounded-[40px] bg-light-button-default opacity-50 dark:bg-dark-button-default mobile:hidden  tablet:right-4 tablet:block laptop:right-10 desktop:right-[10px]">
        <ArrowRightIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
      </div>
      {data?.map((item, index) => (
        <SwiperSlide
          key={index}
          style={{ width: getWidthByIndex(index), height: '300px' }}
          className="group relative overflow-hidden rounded-lg"
        >
          <Image
            src={item.url}
            alt={item.title}
            width={400}
            height={300}
            className="h-full w-full object-cover"
          ></Image>
          <div className="shadow-gallery absolute bottom-0 left-0 flex w-full flex-col justify-center gap-2 rounded-lg bg-light-secondary p-4 text-start opacity-0 transition-opacity duration-500 ease-in-out focus:opacity-100 group-hover:opacity-100 dark:bg-dark-secondary">
            <p className="dark:text-li font-ubuntu text-xl font-medium leading-[22px] text-light-head dark:text-dark-head">
              {item.title}
            </p>
            <div className="flex items-center  gap-2 text-start">
              <IconLocation width="24px" height="24px" />
              <p className="font-roboto text-sm font-normal leading-[19.6px] text-light-head dark:text-dark-head">
                {item.address}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
