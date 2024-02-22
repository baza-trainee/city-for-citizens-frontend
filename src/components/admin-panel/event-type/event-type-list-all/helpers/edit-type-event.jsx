import { useForm } from 'react-hook-form';
import { getValidationSchema } from '@/components/admin-panel/event-type/event-type-list-all/helpers/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateTypesEventMutation } from '@/redux/api/typesEventApi';
import { BasicModalWindows } from '@/components/common';
import CommonModalForm from './common-modal-form';

export default function EditTypeEvent({ typeEvent, close, success, error }) {
  const [editTypeEvent, { isLoading: isLoadingEditTypeEvent }] =
    useUpdateTypesEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      ukTypeName: typeEvent[0].eventType,
      enTypeName: typeEvent[1].eventType,
    },
    resolver: yupResolver(getValidationSchema()),
  });

  async function onSubmit(data) {
    close();
    try {
      const formData = {
        eventTypeUkr: data.ukTypeName,
        eventTypeEng: data.enTypeName,
      };
      await editTypeEvent({
        body: formData,
        typeEventId: typeEvent[0].idIdentifier,
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
        <CommonModalForm
          register={register}
          errors={errors}
          isValid={isValid}
          isLoading={isLoadingEditTypeEvent}
          nameButton="Редагувати"
        />
      </form>
    </BasicModalWindows>
  );
}
