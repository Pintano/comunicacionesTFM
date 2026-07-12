import { useState, useEffect, RefObject } from 'react';

/**
 * Hook para detectar si un elemento tiene overflow vertical
 * Utiliza ResizeObserver para reaccionar a cambios de tamaño dinámicos
 *
 * @param ref - Referencia al elemento DOM a verificar
 * @returns true si el elemento tiene overflow vertical, false en caso contrario
 *
 */
export function useHasOverflowY(ref: RefObject<HTMLElement>): boolean {
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkOverflow = () => {
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setHasOverflow(isOverflowing);
    };

    // Verificación inicial
    checkOverflow();

    // Observar cambios de tamaño
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return hasOverflow;
}
