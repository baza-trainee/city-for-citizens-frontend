'use client';
import { useState } from 'react';

import { publicRoute } from '@/components/publicRoute';
import { FORM_STYLES, NAVIGATION } from '@/helpers/constants';
import { useRequestPasswordResetMutation } from '@/redux/api/authApi';
import { useTranslations } from 'next-intl';
import { LoadingButton } from '../UI/LoadingButton';
import Input from './Input';

const RequestPasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState(null);
  const t = useTranslations('Admin.requestPswd');

  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await requestPasswordReset(formData).unwrap();

      console.log('password reset');
    } catch (error) {
      setError(t('error'));
    }
  };

  const { email } = formData;

  const { formContainer, formBtn } = FORM_STYLES;
  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl font-bold">{t('title')}</h2>
      <form className={formContainer} onSubmit={handleSubmit}>
        <Input
          type="email"
          label={t('email')}
          name="email"
          value={email}
          placeholder={t('placeholderEmail')}
          onChange={handleChange}
          required
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`${formBtn} bg-primary/100 hover:bg-primary/80 dark:bg-gray/5`}
        >
          {isLoading ? <LoadingButton /> : t('buttonName')}
        </button>
        {error && <p className="font-bold tracking-wide text-error">{error}</p>}
      </form>
    </div>
  );
};

export default publicRoute({
  component: RequestPasswordReset,
  redirectTo: NAVIGATION.admin,
});