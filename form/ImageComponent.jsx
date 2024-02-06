import { IMAGE_BASE_URL } from '@/helpers/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const ImageComponent = ({ eventImageName }) => {
  const [onError, setOnError] = useState(false);
  const handleImageError = () => {
    setOnError(true);
  };
  const t = useTranslations('EventForm.inputImage');

  return (
    <div className="relative">
      {!onError ? (
        <Image
          onError={handleImageError}
          className="h-[108px] w-full rounded-[10px] border object-cover dark:border-gray/80"
          src={`${IMAGE_BASE_URL}${eventImageName}`}
          alt={eventImageName}
          width={260}
          height={105}
        />
      ) : (
        <p className="h-[108px] w-full overflow-scroll rounded-[10px] border-[2px] border-[#f94545] bg-gray/5 p-[10px] text-[#f94545] dark:bg-gray/50">
          {t('errorUrl')}
        </p>
      )}
    </div>
  );
};

export default ImageComponent;
