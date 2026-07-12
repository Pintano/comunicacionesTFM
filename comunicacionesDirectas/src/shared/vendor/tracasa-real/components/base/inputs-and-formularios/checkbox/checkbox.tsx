import styles from './checkbox.module.scss';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import React, {
  forwardRef,
  useEffect,
  useId,
  InputHTMLAttributes,
  useRef,
  useState,
  RefObject,
} from 'react';
import classNames from 'classnames';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  textoAccesibilidad: string;
  texto?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  parentId?: string;
  checkboxSize?: 'small' | 'medium' | 'large';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      id: idProp,
      parentId,
      checkboxSize = 'medium',
      indeterminate: indeterminateProp,
      error,
      readOnly,
      className,
      disabled,
      textoAccesibilidad,
      checked: checkedProp,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useState<boolean>(checkedProp ?? false);
    const [indeterminate, setIndeterminate] = useState<boolean | undefined>(
      indeterminateProp,
    );
    const checkboxRef =
      (ref as RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

    const id = `checkbox-${parentId ? parentId : useId()}-${idProp ?? useId()}`;

    const DEFAULT_ACCESSIBILITY_LABEL = 'checkbox-accessibility-text';

    const cambiarValorIndeterminate = (valor: boolean) => {
      if (!checkboxRef?.current) return;

      checkboxRef.current.indeterminate = valor;
      setIndeterminate(valor);
    };

    useEffect(() => {
      cambiarValorIndeterminate(!!indeterminateProp);
    }, [indeterminateProp]);

    useEffect(() => {
      if (checkedProp === undefined || checkedProp === checked) return;

      setChecked(checkedProp);
    }, [checkedProp]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (indeterminate) {
        cambiarValorIndeterminate(!indeterminate);
        props.onChange?.(e);
        return;
      }

      const newChecked = e.target.checked;
      setChecked(newChecked);
      props.onChange?.(e);
    };

    const labelClasses = classNames(
      styles['checkbox__label'],
      styles[`checkbox__label--${checkboxSize}`],
    );

    const inputClasses = classNames(
      styles['checkbox__input'],
      {
        [styles['checkbox__input--error']]: error,
      },
      className,
    );

    const textClasses = classNames(
      styles['checkbox__text'],
      styles[`checkbox__text--${checkboxSize}`],
    );

    return (
      <label className={styles['checkbox']}>
        <input
          {...props}
          id={id}
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          data-testid={id}
          onChange={handleCheckboxChange}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          className={inputClasses}
          aria-label={textoAccesibilidad || DEFAULT_ACCESSIBILITY_LABEL}
        />
        <div className={labelClasses}>
          {indeterminate ? (
            <IconMinus className={styles['checkbox__icon']} />
          ) : checked ? (
            <IconCheck className={styles['checkbox__icon']} />
          ) : (
            <svg
              className={styles['checkbox__icon']}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            />
          )}
        </div>
        {props.texto ? (
          <span className={textClasses}>{props.texto}</span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
