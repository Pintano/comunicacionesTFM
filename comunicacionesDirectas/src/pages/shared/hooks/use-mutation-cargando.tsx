import { useAppStore } from '@/shared/zustand/store';
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

export default function useMutationCargando<
  TData,
  TError,
  TVariables,
  TContext = unknown,
>(
  mutationKey: QueryKey,
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) {
  const empezarCarga = useAppStore((x) => x.empezarCarga);
  const terminarCarga = useAppStore((x) => x.terminarCarga);

  return useMutation({
    mutationKey,
    ...options,
    onMutate: async (...args) => {
      empezarCarga(mutationKey);
      if (options.onMutate) {
        return await options.onMutate(...args);
      }
    },
    onSuccess: (data, variables, context, mutationContext) => {
      if (options.onSuccess) {
        options.onSuccess(
          data,
          variables,
          context as TContext,
          mutationContext,
        );
      }
      terminarCarga(mutationKey);
    },
    onError: (error, variables, context, mutationContext) => {
      if (options.onError) {
        options.onError(
          error,
          variables,
          context as TContext,
          mutationContext,
        );
      }
      terminarCarga(mutationKey);
    },
    onSettled: (data, error, variables, context, mutationContext) => {
      if (options.onSettled) {
        options.onSettled(
          data,
          error,
          variables,
          context as TContext,
          mutationContext,
        );
      }
    },
  });
}
