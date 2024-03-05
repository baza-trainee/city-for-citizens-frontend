'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextField from './propose-form-text-field';
import { BasicModalWindows } from '@/components/common';
import Loader from '@/components-old/UI/Loader';
import validationSchema from './validationSchema';

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  messenger: '',
  eventDescription: '',
};

export default function ProposeForm() {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  console.log('🚀 ~ ProposeForm ~ errors:', errors);

  const onSubmit = async formValues => {
    try {
      setIsSuccessModalVisible(true);
      reset();
      console.log(formValues);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="inline-flex  w-full max-w-[600px] flex-col items-center justify-start gap-6 rounded-lg bg-white p-6"
      >
        <TextField
          label="Ім'я:"
          name="name"
          placeholder="Олег Вікторович"
          register={register}
          errors={errors}
        />
        <TextField
          label="email'я:"
          name="email"
          placeholder="exemple@gmail.com"
          register={register}
          errors={errors}
        />
        <TextField
          label="phone"
          name="phone"
          placeholder="+380"
          register={register}
          errors={errors}
        />
        <TextField
          label="messenger"
          name="messenger"
          placeholder="Посилання або нік в телеграм"
          register={register}
          errors={errors}
        />
        <TextField
          label="eventDescription"
          name="eventDescription"
          placeholder="10-11 червня у Вінниці на березі річки Південний Буг відбудеться фестиваль активного відпочинку «Дивні люди»"
          register={register}
          errors={errors}
          type="textarea"
        />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-black px-6 py-3 font-roboto text-base font-medium leading-tight text-white shadow disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
        >
          Відправити запит
        </button>
      </form>
      {isSuccessModalVisible && (
        <BasicModalWindows
          onClose={() => setIsSuccessModalVisible(false)}
          title={'Дякуємо вам!'}
          type="success"
          message={'Ваш запит прийнято. Ми зв’яжемося з вами впродовж тижня.'}
        ></BasicModalWindows>
      )}
      {isErrorModalVisible && (
        <BasicModalWindows
          onClose={() => setIsErrorModalVisible(false)}
          title={'Помилка'}
          type="error"
          message={errorMessage ? errorMessage : 'Помилка відправлення форми'}
        ></BasicModalWindows>
      )}
      {0 && (
        <div className="bg-primary/0/20 fixed flex h-full w-full items-center justify-center backdrop-blur-[1px]">
          <Loader />
        </div>
      )}
    </>
  );
}
