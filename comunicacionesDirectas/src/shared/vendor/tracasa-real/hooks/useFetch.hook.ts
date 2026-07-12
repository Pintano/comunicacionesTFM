import { useContext, useCallback } from 'react';
import { ErrorContext } from '../providers/error-context.provider';

export const useFetch = () => {
  const { setError } = useContext(ErrorContext);

  const fetch = useCallback(
    async <T>(fetchable: Promise<T> | (() => Promise<T>)) => {
      try {
        const promise =
          typeof fetchable === 'function' ? fetchable() : fetchable;
        return await promise;
      } catch (error) {
        setError(error);
        return Promise.reject(error);
      }
    },
    [setError],
  );

  return { fetch };
};

export default useFetch;
