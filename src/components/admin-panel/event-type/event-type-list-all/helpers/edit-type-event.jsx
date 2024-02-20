import { useForm } from 'react-hook-form';
import { getValidationSchemaEdit } from '@/components/admin-panel/event-type/event-type-list-all/helpers/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateTypesEventMutation } from '@/redux/api/typesEventApi';
import { BasicModalWindows } from '@/components/common';

export default function EditTypeEvent({ typeEvent, close, success, error }) {
  const [editTypeEvent, { isLoading: isLoadingEditTypeEvent }] =
    useUpdateTypesEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      typeName: typeEvent.eventType,
    },
    resolver: yupResolver(getValidationSchemaEdit(typeEvent.locale)),
  });

  async function onSubmit(data) {
    close();
    try {
      const formData = { locale: typeEvent.locale, eventType: data.typeName };
      await editTypeEvent({
        body: formData,
        typeEventId: typeEvent.id,
      }).unwrap();
      success();
    } catch (err) {
      error();
      console.log(err);
    }
  }
  return (
    <BasicModalWindows onClose={close} title={'Змінити тип події'} type="form">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-y-[25px]"
      >
        <div className="relative flex flex-col">
          <div className="mx-4 flex h-12 w-[407px] items-center rounded border border-admin-darkgray focus-within:border-admin-dark">
            <input
              {...register('typeName')}
              type="text"
              placeholder={`Введіть тип події ${typeEvent.locale === 'uk_UA' ? 'українською' : 'англійською'} мовою`}
              className="w-full pl-[7px] text-admin-dark outline-none"
            />
          </div>
          {errors.typeName && (
            <div className="text-admin-modal-error absolute  -bottom-6 pl-[15px]">
              {errors.typeName.message}
            </div>
          )}
        </div>

        <div className="mb-[25px] mt-2  flex gap-[10px]">
          <button
            disabled={isLoadingEditTypeEvent}
            className="button-close-hover w-[198px] pb-3 pt-2"
            onClick={close}
            type="button"
          >
            Скасувати
          </button>
          <button
            disabled={isLoadingEditTypeEvent || !isDirty || !isValid}
            className="button-confirm-hover w-[198px] pb-3 pt-2"
            type="submit"
          >
            Редагувати
          </button>
        </div>
      </form>
    </BasicModalWindows>
  );
}
