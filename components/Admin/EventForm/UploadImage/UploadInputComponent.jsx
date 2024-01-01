import { useTranslations } from 'next-intl';

const UploadInputComponent = ({
  isImageUpload,
  onChange,
  inputFileRef,
  attributes,
}) => {
  const t = useTranslations('Admin.eventForm.inputImage.buttonName');
  return (
    <label
      className="block cursor-pointer
      rounded-[10px] bg-primary/100 px-[20px] py-[10px] 
      text-center text-[16px] text-gray/5 transition-colors 
    hover:bg-primary/80
    "
    >
      <span>{isImageUpload ? t('isImage') : t('noImage')}</span>
      <input
        className="absolute -m-[1px] h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-[0px] p-[0px]"
        ref={inputFileRef}
        {...attributes}
        onChange={onChange}
      />
    </label>
  );
};

export default UploadInputComponent;
