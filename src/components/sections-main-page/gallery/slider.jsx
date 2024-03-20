'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';

import IconLocation from '@/assets/icons/gallery/location.svg';
import ArrowLeftIcon from '@/assets/icons/gallery/arrow-left.svg';
import ArrowRightIcon from '@/assets/icons/gallery/arrow-right.svg';

import { Pagination, Navigation, Keyboard, Controller } from 'swiper/modules';

import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { useGetAllEventsByLocaleForGalleryQuery } from '@/redux/api/eventsApi';
import { useCurrentLocale } from '@/hooks';

import { ModalGallery } from './modal';
import { SlideImage } from './image-slide';

export function ImageGallery() {
  const { localeForRequest } = useCurrentLocale();
  const {
    data: events,
    // error,
    // isLoading,
  } = useGetAllEventsByLocaleForGalleryQuery({ locale: localeForRequest });

  const [firstHalf, setFirstHalf] = useState([]);
  const [secondHalf, setSecondHalf] = useState([]);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  function getWidthByIndex(index) {
    if (index % 3 === 0) {
      return '400px';
    } else if (index % 3 === 1) {
      return '600px';
    } else {
      return '800px';
    }
  }

  function getWidthByIndexSecondRow(index) {
    if (index % 3 === 0) {
      return '600px';
    } else if (index % 3 === 1) {
      return '800px';
    } else {
      return '400px';
    }
  }

  const isTablet = useMedia('(min-width: 768px)');

  useEffect(() => {
    let firstHalf = [];
    let secondHalf = [];
    const halfLength = Math.round(events?.length / 2);

    if (events?.length >= 6) {
      firstHalf = events?.slice(0, halfLength);

      if (isTablet) {
        secondHalf = events?.slice(halfLength);
      } else {
        secondHalf = events;
      }
    } else {
      (firstHalf = null), (secondHalf = events);
    }
    setFirstHalf(firstHalf);
    setSecondHalf(secondHalf);
  }, [events, isTablet]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!isTablet) {
      document.querySelectorAll('.gallery-swiper-first').forEach(swiper => {
        swiper.style.display = 'none';
      });
      document.querySelectorAll('.gallery-swiper-second').forEach(swiper => {
        swiper.style.display = 'block';
      });
    } else {
      document.querySelectorAll('.gallery-swiper-first').forEach(swiper => {
        swiper.style.display = 'block';
      });
      document.querySelectorAll('.gallery-swiper-second').forEach(swiper => {
        swiper.style.display = 'block';
      });
    }
  }, [isTablet]);

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
    <div className="mobile: h-318px relative">
      <div className=" gallery-swiper-swiper-button-prev absolute bottom-[53%]  z-10 hidden h-12 w-12 rounded-[40px] bg-light-button-default text-center opacity-50 hover:bg-light-button-hover hover:opacity-100 active:bg-light-button-pressed dark:bg-dark-button-default dark:hover:bg-dark-button-hover dark:hover:opacity-100 dark:active:bg-dark-button-pressed tablet:left-4 tablet:block tablet:pb-4 laptop:left-10 laptop:pb-[30px] desktop:left-[10px] ">
        <ArrowLeftIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
      </div>
      <div className="gallery-swiper-swiper-button-next  absolute bottom-[53%] z-10 hidden h-12 w-12 rounded-[40px] bg-light-button-default opacity-50 hover:bg-light-button-hover hover:opacity-100 active:bg-light-button-pressed dark:bg-dark-button-default dark:hover:bg-dark-button-hover  dark:hover:opacity-100 dark:active:bg-dark-button-pressed tablet:right-4 tablet:block laptop:right-10 desktop:right-[10px] ">
        <ArrowRightIcon className="absolute left-[40%] top-[40%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform" />
      </div>
      {firstHalf && (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          keyboard={true}
          modules={[Keyboard, Controller]}
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}
          breakpoints={{
            960: {
              spaceBetween: 30,
            },
          }}
          className="gallery-swiper-first first-row"
        >
          {firstHalf?.map((event, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(event)}
              style={{ width: getWidthByIndex(index), height: '300px' }}
              className="gallery-swiper group relative transform cursor-pointer overflow-hidden
            rounded-lg
            transition-transform
            duration-300
            ease-in-out "
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
        </Swiper>
      )}

      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        modules={[Pagination, Navigation, Keyboard, Controller]}
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
        breakpoints={{
          768: {
            navigation: {
              prevEl: '.gallery-swiper-swiper-button-prev',
              nextEl: '.gallery-swiper-swiper-button-next',
              disabledClass: 'disabled',
            },
          },
          960: {
            spaceBetween: 30,
            navigation: {
              prevEl: '.gallery-swiper-swiper-button-prev',
              nextEl: '.gallery-swiper-swiper-button-next',
              disabledClass: 'disabled',
            },
          },
        }}
        className="gallery-swiper"
      >
        {secondHalf?.map((event, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleSlideClick(event)}
            style={{
              width: getWidthByIndexSecondRow(index),
              height: '300px',
            }}
            className="gallery-swiper group relative transform cursor-pointer overflow-hidden
            rounded-lg
            transition-transform
            duration-300
            ease-in-out "
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
      </Swiper>
      {isModalOpen && selectedImage && (
        <ModalGallery
          events={events}
          selectedImage={selectedImage}
          modalClose={handleModalClose}
        />
      )}
    </div>
  );
}
