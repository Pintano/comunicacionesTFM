import styles from './button.module.scss';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import React, { useRef, useState, forwardRef } from 'react';
import classNames from 'classnames';
import {
  simularClickParaCerrarMenus,
  useDeteccionClickExterno,
} from '../../../hooks/use-deteccion-click-externo';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import useComponentsTranslation from '../../../hooks/use-translation';

export type ButtonProps = BaseButtonProps | OpcionesButtonProps;

function isOpcionesButton(
  conOpciones: ButtonProps['conOpciones'],
  props: ButtonProps,
): props is OpcionesButtonProps {
  return Boolean(conOpciones && 'opciones' in props);
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(function Button(
  {
    children,
    variant = 'secundario',
    color = 'default',
    size = 'default',
    disabled = false,
    type = 'button',
    wordSize = 'default',
    conOpciones = false,
    ...props
  },
  ref,
) {
  const buttonClasses = classNames(
    styles.button,
    styles[`button--${variant}` as keyof typeof styles],
    styles[`button--size--${size}`],
    disabled && styles[`button--${variant}--disabled` as keyof typeof styles],
    disabled && styles['button--disabled'],
    styles[`button--wordSize--${wordSize}` as keyof typeof styles],
    props.className,
  );

  if (!isOpcionesButton(conOpciones, props)) {
    return (
      <BaseButton
        {...props}
        className={buttonClasses}
        disabled={disabled}
        ref={ref}
        type={type}
        conOpciones={conOpciones}
        variant={variant}
        color={color}
        textoAccesibilidad={children?.toString()}
      >
        {children}
      </BaseButton>
    );
  }

  return (
    <OpcionesButton
      {...props}
      className={buttonClasses}
      disabled={disabled}
      ref={ref}
      type={type}
      variant={variant}
      color={color}
      textoAccesibilidad={children?.toString()}
    >
      {children}
    </OpcionesButton>
  );
});

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'principal' | 'secundario' | 'busqueda';
  /**
   * Color del botón
   * - 'default': Estilos normales del botón
   * - 'white': Texto/icono blanco
   * - 'transparent': Fondo siempre transparente
   */
  color?: 'default' | 'white' | 'transparent';
  size?: 'default' | 'small' | 'large';
  disabled?: boolean;
  conOpciones?: boolean;
  wordSize?: 'default' | 'small' | 'large';
  textoAccesibilidad?: string;
}

const BaseButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<BaseButtonProps>
>(function BaseButton(
  {
    children,
    disabled = false,
    type = 'button',
    textoAccesibilidad,
    conOpciones,
    ...props
  },
  ref,
) {
  const { t } = useComponentsTranslation();

  return (
    <button
      aria-label={textoAccesibilidad ?? t('button.ariaLabel')}
      disabled={disabled}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});

export interface ButtonOption {
  text: string;
  onClick: () => void;
}

interface OpcionesButtonProps extends BaseButtonProps {
  opciones: ButtonOption[];
}

const OpcionesButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<OpcionesButtonProps>
>(function OpcionesButton(
  {
    children,
    disabled = false,
    textoAccesibilidad,
    variant = 'principal',
    opciones,
    ...props
  },
  ref,
) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const refContenedor = useRef(null);

  useDeteccionClickExterno(refContenedor, () => {
    setDropdownOpen(false);
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDropdownOpen(!dropdownOpen);
    if (!disabled) {
      props.onClick?.(e);
    }
  };

  const { t } = useComponentsTranslation();

  return (
    <div className={styles.button__opciones__container} ref={refContenedor}>
      <BaseButton
        {...props}
        variant={variant}
        aria-label={textoAccesibilidad ?? t('button.ariaLabelBotonOpciones')}
        disabled={disabled}
        onClick={handleButtonClick}
        ref={ref}
      >
        {children}
        <IconWrapper
          icono={dropdownOpen ? 'buttonDropdownUp' : 'buttonDropdownDown'}
          size="sm"
        />
      </BaseButton>
      {dropdownOpen ? (
        <OptionsDropdown variant={variant} options={opciones} />
      ) : null}
    </div>
  );
});

export function OptionsDropdown({
  options,
}: {
  variant?: 'principal' | 'secundario' | 'busqueda';
  options: ButtonOption[];
}) {
  return (
    <ul className={styles.button__opciones}>
      {options.map((option) => (
        <li key={option.text}>
          <button
            aria-label={option.text}
            className={
              styles['button__opciones__option'] as keyof typeof styles
            }
            onClick={() => {
              option.onClick();
              simularClickParaCerrarMenus();
            }}
            type="button"
          >
            {option.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
