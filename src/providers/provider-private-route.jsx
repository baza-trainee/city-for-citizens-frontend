'use client';

import privateRoute from '@/app/private-route';

import { NAVIGATION } from '@/helpers/constants';

function AdminProvider({ children }) {
  return <>{children}</>;
}

export default privateRoute({
  component: AdminProvider,
  redirectTo: NAVIGATION.login,
});
