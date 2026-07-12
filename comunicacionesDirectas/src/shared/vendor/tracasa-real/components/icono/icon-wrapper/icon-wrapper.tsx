
import {
  ComponentProps,
  MouseEvent,
  KeyboardEvent,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import type { IconName } from './icon-definitions';
import { iconComponents } from './icon-definitions';
import useComponentsTranslation from '../../../hooks/use-translation';
import { IconEdit } from '@tabler/icons-react';

type IconProps = ComponentProps<typeof IconEdit>;

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IconWrapperProps {
  icono: IconName;
  size?: IconSize;
  title?: string;
  stroke?: string | number;
  color?: string;
  className?: string;
  role?: string;
  textoAccesibilidad?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
  onClick?: (e: MouseEvent<SVGElement>) => void;
  onKeyDown?: (e: KeyboardEvent<SVGElement>) => void;
}

// Tamaños
export const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
};

const strokeMap: Record<IconSize, number> = {
  sm: 1.25,
  md: 1.5,
  lg: 1.5,
  xl: 1.5,
  '2xl': 1.5,
};

// 👇 TIPO CORRECTO PARA ICONOS TABLER
type IconComponentType = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

export const IconWrapper = ({
  icono,
  size = 'sm',
  title,
  stroke,
  color,
  className,
  role,
  textoAccesibilidad,
  tabIndex,
  ariaHidden,
  onClick,
  onKeyDown,
}: IconWrapperProps) => {

  // 👇 CAMBIO APLICADO AQUÍ
  const IconComponent = iconComponents[icono] as IconComponentType;

  const { t } = useComponentsTranslation();

  return (
    <IconComponent
      aria-hidden={ariaHidden}
      aria-label={textoAccesibilidad ?? t('icono.ariaLabel')}
      className={className}
      color={color}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      size={sizeMap[size]}
      stroke={stroke ?? strokeMap[size]}
      title={title}
      tabIndex={tabIndex}
    />
  );
};
