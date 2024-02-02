'use client';
import { publicRoute } from '@/components/publicRoute';
import { FORM_STYLES, NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slice/authSlice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  validateInput,
  isValidEmail,
  isValidPassword,
} from '@/helpers/validation';
import Input from './Input';
import Cookies from 'js-cookie';
import FormContainer from './FormContainer';
import FormAuth from './FormAuth';

import { LoadingButton } from '../UI/LoadingButton';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations('Admin.loginForm');

  const router = useRouter();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    validateInput(name, value, setErrors, t);
  };

  const isFormValid =
    isValidEmail(formData.email) &&
    isValidPassword(formData.password, t) === true;

  const handleSubmit = async e => {
    e.preventDefault();

    if (!errors.email && !errors.password) {
      try {
        const data = await login(formData).unwrap();

        if (data) {
          dispatch(setCredentials(data));
          Cookies.set('accessToken', data.accessToken);
          router.push(NAVIGATION.admin);
        }
      } catch (error) {
        setError(t('error'));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const { email, password } = formData;
  const { formBtn } = FORM_STYLES;

  return (
    <FormContainer error={error}>
      <h2 className="text-[40px] font-bold leading-[1]">{t('title')}</h2>
      <FormAuth onSubmit={handleSubmit}>
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
          type={showPassword ? 'text' : 'password'}
          placeholder={t('placeholderPswd')}
          errors={errors.password}
          error={error}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <Link
          className="ml-2 underline underline-offset-2 hover:opacity-80"
          href="/password-reset/request"
        >
          <u>{t('link')}</u>
        </Link>
        <button
          disabled={!isFormValid || isLoading}
          className={`${formBtn} text-admin-light_3
           ${
             !isFormValid || error
               ? 'cursor-not-allowed bg-admin-light_0'
               : 'bg-admin-dark hover:opacity-90'
           }`}
        >
          {isLoading ? <LoadingButton /> : <>{t('buttonName')}</>}
        </button>
      </FormAuth>
    </FormContainer>
  );
};

export default publicRoute({
  component: LoginForm,
  redirectTo: NAVIGATION.admin,
});
