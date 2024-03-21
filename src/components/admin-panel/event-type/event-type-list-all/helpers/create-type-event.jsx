import { useForm } from 'react-hook-form';
import { getValidationSchema } from '@/components/admin-panel/event-type/event-type-list-all/helpers/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTypeEventMutation } from '@/redux/api/typesEventApi';
import { BasicModalWindows } from '@/components/common';
import CommonModalForm from './common-modal-form';

export default function CreateTypeEvent({ close, success, error }) {
  const [addTypeEvent, { isLoading: isLoadingAddTypeEvent }] =
    useCreateTypeEventMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      ukTypeName: '',
      enTypeName: '',
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

      await addTypeEvent(formData).unwrap();

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
        <CommonModalForm
          register={register}
          close={close}
          errors={errors}
          isValid={isValid}
          isLoading={isLoadingAddTypeEvent}
          nameButton="Додати"
        />
      </form>
    </BasicModalWindows>
  );
}
