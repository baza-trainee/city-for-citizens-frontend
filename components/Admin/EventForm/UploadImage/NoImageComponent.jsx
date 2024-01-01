import IconUploadImage from '@/components/UI/icons/IconUploadImage';
import { useTranslations } from 'next-intl';

const NoImageComponent = () => {
  const t = useTranslations('Admin.eventForm.inputImage');
  return (
    <div className=" h-[108px] w-[260px] rounded-[10px] bg-gray/5 p-[10px] dark:bg-gray/50">
      <h3 className="text-center text-[20px]">{t('titleNoImage')}</h3>
      <div className="flex  gap-[5px]">
        <IconUploadImage className="h-[58px]" />
        <p className="flex flex-col justify-center text-[16px]">
          <span>{t('format')}</span>
          <span>{t('size')}</span>
        </p>
      </div>
    </div>
  );
};

export default NoImageComponent;
