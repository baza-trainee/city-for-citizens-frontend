'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useQueryParam(paramName) {
  const [paramValue, setParamValue] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has(paramName)) {
      setParamValue(searchParams.get(paramName).split(','));
    }
  }, [searchParams, paramName]);

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
      router.push(pathname, { scroll: false });
    }
  }, [paramName, paramValue, pathname, router, searchParams]);

  return [paramValue, setParamValue];
}
