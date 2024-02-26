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
}) {
  const [formData, setFormData] = useState(null);
  console.log('initialData', initialData);
  const initialFormData = {
    name: '',
    link: '',
    image: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: initialData || initialFormData,
    resolver: yupResolver(getValidationSchema()),
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData, { keepDefaultValues: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  function resetForm() {
    if (initialData) reset(formData, { keepDefaultValues: false });
    else reset();
  }
  function onSubmitHandle(formData) {
    onSubmit(formData, reset);
    setFormData(formData);
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
            onChange={file => setValue('image', file)}
            locale={''}
            isResetForm={() => resetForm()}
            isPartners={true}
          />
        </div>
      </div>
      <div className="mb-[25px] flex gap-x-4 desktop:-mt-3">
        <button
          disabled={isLoading}
          className="button-close-hover px-[40px] pb-[10px] pt-[7px]"
          onClick={onClose}
          type="button"
        >
          Скасувати
        </button>
        <button
          disabled={isLoading || !isValid}
          className="button-confirm-hover px-[54px] pb-[10px] pt-[7px]"
          type="submit"
        >
          {nameButtonSubmit}
        </button>
      </div>
    </form>
  );
}
