import IconUploadImage from '@/components/UI/icons/IconUploadImage';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const NoImageComponent = ({ errorMessage }) => {
  const t = useTranslations('EventForm.inputImage');
  return (
    <div
      className={`h-[108px] w-full rounded-[10px] border-[2px] border-gray/80 bg-gray/5 p-[10px] dark:border-gray/20 dark:bg-gray/50 ${clsx(
        errorMessage && '!border-[#f94545]'
      )}`}
    >
      <h3 className="text-center text-[20px]">{t('titleNoImage')}</h3>
      <div className="flex gap-[5px]">
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
