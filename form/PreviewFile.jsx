import CloseButton from '@/components/UI/icons/IconClose';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const PreviewFile = ({ file, resetImage }) => {
  const [preview, setPreview] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  reader.onload = () => {
    setPreview(isFileImage(file) ? reader.result : null);
  };
  useEffect(() => {
    if (!isFileImage(file)) {
      setIsImage(false);
    } else {
      setIsImage(true);
    }
  }, [file]);
  const t = useTranslations('EventForm.inputImage');

  return (
    <div className="relative">
      {isImage ? (
        <img
          className="h-[108px] w-full rounded-[10px] border-[2px] object-cover dark:border-gray/80"
          src={preview}
          alt={file.name}
          width={240}
          height={105}
        />
      ) : (
        <p className="h-[108px] w-full overflow-scroll rounded-[10px] border-[2px] border-[#f94545] bg-gray/5 p-[10px] text-[#f94545] dark:bg-gray/50">
          {t('noImage')}
        </p>
      )}
      <button
        className="absolute -right-[10px] -top-[10px] rounded-[50%] bg-gray/10 dark:bg-gray/50"
        onClick={resetImage}
        type="button"
      >
        <CloseButton className="h-[32px]  w-[32px] stroke-gray/80 transition-colors hover:stroke-[#ff0000] dark:stroke-gray/10 hover:dark:stroke-[#cd4747]" />
      </button>
    </div>
  );
};

export default PreviewFile;
