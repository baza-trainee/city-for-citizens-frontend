'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getValidationScheme, inputsSettings } from './helpers';
import InputEventType from './input-event-type/input-event-type';
import { FormElement } from './form-element';
import { FileDropzone } from './input-file-dropzone/input-file-dropzone';
import { BasicModalWindows } from '@/components/common';

const initialFormData = {
  firstLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventType: '',
    eventImage: '',
  },
  secundLocale: {
    eventTitle: '',
    city: '',
    street: '',
    description: '',
    notes: '',
    eventType: '',
    eventImage: '',
  },
  common: { time: '', date: '', coordinates: '' },
};

export default function EventForm({
  onSubmit,
  initialData,
  buttonNameSubmit,
  buttonNameReset,
}) {
  const {
    register,
    formState: { errors, isDirty, touchedFields },
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: initialData || initialFormData,
    resolver: yupResolver(getValidationScheme()),
  });

  const [clickResetForm, setClickResetForm] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  function resetForm() {
    setClickResetForm(prev => !prev);
    reset();
    setIsConfirmationModalVisible(false);
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const isPhotoFirstLocaleUpload = watch('firstLocale.eventImage');
  const isPhotoSecundLocaleUpload = watch('secundLocale.eventImage');

  const isButtonDisabled =
    !isDirty &&
    isEmpty(touchedFields) &&
    !isPhotoFirstLocaleUpload &&
    !isPhotoSecundLocaleUpload;

  return (
    <>
      <form
        onSubmit={handleSubmit(formData => {
          onSubmit(formData, resetForm);
        })}
      >
        <div className="mb-[46px] flex flex-col gap-[30px]">
          {inputsSettings.firstGroup.map(
            ({ tag, inputLabel, inputName, placeholder, rows, type }) => (
              <div key={inputLabel} className={'input-wrapper'}>
                <p className="input-label">{inputLabel}</p>
                <div className="flex w-full justify-between gap-10 ">
                  <FormElement
                    type={type}
                    rows={rows}
                    placeholder={`${placeholder} ${'українською'}`}
                    tag={tag}
                    errorMessage={errors?.firstLocale?.[inputName]?.message}
                    register={register(`firstLocale.${inputName}`)}
                  />

                  <FormElement
                    type={type}
                    rows={rows}
                    placeholder={`${placeholder} ${'англійською'}`}
                    tag={tag}
                    errorMessage={errors?.secundLocale?.[inputName]?.message}
                    register={register(`secundLocale.${inputName}`)}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className="input-wrapper mb-10">
          <p className="input-label">Тип події</p>
          <div className="flex w-full justify-between gap-10">
            <InputEventType
              locale={'uk_UA'}
              setValue={setValue}
              placeholder="Виберіть тип події українською"
              inputName={'firstLocale.eventType'}
              initialState={initialData?.firstLocale?.eventType}
              errorMessage={errors?.firstLocale?.eventType?.message}
              register={register('firstLocale.eventType')}
              clickResetForm={clickResetForm}
              clearErrors={clearErrors}
            />

            <InputEventType
              locale={'en_US'}
              setValue={setValue}
              placeholder="Виберіть тип події англійською"
              inputName={'secundLocale.eventType'}
              initialState={initialData?.secundLocale?.eventType}
              errorMessage={errors?.secundLocale?.eventType?.message}
              register={register('secundLocale.eventType')}
              clickResetForm={clickResetForm}
              clearErrors={clearErrors}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="input-label  button-common relative mb-[60px] h-[47px] bg-admin-light_3 p-[30px] text-admin-dark"
            type="button"
          >
            <span className="absolute left-0 top-1/2 -translate-x-full  -translate-y-1/2 pr-7 text-[18px]">
              або
            </span>
            {''}
            Додати новий тип події
          </button>
        </div>

        <div
          className="mb-10 flex flex-col items-center justify-center gap-5 rounded bg-admin-light_3
    px-[109px] py-5 shadow-sm"
        >
          <p className="input-label">Зображення події</p>
          <div className="flex w-full justify-between gap-10">
            <FileDropzone
              photo={initialData?.eventImage}
              errorMessage={errors?.firstLocale?.eventImage?.message}
              onChange={file => setValue('firstLocale.eventImage', file)}
              locale={'українською'}
              isResetForm={clickResetForm}
            />
            <FileDropzone
              photo={initialData?.eventImage}
              errorMessage={errors?.secundLocale?.eventImage?.message}
              onChange={file => {
                setValue('secundLocale.eventImage', file);
              }}
              locale={'англійською'}
              isResetForm={clickResetForm}
            />
          </div>
          <input hidden type="text" {...register(`firstLocale.eventImage`)} />
          <input hidden type="text" {...register(`secundLocale.eventImage`)} />
        </div>

        <div className="mb-[90px] flex gap-[27px]">
          {inputsSettings.secondGroup.map(
            ({ tag, inputLabel, inputName, placeholder, customIcon, type }) => {
              return (
                <div key={inputLabel} className="input-wrapper w-full">
                  <p className="input-label">{inputLabel}</p>
                  <FormElement
                    type={type}
                    customIcon={customIcon}
                    tag={tag}
                    errorMessage={errors?.common?.[inputName]?.message}
                    register={register(`common.${inputName}`)}
                    placeholder={placeholder}
                  />
                </div>
              );
            }
          )}
        </div>

        <div className="flex items-center justify-center gap-[25px] ">
          <input
            className="button-close"
            type="button"
            onClick={() => setIsConfirmationModalVisible(true)}
            value={buttonNameReset}
            disabled={isButtonDisabled}
          />
          <input
            className={`button-confirm`}
            type="submit"
            disabled={isButtonDisabled}
            value={buttonNameSubmit}
          />
        </div>
      </form>
      {isConfirmationModalVisible && (
        <BasicModalWindows
          onClose={() => setIsConfirmationModalVisible(false)}
          title={'Скасувати зміни?'}
          message={'Ви точно хочете скасувати зміни? Вони не будуть збережені'}
        >
          <div className="flex gap-[15px]">
            <button
              className="button-close"
              onClick={() => setIsConfirmationModalVisible(false)}
              type="button"
            >
              Скасувати
            </button>
            <button
              className="button-confirm"
              onClick={resetForm}
              type="button"
            >
              Підтвердити
            </button>
          </div>
        </BasicModalWindows>
      )}
    </>
  );
}
