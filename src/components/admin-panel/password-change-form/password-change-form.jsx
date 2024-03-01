'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import Input from '@/components/admin-panel/password-change-form/Input';
import { BasicModalWindows } from '@/components/common';
import Button from '@/components/common/button';
import Loader from '@/components-old/UI/Loader';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const passwordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Поточний пароль обов'язковий")
    .min(8, 'Пароль повинен містити щонайменше 8 символів')
    .max(32, 'Пароль не повинен перевищувати 32 символи')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Пароль повинен містити принаймні одну цифру, одну маленьку та велику літеру'
    ),
  newPassword: Yup.string()
    .required("Новий пароль обов'язковий")
    .min(8, 'Пароль повинен містити щонайменше 8 символів')
    .max(32, 'Пароль не повинен перевищувати 32 символи')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Новий пароль повинен містити принаймні одну цифру, одну маленьку та велику літеру'
    )
    .notOneOf(
      [Yup.ref('oldPassword')],
      'Новий пароль не може бути таким самим, як поточний пароль'
    ),
  confirmPassword: Yup.string()
    .required("Новий пароль ще раз обов'язковий")
    .oneOf([Yup.ref('newPassword'), null], 'Паролі повинні співпадати'),
});

const PasswordChangeForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
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
    resolver: yupResolver(passwordChangeSchema),
  });

  const handleOpenModal = async () => {
    const isValid = await trigger();

    if (isDirty && isValid) {
      setIsModalVisible(true);
    }
  };

  const onSubmit = async formValues => {
    try {
      const response = await changePassword(formValues);

      if (response) {
        setIsModalVisible(false);
      }

      if (response?.data?.status === 'success') {
        setIsSuccessModalVisible(true);
      } else {
        setErrorMessage(response?.error?.data?.message);
        setIsErrorModalVisible(true);
      }

      reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="pl-[58px] pt-[48px]"
      >
        <div className="flex max-w-[351px] flex-col items-start gap-[64px]">
          <Input
            type="password"
            name="oldPassword"
            label="Поточний пароль"
            placeholder=""
            register={register}
            errors={errors}
          />
          <Input
            type="password"
            name="newPassword"
            label="Новий пароль"
            placeholder=""
            register={register}
            errors={errors}
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Новий пароль ще раз"
            placeholder=""
            register={register}
            errors={errors}
          />
        </div>
        <div className="mt-[64px] flex gap-4">
          <Button
            type="button"
            variant="outlined"
            className="max-w-[182px]"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            Скасувати
          </Button>
          <Button
            type="button"
            className="w-[252px]"
            disabled={
              isSubmitting || !isDirty || Object.keys(errors).length > 0
            }
            onClick={handleOpenModal}
          >
            Змінити пароль
          </Button>
        </div>

        {isModalVisible && (
          <BasicModalWindows
            onClose={() => setIsModalVisible(false)}
            title={'Змінити пароль'}
            message={
              'Зверніть увагу, що зміна паролю може вплинути на ваш доступ до адмінпанелі. Впевнені, що хочете продовжити?'
            }
          >
            <div className=" flex gap-4">
              <Button
                type="button"
                variant="outlined"
                className="max-w-[182px]"
                onClick={() => setIsModalVisible(false)}
              >
                Скасувати
              </Button>
              <Button
                type="submit"
                className="max-w-[181px] text-nowrap"
                disabled={isLoading}
              >
                Підтвердити
              </Button>
            </div>
          </BasicModalWindows>
        )}
      </form>

      {isSuccessModalVisible && (
        <BasicModalWindows
          onClose={() => setIsSuccessModalVisible(false)}
          title={'Успіх!'}
          type="success"
          message={'Ваші зміни успішно збережено!'}
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
      {isLoading && (
        <div className="bg-primary/0/20 fixed flex h-full w-full items-center justify-center backdrop-blur-[1px]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default PasswordChangeForm;
