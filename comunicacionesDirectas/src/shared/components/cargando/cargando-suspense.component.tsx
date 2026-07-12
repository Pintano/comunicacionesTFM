import { IconoCarga } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { PropsWithChildren, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { default as generalStyles } from '@/shared/styles/general/general.module.css';

export default function CargandoSuspense({ children }: PropsWithChildren) {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className={generalStyles['overlay-cargando']}>
          <IconoCarga texto={t('palabras.cargando')} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
