import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import PreviewFile from './PreviewFile';
import ImageComponent from './ImageComponent';
import NoImageComponent from './NoImageComponent';

const ImageUpload = ({
  register,
  placeholder,
  type,
  errorMessage,
  inputName,
  inputLabel,
  resetField,
  watch,
  eventImageName,
  validFileExtensions,
}) => {
  const [defaultValue, setDefaultValue] = useState(null);

  const t = useTranslations('EventForm.inputImage.buttonName');

  useEffect(() => {
    if (watch(inputName) === null && defaultValue !== null) {
      resetField(inputName, { defaultValue });
    }
  }, [defaultValue, inputName, resetField, watch]);

  useEffect(() => {
    if (defaultValue) {
      return;
    }
    if (watch(inputName)) {
      setDefaultValue(watch(inputName));
    }
  }, [defaultValue, inputName, watch]);

  const resetImage = () => {
    resetField(inputName, { defaultValue });
  };

  function getAllowedExt() {
    return validFileExtensions.map(e => `.${e}`).toString();
  }

  let allowedExts = getAllowedExt();
  return (
    <div className="w-full">
      <p className="pl-[10px] font-heading text-[22px]">{inputLabel}</p>
      <div className="relative mb-[30px]">
        {watch(inputName) && watch(inputName)[0] ? (
          <PreviewFile resetImage={resetImage} file={watch(inputName)[0]} />
        ) : eventImageName ? (
          <ImageComponent eventImageName={eventImageName} />
        ) : (
          <NoImageComponent errorMessage={errorMessage} />
        )}

        {errorMessage && (
          <p
            className="absolute top-[calc(100%+2px)] text-[#f94545]"
            role="alert"
          >
            {`${errorMessage} ${
              watch(inputName) &&
              watch(inputName)[0] &&
              `-".${watch(inputName)[0].name.split('.').pop()}"`
            }`}
          </p>
        )}
      </div>

      <label
        className="relative flex w-full cursor-pointer flex-col
      rounded-[10px] bg-gray/80 px-[20px] py-[10px] 
      text-center text-[16px] text-gray/5 transition-colors 
    hover:bg-gray/50
    "
      >
        <span>
          {watch(inputName) && watch(inputName)[0]
            ? t('isImage')
            : t('noImage')}
        </span>
        <input
          className="hidden"
          {...register(inputName)}
          accept={allowedExts}
          placeholder={placeholder}
          type={type}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
