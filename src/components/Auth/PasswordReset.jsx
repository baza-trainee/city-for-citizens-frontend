'use client';
import { publicRoute } from '@/components/publicRoute';
import { NAVIGATION } from '@/helpers/constants';
import { validateInput } from '@/helpers/validation';
import { useRouter } from '@/navigation';
import { usePasswordResetMutation } from '@/redux/api/authApi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BasicModalWindows from '../Admin/ModalWindow/BasicModalWindows';
import Input from './Input';
import FormContainer from './FormContainer';
import FormAuth from './FormAuth';
import AuthButton from './AuthButton';
import BackLink from './BackLink';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    password1: '',
    password2: '',
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (!searchParam.has('token')) {
      router.push(NAVIGATION.login);
    }
  }, [router, searchParam]);

  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = e => {
    const { value, name } = e.target;
    validateInput(name, value, setErrors);
  };

  const isFormValid = formData.password1 === formData.password2;

  const handleSubmit = async e => {
    e.preventDefault();

    if (password1 !== password2) {
      setError('Паролі не співпадають');
      return;
    }

    if (
      !errors.password1 &&
      !errors.password2 &&
      formData.password1 === formData.password2
    ) {
      try {
        const data = await passwordReset({
          newPassword: formData.password2,
          token: searchParam.get('token'),
        }).unwrap();

        if (data) {
          setSuccessMessage(
            'Перейдіть за посиланням, відправленим у листі на Вашу пошту'
          );
          router.push(NAVIGATION.login);
        }
      } catch {
        setError(
          'Сталася помилка, пороль не відновлено, спробуйте ще раз відправити запит на скидання пороля, і перейти по посиланню яку прийде на е-пошту'
        );
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
    <FormContainer message={successMessage} error={error}>
      <h2 className="text-[40px] font-bold leading-[1]">Відновити пароль</h2>
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
          <BackLink />
          <AuthButton
            btnName="Зберегти"
            isFormValid={isFormValid}
            isLoading={isLoading}
          />
        </div>
      </FormAuth>
    </FormContainer>
  );
};

export default publicRoute({
  component: PasswordReset,
  redirectTo: NAVIGATION.admin,
});
