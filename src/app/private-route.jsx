'use client';

import useCheckTokenValidity from '@/hooks/useCheckTokenValidity';
import { useRouter } from '@/navigation';
import { useEffect } from 'react';

export default function privateRoute({ component: Component, redirectTo }) {
  return function PrivateRoute(props) {
    const { token, isLoggedIn, isLoading, isAccessToken } =
      useCheckTokenValidity(redirectTo);

    const router = useRouter();

    useEffect(() => {
      if (!token && !isLoggedIn && !isAccessToken) {
        router.push(redirectTo);
      }
    }, [isAccessToken, isLoading, isLoggedIn, router, token]);

    if (!token || !isLoggedIn) {
      return (
        <>
          {isLoading ? (
            <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-admin-backdrop text-[66px] text-admin-light_1">
              Loading....
            </div>
          ) : null}
        </>
      );
    }

    return <Component {...props} />;
  };
}
