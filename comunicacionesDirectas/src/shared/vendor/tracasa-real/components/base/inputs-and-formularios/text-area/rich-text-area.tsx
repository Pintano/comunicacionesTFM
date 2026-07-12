import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './text-area.module.scss';
import classNames from 'classnames';
import useComponentsTranslation from '../../../../hooks/use-translation';

export type RichTextAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  placeholder?: string;
  invalid?: boolean;
  textoAccesibilidad?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const RichTextArea = forwardRef<HTMLDivElement, RichTextAreaProps>(
  function RichTextArea(
    {
      placeholder,
      invalid,
      textoAccesibilidad,
      maxLength,
      className,
      value,
      onChange,
      readOnly,
      disabled,
      autoFocus,
      ...rest
    },
    ref,
  ) {
    const { t } = useComponentsTranslation();
    const divRef = useRef<HTMLDivElement | null>(null);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      if (autoFocus && divRef.current) {
        divRef.current.focus();
      }
    }, [autoFocus]);

    // Sync value from outside
    useEffect(() => {
      if (
        divRef.current &&
        value !== undefined &&
        divRef.current.innerHTML !== value
      ) {
        divRef.current.innerHTML = value;
      }
    }, [value]);

    const handleInput = () => {
      const content = divRef.current?.innerHTML || '';
      if (maxLength && content.length > maxLength) {
        divRef.current!.innerHTML = content.slice(0, maxLength);
      }
      const contenido = divRef.current?.innerHTML || '';
      if (contenido === '<br>' || contenido === '<p><br></p>') {
        divRef.current!.innerHTML = '';
      }
      onChange?.(
        contenido !== '<br>' && contenido !== '<p><br></p>' ? contenido : '',
      );
    };

    function isContentEmpty(html?: string): boolean {
      if (!html) return true;
      const text = html.replace(/<[^>]+>/g, '').trim();
      return text.length === 0;
    }

    return (
      <div>
        <div
          {...rest}
          ref={(el) => {
            divRef.current = el;
            if (typeof ref === 'function') ref(el);
          }}
          aria-label={textoAccesibilidad ?? t('textArea.ariaLabel')}
          className={classNames(
            styles['textarea'],
            className,
            invalid && styles['textarea--error'],
            readOnly && styles['textarea--read-only'],
            disabled && styles['textarea--disabled'],
          )}
          contentEditable={!disabled && !readOnly}
          data-testid="custom-rich-textarea"
          onInput={handleInput}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={{
            minHeight: '100px',
            outline: 'none',
            ...rest.style,
          }}
        />
        {isContentEmpty(value) && !focused && !value && placeholder && (
          <div className={styles['rich-editor__placeholder']}>
            {placeholder}
          </div>
        )}
      </div>
    );
  },
);
