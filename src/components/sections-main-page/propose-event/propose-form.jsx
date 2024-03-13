'use client';

import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('ProposeEvent');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
      setIsSending(true);
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
      } else if (!data?.success) {
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full max-w-[600px] flex-col items-center justify-start gap-[16px]
        rounded-lg bg-light-primary p-6 text-light-main dark:bg-dark-primary dark:text-dark-main"
      >
        <h2
          className="text-center  font-ubuntu text-[30px] font-bold leading-[1.1] text-light-head 
        dark:text-dark-accent tablet:text-[43px]"
        >
          {t('title')}
        </h2>
        <p
          className="mb-[4px] mt-[-4px] text-pretty text-center font-roboto text-base font-normal 
        leading-snug text-light-main dark:text-dark-main"
        >
          {t('lead')}
        </p>
        <TextField
          label={t('name')}
          name="name"
          placeholder={t('namePlaceholder')}
          register={register}
          errors={errors}
        />
        <TextField
          label={t('email')}
          name="email"
          placeholder={t('emailPlaceholder')}
          register={register}
          errors={errors}
        />
        <TextField
          label={t('phone')}
          name="phone"
          placeholder={t('phonePlaceholder')}
          register={register}
          errors={errors}
        />
        <TextField
          label={t('messenger')}
          name="messenger"
          placeholder={t('messengerPlaceholder')}
          register={register}
          errors={errors}
        />
        <TextField
          label={t('eventDescription')}
          name="eventDescription"
          placeholder={t('eventDescriptionPlaceholder')}
          register={register}
          errors={errors}
          type="textarea"
        />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-black px-6 py-3 font-roboto text-base font-medium leading-tight text-white shadow hover:bg-light-button-hover disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-button-default dark:text-dark-button-text dark:hover:bg-dark-button-hover"
          disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
        >
          {t('submit')}
        </button>
      </form>
      {isSuccessModalVisible && (
        <BasicModalWindows
          onClose={() => setIsSuccessModalVisible(false)}
          title={t('modalTitleSuccess')}
          type="success"
          message={t('modalSuccess')}
        ></BasicModalWindows>
      )}
      {isErrorModalVisible && (
        <BasicModalWindows
          onClose={() => setIsErrorModalVisible(false)}
          title={t('modalTitleError')}
          type="error"
          message={t('modalError')}
        ></BasicModalWindows>
      )}
      {isSending && (
        <div className="bg-primary/0/20 fixed left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-[1px] transition-all">
          <Loader text="Sending ..." />
        </div>
      )}
    </>
  );
}
