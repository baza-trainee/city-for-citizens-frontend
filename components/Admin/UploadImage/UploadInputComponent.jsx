import { useTranslations } from 'next-intl';

const UploadInputComponent = ({ isImageUpload, onChange, inputFileRef }) => {
  const t = useTranslations('Admin.eventForm.inputImage.buttonName');
  return (
    <label
      className="cursor-pointer
      rounded-[10px] bg-primary/100 px-[20px] py-[10px] 
      text-center text-[16px] text-gray/5 transition-colors 
    hover:bg-primary/80
    "
    >
      <span>{isImageUpload ? t('isImage') : t('noImage')}</span>
      <input
        ref={inputFileRef}
        name="eventImage"
        type="file"
        accept="image/*"
        hidden
        onChange={onChange}
      />
    </label>
  );
};

export default UploadInputComponent;
