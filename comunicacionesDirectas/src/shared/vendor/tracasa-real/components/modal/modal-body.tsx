import { useRef, useEffect, PropsWithChildren, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { useModalContext } from './modal-context';
import { useHasOverflowY } from './use-has-overflow-y';
import styles from './modal.module.scss';

export interface ModalBodyProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export const ModalBody = ({
  children,
  className,
  ...props
}: ModalBodyProps) => {
  const { variant } = useModalContext();
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasOverflow = useHasOverflowY(bodyRef);
  const bodyClassName = classNames(styles.modal__body, className, {
    [styles['modal__body--has-overflow']]: hasOverflow,
    [styles['modal__body--compact']]: variant === 'compact',
  });

  useEffect(() => {
    const focusableElements = bodyRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, []);

  return (
    <div className={bodyClassName} ref={bodyRef} {...props} tabIndex={0}>
      {children}
    </div>
  );
};
