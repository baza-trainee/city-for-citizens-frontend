import PasswordReset from '@/components/authentication/password-reset';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <PasswordReset />
    </Suspense>
  );
}
