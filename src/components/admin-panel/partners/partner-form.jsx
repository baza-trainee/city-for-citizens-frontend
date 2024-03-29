import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './helpers/validationSchema';
import { FileDropzone } from '../event-list/event-form/input-file-dropzone/input-file-dropzone';
export default function PartnerForm({
  onSubmit,
  isLoading,
  nameButtonSubmit,
  onClose,
  initialData,
  type,
}) {
  const [clickResetForm, setClickResetForm] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const [isNameChange, setIsNameChange] = useState(false);
  const [isLinkChange, setIsLinkChange] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: formData,
    resolver: yupResolver(getValidationSchema()),
  });

  useEffect(() => {
    reset(initialData, { keepDefaultValues: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  useEffect(() => {
    return document.addEventListener('keypress', function (e) {
      if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter') {
        e.preventDefault();
        return false;
      }
    });
  });

  const isFieldWasChanged =
    type === 'edit'
      ? isNameChange || isLinkChange || isImageChange
      : isNameChange || isLinkChange || isImageChange;

  function resetForm() {
    setClickResetForm(prev => !prev);
    if (type === 'edit') {
      reset(formData, { keepDefaultValues: true });
    } else reset();
  }

  function onSubmitHandle(filledFormData) {
    setFormData(filledFormData);
    onSubmit(filledFormData, resetForm);
    setIsImageChange(false);
    setIsNameChange(false);
    setIsLinkChange(false);
  }

  function handleOnChange(event) {
    if (event.target.name == 'name') {
      event.target.value != initialData.name && setIsNameChange(true);
      event.target.value == initialData.name && setIsNameChange(false);
    }
    if (event.target.name == 'link') {
      event.target.value != initialData.link && setIsLinkChange(true);
      event.target.value == initialData.link && setIsLinkChange(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className="flex flex-col ">
      <div className="flex  gap-x-[67px] gap-y-[30px] tablet:mb-[30px] tablet:flex-col desktop:mb-0 desktop:flex-row">
        <div className="flex flex-col gap-9">
          <div className="relative flex flex-col">
            <div className="flex h-12 items-center rounded border border-admin-darkgray focus-within:border-admin-dark tablet:w-4/5 laptop:w-[550px] desktop_m:w-[643px]">
              <input
                {...register('name')}
                type="text"
                placeholder="Введіть назву партнера"
                className="w-full pl-2 text-admin-dark outline-none"
                onChange={handleOnChange}
              />
            </div>
            {errors.name && (
              <div className="absolute -bottom-6  text-admin-modal-error">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col">
            <div className="flex h-12 items-center rounded border border-admin-darkgray focus-within:border-admin-dark tablet:w-4/5 laptop:w-[550px] desktop_m:w-[643px]">
              <input
                {...register('link')}
                type="url"
                placeholder="Введіть посилання"
                className="w-full pl-2 text-admin-dark outline-none"
                onChange={handleOnChange}
              />
            </div>
            {errors.link && (
              <div className="absolute -bottom-6  text-admin-modal-error">
                {errors.link.message}
              </div>
            )}
          </div>
        </div>
        <div className="w-[305px]">
          <FileDropzone
            photo={initialData?.image}
            errorMessage={errors?.image?.message}
            onChange={file => {
              setValue('image', file);
              setIsImageChange(true);
            }}
            locale={''}
            isResetForm={clickResetForm}
            isPartners={true}
          />
        </div>
      </div>
      <div className="mb-[25px] flex gap-x-4 desktop:-mt-3">
        <button
          disabled={isLoading}
          className="button-close-hover px-[40px] pb-[10px] pt-[7px] leading-8"
          onClick={() => onClose(isFieldWasChanged)}
          type="button"
        >
          Скасувати
        </button>
        <button
          disabled={isLoading || !isFieldWasChanged}
          className="button-confirm-hover px-[54px] pb-[10px] pt-[7px] leading-8 disabled:bg-admin-button-disabled"
          type="submit"
        >
          {nameButtonSubmit}
        </button>
      </div>
    </form>
  );
}
