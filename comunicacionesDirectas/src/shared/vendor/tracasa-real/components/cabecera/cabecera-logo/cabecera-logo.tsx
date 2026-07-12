import classNames from 'classnames';
import styles from './cabecera-logo.module.scss';
import { CSSProperties, ReactNode } from 'react';

interface CabeceraLogoBaseProps {
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
  href?: string;
  onClick?: () => void;
}

interface CabeceraLogoWithUrl extends CabeceraLogoBaseProps {
  url: string;
  children?: never;
}

interface CabeceraLogoWithChildren extends CabeceraLogoBaseProps {
  url?: never;
  children: ReactNode;
}

export type CabeceraLogoProps = CabeceraLogoWithUrl | CabeceraLogoWithChildren;

export const CabeceraLogo = ({
  url,
  height,
  width,
  children,
  onClick,
}: CabeceraLogoProps) => {
  const logoClasses = classNames(styles['cabecera-logo'], {
    [styles['cabecera-logo--default']]: !height && !width,
  });

  const hasUrl = typeof url === 'string' && url.length > 0;

  const cursor = onClick ? 'pointer' : 'default';

  return hasUrl ? (
    <img
      className={logoClasses}
      src={url}
      alt="Logo"
      style={{ height, width, cursor }}
      onClick={onClick}
    />
  ) : (
    <>{children}</>
  );
};
