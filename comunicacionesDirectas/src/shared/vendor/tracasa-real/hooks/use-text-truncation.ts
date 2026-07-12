import { useRef, useEffect, useState, RefObject } from 'react';

/**
 * Hook para detectar si el texto de un elemento está truncado.
 * Compara scrollWidth/scrollHeight con clientWidth/clientHeight para determinar
 * si hay overflow horizontal (1 línea) o vertical (multilínea con line-clamp).
 *
 * Para elementos con -webkit-line-clamp, usa un elemento temporal para medir
 * el contenido real sin restricciones y determinar si excede el número de líneas permitidas.
 *
 * @param dependencies - Array de dependencias para recalcular el truncamiento
 * @returns [ref, isTruncated] - Ref para el elemento y estado booleano
 *
 * @example
 * const [textRef, isTruncated] = useTextTruncation([text, maxWidth]);
 * return <span ref={textRef} title={isTruncated ? text : undefined}>{text}</span>
 */
export const useTextTruncation = <T extends HTMLElement = HTMLElement>(
  dependencies: unknown[] = [],
): [RefObject<T>, boolean] => {
  const elementRef = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const previousValueRef = useRef<boolean>(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;

      const TOLERANCE = 2;

      const horizontalTruncated =
        element.scrollWidth > element.clientWidth + TOLERANCE;
      let verticalTruncated =
        element.scrollHeight > element.clientHeight + TOLERANCE;

      // Para elementos con line-clamp
      try {
        const computedStyle = window.getComputedStyle(element);
        const lineClamp = computedStyle.getPropertyValue('-webkit-line-clamp');

        if (lineClamp && lineClamp !== 'none') {
          const tempElement = element.cloneNode(true) as HTMLElement;
          tempElement.style.position = 'absolute';
          tempElement.style.visibility = 'hidden';
          tempElement.style.height = 'auto';
          tempElement.style.display = 'block';
          tempElement.style.webkitLineClamp = 'unset';
          tempElement.style.webkitBoxOrient = 'unset';
          tempElement.style.width = `${element.clientWidth}px`;

          document.body.appendChild(tempElement);

          const lineHeight = parseFloat(computedStyle.lineHeight);
          const maxLines = parseInt(lineClamp, 10);
          const maxHeight = lineHeight * maxLines;

          verticalTruncated = tempElement.scrollHeight > maxHeight + TOLERANCE;

          document.body.removeChild(tempElement);
        }
      } catch (error) {
        verticalTruncated =
          element.scrollHeight > element.clientHeight + TOLERANCE;
      }

      const newTruncated = horizontalTruncated || verticalTruncated;
      if (previousValueRef.current !== newTruncated) {
        previousValueRef.current = newTruncated;
        setIsTruncated(newTruncated);
      }
    };

    // Verificar al montar y cuando cambien las dependencias
    checkTruncation();

    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, dependencies);

  return [elementRef, isTruncated];
};
