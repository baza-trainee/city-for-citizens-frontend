'use client';
import { useState } from 'react';
import { useRequestPasswordResetMutation } from '@/redux/api/authApi';
import { validateInput, isValidEmail } from '@/helpers/validation';
import Input from './common/input';
import FormTitles from './common/form-titles';
import FormAuth from './common/form-auth';
import Button from '../common/button';
import GoBackLink from './common/go-back-link';
import FormContainer from './common/form-container';
import { LoadingButton } from '../common';

export default function RequestPasswordReset() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState('');

  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { value, name } = e.target;
    validateInput(name, value, setErrors);
  };

  const isFormValid = isValidEmail(formData.email);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await requestPasswordReset(formData).unwrap();

      setFormData({ email: '' });

      if (data) {
        setSuccessMessage(
          'Перейдіть за посиланням, відправленим у листі на Вашу пошту'
        );
      }
    } catch (error) {
      setError(
        'Надані облікові дані невірні. Будь ласка, перевірте свій e-mail та спробуйте ще раз.'
      );
    }
  };

  const { email } = formData;

  return (
    <FormContainer message={successMessage} error={error}>
      <FormTitles
        title="Забули пароль"
        subtitle="Вкажіть ваш email, щоб підтвердити особу"
      />
      <FormAuth onSubmit={handleSubmit}>
        <Input
          label="Ел. пошта"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="email"
          placeholder="Введіть ел. пошту"
          errors={errors.email}
          error={error}
        />
      </FormAuth>
      <div className="flex w-full justify-between">
        <GoBackLink />
        <Button
          type="button"
          className="w-[182px]"
          disabled={isLoading || !isFormValid}
          onClick={handleSubmit}
        >
          {isLoading ? <LoadingButton /> : '      Підтвердити'}

        </Button>
      </div>
    </FormContainer>
  );
}
