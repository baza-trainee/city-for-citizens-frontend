'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import './slider.css';

import IconLocation from '@/assets/icons/gallery/location.svg';
import ArrowLeftIcon from '@/assets/icons/gallery/arrow-left.svg';
import ArrowRightIcon from '@/assets/icons/gallery/arrow-right.svg';

import { Grid, Pagination, Navigation } from 'swiper/modules';

import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { useGetAllEventsByLocaleQuery } from '@/redux/api/eventsApi';
import { useCurrentLocale } from '@/hooks';

import { ModalGallery } from './modal';
import { SlideImage } from './image-slide';

export function ImageGallery() {
  const { localeForRequest } = useCurrentLocale();
  const {
    data = [],
    error,
    isLoading,
  } = useGetAllEventsByLocaleQuery({ locale: localeForRequest });
  const events = data.events;

  function getWidthByIndex(index) {
    if (index % 3 === 0) {
      return '400px';
    } else if (index % 3 === 1) {
      return '600px';
    } else {
      return '800px';
    }
  }

  // const totalSlides = events?.length;
  // let totalSlidersWidth = 0;
  // for (let i = 0; i < totalSlides; i++) {
  //   const width = getWidthByIndex(i);
  //   totalSlidersWidth += parseInt(width);
  // }
  // totalSlidersWidth += (totalSlides - 1) * 30;
  // console.log(totalSlidersWidth);

  // const slidesForFirstRow = Math.round(totalSlides / 2);
  // let totalSlidersFirstRowWidth = 0;
  // for (let i = 0; i < slidesForFirstRow; i++) {
  //   const width = getWidthByIndex(i);
  //   totalSlidersFirstRowWidth += parseInt(width);
  // }
  // totalSlidersFirstRowWidth += slidesForFirstRow * 30;
  // console.log(totalSlidersFirstRowWidth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isTablet = useMedia('(min-width: 768px)');

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
      document
        .querySelectorAll(
          '.gallery-swiper-swiper-button-next, .gallery-swiper-swiper-button-prev'
        )
        .forEach(arrow => {
          arrow.style.display = 'none';
        });
    } else {
      document.body.classList.remove('overflow-hidden');
      document
        .querySelectorAll(
          '.gallery-swiper-swiper-button-next, .gallery-swiper-swiper-button-prev'
        )
        .forEach(arrow => {
          if (isTablet) {
            arrow.style.display = 'block';
          } else {
            arrow.style.display = 'none';
          }
        });
    }
    if (!isTablet) {
      setIsModalOpen(false);
    }
  }, [isModalOpen, isTablet]);

  function handleSlideClick(image) {
    setSelectedImage(image);
    if (isTablet) {
      setIsModalOpen(true);
    }
  }

  function handleModalClose() {
    setSelectedImage(null);
    setIsModalOpen(false);
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
              disabledClass: 'disabled',
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
              disabledClass: 'disabled',
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
        <div className="gallery-swiper-swiper-button-next  absolute bottom-[53%] z-10 hidden h-12 w-12 rounded-[40px] bg-light-button-default opacity-50 hover:bg-light-button-hover hover:opacity-100 active:bg-light-button-pressed dark:bg-dark-button-default dark:hover:bg-dark-button-hover dark:hover:opacity-100 dark:active:bg-dark-button-pressed  tablet:right-4 tablet:block laptop:right-10 desktop:right-[10px] ">
          <ArrowRightIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
        </div>

        <div className="swiper-wrapper">
          {events?.map((event, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(event)}
              style={{ width: getWidthByIndex(index), height: '300px' }}
              className="gallery-swiper group relative transform cursor-pointer overflow-hidden
            rounded-lg
            transition-transform
            duration-300
            ease-in-out hover:scale-105"
            >
              <SlideImage event={event} />
              <div className="absolute bottom-0 left-0 flex w-full flex-col justify-center gap-2 rounded-[5px] bg-light-secondary p-4 text-start opacity-0 shadow-gallery transition-opacity duration-500 ease-in-out focus:opacity-100 group-hover:overflow-y-auto group-hover:opacity-100 dark:bg-dark-secondary">
                <p className="dark:text-li font-ubuntu text-[20px]/[22px] font-medium text-light-head dark:text-dark-head tablet:text-[24px]/[26.4px]">
                  {event.eventTitle}
                </p>
                <div className="flex items-center  gap-2 text-start">
                  <IconLocation width="24px" height="24px" />
                  <p className="font-roboto text-sm font-normal leading-[19.6px] text-light-head dark:text-dark-head">
                    {event.eventAddress.city} {event.eventAddress.street}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {isModalOpen && selectedImage && (
        <ModalGallery
          events={events}
          selectedImage={selectedImage}
          modalClose={handleModalClose}
        />
      )}
    </>
  );
}
