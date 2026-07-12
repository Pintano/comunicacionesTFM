import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import type { IconName } from '../../icono/icon-wrapper/icon-definitions';
import styles from './icon-button.module.scss';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Nombre del icono a mostrar
   */
  icon: IconName;
  /**
   * Tamaño del botón de icono
   * - 'xs': Botón extra pequeño (16px)
   * - 'sm': Botón pequeño (24px)
   * - 'md': Tamaño estándar (32px) - default
   * - 'lg': Botón grande (40px)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Color del botón de icono
   * - 'default': Estilos normales del botón de icono
   * - 'white': Icono blanco (para fondos oscuros)
   * - 'transparent': Fondo siempre transparente, solo cambia color del icono en hover/active
   */
  color?: 'default' | 'white' | 'transparent';
  /**
   * Texto descriptivo para accesibilidad - OBLIGATORIO
   */
  'aria-label': string;
  /**
   * Si el botón está deshabilitado
   */
  disabled?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      size = 'md',
      color = 'default',
      'aria-label': ariaLabel,
      className,
      disabled = false,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const iconSizeMap = {
      xs: 'sm' as const,
      sm: 'sm' as const,
      md: 'md' as const,
      lg: 'md' as const,
    } as const;

    const iconSize = iconSizeMap[size];

    const buttonClasses = classNames(
      styles['icon-button'],
      styles[`icon-button--${size}`],
      {
        [styles['icon-button--white']]: color === 'white',
        [styles['icon-button--transparent']]: color === 'transparent',
        [styles['icon-button--disabled']]: disabled,
      },
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        aria-label={ariaLabel}
        disabled={disabled}
        {...props}
      >
        <IconWrapper icono={icon} size={iconSize} />
      </button>
    );
  },
);
