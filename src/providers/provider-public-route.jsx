'use client';

import publicRoute from '@/app/public-route';

import { NAVIGATION } from '@/helpers/constants';

function PublicProvider({ children }) {
  return <>{children}</>;
}

export default publicRoute({
  component: PublicProvider,
  redirectTo: NAVIGATION.admin,
});
