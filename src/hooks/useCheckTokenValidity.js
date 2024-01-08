import { useRouter } from '@/navigation';
import { useLazyRefreshQuery } from '@/redux/api/authApi';
import { resetState, setCredentials } from '@/redux/slice/authSlice';
import { selectIsLoggedIn, selectToken } from '@/redux/slice/selectors';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCheckTokenValidity = redirectTo => {
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();

  const [refresh, { isLoading, isError }] = useLazyRefreshQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await refresh().unwrap();
        if (!isError) {
          dispatch(setCredentials(response));
        }
      } catch {
        if (isError) {
          router.push(redirectTo);
          dispatch(resetState());
          Cookies.remove('accessToken');
        }
      }
    };

    if (Cookies.get('accessToken') && !token && !isLoggedIn) {
      checkTokenValidity();
    }
  }, [dispatch, isError, isLoggedIn, redirectTo, refresh, router, token]);

  return { token, isLoggedIn, isLoading };
};
