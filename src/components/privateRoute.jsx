'use client';

import { useRouter } from '@/navigation';

import { useEffect } from 'react';

import { useCheckTokenValidity } from '@/hooks/useCheckTokenValidity';

export const privateRoute = ({ component: Component, redirectTo }) =>
  function PrivateRoute(props) {
    const { token, isLoggedIn, isLoading, isError } =
      useCheckTokenValidity(redirectTo);

    const router = useRouter();

    useEffect(() => {
      if (!token && !isLoggedIn && isError) {
        router.push(redirectTo);
      }
    }, [isError, isLoading, isLoggedIn, router, token]);

    if (!token || !isLoggedIn) {
      return (
        <>
          {isLoading ? (
            <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-gray/100/90 text-[66px] text-gray/5">
              Loading....
            </div>
          ) : null}
        </>
      );
    }

    return <Component {...props} />;
  };
