'use client';

import AdminHeader from '../AdminHeader';
import PasswordChangeForm from './PasswordChangeForm';
import { NAVIGATION } from '@/helpers/constants';

import { privateRoute } from '@/components/privateRoute';

const PasswordChange = () => {
  return (
    <div>
      <AdminHeader title={'Зміна пароля'}></AdminHeader>

      <PasswordChangeForm />
    </div>
  );
};

export default privateRoute({
  component: PasswordChange,
  redirectTo: NAVIGATION.login,
});
