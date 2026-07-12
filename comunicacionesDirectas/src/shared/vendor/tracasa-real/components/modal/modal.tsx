import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { ModalContext } from './modal-context';
import { ModalHeader } from './modal-header';
import { ModalBody } from './modal-body';
import { ModalFooter } from './modal-footer';
import styles from './modal.module.scss';

export interface ModalProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  isOpen: boolean;
  disableCloseOnClickOutside?: boolean;
  size?: 'medium' | 'large' | 'full' | 'wide' | 'fit';
  variant?: 'default' | 'compact';
  onClose: () => void;
}

export const Modal = ({
  className,
  isOpen,
  children,
  size = 'medium',
  variant = 'default',
  disableCloseOnClickOutside,
  onClose,
  ...props
}: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    setModalRoot(root);

    return () => {
      document.body.removeChild(root);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (disableCloseOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest('[class*="popup"]') ||
        target?.closest('[data-popup]') ||
        target?.closest('.popup')
      ) {
        return;
      }

      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl?.closest(`.${styles.modal__content}`) &&
        !modalRef.current?.contains(activeEl)
      ) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(target)) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, disableCloseOnClickOutside]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose, variant }}>
      <div className={styles.modal__overlay} role="presentation">
        <div
          aria-modal="true"
          className={classNames(
            styles.modal__content,
            styles[`modal--size-${size}`],
            className,
          )}
          ref={modalRef}
          role="dialog"
          {...props}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    modalRoot,
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
