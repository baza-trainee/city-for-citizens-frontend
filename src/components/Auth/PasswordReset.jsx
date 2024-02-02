'use client';
import { publicRoute } from '@/components/publicRoute';
import { NAVIGATION } from '@/helpers/constants';
import { validateInput } from '@/helpers/validation';
import { useRouter } from '@/navigation';
import { usePasswordResetMutation } from '@/redux/api/authApi';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BasicModalWindows from '../Admin/ModalWindow/BasicModalWindows';
import Input from './Input';
import FormContainer from './FormContainer';
import FormAuth from './FormAuth';
import AuthButton from './AuthButton';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    password1: '',
    password2: '',
  });
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

    if (password1 !== password2) {
      setErrors('Паролі не співпадають');
      return;
    }

    if (!errors.password1 && !errors.password2) {
      try {
        const data = await passwordReset({
          newPassword: formData.password1,
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

  const togglePasswordVisibility = name => {
    if (name === 'password1') {
      setShowPassword1(prev => !prev);
    }
    if (name === 'password2') {
      setShowPassword2(prev => !prev);
    }
  };

  const { password1, password2 } = formData;

  return (
    <FormContainer>
      <h2 className="text-[40px] font-bold leading-[1]">{t('title')}</h2>
      <h3 className="text-lg font-semibold leading-[1.35]">
        Створіть новий пароль
      </h3>
      <FormAuth onSubmit={handleSubmit}>
        <Input
          label="Новий"
          value={password1}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password1"
          type={showPassword1 ? 'text' : 'password'}
          placeholder="Введіть пароль"
          errors={errors.password1}
          showPassword={showPassword1}
          togglePasswordVisibility={() => togglePasswordVisibility('password1')}
        />
        <Input
          label="Підтвердити пароль"
          value={password2}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password2"
          type={showPassword2 ? 'text' : 'password'}
          placeholder="Введіть пароль"
          errors={errors.password2}
          showPassword={showPassword2}
          togglePasswordVisibility={() => togglePasswordVisibility('password2')}
        />
        <div className="flex w-full justify-between">
          <AuthButton btnName="Повернутися" isLoading={isLoading} />
          <AuthButton btnName="Зберегти" isLoading={isLoading} />
        </div>
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
