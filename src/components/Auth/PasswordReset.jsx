'use client';
import { publicRoute } from '@/components/publicRoute';
import { FORM_STYLES, NAVIGATION } from '@/helpers/constants';
import { validateInput } from '@/helpers/validation';
import { useRouter } from '@/navigation';
import { usePasswordResetMutation } from '@/redux/api/authApi';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BasicModalWindows from '../Admin/ModalWindow/BasicModalWindows';
import { LoadingButton } from '../UI/LoadingButton';
import Input from './Input';
import FormContainer from './FormContainer';
import FormAuth from './FormAuth';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password: '',
  });
  const [errors, setErrors] = useState({
    password: '',
  });
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations('Admin.resetPswd');

  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (!searchParam.has('token')) {
      router.push(NAVIGATION.login);
    }
  }, [router, searchParam]);

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
        const data = await passwordReset({
          newPassword: formData.password,
          token: searchParam.get('token'),
        }).unwrap();

        if (data) {
          router.push(NAVIGATION.login);
        }
      } catch {
        setIsStatusMessageVisible(true);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const { formBtn } = FORM_STYLES;
  const { password } = formData;

  return (
    <FormContainer>
      <h2 className="text-[40px] font-bold leading-[1]">{t('title')}</h2>
      <h3 className="text-lg font-semibold leading-[1.35]">
        Створіть новий пароль
      </h3>
      <FormAuth onSubmit={handleSubmit}>
        <Input
          label={t('pswd')}
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('placeholderPswd')}
          errors={errors.password}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <button
          type="submit"
          className={`${formBtn} bg-primary/100 hover:bg-primary/80 dark:bg-gray/5`}
        >
          {isLoading ? <LoadingButton /> : t('buttonName')}
        </button>
      </FormAuth>
      {isStatusMessageVisible && (
        <BasicModalWindows onClose={() => setIsStatusMessageVisible(false)}>
          {'Сталася помилка... Спробуйте ще раз.'}
        </BasicModalWindows>
      )}
    </FormContainer>
  );
};

export default publicRoute({
  component: PasswordReset,
  redirectTo: NAVIGATION.admin,
});
