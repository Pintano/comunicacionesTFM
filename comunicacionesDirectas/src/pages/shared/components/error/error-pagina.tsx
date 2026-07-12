import { PropsWithChildren, Suspense, useId } from 'react';
import CustomErrorBoundary from './error-boundary';
import { TarjetaCarga } from '../tarjeta-carga/tarjeta-carga';

export default function ErrorYSuspensePagina({ children }: PropsWithChildren) {
  return (
    <CustomErrorBoundary>
      <Suspense>{children}</Suspense>
    </CustomErrorBoundary>
  );
}

export function ErrorYSuspenseCargando({ children }: PropsWithChildren) {
  const id = useId();
  return (
    <CustomErrorBoundary>
      <Suspense key={id} fallback={<TarjetaCarga />}>
        {children}
      </Suspense>
    </CustomErrorBoundary>
  );
}
