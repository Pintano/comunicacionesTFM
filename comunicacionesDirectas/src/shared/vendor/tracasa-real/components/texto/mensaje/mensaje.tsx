import classNames from 'classnames';
import { IconWrapper } from '../../icono/icon-wrapper/icon-wrapper';
import type { IconName } from '../../icono/icon-wrapper/icon-definitions';
import { TextButton } from '../../base/text-button/text-button';
import { useTranslation } from 'react-i18next';
import styles from './mensaje.module.scss';
import { useState } from 'react';
import { IconButton } from '../../base/icon-button/icon-button';
import {
  InteractiveActions,
  useInteractiveText,
} from './use-interactive-text.hook';
import React from 'react';

export type MensajeVariant = 'info' | 'success' | 'warning' | 'error';
type MensajeMode = 'banner' | 'inline';
type MensajeLink = {
  texto: string;
  icono?: IconName;
  disabled?: boolean;
  onClick: () => void;
};

export type MensajeProps = {
  /**
   * Texto o contenido del mensaje a mostrar. Puede ser `string` o `ReactNode`.
   */
  message?: React.ReactNode;
  /**
   * Variante visual del mensaje
   * @default 'info'
   */
  variant?: MensajeVariant;
  /**
   * Modo de visualización del mensaje
   * - banner: Ocupa todo el ancho disponible con borde
   * - inline: Se integra en el flujo del contenido sin borde
   * @default 'banner'
   */
  mode?: MensajeMode;
  /**
   * Versión compacta con menor padding y gap
   * @default false
   */
  compact?: boolean;
  /**
   * Permite que el mensaje sea colapsable
   * @default false
   */
  collapsible?: boolean;

  /**
   * Estado inicial cuando es colapsable
   * @default false (colapsado)
   */
  defaultExpanded?: boolean;
  /**
   * Link opcional con texto, icono y acción
   */
  link?: MensajeLink;
  /**
   * Acciones inline usando tokens en el mensaje: {key}texto{/key}
   */
  inlineActions?: InteractiveActions;
  /**
   * Función callback para cerrar el mensaje
   * Si se proporciona, se muestra un botón de cerrar
   */
  onClose?: () => void;
  /**
   * Clase CSS adicional
   */
  className?: string;
};

const iconByVariant: Record<MensajeVariant, IconName> = {
  info: 'infoCircle',
  success: 'checkCircle',
  warning: 'warningCircle',
  error: 'errorCircle',
};

const tipoMensajeKey: Record<MensajeVariant, string> = {
  info: 'tiposMensajes.informativo',
  success: 'tiposMensajes.exito',
  warning: 'tiposMensajes.advertencia',
  error: 'tiposMensajes.error',
};

export const Mensaje = ({
  message,
  variant = 'info',
  mode = 'banner',
  compact = false,
  link,
  inlineActions,
  className,
  collapsible = false,
  defaultExpanded = false,
  onClose = undefined,
}: MensajeProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const isStringMessage = typeof message === 'string';
  const messageContent = isStringMessage
    ? useInteractiveText((message as string) || '', inlineActions)
    : null;
  const hasLink = isStringMessage && /<a\s+href=/.test((message as string) || '');

  const tipoMensajeAria = () =>
    t(tipoMensajeKey[variant] ?? tipoMensajeKey.info);

  const hasCompactLink = compact && !!link;

  const isCollapsible = collapsible && !onClose && mode === 'banner';
  const isClosable = !!onClose && !collapsible && mode === 'banner';

  const containerClasses = classNames(
    styles.mensaje,
    styles[`mensaje--${variant}`],
    {
      [styles['mensaje--inline']]: mode === 'inline',
      [styles['mensaje--compact']]: compact,
      [styles['mensaje--compact-link']]: hasCompactLink,
      [styles['mensaje--collapsed']]: isCollapsible && !isExpanded,
    },
    className,
  );


const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join(' ');
  }
  if (React.isValidElement(node)) {
    return extractText(node.props.children);
  }
  return '';
};

const stripHtml = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const renderCollapsedText = (node: React.ReactNode) => {
  const raw = typeof node === 'string' ? stripHtml(node) : extractText(node);
  const text = raw.replace(/\s+/g, ' ').trim();
  return text;
};


  return (
    <div
      data-testid="mensaje"
      aria-label={`${tipoMensajeAria()}: ${message || ''}`}
      aria-live="polite"
      tabIndex={0}
      aria-expanded={isCollapsible ? isExpanded : undefined}
      className={containerClasses}
    >
      <IconWrapper
        icono={iconByVariant[variant]}
        className={styles.mensaje__icon}
        aria-hidden="true"
      />
      <div className={styles.mensaje__content}>
        {message && (
          isStringMessage ? (
            <p className={styles.mensaje__text}>
              {hasLink ? (
                <span dangerouslySetInnerHTML={{ __html: message as string }} />
              ) : (
                messageContent
              )}
            </p>
          ) : (
            <div className={styles.mensaje__text}>
              {isCollapsible && !isExpanded ? (
                <span>{renderCollapsedText(message)}</span>
              ) : (
                message
              )}

            </div>
          )
        )}
        {link && (
          <TextButton
            disabled={link.disabled}
            onClick={link.onClick}
            icono={link.icono}
          >
            {link.texto}
          </TextButton>
        )}
      </div>
      {isClosable && (
        <IconButton
          icon="close"
          size="sm"
          aria-label={t('cerrarMensaje')}
          onClick={onClose}
          className={styles.mensaje__close}
        />
      )}
      {isCollapsible && (
        <IconButton
          icon={isExpanded ? 'chevronUp' : 'chevronDown'}
          size="sm"
          aria-label={isExpanded ? t('colapsarMensaje') : t('expandirMensaje')}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          className={styles.mensaje__close}
        />
      )}
    </div>
  );
};
