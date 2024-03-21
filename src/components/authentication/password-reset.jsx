'use client';

import { NAVIGATION } from '@/helpers/constants';
import { validateInput, isValidPassword } from '@/helpers/validation';
import { useRouter } from '@/navigation';
import { usePasswordResetMutation } from '@/redux/api/authApi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Input from './common/input';
import FormContainer from './common/form-container';
import FormTitles from './common/form-titles';
import FormAuth from './common/form-auth';
import Button from '../common/button';
import GoBackLink from './common/go-back-link';
import { LoadingButton } from '../common';

export default function PasswordReset() {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    password1: '',
    password2: '',
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (!searchParam.has('token')) {
      router.push(NAVIGATION.login);
    }
  }, [router, searchParam]);

  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { value, name } = e.target;
    if (name === 'password2' && formData.password1 !== value) {
      setErrors(prev => ({ ...prev, [name]: 'Паролі не співпадають' }));
      return;
    }
    validateInput(name, value, setErrors);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (password1 !== password2) {
      return;
    }

    if (
      !errors.password1 &&
      !errors.password2 &&
      formData.password1 === formData.password2
    ) {
      try {
        const data = await passwordReset({
          newPassword: formData.password2,
          token: searchParam.get('token'),
        }).unwrap();

        if (data) {
          setSuccessMessage('Пароль успішно відновлено');
        }
      } catch (error) {
        setError(
          'Сталася помилка, пороль не відновлено, спробуйте ще раз відправити запит на скидання пороля, і перейти за посиланням, яке прийде на е-пошту'
        );
      }
    }
  };

  const isFormValid =
    isValidPassword(formData.password1) === true &&
    isValidPassword(formData.password2) === true &&
    formData.password1 === formData.password2;

  const { password1, password2 } = formData;

  return (
    <FormContainer message={successMessage} error={error}>
      <FormTitles title="Відновити пароль" subtitle="Створіть новий пароль" />
      <FormAuth onSubmit={handleSubmit}>
        <Input
          label="Новий пароль"
          value={password1}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password1"
          type="password"
          placeholder="Введіть пароль"
          errors={errors.password1}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
        />
        <Input
          label="Підтвердити пароль"
          value={password2}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password2"
          type="password"
          placeholder="Введіть пароль"
          errors={errors.password2}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
        />
        <div className="flex w-full justify-between">
          <GoBackLink />
          <Button
            type="button"
            className="w-[182px]"
            disabled={isLoading || !isFormValid}
            onClick={handleSubmit}
          >
            {isLoading ? <LoadingButton /> : 'Зберегти'}
          </Button>
        </div>
      </FormAuth>
    </FormContainer>
  );
}
