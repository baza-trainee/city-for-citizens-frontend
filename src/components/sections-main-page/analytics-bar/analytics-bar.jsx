'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
  useGetTypesEventByLocaleQuery,
  useGetEventTypesStatisticsQuery,
} from '@/redux/api/typesEventApi';
import { useCurrentLocale } from '@/hooks';

export function AnalyticsBar() {
  const { localeForRequest } = useCurrentLocale();
  const { data: eventsType } = useGetTypesEventByLocaleQuery({
    locale: localeForRequest,
  });
  const { data: eventTypesStatistics } = useGetEventTypesStatisticsQuery();

  return (
    <section className="flex h-[100px] items-center bg-yellow font-ubuntu text-dark-primary">
      <Swiper
        className="marquee"
        modules={[Autoplay]}
        slidesPerView={'auto'}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={2000}
        loop={true}
        allowTouchMove={false}
      >
        {eventsType?.map(event => {
          const eventTypeStatistics =
            eventTypesStatistics &&
            eventTypesStatistics.find(item => item.eventTypeId === event.id);

          if (!eventTypeStatistics) {
            return null;
          }

          const count = eventTypeStatistics ? eventTypeStatistics.count : 0;

          return (
            <SwiperSlide key={event.id} style={{ width: 'auto' }}>
              <div className="flex cursor-pointer items-center gap-3">
                <span className="text-[57px] font-bold">{`${count}+`}</span>
                <span className="pr-[120px] text-2xl font-medium">
                  {event.eventType}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
