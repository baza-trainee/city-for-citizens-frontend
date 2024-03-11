'use client';
import { useTranslations } from 'next-intl';
import { Title } from '../common/title';
import { ImageGallery } from './slider';

export function Gallery() {
  const t = useTranslations('MenuItems');
  return (
    <section
      id="gallery"
      className="flex items-center justify-center text-center"
    >
      <div className=" w-full bg-light-primary px-4 dark:bg-dark-primary mobile:pb-20 tablet:px-0 tablet:pb-40 desktop:w-full desktop:px-[30px] desktop_xl:max-w-[1920px]">
        <Title text={t('gallery')} />
        <ImageGallery />
      </div>
    </section>
  );
}
