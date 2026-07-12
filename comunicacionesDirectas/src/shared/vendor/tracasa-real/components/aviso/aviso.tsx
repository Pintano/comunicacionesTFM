import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import styles from './aviso.module.scss';
import { Mensaje, MensajeVariant } from '../texto/mensaje/mensaje';

export interface AvisoProps {
  /**
   * Texto o contenido del mensaje a mostrar. Puede ser `string` o `ReactNode`.
   */
  message: React.ReactNode;
  /**
   * Tipo/variante del aviso (info, success, warning, error)
   * @default 'info'
   */
  variant?: MensajeVariant;
  /**
   * Duración en milisegundos antes de cerrar automáticamente
   * Si no se proporciona, el aviso no se cierra automáticamente
   */
  duration?: number;
  /**
   * Callback ejecutado cuando el aviso se cierra
   */
  onClose?: () => void;
  /**
   * Clase CSS adicional para el contenedor
   */
  className?: string;
}

export const Aviso = ({
  message,
  variant = 'info',
  duration,
  className,
  onClose,
}: AvisoProps) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const avisoRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible && avisoRef.current) {
      avisoRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!duration || closing || isHovered) return;

    timerRef.current = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, closing, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, 500);
  };

  if (!visible) return null;

  return (
    <div
      ref={avisoRef}
      className={classNames(className, styles.aviso__container, {
        [styles.fadeOut]: closing,
        [styles.fadeIn]: !closing,
      })}
      data-testid="aviso"
      role="alert"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Mensaje
        message={message}
        variant={variant}
        mode="banner"
        onClose={handleClose}
      />
    </div>
  );
};
