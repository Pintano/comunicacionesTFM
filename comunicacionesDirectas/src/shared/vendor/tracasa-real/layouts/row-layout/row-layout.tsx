import classNames from 'classnames';
import styles from './row-layout.module.scss';

type RowLayoutProps = Pick<
  React.AllHTMLAttributes<HTMLDivElement>,
  'className'
> & {
  space?: number;
  justifyContent?: 'normal' | 'start' | 'center' | 'end' | 'space-between';
  alignItems?: 'stretch' | 'start' | 'center' | 'end';
  width?: 'default' | '100%';
};

export function RowLayout({
  children,
  className,
  space = 1,
  justifyContent = 'normal',
  alignItems = 'stretch',
  width = 'default',
}: React.PropsWithChildren<RowLayoutProps>) {
  return (
    <div
      className={classNames(styles['row-layout'], className)}
      style={
        {
          '--row-layout-gap': space,
          '--row-layout-justify-content': justifyContent,
          alignItems: alignItems,
          width: width,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
