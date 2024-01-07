'use client';
import { Link, useRouter } from '@/navigation';
import { login } from '@/services/authAPI';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { publicRoute } from '@/components/publicRoute';

import { NAVIGATION } from '@/helpers/constants';

import Input from './Input';

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
  const [showPassword, setShowPassword] = useState(false);

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
    setError(null);
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const isFormValid =
    isValidEmail(formData.email) && isValidPassword(formData.password);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

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

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const { email, password } = formData;

  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl font-bold">{t('title')}</h2>
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
        <div className="relative w-full">
          <Input
            label={t('pswd')}
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('placeholderPswd')}
            errors={errors.password}
            error={error}
          />
          <span
            onClick={togglePasswordVisibility}
            className={`absolute right-3.5 flex h-[24px] w-[24px] items-center justify-center bg-gray/5 ${
              errors.password ? 'top-1/2 -translate-y-1/2' : 'top-1/2'
            } transform cursor-pointer`}
          >
            <FontAwesomeIcon
              className="text-primary/80 dark:text-primary/80"
              icon={showPassword ? faEyeSlash : faEye}
            />
          </span>
        </div>

        {error && <p className="text-error">{error}</p>}
        <Link
          className="ml-2 underline underline-offset-2 hover:text-gray/30"
          href="/register"
        >
          <u>{t('link')}</u>
        </Link>
        <button
          disabled={!isFormValid}
          className={`mx-auto my-0 block w-full rounded-lg p-2.5 px-[40px]
           py-[10px] text-gray/0 dark:border-gray/5 
            dark:text-gray/100  dark:hover:bg-gray/10
           ${
             !isFormValid || error
               ? 'cursor-not-allowed bg-gray/50 dark:bg-gray/20'
               : 'bg-primary/100 hover:bg-primary/80 dark:bg-gray/5 dark:hover:border-gray/10'
           }`}
        >
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
