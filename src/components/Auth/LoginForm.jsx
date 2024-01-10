'use client';
import { publicRoute } from '@/components/publicRoute';
import { FORM_STYLES, NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slice/authSlice';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const { formContainer, formBtn } = FORM_STYLES;

  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl font-bold">{t('title')}</h2>
      <form onSubmit={handleSubmit} className={formContainer}>
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

        {error && <p className="font-bold tracking-wide text-error">{error}</p>}
        <Link
          className="ml-2 underline underline-offset-2 hover:text-gray/30"
          href="/password-reset/request"
        >
          <u>{t('link')}</u>
        </Link>
        <button
          disabled={!isFormValid || isLoading}
          className={`${formBtn}
           ${
             !isFormValid || error
               ? 'cursor-not-allowed bg-gray/50 dark:bg-gray/20'
               : 'bg-primary/100 hover:bg-primary/80 dark:bg-gray/5 dark:hover:border-gray/10'
           }`}
        >
          {isLoading ? <LoadingButton /> : <>{t('buttonName')}</>}
        </button>
      </form>
    </div>
  );
};

export default publicRoute({
  component: LoginForm,
  redirectTo: NAVIGATION.admin,
});
