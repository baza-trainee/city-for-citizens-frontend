'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const analyticsBarItems = [
  { id: 1, title: 'Концертів', amount: 10 },
  { id: 2, title: 'Виставок', amount: 20 },
  { id: 3, title: 'Ярмарок', amount: 30 },
  { id: 4, title: 'Спортивних заходів', amount: 40 },
];

const analyticsBarItemsNew = [
  ...analyticsBarItems,
  ...analyticsBarItems,
  ...analyticsBarItems,
];

export function AnalyticsBar() {
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
        speed={6000}
        loop={true}
        allowTouchMove={false}
      >
        {analyticsBarItemsNew.map((item, index) => {
          return (
            <SwiperSlide key={`${item.id}${index}`} style={{ width: 'auto' }}>
              <div className="flex cursor-pointer items-center gap-3">
                <span className="text-[57px] font-bold">{`${item.amount}+`}</span>
                <span className="pr-[120px] text-2xl font-medium">
                  {item.title}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
