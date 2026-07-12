import { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './cabecera-principal.module.scss';
import {
  CabeceraLogo,
  CabeceraLogoProps,
} from '../cabecera-logo/cabecera-logo';

/**
 * Props para el componente CabeceraPrincipal
 */
export interface CabeceraPrincipalProps {
  /**
   * Props para renderizar el logo (url o children)
   */
  logoProps?: CabeceraLogoProps;

  /**
   * Título de la cabecera (aparece a la derecha del logo con separador)
   */
  title?: string;

  /**
   * Subtítulo opcional (aparece debajo del título)
   */
  subtitle?: string;

  /**
   * Contenido flexible del centro de la cabecera (children)
   * Ejemplo: InputSearch, BuscadorMenus, BusquedaRapida, etc.
   */
  children?: ReactNode;

  /**
   * Slot para acciones/botones en el extremo derecho
   * Ejemplo: IconButtonShape, botones de perfil, notificaciones, etc.
   */
  accionesSlot?: ReactNode;

  /**
   * Clase CSS adicional para personalización
   */
  className?: string;
}

/**
 * CabeceraPrincipal - Componente genérico de cabecera para aplicaciones
 *
 * Proporciona un layout consistente con:
 * - Logo (left)
 * - Título y subtítulo opcional (left, después del logo con separador)
 * - Contenido flexible mediante children (center, flex-grow)
 * - Acciones mediante accionesSlot (right)
 *
 * Este componente es agnóstico del contenido y permite composición flexible.
 *
 * @example
 * ```tsx
 * <CabeceraPrincipal
 *   logoProps={{ url: '/logo.svg' }}
 *   title="Mi Aplicación"
 *   accionesSlot={<IconButtonShape icon="user" />}
 * >
 *   <InputSearch />
 * </CabeceraPrincipal>
 * ```
 */
export const CabeceraPrincipal = ({
  logoProps,
  title,
  subtitle,
  children,
  accionesSlot,
  className,
}: PropsWithChildren<CabeceraPrincipalProps>) => {
  const hasTitleSection = title || subtitle;

  return (
    <div
      className={classNames(styles['cabecera-principal'], className)}
      role="banner"
    >
      <div className={styles['cabecera-principal__left']}>
        {logoProps && (
          <div className={styles['cabecera-principal__logo']}>
            <CabeceraLogo {...logoProps} />
          </div>
        )}

        {hasTitleSection && (
          <>
            {logoProps && (
              <div
                className={styles['cabecera-principal__separador']}
                aria-hidden="true"
              />
            )}
            <div className={styles['cabecera-principal__title-section']}>
              {title && (
                <h1 className={styles['cabecera-principal__title']}>{title}</h1>
              )}
              {subtitle && (
                <p className={styles['cabecera-principal__subtitle']}>
                  {subtitle}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {children && (
        <div className={styles['cabecera-principal__contenido']}>
          {children}
        </div>
      )}

      {accionesSlot && (
        <div className={styles['cabecera-principal__acciones']}>
          {accionesSlot}
        </div>
      )}
    </div>
  );
};

CabeceraPrincipal.displayName = 'CabeceraPrincipal';
