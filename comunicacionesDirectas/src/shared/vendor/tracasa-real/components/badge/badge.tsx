import classNames from 'classnames';
import styles from './badge.module.scss';

export interface BadgeProps {
  count?: number;
  type?: 'default' | 'fixed';
  variant?: 'alert' | 'info' | 'counter';
}

export const Badge = ({
  count,
  type = 'default',
  variant = 'alert',
}: BadgeProps) => {
  const hasBadgeCount = count !== undefined && count > 0;
  const isOverflow = count !== undefined && count > 99;

  const badgeClassNames = classNames(
    styles['badge'],
    styles[`badge--${variant ?? 'alert'}`],
    {
      [styles['badge--numeric']]: hasBadgeCount,
      [styles['badge--overflow']]: isOverflow,
      [styles['badge--fixed']]: type === 'fixed',
    },
  );

  const countClassNames = classNames(styles['badge__count'], {
    [styles['badge__count--counter']]: variant === 'counter',
  });

  return (
    <div className={badgeClassNames}>
      {hasBadgeCount && count! <= 99 && (
        <span className={countClassNames}>{count}</span>
      )}
      {isOverflow && <span className={countClassNames}>99+</span>}
    </div>
  );
};
