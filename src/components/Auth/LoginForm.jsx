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
import IconEyeOpen from '../UI/icons/eyes/IconEyeOpen';
import IconEyeClose from '../UI/icons/eyes/IconEyeClose';
import { LoadingButton } from '../UI/LoadingButton';
import ErrorMessage from './ErrorMessage';

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
    <FormContainer>
      {error && <ErrorMessage error={error} />}
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
            className={`absolute right-3 flex h-[24px] w-[24px] items-center justify-center bg-gray/5 ${
              errors.password ? 'top-1/2 -translate-y-1/2' : 'top-1/2'
            } transform cursor-pointer`}
          >
            {showPassword ? <IconEyeOpen /> : <IconEyeClose />}
          </span>
        </div>

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
               ? 'bg-admin-light_0 cursor-not-allowed'
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
