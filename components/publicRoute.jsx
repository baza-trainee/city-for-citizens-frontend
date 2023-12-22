'use client';

import { useRouter } from '@/navigation';
import { refresh } from '@/services/authAPI';

import { useEffect, useState } from 'react';
import Loader from './UI/Loader';

export const publicRoute = ({ component: Component, redirectTo }) =>
  function PublicRoute(props) {
    const [isValidToken, setIsValidToken] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const refreshToken = async () => {
        try {
          const { accessToken } = await refresh();

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            setIsValidToken(true);
            router.push(redirectTo);
          }
        } catch {
          setIsValidToken(false);
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
          <>{isValidToken ? null : <Component {...props} />}</>
        )}
      </>
    );
  };
