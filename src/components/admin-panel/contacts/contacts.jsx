'use client';

import React, { useState, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/admin-panel/password-change-form/Input';
import Button from '@/components/common/button';
import Loader from '@/components-old/UI/Loader';
import { BasicModalWindows } from '@/components/common';
import { useUpdateContactsMutation } from '@/redux/api/contactsApi';
import { validationContactsSchema } from '@/components/admin-panel/contacts/validationContactsSchema';
import { formatDateToDMY } from '@/helpers/formatDate';

function Header(props) {
  return (
    <div className="text-neutral-900 mb-[17px] w-full  bg-admin-side_bar bg-opacity-50 py-[15px] text-center text-lg font-normal text-admin-dark">
      {props.text}
    </div>
  );
}

function FirstColumn(props) {
  return (
    <div className="flex  w-full justify-self-start bg-white py-[12px] pl-[58px]">
      <Input
        label={props.label}
        name={props.name}
        register={props.register}
        errors={props.errors}
      />
    </div>
  );
}

function SecondColumn(props) {
  return (
    <div className="flex items-center justify-center bg-white text-admin-dark">
      {props.date}
    </div>
  );
}

export default function Contacts({ fetchedContacts, onContactsUpdate }) {
  const [updateContacts, { isLoading }] = useUpdateContactsMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const defaultValues = {
    firstPhone: fetchedContacts[0].firstPhone,
    secondPhone: fetchedContacts[0].secondPhone,
    email: fetchedContacts[0].email,
    updatedAt: formatDateToDMY(fetchedContacts[0].updatedAt),
  };

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationContactsSchema),
  });

  const onSubmit = async formValues => {
    const { email, firstPhone, secondPhone } = formValues;
    try {
      const response = await updateContacts({
        body: { email, firstPhone, secondPhone },
      });

      if (response) {
        setIsModalVisible(false);
      }

      if (response?.data?.status === 'success') {
        setIsSuccessModalVisible(true);

        onContactsUpdate(() => {
          reset(defaultValues);
        });
      } else {
        setErrorMessage(response?.error?.data?.message);
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onCancel = () => {
    reset(defaultValues);
  };

  const handleOpenModal = async () => {
    const isValid = await trigger();

    if (isDirty && isValid) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mx-[20px] grid max-w-[1042px] grid-cols-2 gap-y-[36px]"
      >
        <Header text={'Перелік контактів'} />
        <Header text={'Дата оновлення'} />

        <FirstColumn
          label="Номер телефону 1"
          name="firstPhone"
          register={register}
          errors={errors}
          defaultValue={defaultValues.firstPhone}
        />
        <SecondColumn date={defaultValues.updatedAt} />

        <FirstColumn
          label="Номер телефону 2"
          name="secondPhone"
          register={register}
          errors={errors}
          defaultValue={defaultValues.secondPhone}
        />
        <SecondColumn date={defaultValues.updatedAt} />

        <FirstColumn
          label="E-mail"
          name="email"
          register={register}
          errors={errors}
          defaultValue={defaultValues.email}
        />
        <SecondColumn date={defaultValues.updatedAt} />
        <div className="col-span-2 mt-[42px] flex gap-4 pl-[58px]">
          <Button
            type="button"
            variant="outlined"
            className="w-[182px]"
            onClick={onCancel}
          >
            Скасувати
          </Button>
          <Button
            type="button"
            className="w-[182px]"
            disabled={
              isSubmitting || !isDirty || Object.keys(errors).length > 0
            }
            onClick={handleOpenModal}
          >
            Оновити
          </Button>
        </div>

        {isModalVisible && (
          <BasicModalWindows
            onClose={() => setIsModalVisible(false)}
            title={'Оновити контакти'}
            message={'Впевнені, що хочете продовжити?'}
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
          onClose={() => {
            reset(defaultValues);
            setIsSuccessModalVisible(false);
          }}
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
}
