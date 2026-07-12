import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

type PageErrorProps = Partial<FallbackProps>;

export const PageError = ({ error, resetErrorBoundary }: PageErrorProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('paginas.error.titutlo.title')}</h1>
      <div dangerouslySetInnerHTML={{ __html: error?.message }} />
      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary}>Reintentar</button>
      )}
    </div>
  );
};
