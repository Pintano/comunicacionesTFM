import React, { MouseEvent, PropsWithChildren, forwardRef } from 'react';
import classNames from 'classnames';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import type { IconName } from '../../icono/icon-wrapper/icon-definitions';
import styles from './text-button.module.scss';
import useComponentsTranslation from '../../../hooks/use-translation';

export type TextButtonVariant = 'primary' | 'secondary' | 'unstyled';
export type TextButtonSize = 'default' | 'small';

export interface TextButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Icono opcional
   */
  icono?: IconName;
  /**
   * Función a ejecutar al hacer click
   */
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Estado deshabilitado
   * @default false
   */
  disabled?: boolean;
  /**
   * Variante visual
   * - 'primary': Texto con color primario y subrayado al hover (ex terciario)
   * - 'secondary': Texto con color secundario y subrayado al hover (ex cuaternario)
   * - 'unstyled': Sin estilos, hereda del padre (para elementos inline/custom)
   * @default 'primary'
   */
  variant?: TextButtonVariant;
  /**
   * Tamaño del botón (no aplica a unstyled)
   * @default 'default'
   */
  size?: TextButtonSize;
  /**
   * Clase CSS adicional
   */
  className?: string;
  /**
   * Texto de accesibilidad (aria-label)
   */
  'aria-label'?: string;
}

/**
 * TextButton es un botón para ejecutar acciones con apariencia de enlace o sin estilos.
 *
 * Casos de uso:
 * - Acciones que parecen enlaces pero no navegan (primary/secondary)
 * - Iconos o texto clickeable sin estilos de botón (unstyled)
 * - Elementos interactivos inline que heredan estilos del contexto
 */
export const TextButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<TextButtonProps>
>(function TextButton(
  {
    children,
    icono,
    disabled = false,
    variant = 'primary',
    size = 'default',
    className,
    'aria-label': ariaLabel,
    onClick,
    type = 'button',
    ...props
  },
  ref,
) {
  const { t } = useComponentsTranslation();

  const buttonClasses = classNames(
    styles['text-button'],
    variant !== 'unstyled' && styles[`text-button--${variant}`],
    variant !== 'unstyled' && styles[`text-button--${size}`],
    {
      [styles['text-button--disabled']]: disabled,
    },
    className,
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) onClick(e);
  };

  // For unstyled variant, only set aria-label if explicitly provided or children is not string
  const computedAriaLabel =
    variant === 'unstyled'
      ? ariaLabel ?? (typeof children === 'string' ? undefined : undefined)
      : ariaLabel ??
        (typeof children === 'string' ? undefined : t('textButton.ariaLabel'));

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      aria-label={computedAriaLabel}
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      {icono && <IconWrapper icono={icono} aria-hidden="true" />}
      <span className={styles['text-button__content']}>{children}</span>
    </button>
  );
});
