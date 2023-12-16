'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useQueryParam(paramName) {
  const [paramValue, setParamValue] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.size === 0) {
      setParamValue([]);
      return;
    }
    if (searchParams.has(paramName)) {
      setParamValue(searchParams.get(paramName).split(','));
    }
  }, [paramName, searchParams]);

  useEffect(() => {
    const createQueryString = (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    };

    if (paramValue.length !== 0) {
      router.push(
        pathname + '?' + createQueryString(paramName, paramValue),

        { scroll: false }
      );
    } else {
      const params = new URLSearchParams(searchParams);

      params.delete(paramName);
      router.push(pathname + '?' + params, { scroll: false });
    }
  }, [paramName, paramValue, pathname, router, searchParams]);

  return [paramValue, setParamValue];
}
