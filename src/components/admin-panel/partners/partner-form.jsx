import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { getValidationSchema } from './helpers/validationSchema';
import { FileDropzone } from '../event-list/event-form/input-file-dropzone/input-file-dropzone';
export default function PartnerForm({
  onSubmit,
  isLoading,
  nameButtonSubmit,
  initialData,
}) {
  const router = useRouter();
  const initialFormData = {
    partnerName: '',
    partnerLink: '',
    partnerImage: '',
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: initialData || initialFormData,
    resolver: yupResolver(getValidationSchema()),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      <div className="flex gap-x-[67px]">
        <div className="flex flex-col gap-9">
          <div className="relative flex flex-col">
            <div className="flex h-12 w-[643px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
              <input
                {...register('partnerName')}
                type="text"
                placeholder="Введіть назву партнера"
                className="w-full pl-2 text-admin-dark outline-none"
              />
            </div>
            {errors.partnerName && (
              <div className="absolute -bottom-6  text-admin-modal-error">
                {errors.partnerName.message}
              </div>
            )}
          </div>

          <div className="relative flex flex-col">
            <div className="flex h-12 w-[643px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
              <input
                {...register('partnerLink')}
                type="url"
                placeholder="Введіть посилання"
                className="w-full pl-2 text-admin-dark outline-none"
              />
            </div>
            {errors.partnerLink && (
              <div className="absolute -bottom-6  text-admin-modal-error">
                {errors.partnerLink.message}
              </div>
            )}
          </div>
        </div>
        <FileDropzone
          photo={initialData?.partnerImage}
          errorMessage={errors?.partnerImage?.message}
          onChange={file => setValue('partnerImage', file)}
          locale={''}
          // isResetForm={clickResetForm}
        />
      </div>
      <div className="-mt-3 mb-[25px] flex gap-x-4">
        <button
          disabled={isLoading}
          className="button-close-hover w-[181px] pb-3 pt-2"
          onClick={() => {
            router.back();
          }}
          type="button"
        >
          Скасувати
        </button>
        <button
          disabled={isLoading || !isValid}
          className="button-confirm-hover w-[181px] pb-3 pt-2"
          type="submit"
        >
          {nameButtonSubmit}
        </button>
      </div>
    </form>
  );
}
