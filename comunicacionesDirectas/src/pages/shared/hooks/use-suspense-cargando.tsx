import { useEffect } from 'react';
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';
import { useAppStore } from '@/shared/zustand/store';

export function useSuspenseQueryCargando<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, QueryKey>) {
  const terminarCarga = useAppStore((x) => x.terminarCarga);
  const empezarCarga = useAppStore((x) => x.empezarCarga);

  const queryResult = useSuspenseQuery(options);

  useEffect(() => {
    if (queryResult.isFetching) {
      empezarCarga(options.queryKey);
    } else {
      terminarCarga(options.queryKey);
    }
  }, [queryResult.isFetching, terminarCarga, empezarCarga, options.queryKey]);

  return queryResult;
}
