import React, { forwardRef, useState } from 'react';
import styles from './text-area.module.scss';
import classNames from 'classnames';
import useComponentsTranslation from '../../../../hooks/use-translation';

export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    placeholder?: string;
    invalid?: boolean;
    textoAccesibilidad?: string;
    maxLength?: number;
    autoHeight?: boolean;
  };

function obtenerFilas(rest: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return rest.rows ? rest.rows : 5;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      placeholder,
      invalid,
      textoAccesibilidad,
      maxLength,
      autoHeight,
      readOnly,
      ...rest
    },
    ref,
  ) {
    const [_currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
    const { t } = useComponentsTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentPlaceholder('');
      if (autoHeight) {
        handleAutoHeightChange(e);
      } else if (rest.onChange) {
        rest.onChange(e);
      }
    };

    const handleAutoHeightChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const el = e.target;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
      if (rest.onChange) rest.onChange(e);
    };

    return (
      <textarea
        {...rest}
        aria-label={textoAccesibilidad ?? t('textArea.ariaLabel')}
        className={classNames(
          styles['textarea'],
          rest.className,
          invalid && styles['textarea--error'],
          readOnly && styles['textarea--read-only'],
          autoHeight && styles['textarea--auto-height'],
        )}
        data-testid="custom-textarea"
        id={rest.id}
        maxLength={maxLength}
        readOnly={readOnly}
        onChange={handleChange}
        placeholder={placeholder}
        ref={ref}
        {...(!autoHeight ? { rows: obtenerFilas(rest) } : {})}
      />
    );
  },
);
