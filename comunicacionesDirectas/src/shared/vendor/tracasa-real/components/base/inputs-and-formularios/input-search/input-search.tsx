import type {
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from 'react';
import { forwardRef, useState, useEffect } from 'react';
import useComponentsTranslation from '../../../../hooks/use-translation';
import { IconWrapper } from '../../../icono/icon-wrapper/icon-wrapper';
import classNames from 'classnames';
import styles from '../input/input.module.scss';
import { IconButton } from '../../icon-button/icon-button';

export interface InputSearchProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  textoAccesibilidad?: string;
  disabled?: boolean;
  autofoco?: boolean;
  onClear?: () => void;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      type = 'text',
      error,
      textoAccesibilidad,
      disabled,
      readOnly,
      id,
      autofoco = false,
      value,
      defaultValue,
      onChange,
      onClear,
      ...props
    },
    ref,
  ) => {
    const { t } = useComponentsTranslation();

    const [internalValue, setInternalValue] = useState(
      defaultValue ?? value ?? '',
    );

    const currentValue = value !== undefined ? value : internalValue;
    const isPopulated = Boolean(
      currentValue && String(currentValue).trim().length > 0,
    );
    const tooltipTitle =
      typeof currentValue === 'string' ? currentValue : undefined;

    const inputFieldClassName = classNames(
      styles['input__field'],
      styles['input__field--with-left-icon'],
      {
        [styles['input__field--error']]: error,
        [styles['input__field--populated']]: isPopulated,
        [styles['input__field--with-right-icon']]: isPopulated,
      },
      className,
    );

    useEffect(() => {
      if (value === undefined && defaultValue !== undefined) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternalValue(e.target.value);

      onChange?.(e);
    };

    const handleClear = (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
    ) => {
      e.stopPropagation();
      if (onClear) return onClear();
      if (onChange) {
        return onChange({
          target: { value: '' },
          currentTarget: { value: '' },
        } as ChangeEvent<HTMLInputElement>);
      }
      if (value === undefined) return setInternalValue('');
    };

    const handleClearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') handleClear(e);
    };

    return (
      <div className={styles.input}>
        <div className={styles['input__container']}>
          <span className={styles['input__icon-wrapper']} data-position="left">
            <IconWrapper icono="search" color={disabled ? 'gray' : 'black'} />
          </span>

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
            onChange={handleChange}
            onKeyDown={handleClearKeyDown}
            {...(value !== undefined ? { value } : { value: internalValue })}
            {...props}
          />

          {isPopulated && !disabled && (
            <span
              className={styles['input__icon-wrapper']}
              data-position="right"
            >
              <IconButton
                size="xs"
                icon="close"
                onClick={handleClear}
                className={styles['input__clear-button']}
                aria-label={t('base.input.clearButton')}
                tabIndex={-1}
              />
            </span>
          )}
        </div>
      </div>
    );
  },
);

InputSearch.displayName = 'InputSearch';
