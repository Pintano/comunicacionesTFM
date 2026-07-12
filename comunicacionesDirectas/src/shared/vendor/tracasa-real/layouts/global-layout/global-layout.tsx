import classNames from 'classnames';
import styles from './global-layout.module.scss';

export type GlobalLayoutProps = Pick<
  React.AllHTMLAttributes<HTMLDivElement>,
  'className'
> & {
  space?: number;
};

export function GlobalLayout({
  children,
  className,
}: React.PropsWithChildren<GlobalLayoutProps>) {
  return (
    <div className={classNames(styles['global-layout'], className)}>
      {children}
    </div>
  );
}
