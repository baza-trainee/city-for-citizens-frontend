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

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password: '',
  });
  const [errors, setErrors] = useState({
    password: '',
  });
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(false);
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
      {isStatusMessageVisible && (
        <BasicModalWindows onClose={() => setIsStatusMessageVisible(false)}>
          {'Сталася помилка... Спробуйте ще раз.'}
        </BasicModalWindows>
      )}
    </div>
  );
};

export default publicRoute({
  component: PasswordReset,
  redirectTo: NAVIGATION.admin,
});
