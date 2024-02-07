import AdminHeader from '@/components/admin-panel/common/admin-header';
import PasswordChangeForm from './password-change-form';

export default function PasswordChange() {
  return (
    <div>
      <AdminHeader title={'Змінити пароль'}></AdminHeader>

      <PasswordChangeForm />
    </div>
  );
}
