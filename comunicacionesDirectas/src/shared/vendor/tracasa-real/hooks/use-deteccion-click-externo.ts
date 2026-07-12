import type { RefObject } from 'react';
import { useEffect } from 'react';

export const simularClickParaCerrarMenus = () => {
  const evento = new MouseEvent('mousedown', {
    clientX: -1,
    clientY: -1,
    bubbles: true,
    cancelable: true,
  });

  const body = document.body;

  body.dispatchEvent(evento);
};

export function useDeteccionClickExterno<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutsideClick: () => void,
  disableCloseOnClickOutside?: boolean,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (disableCloseOnClickOutside) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener(mouseEvent, handleClickOutside);
    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

export function useDeteccionClickExternoMultiple(
  refsIgnorar: RefObject<HTMLElement>[],
  onExterno: () => void,
) {
  useEffect(() => {
    function manejarClick(evento: MouseEvent) {
      const esClickInterno = refsIgnorar.some((ref) => {
        return (
          ref.current &&
          (ref.current === evento.target ||
            ref.current.contains(evento.target as Node))
        );
      });

      if (!esClickInterno) {
        onExterno();
      }
    }

    document.addEventListener('mousedown', manejarClick);

    return () => {
      document.removeEventListener('mousedown', manejarClick);
    };
  }, [refsIgnorar, onExterno]);
}
