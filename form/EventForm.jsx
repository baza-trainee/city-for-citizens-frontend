'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  getValidationScheme,
  validFileExtensions,
} from '../src/components/admin-panel/event-list/event-form/helpers';
import { useState } from 'react';
import ImageUpload from './UploadImage/UploadImage';
import AddEventType from './AddEventType/AddEventType';

export default function EventForm({
  onSubmit,
  initialData,
  buttonNameSubmit,
  buttonNameReset,
}) {
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
    common: { time: '', date: '', coordinates: '', eventUrl: '' },
  };

  const t = useTranslations('EventForm');
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    resetField,
    reset,
    watch,
  } = useForm({
    defaultValues: initialData || initialFormData,
    resolver: yupResolver(getValidationScheme(t)),
  });

  const [clickResetForm, setClickResetForm] = useState(false);

  const resetForm = () => {
    setClickResetForm(prev => !prev);
    reset();
  };

  const wrapperForPairInputsClassNames =
    'col-span-2 flex tablet:items-end flex-col tablet:flex-row gap-[25px]';

  const inputsSettings = {
    firstGroup: [
      {
        tag: 'input',
        inputLabel: t('eventTitle.title'),
        inputName: 'eventTitle',
        type: 'text',
        placeholder: t('eventTitle.placeholder'),
      },
      {
        tag: 'input',
        inputLabel: t('city.title'),
        inputName: 'city',
        type: 'text',
        placeholder: t('city.placeholder'),
      },
      {
        tag: 'input',
        inputLabel: t('street.title'),
        inputName: 'street',
        type: 'text',
        placeholder: t('street.placeholder'),
      },
      {
        tag: 'textarea',
        inputLabel: t('description.title'),
        inputName: 'description',
        type: 'text',
        placeholder: t('description.placeholder'),
      },
      {
        tag: 'textarea',
        inputLabel: t('notes.title'),
        inputName: 'notes',
        type: 'text',
        placeholder: t('notes.placeholder'),
      },
    ],
    secondGroup: [
      {
        tag: 'input',
        inputLabel: t('date.title'),
        inputName: 'date',
        type: 'date',
      },
      {
        tag: 'input',
        inputLabel: t('time.title'),
        inputName: 'time',
        type: 'time',
      },
      {
        tag: 'input',
        inputLabel: t('coordinates.title'),
        inputName: 'coordinates',
        type: 'text',
        placeholder: t('coordinates.placeholder'),
      },
      {
        tag: 'input',
        inputLabel: t('eventUrl.title'),
        inputName: 'eventUrl',
        type: 'url',
        placeholder: t('eventUrl.placeholder'),
      },
    ],
  };

  return (
    <form
      className="border-primary/0 dark:border-gray/20 mx-auto mb-[50px] grid grid-flow-row-dense grid-cols-2 gap-x-[32px] gap-y-[30px] rounded-[20px] border-[3px] px-[30px] py-[50px] tablet:w-[700px]"
      onSubmit={handleSubmit(formData => onSubmit(formData, resetForm))}
    >
      {inputsSettings.firstGroup.map(
        ({ tag, inputLabel, inputName, placeholder, type }) => {
          return (
            <div key={inputLabel} className={wrapperForPairInputsClassNames}>
              <FormElement
                type={type}
                placeholder={`${placeholder} ${t('language.uk')}`}
                tag={tag}
                errorMessage={errors?.firstLocale?.[inputName]?.message}
                inputLabel={inputLabel}
                register={register(`firstLocale.${inputName}`)}
              />

              <FormElement
                type={type}
                placeholder={`${placeholder} ${t('language.en')}`}
                tag={tag}
                errorMessage={errors?.secundLocale?.[inputName]?.message}
                register={register(`secundLocale.${inputName}`)}
              />
            </div>
          );
        }
      )}
      <div className={wrapperForPairInputsClassNames}>
        <ImageUpload
          type="file"
          watch={watch}
          validFileExtensions={validFileExtensions}
          resetField={resetField}
          eventImageName={initialData?.firstLocale?.eventImageName}
          errorMessage={errors?.firstLocale?.eventImage?.message}
          inputName={'firstLocale.eventImage'}
          inputLabel={t('inputImage.title')}
          register={register}
        />

        <ImageUpload
          type="file"
          watch={watch}
          validFileExtensions={validFileExtensions}
          resetField={resetField}
          eventImageName={initialData?.secundLocale?.eventImageName}
          errorMessage={errors?.secundLocale?.eventImage?.message}
          inputName={'secundLocale.eventImage'}
          register={register}
        />
      </div>
      <div className={wrapperForPairInputsClassNames}>
        <AddEventType
          locale="uk_UA"
          watch={watch}
          placeholder={`${t('eventType.placeholder')}`}
          errorMessage={errors?.firstLocale?.eventType?.message}
          initialState={initialData?.firstLocale?.eventType}
          inputName={'firstLocale.eventType'}
          inputLabel={t('eventType.title')}
          register={register}
          setValue={setValue}
          clickResetForm={clickResetForm}
        />
        <AddEventType
          locale="en_US"
          watch={watch}
          placeholder={`${t('eventType.placeholder')}`}
          errorMessage={errors?.secundLocale?.eventType?.message}
          initialState={initialData?.secundLocale?.eventType}
          inputName={'secundLocale.eventType'}
          register={register}
          setValue={setValue}
          clickResetForm={clickResetForm}
        />
      </div>

      {inputsSettings.secondGroup.map(
        ({ tag, inputLabel, inputName, placeholder, type }) => {
          return (
            <FormElement
              key={inputLabel}
              type={type}
              tag={tag}
              errorMessage={errors?.common?.[inputName]?.message}
              inputLabel={inputLabel}
              register={register(`common.${inputName}`)}
              placeholder={placeholder}
            />
          );
        }
      )}

      <input
        className={`mt-[30px]  cursor-pointer rounded-[10px] px-[20px] py-[10px] text-center text-[16px] transition-colors ${
          isDirty
            ? 'bg-gray/80 text-gray/5 hover:bg-primary/80'
            : 'bg-gray/50 text-gray/5 !cursor-not-allowed hover:bg-[#9e2929]'
        }`}
        type="submit"
        disabled={!isDirty}
        value={buttonNameSubmit}
      />

      <input
        className="bg-gray/80 text-gray/5 mt-[30px] cursor-pointer rounded-[10px] px-[20px] 
        py-[10px] text-center text-[16px] transition-colors 
      hover:bg-[#9e2929]"
        type="button"
        onClick={resetForm}
        value={buttonNameReset}
      />
    </form>
  );
}

const FormElement = ({
  errorMessage,
  register,
  inputLabel,
  placeholder,
  tag,
  type,
}) => {
  const inputClassNames = `rounded-[5px] border-[2px] p-[10px] outline-none bg-gray/0 dark:border-gray/20 dark:bg-gray/80`;
  const Tag = tag === 'input' ? 'input' : 'textarea';
  return (
    <label className="relative flex w-full flex-col ">
      {inputLabel && (
        <p className="font-heading pl-[10px] text-[22px]">{inputLabel}</p>
      )}
      <Tag
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className={`${inputClassNames} ${clsx(
          tag === 'textarea' && 'resize-none',
          errorMessage && '!border-[#f94545]'
        )}`}
        {...register}
      />
      {errorMessage && (
        <p
          className="hover:bg-gray/5/90 dark:hover:bg-gray/100/90 absolute top-[calc(100%+2px)]  grid grid-rows-[15px] overflow-hidden px-[3px] leading-[1] text-[#f94545] transition-all hover:grid-rows-[1fr]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </label>
  );
};
