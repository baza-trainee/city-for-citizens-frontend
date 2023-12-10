'use client';

import { useEffect, useState } from 'react';

import { useRouter } from '@/navigation';
import { refresh } from '@/services/authAPI';
import Loader from './Loader';

export const privateRoute = ({ component: Component, redirectTo }) =>
  function PrivateRoute(props) {
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push(redirectTo);
        return;
      }

      const refreshToken = async () => {
        try {
          const { accessToken } = await refresh();

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            setIsValidToken(true);
            setIsLoading(false);
          }
        } catch {
          setIsValidToken(false);
          router.push(redirectTo);
        } finally {
          setIsLoading(false);
        }
      };

      refreshToken();
    }, [router]);

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>{isValidToken ? <Component {...props} /> : null}</>
        )}
      </>
    );
  };
