import classNames from 'classnames';

import styles from './empty-state.module.scss';
import { PropsWithChildren } from 'react';
import { IconName } from '../icono/icon-wrapper/icon-definitions';
import { IconWrapper } from '../icono/icon-wrapper/icon-wrapper';
import { TextButton } from '../base/text-button/text-button';

export interface EmptyStateLink {
  texto: string;
  icono?: IconName;
  disabled?: boolean;
  onClick: () => void;
}
export interface EmptyStateProps {
  /**
   * Mostrar el contenido en una línea horizontal en lugar de columna
   * @default false
   */
  inline?: boolean;
  /**
   * Reducir el padding del eje Y de $space-5 a $space-2
   * @default false
   */
  compacto?: boolean;
  /**
   * Título opcional que se muestra encima del texto principal
   */
  titulo?: string;
  /**
   * Icono opcional que se muestra con el empty state
   */
  icono?: IconName;
  /**
   * Añadir fondo con color color/trans/blue-gray-50/8
   * @default false
   */
  background?: boolean;
  /**
   * Link opcional con texto y acción
   */
  link?: EmptyStateLink;
}

export const EmptyState = ({
  children,
  inline = false,
  compacto = false,
  titulo,
  icono,
  background = false,
  link,
}: PropsWithChildren<EmptyStateProps>) => {
  const containerClasses = classNames(styles['empty-state'], {
    [styles['empty-state--inline']]: inline,
    [styles['empty-state--compacto']]: compacto,
    [styles['empty-state--background']]: background,
  });

  return (
    <div className={containerClasses}>
      {icono && (
        <IconWrapper
          icono={icono}
          className={styles['empty-state__icono']}
          aria-hidden="true"
        />
      )}
      <div className={styles['empty-state__contenido']}>
        {titulo && <p className={styles['empty-state__titulo']}>{titulo}</p>}
        <p className={styles['empty-state__texto']}>{children}</p>
        {link && (
          <TextButton
            disabled={link.disabled}
            onClick={link.onClick}
            icono={link.icono}
            className={styles['empty-state__link']}
          >
            {link.texto}
          </TextButton>
        )}
      </div>
    </div>
  );
};
