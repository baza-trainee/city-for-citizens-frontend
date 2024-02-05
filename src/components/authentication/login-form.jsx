'use client';

import { NAVIGATION } from '@/helpers/constants';
import {
  isValidEmail,
  isValidPassword,
  validateInput,
} from '@/helpers/validation';
import { Link, useRouter } from '@/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slice/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';

import Input from './common/input';
import AuthButton from './common/auth-button';
import FormContainer from './common/form-container';
import FormTitle from './common/form-title';
import FormAuth from './common/form-auth';

export default function LoginForm() {
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

  const router = useRouter();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    validateInput(name, value, setErrors);
  };

  const isFormValid =
    isValidEmail(formData.email) && isValidPassword(formData.password) === true;

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
        setError(
          'Надані облікові дані невірні. Будь ласка, перевірте свій логін і пароль та спробуйте ще раз.'
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const { email, password } = formData;

  return (
    <FormContainer error={error}>
      <FormTitle title="Вхід" />
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
        <Input
          label="Пароль"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Введіть пароль"
          errors={errors.password}
          error={error}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <Link
          className="ml-2 text-lg leading-[1.35] underline underline-offset-2 hover:opacity-80"
          href="/password-reset/request"
        >
          <u>Забули пароль?</u>
        </Link>
        <AuthButton
          btnName="Увійти"
          isFormValid={isFormValid}
          isLoading={isLoading}
          error={error}
        />
      </FormAuth>
    </FormContainer>
  );
}
