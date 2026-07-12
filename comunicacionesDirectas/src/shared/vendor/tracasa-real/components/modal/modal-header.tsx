import classNames from 'classnames';
import { useModalContext } from './modal-context';
import useComponentsTranslation from '../../hooks/use-translation';
import { IconButton } from '../base/icon-button/icon-button';
import styles from './modal.module.scss';
import { PropsWithChildren } from 'react';
import { useTextTruncation } from '../../hooks/use-text-truncation';

export const ModalHeader = ({
  children,
  subtitle,
}: PropsWithChildren<{ subtitle?: string }>) => {
  const { onClose, variant } = useModalContext();
  const { t } = useComponentsTranslation();

  const isStringTitle = typeof children === 'string';
  const [textRef, showTooltip] = useTextTruncation<HTMLHeadingElement>([
    children,
  ]);

  const className = classNames(styles.modal__header, {
    [styles['modal__header--compact']]: variant === 'compact',
  });

  const titleClassName = classNames(styles.modal__title, {
    [styles['modal__title--compact']]: variant === 'compact',
  });

  return (
    <div className={className}>
      <div className={styles['modal__title-wrapper']}>
        <h1
          ref={textRef}
          tabIndex={0}
          className={titleClassName}
          title={showTooltip && isStringTitle ? children : undefined}
        >
          {children}
        </h1>
        {subtitle && <h2 className={styles.modal__subtitle}>{subtitle}</h2>}
      </div>
      <IconButton
        icon="close"
        onClick={onClose}
        color="transparent"
        aria-label={t('modal.cerrarModal')}
      />
    </div>
  );
};
