'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useGetEventTypesStatisticsQuery } from '@/redux/api/typesEventApi';
import { useCurrentLocale } from '@/hooks';

export function AnalyticsBar() {
  const { localeForRequest } = useCurrentLocale();
  const { data: eventTypesStatistics } = useGetEventTypesStatisticsQuery({
    locale: localeForRequest,
  });

  let eventsType = [];

  if (eventTypesStatistics) {
    switch (eventTypesStatistics.length) {
      case 1:
        eventsType = [
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
        ];
        break;
      case 2:
        eventsType = [
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
        ];
        break;
      case 3:
        eventsType = [
          ...eventTypesStatistics,
          ...eventTypesStatistics,
          ...eventTypesStatistics,
        ];
        break;
      case 4:
        eventsType = [...eventTypesStatistics, ...eventTypesStatistics];
        break;
      case 5:
        eventsType = [...eventTypesStatistics, ...eventTypesStatistics];
        break;
      default:
        eventsType = eventTypesStatistics;
        break;
    }
  } else {
    return null;
  }

  return (
    <section className="flex h-[80px] items-center bg-yellow font-ubuntu text-dark-primary tablet:h-[100px]">
      <Swiper
        className="marquee"
        modules={[Autoplay]}
        slidesPerView={'auto'}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={10000}
        loop={true}
        allowTouchMove={true}
        centeredSlides={true}
      >
        {eventsType?.map(event => {
          if (!eventsType) {
            return null;
          }

          return (
            <SwiperSlide key={event.id} style={{ width: 'auto' }}>
              <div className="flex cursor-pointer items-center gap-3">
                <span className=" text-[20px] font-medium tablet:text-[30px]">
                  {event.eventType}:
                </span>
                <span className="pr-[120px] text-[40px] font-bold tablet:text-[57px]">{`${event.count}`}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
