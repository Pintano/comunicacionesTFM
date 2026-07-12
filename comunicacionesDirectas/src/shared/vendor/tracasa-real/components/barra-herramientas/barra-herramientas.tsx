import classNames from 'classnames';
import styles from './barra-herramientas.module.scss';

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  showLeftOnMobile?: boolean;
}

export function BarraHerramientas({
  children,
  left,
  showLeftOnMobile = false,
  className,
  ...props
}: React.PropsWithChildren<ToolbarProps>) {
  return (
    <div className={classNames(styles.toolbar, className)} {...props}>
      <div
        className={classNames([styles.toolbar__section, styles.toolbar__left], {
          [styles['hide-left-on-mobile']]: !showLeftOnMobile,
        })}
      >
        {left}
      </div>
      <div
        className={classNames([styles.toolbar__section, styles.toolbar__right])}
      >
        {children}
      </div>
    </div>
  );
}
