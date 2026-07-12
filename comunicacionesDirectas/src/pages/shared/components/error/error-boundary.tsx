import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { TextButton } from 'tracasa-components';
import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import styles from '../tarjeta-carga/tarjeta-carga.module.css';

export default function CustomErrorBoundary({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className={styles['tarjeta-carga__container']}>
              <p>{t('shared.errores.noSePudoCargarLaSeccion')}</p>
              <TextButton onClick={resetErrorBoundary}>
                {t('shared.errores.recargarSeccion')}
              </TextButton>
            </div>
          )}
        >
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
