'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getValidationScheme, inputsSettings } from './helpers';
import InputEventType from './input-event-type/input-event-type';
import { FormElement } from './form-element';
import { FileDropzone } from './input-file-dropzone/input-file-dropzone';
import { BasicModalWindows, Button, LoadingButton } from '@/components/common';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetEventFormData,
  setEventFormData,
} from '@/redux/slice/eventFormData';

import CreateTypeEvent from '../../event-type/event-type-list-all/helpers/create-type-event';

const initialFormData = {
  firstLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventTypeId: '',
    eventImage: '',
  },
  secondLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventTypeId: '',
    eventImage: '',
  },
  common: { time: '', date: '', coordinates: '' },
};

export default function EventForm({
  onSubmit,
  initialData,
  buttonNameSubmit,
  buttonNameReset,
  isLoading,
}) {
  const {
    register,
    formState: { errors, isDirty, touchedFields },
    handleSubmit,
    setValue,
    reset,
    resetField,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: initialData || initialFormData,
    resolver: yupResolver(getValidationScheme()),
  });

  const [clickResetForm, setClickResetForm] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isAddNewTypesModalVisible, setIsAddNewTypesModalVisible] =
    useState(false);

  const [statusMessage, setStatusMessage] = useState('');
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const eventFormData = useSelector(state => state.eventFormData);

  useEffect(() => {
    // save input data during component unmount
    return () => {
      if (initialData) return;
      const currentValues = watch();
      currentValues.firstLocale.eventImage = '';
      currentValues.secondLocale.eventImage = '';

      dispatch(setEventFormData(currentValues));
    };
  }, [dispatch, initialData, watch]);

  useEffect(() => {
    if (initialData) return;

    reset(eventFormData, { keepDefaultValues: true });
  }, [eventFormData, initialData, reset]);

  function resetForm() {
    setClickResetForm(prev => !prev);
    if (initialData) reset(initialData, { keepDefaultValues: true });
    else reset();
    setIsConfirmationModalVisible(false);
    dispatch(resetEventFormData());
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const isPhotoFirstLocaleUpload =
    typeof watch('firstLocale.eventImage') !== 'string';

  const isPhotoSecondLocaleUpload =
    typeof watch('secondLocale.eventImage') !== 'string';

  const isButtonDisabled =
    !isDirty &&
    isEmpty(touchedFields) &&
    !isPhotoFirstLocaleUpload &&
    !isPhotoSecondLocaleUpload;

  function onSubmitHandle({ common, firstLocale, secondLocale }) {
    const ukFormData = { ...common, locale: 'uk_UA', ...firstLocale };
    const enFormData = { ...common, locale: 'en_US', ...secondLocale };
    const formData = [ukFormData, enFormData];

    onSubmit(formData, resetForm);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="mb-[46px] flex flex-col gap-[30px]">
          {inputsSettings.firstGroup.map(
            ({ tag, inputLabel, inputName, placeholder, rows, type }) => (
              <div key={inputLabel} className={'input-wrapper'}>
                <p className="input-label">{inputLabel}</p>
                <div className="flex w-full flex-col justify-between gap-10 laptop_xl:flex-row">
                  <FormElement
                    type={type}
                    rows={rows}
                    placeholder={`${placeholder} ${inputName === 'notes' ? "українською *(не обов'язково)" : 'українською'}`}
                    tag={tag}
                    errorMessage={errors?.firstLocale?.[inputName]?.message}
                    register={register(`firstLocale.${inputName}`)}
                  />

                  <FormElement
                    type={type}
                    rows={rows}
                    placeholder={` ${placeholder} ${inputName === 'notes' ? "англійською *(не обов'язково)" : 'англійською'}`}
                    tag={tag}
                    errorMessage={errors?.secondLocale?.[inputName]?.message}
                    register={register(`secondLocale.${inputName}`)}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className="input-wrapper mb-10">
          <p className="input-label">Тип події</p>
          <div className="flex w-full flex-col justify-between gap-10 laptop_xl:flex-row">
            <InputEventType
              locale={'uk_UA'}
              setValue={setValue}
              placeholder="Виберіть тип події українською"
              inputName={'firstLocale.eventTypeId'}
              initialState={
                initialData?.firstLocale?.eventTypeId ||
                eventFormData?.firstLocale?.eventTypeId
              }
              resetField={resetField}
              errorMessage={errors?.firstLocale?.eventTypeId?.message}
              register={register('firstLocale.eventTypeId')}
              clickResetForm={clickResetForm}
              clearErrors={clearErrors}
            />

            <InputEventType
              locale={'en_US'}
              setValue={setValue}
              placeholder="Виберіть тип події англійською"
              inputName={'secondLocale.eventTypeId'}
              initialState={
                initialData?.secondLocale?.eventTypeId ||
                eventFormData?.secondLocale?.eventTypeId
              }
              resetField={resetField}
              errorMessage={errors?.secondLocale?.eventTypeId?.message}
              register={register('secondLocale.eventTypeId')}
              clickResetForm={clickResetForm}
              clearErrors={clearErrors}
            />
          </div>
        </div>

        <div className="mb-[60px] flex justify-center ">
          <div className="relative">
            <Button
              onClick={() => setIsAddNewTypesModalVisible(true)}
              variant={'outlined'}
              className="h-[47px] w-[276px] font-exo_2"
              type="button"
            >
              Додати новий тип події
            </Button>
            <span className="input-label absolute -left-7 top-1/2 -translate-x-full -translate-y-1/2 text-[18px]">
              або
            </span>
          </div>
        </div>

        <div
          className="mb-[50px] flex flex-col items-center justify-center gap-5 rounded
    bg-admin-light_3 px-2 py-5  shadow-sm desktop:px-[109px]"
        >
          <p className="input-label">Зображення події</p>
          <div className="flex w-full flex-col items-center justify-between gap-10 laptop_xl:flex-row">
            <FileDropzone
              photo={initialData?.firstLocale?.eventImage}
              errorMessage={errors?.firstLocale?.eventImage?.message}
              onChange={file => setValue('firstLocale.eventImage', file)}
              locale={'українською'}
              isResetForm={clickResetForm}
            />
            <FileDropzone
              photo={initialData?.secondLocale?.eventImage}
              errorMessage={errors?.secondLocale?.eventImage?.message}
              onChange={file => {
                setValue('secondLocale.eventImage', file);
              }}
              locale={'англійською'}
              isResetForm={clickResetForm}
            />
          </div>
          <input hidden type="text" {...register(`firstLocale.eventImage`)} />
          <input hidden type="text" {...register(`secondLocale.eventImage`)} />
        </div>

        <div className="mb-[90px] flex flex-col gap-[27px] desktop:flex-row">
          {inputsSettings.secondGroup.map(
            ({ tag, inputLabel, inputName, placeholder, customIcon, type }) => {
              return (
                <div key={inputLabel} className="input-wrapper w-full ">
                  <p className="input-label  ">{inputLabel}</p>
                  <div className="w-full max-w-[75%]">
                    <FormElement
                      type={type}
                      customIcon={customIcon}
                      tag={tag}
                      errorMessage={errors?.common?.[inputName]?.message}
                      register={register(`common.${inputName}`)}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-[25px] tablet:flex-row ">
          <Button
            variant={'outlined'}
            className="h-[51px] w-[198px]"
            type="button"
            onClick={() => setIsConfirmationModalVisible(true)}
            disabled={isButtonDisabled || isLoading}
          >
            {buttonNameReset}
          </Button>

          <Button
            className={`h-[51px] px-[31px]`}
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <LoadingButton /> : buttonNameSubmit}
          </Button>
        </div>
      </form>
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => setIsConfirmationModalVisible(false)}
          title={'Скасувати зміни?'}
          message="Ви точно хочете скасувати зміни? Вони не будуть збережені"
        >
          <div className="flex gap-[16px]">
            <Button
              variant={'outlined'}
              type="button"
              onClick={() => setIsConfirmationModalVisible(false)}
            >
              Скасувати
            </Button>
            <Button
              className={'max-w-[181px]'}
              type="button"
              onClick={resetForm}
            >
              Підтвердити
            </Button>
          </div>
        </BasicModalWindows>
      )}
      {isAddNewTypesModalVisible && (
        <CreateTypeEvent
          success={() => {
            setIsShowSuccessMessage(true);
            setStatusMessage('Тип події успішно додано');
          }}
          error={() => {
            setIsShowErrorMessage(true);
            setStatusMessage('Щось пішло не так... Спробуйте пізніше');
          }}
          close={() => setIsAddNewTypesModalVisible(false)}
        />
      )}
      {isShowSuccessMessage && (
        <BasicModalWindows
          onClose={() => setIsShowSuccessMessage(false)}
          title={'Успіх!'}
          type="success"
          message={statusMessage}
        ></BasicModalWindows>
      )}
      {isShowErrorMessage && (
        <BasicModalWindows
          onClose={() => setIsShowErrorMessage(false)}
          title={'Помилка'}
          type={'error'}
          message={statusMessage}
        ></BasicModalWindows>
      )}
    </>
  );
}
