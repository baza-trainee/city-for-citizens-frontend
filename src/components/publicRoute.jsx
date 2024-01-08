'use client';

import { useRouter } from '@/navigation';

import { useEffect } from 'react';

import { useCheckTokenValidity } from '@/hooks/useCheckTokenValidity';

export const publicRoute = ({ component: Component, redirectTo }) => {
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
        {isLoading && (
          <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-gray/100/90 text-[66px] text-gray/5">
            Loading....
          </div>
        )}
        <Component {...props} />
      </>
    );
  };
};
