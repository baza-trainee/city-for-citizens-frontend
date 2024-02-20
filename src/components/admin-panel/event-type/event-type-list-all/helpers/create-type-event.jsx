import { useForm } from 'react-hook-form';
import { getValidationSchemaCreate } from '@/components/admin-panel/event-type/event-type-list-all/helpers/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTypeEventMutation } from '@/redux/api/typesEventApi';
import { BasicModalWindows } from '@/components/common';

export default function CreateTypeEvent({ close, success, error }) {
  const [addTypeEvent, { isLoading: isLoadingAddTypeEvent }] =
    useCreateTypeEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      ukTypeName: '',
      enTypeName: '',
    },
    resolver: yupResolver(getValidationSchemaCreate()),
  });

  async function onSubmit(data) {
    close();
    try {
      const ukFormData = { locale: 'uk_UA', eventType: data.ukTypeName };
      const enFormData = { locale: 'en_US', eventType: data.enTypeName };
      await addTypeEvent(ukFormData).unwrap();
      await addTypeEvent(enFormData).unwrap();
      success();
    } catch (err) {
      error();
      console.log(err);
    }
  }

  return (
    <BasicModalWindows onClose={close} title={'Додати тип події'} type="form">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-[25px]"
      >
        <div className="-mt-1 flex flex-col gap-y-8">
          <div className="flex flex-col">
            <div className="mx-4 flex h-12 w-[407px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
              <input
                {...register('ukTypeName')}
                type="text"
                placeholder="Введіть новий тип події українською мовою"
                className="w-full pl-[7px] text-admin-dark outline-none"
              />
            </div>
            {errors.ukTypeName && (
              <div className="text-admin-modal-error absolute pl-[15px]">
                {errors.ukTypeName.message}
              </div>
            )}
          </div>
          <div className="relative flex flex-col">
            <div className="mx-4 flex h-12 w-[407px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
              <input
                {...register('enTypeName')}
                type="text"
                placeholder="Введіть новий тип події англійською мовою"
                className="w-full pl-[7px] text-admin-dark outline-none "
              />
            </div>
            {errors.enTypeName && (
              <div className="text-admin-modal-error absolute -bottom-1 pl-[15px]">
                {errors.enTypeName.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-[25px] mt-2  flex gap-[10px]">
          <button
            disabled={isLoadingAddTypeEvent}
            className="button-close-hover w-[198px] pb-3 pt-2"
            onClick={close}
            type="button"
          >
            Скасувати
          </button>
          <button
            disabled={isLoadingAddTypeEvent}
            className="button-confirm-hover w-[198px] pb-3 pt-2"
            type="submit"
          >
            Додати
          </button>
        </div>
      </form>
    </BasicModalWindows>
  );
}
