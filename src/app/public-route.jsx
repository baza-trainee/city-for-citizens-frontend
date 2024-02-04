'use client';

import { useRouter } from '@/navigation';

import { useEffect } from 'react';

import useCheckTokenValidity from '@/hooks/useCheckTokenValidity';

export default function publicRoute({ component: Component, redirectTo }) {
  return function PublicRoute(props) {
    const { token, isLoggedIn, isLoading } = useCheckTokenValidity(redirectTo);

    const router = useRouter();

    useEffect(() => {
      if (token && isLoggedIn) {
        router.push(redirectTo);
      }
    }, [isLoggedIn, router, token]);

    if (token && isLoggedIn) {
      return null;
    }

    return (
      <>
        {isLoading ? (
          <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-admin-backdrop text-[66px] text-admin-light_1">
            Loading....
          </div>
        ) : (
          <Component {...props} />
        )}
      </>
    );
  };
}
