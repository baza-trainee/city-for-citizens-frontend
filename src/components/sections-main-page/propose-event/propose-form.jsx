'use client';

import React, { useState } from 'react';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async formValues => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (data?.success) {
        setIsSuccessModalVisible(true);
        reset();
      } else if (data?.success == false) {
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="inline-flex w-full max-w-[600px] flex-col items-center justify-start gap-6
        rounded-lg bg-light-primary p-6 text-light-main dark:bg-dark-primary dark:text-dark-main"
      >
        <h2
          className="text-center font-ubuntu text-3xl font-bold leading-[1.1] 
        text-light-head dark:text-dark-accent"
        >
          Запропонувати подію
        </h2>
        <p
          className="text-pretty text-center font-roboto text-base font-normal 
        leading-snug text-light-main dark:text-dark-main"
        >
          Організовуєте фестиваль, виставу чи інший захід і хочете, щоб про це
          дізналося більше людей? Заповніть форму, і ми з вами зв&#39;яжемося.
          Розміщення подій абсолютно безкоштовне!
        </p>
        <TextField
          label="Введіть ваше ім'я"
          name="name"
          placeholder="Олег Вікторович"
          register={register}
          errors={errors}
        />
        <TextField
          label="Електронна пошта"
          name="email"
          placeholder="exemple@gmail.com"
          register={register}
          errors={errors}
        />
        <TextField
          label="Номер телефону"
          name="phone"
          placeholder="+380"
          register={register}
          errors={errors}
        />
        <TextField
          label="Месенджер"
          name="messenger"
          placeholder="Посилання або нік в телеграм"
          register={register}
          errors={errors}
        />
        <TextField
          label="Про подію"
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
          message={'Помилка відправлення форми'}
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
