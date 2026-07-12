import React from 'react';
import { IconWrapper, IconWrapperProps } from 'tracasa-components';

export const renderProcedimientoConAbstencion =
  (tooltipAbstenido: string) =>
  (value: { texto: string; abstenido: boolean }) => {
    if (!value.abstenido) return value.texto;
    return React.createElement(
      'span',
      { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
      value.texto,
      React.createElement(IconWrapper, {
        icono: 'warning',
        color: 'var(--color-warning)',
        size: 'sm',
        title: tooltipAbstenido,
      } as IconWrapperProps),
    );
  };

export const renderTextoMultilinea = (titulo: string, lineas: number = 3) => {
  return React.createElement('span', {
    style: {
      display: '-webkit-box',
      WebkitLineClamp: lineas,
      lineClamp: lineas,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      fontSize: '1rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'initial',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      width: '100%',
      maxWidth: '100%'
    },
    title: titulo
  }, titulo);
};