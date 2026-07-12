import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef, useState, useEffect } from 'react';
import useComponentsTranslation from '../../../../hooks/use-translation';
import { IconWrapper } from '../../../icono/icon-wrapper/icon-wrapper';
import { IconName } from '../../../icono/icon-wrapper/icon-definitions';
import classNames from 'classnames';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  textoAccesibilidad?: string;
  disabled?: boolean;
  iconoIzquierda?: IconName;
  iconoDerecha?: IconName;
  autofoco?: boolean;
  maxLength?: number;
  textAlign?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error,
      textoAccesibilidad,
      disabled,
      readOnly,
      id,
      iconoIzquierda,
      iconoDerecha,
      autofoco = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      textAlign = 'left',
      ...props
    },
    ref,
  ) => {
    const { t } = useComponentsTranslation();

    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const currentValue = value !== undefined ? value : internalValue;
    const isPopulated = Boolean(
      currentValue && String(currentValue).trim().length > 0,
    );
    const tooltipTitle =
      typeof currentValue === 'string' ? currentValue : undefined;

    const inputFieldClassName = classNames(
      styles['input__field'],
      {
        [styles['input__field--error']]: error,
        [styles['input__field--populated']]: isPopulated,
        [styles['input__field--align-right']]: textAlign === 'right',
        [styles['input__field--with-left-icon']]: iconoIzquierda,
        [styles['input__field--with-right-icon']]: iconoDerecha,
      },
      className,
    );

    const inputIconClassName = classNames(styles['input__icon-wrapper'], {
      [styles['input__icon-wrapper--disabled']]: disabled,
    });

    useEffect(() => {
      if (value === undefined && defaultValue !== undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={styles.input}>
        <div className={styles['input__container']}>
          {iconoIzquierda && (
            <span className={inputIconClassName} data-position="left">
              <IconWrapper icono={iconoIzquierda} size="md" />
            </span>
          )}

          <input
            aria-label={
              !id ? textoAccesibilidad ?? t('base.input.ariaLabel') : undefined
            }
            aria-invalid={error ? true : undefined}
            className={inputFieldClassName}
            ref={ref}
            autoFocus={autofoco}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
            id={id}
            title={tooltipTitle}
            maxLength={maxLength}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={handleChange}
            {...props}
          />

          {iconoDerecha && (
            <span className={inputIconClassName} data-position="right">
              <IconWrapper icono={iconoDerecha} size="md" />
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
