import React, { forwardRef } from 'react';

import type { IconName } from '../../icono/icon-wrapper/icon-definitions';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import classNames from 'classnames';
import styles from './icon-button-shape.module.scss';

export interface IconButtonShapeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Nombre del icono a mostrar
   */
  icon: IconName;
  /**
   * Forma del botón
   * - 'circle': Botón circular
   * - 'square': Botón cuadrado con bordes redondeados
   */
  shape: 'circle' | 'square';
  /**
   * Tamaño del botón
   * - 'md': Mediano (default)
   * - 'lg': Grande
   */
  size?: 'md' | 'lg';
  /**
   * Variante de color del botón
   * - 'primary': Color primario del sistema
   * - 'secondary': Color secundario
   * - 'tertiary': Color terciario
   * - 'quaternary': Color cuaternario
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  /**
   * Texto descriptivo para accesibilidad - OBLIGATORIO
   */
  'aria-label': string;
  /**
   * Si el botón está deshabilitado
   */
  disabled?: boolean;
}
export const IconButtonShape = forwardRef<
  HTMLButtonElement,
  IconButtonShapeProps
>(function IconButtonShape(
  {
    icon,
    shape,
    size = 'md',
    variant = 'primary',
    'aria-label': ariaLabel,
    className,
    ...props
  },
  ref,
) {
  const iconSizeMap = {
    md: 'md' as const,
    lg: 'lg' as const,
  } as const;

  const iconSize = iconSizeMap[size];

  const shapeClasses = classNames(
    styles['icon-button-shape'],
    styles[`icon-button-shape--${shape}`],
    styles[`icon-button-shape--size--${size}`],
    styles[`icon-button-shape--${variant}`],
    props.disabled && styles['icon-button-shape--disabled'],
    props.disabled && styles[`icon-button-shape--${variant}--disabled`],
    className,
  );

  return (
    <button
      ref={ref}
      className={shapeClasses}
      aria-label={ariaLabel}
      type="button"
      {...props}
    >
      <IconWrapper icono={icon} size={iconSize} />
    </button>
  );
});
