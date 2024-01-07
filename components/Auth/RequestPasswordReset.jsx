'use client';
import { useState } from 'react';
import { useRouter } from '@/navigation';
import { requestPasswordReset } from '@/services/authAPI';
import { useTranslations } from 'next-intl';
import { publicRoute } from '@/components/publicRoute';
import { NAVIGATION } from '@/helpers/constants';
import { FORM_STYLES } from '@/helpers/constants';
import Input from './Input';

const RequestPasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const t = useTranslations('Admin.requestPswd');

  const handleChange = e => {
    setError(null);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await requestPasswordReset(formData);
      const { accessToken } = res;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push(NAVIGATION.admin);
      }
    } catch (error) {
      console.log('error:', error.message);
      setError(t('error'));
    }
  };

  const { email } = formData;

  const { formContainer, formBtn } = FORM_STYLES;
  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl font-bold">{t('title')}</h2>
      <form className={formContainer} onSubmit={handleSubmit}>
        <Input
          type="email"
          label={t('email')}
          name="email"
          value={email}
          placeholder={t('placeholderEmail')}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className={`${formBtn} bg-primary/100 hover:bg-primary/80 dark:bg-gray/5`}
        >
          {t('buttonName')}
        </button>
        {error && <p className="text-error font-bold tracking-wide">{error}</p>}
      </form>
    </div>
  );
};

export default publicRoute({
  component: RequestPasswordReset,
  redirectTo: NAVIGATION.admin,
});
