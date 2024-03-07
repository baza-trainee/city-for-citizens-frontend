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
import { useEffect, useState } from 'react';
import { ModalGallery } from './modal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prevArrow = document.querySelector(
    '.gallery-swiper-swiper-button-prev'
  );
  const nextArrow = document.querySelector(
    '.gallery-swiper-swiper-button-next'
  );

  function handleSlideClick(image) {
    setSelectedImage(image);
    if (windowWidth >= 768) {
      setIsModalOpen(true);
    }
    if (prevArrow && nextArrow) {
      prevArrow.style.display = 'none';
      nextArrow.style.display = 'none';
    }
    document.body.classList.add('overflow-hidden');
  }

  function handleModalClose() {
    setSelectedImage(null);
    setIsModalOpen(false);
    if (prevArrow && nextArrow) {
      prevArrow.style.display = 'block';
      nextArrow.style.display = 'block';
    }
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <>
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
              prevEl: '.gallery-swiper-swiper-button-prev',
              nextEl: '.gallery-swiper-swiper-button-next',
            },
            grid: {
              rows: 2,
            },
          },
          960: {
            spaceBetween: 30,
            navigation: {
              prevEl: '.gallery-swiper-swiper-button-prev',
              nextEl: '.gallery-swiper-swiper-button-next',
            },
            grid: {
              rows: 2,
            },
          },
        }}
        className="gallery-swiper relative"
      >
        <div className=" gallery-swiper-swiper-button-prev absolute bottom-[53%]  z-10 hidden h-12 w-12 rounded-[40px] bg-light-button-default text-center opacity-50 hover:bg-light-button-hover hover:opacity-100 active:bg-light-button-pressed dark:bg-dark-button-default dark:hover:bg-dark-button-hover dark:hover:opacity-100 dark:active:bg-dark-button-pressed tablet:left-4 tablet:block laptop:left-10 desktop:left-[10px]">
          <ArrowLeftIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
        </div>
        <div className="gallery-swiper-swiper-button-next  absolute bottom-[53%] z-10 h-12 w-12 rounded-[40px] bg-light-button-default opacity-50 hover:bg-light-button-hover hover:opacity-100 active:bg-light-button-pressed dark:bg-dark-button-default dark:hover:bg-dark-button-hover dark:hover:opacity-100 dark:active:bg-dark-button-pressed mobile:hidden  tablet:right-4 tablet:block laptop:right-10 desktop:right-[10px] ">
          <ArrowRightIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
        </div>

        {data?.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleSlideClick(item)}
            style={{ width: getWidthByIndex(index), height: '300px' }}
            className="gallery-swiper group relative transform cursor-pointer             overflow-hidden
            rounded-lg
            transition-transform
            duration-300
            ease-in-out hover:scale-105"
          >
            <Image
              src={item.url}
              alt={item.title}
              width={400}
              height={300}
              className="h-full w-full object-cover"
            ></Image>
            <div className="absolute bottom-0 left-0 flex w-full flex-col justify-center gap-2 rounded-[5px] bg-light-secondary p-4 text-start opacity-0 shadow-gallery transition-opacity duration-500 ease-in-out focus:opacity-100 group-hover:opacity-100 dark:bg-dark-secondary">
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
      {isModalOpen && selectedImage && (
        <ModalGallery
          selectedImage={selectedImage}
          modalClose={handleModalClose}
        />
      )}
    </>
  );
}
