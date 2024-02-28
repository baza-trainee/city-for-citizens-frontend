'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slider.css';
import IconLocation from '@/assets/icons/gallery/location.svg';

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
      slidesPerView={'auto'}
      grid={{
        rows: 2,
        fill: 'row',
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      navigation={{ clickable: true }}
      mousewheel={true}
      keyboard={true}
      modules={[Grid, Pagination, Navigation]}
      className="mySwiper"
    >
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
            objectFit="cover"
            className="h-full w-full rounded-lg object-cover"
          ></Image>
          <div className="shadow-gallery absolute bottom-0 left-0 flex w-full flex-col justify-center gap-2 rounded-lg bg-light-secondary p-4 text-start text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <p className="font-ubuntu text-xl font-medium leading-[22px] text-light-head">
              {item.title}
            </p>
            <div className="flex items-center  gap-2 text-start">
              <IconLocation width="24px" height="24px" />
              <p className="font-roboto text-sm font-normal leading-[19.6px] text-light-head">
                {item.address}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
