'use client';
import { Link, useRouter } from '@/navigation';
import { login } from '@/services/authAPI';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { publicRoute } from '@/components/publicRoute';

import { NAVIGATION } from '@/helpers/constants';

import Input from './Input';

// ... (imports and other code)

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const t = useTranslations('Admin.loginForm');
  const router = useRouter();

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password => password.length >= 8;

  const validateInput = (name, value) => {
    if (name === 'email') {
      if (!isValidEmail(value) && value.trim() !== '') {
        setErrors(prev => ({ ...prev, email: t('errorEmail') }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'password') {
      if (!isValidPassword(value) && value.trim() !== '') {
        setErrors(prev => ({ ...prev, password: t('errorPswd') }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when input changes
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await login(formData);
      const { accessToken } = res;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push(NAVIGATION.admin);
      }
    } catch (error) {
      setError(t('error'));
    }
  };

  const { email, password } = formData;

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[394px] flex-col items-center gap-[30px] py-4"
      >
        <Input
          label={t('email')}
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="text"
          placeholder={t('placeholderEmail')}
          errors={errors.email}
          error={error}
        />
        <Input
          label={t('pswd')}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          placeholder={t('placeholderPswd')}
          errors={errors.password}
          error={error}
        />

        {error && <p className="text-error">{error}</p>}
        <Link
          className="ml-2 underline underline-offset-2 hover:text-gray/30"
          href="/register"
        >
          <u>{t('link')}</u>
        </Link>
        <button className="mx-auto my-0 block w-full rounded-lg bg-primary/100 p-2.5 px-[40px] py-[10px] text-gray/0 hover:bg-primary/80 dark:border-gray/5 dark:bg-gray/5 dark:text-gray/100 dark:hover:border-gray/10 dark:hover:bg-gray/10">
          {t('buttonName')}
        </button>
      </form>
    </div>
  );
};

export default publicRoute({
  component: LoginForm,
  redirectTo: NAVIGATION.admin,
});
