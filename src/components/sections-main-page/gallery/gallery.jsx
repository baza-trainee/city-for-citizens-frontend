'use client';
import { Title } from '../common/title';
import { ImageGallery } from './slider';

export function Gallery() {
  return (
    <section className="flex items-center justify-center text-center">
      <div className=" w-full bg-light-secondary px-4 dark:bg-dark-primary  tablet:w-[768px] tablet:px-0 laptop:w-[960px] desktop_xl:w-[1920px] desktop_xl:px-[30px]">
        <Title text={'Галерея'} />
        <ImageGallery />
      </div>
    </section>
  );
}
