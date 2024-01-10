'use client';
import { useState } from 'react';
import { usePasswordResetMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { publicRoute } from '@/components/publicRoute';
import { NAVIGATION } from '@/helpers/constants';
import { FORM_STYLES } from '@/helpers/constants';
import { LoadingButton } from '../UI/LoadingButton';
import { validateInput } from '@/helpers/validation';
import Input from './Input';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password: '',
  });
  const [errors, setErrors] = useState({
    password: '',
  });
  const t = useTranslations('Admin.resetPswd');
  const dispatch = useDispatch();

  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const handleChange = e => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    validateInput(name, value, setErrors, t);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!errors.password) {
      try {
        const data = await passwordReset(formData).unwrap();

        if (data) {
          dispatch(setCredentials(data));
          Cookies.set('accessToken', data.accessToken);
          router.push(NAVIGATION.admin);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { formContainer, formBtn } = FORM_STYLES;
  const { password } = formData;

  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl font-bold">{t('title')}</h2>
      <form className={formContainer} onSubmit={handleSubmit}>
        <Input
          label={t('pswd')}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="text"
          placeholder={t('placeholderPswd')}
          errors={errors.password}
        />
        <button
          type="submit"
          className={`${formBtn} bg-primary/100 hover:bg-primary/80 dark:bg-gray/5`}
        >
          {isLoading ? <LoadingButton /> : t('buttonName')}
        </button>
      </form>
    </div>
  );
};

export default publicRoute({
  component: PasswordReset,
  redirectTo: NAVIGATION.admin,
});
