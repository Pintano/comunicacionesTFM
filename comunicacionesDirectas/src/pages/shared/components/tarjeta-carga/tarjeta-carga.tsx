import { useTranslation } from 'react-i18next';
import styles from './tarjeta-carga.module.css';
import { IconoCarga } from 'C:/Users/ataberna/tracasa-components/src/index.ts';

export type TarjetaCargaProps = React.HTMLAttributes<HTMLDivElement> & {
  texto?: string | undefined;
  minimal?: boolean;
  maxHeight?: boolean;
};

export function TarjetaCarga({ texto = undefined }: TarjetaCargaProps) {
  const { t } = useTranslation();
  return (
    <div
      className={styles['tarjeta-carga__container']}
      role="alert"
      aria-live="polite"
      aria-label={texto ? texto : t('palabras.cargandoSinPuntos')}
    >
      <div className={styles['tarjeta-carga__container__imagen']}>
        <IconoCarga minimal />
      </div>
      {texto ? texto : t('palabras.cargandoSinPuntos')}
    </div>
  );
}
