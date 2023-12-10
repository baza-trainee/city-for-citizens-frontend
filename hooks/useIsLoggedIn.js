import { refresh } from '@/services/authAPI';
import { useEffect, useState } from 'react';

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      setIsToken(false);
      return;
    }
    setIsToken(true);

    const refreshToken = async () => {
      setIsLoading(true);
      try {
        const { accessToken } = await refresh();

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setError(error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    refreshToken();
  }, []);
  return { isLoggedIn, isToken, isLoading, error };
}
