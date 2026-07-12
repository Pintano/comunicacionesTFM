import classNames from 'classnames';
import { useModalContext } from './modal-context';
import styles from './modal.module.scss';
import { PropsWithChildren } from 'react';

export const ModalFooter = ({ children }: PropsWithChildren) => {
  const { variant } = useModalContext();
  const className = classNames(styles.modal__footer, {
    [styles['modal__footer--compact']]: variant === 'compact',
  });

  return <div className={className}>{children}</div>;
};
