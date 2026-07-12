import { AxiosError } from 'axios';
import axios from 'axios';
// Nota: este archivo debe permanecer desacoplado de tipos de componentes

export const base64ToBlob = (base64: string, contentType?: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType ?? 'application/pdf' });
};

const authErrors = [401, 403, 407];
export const isAuthenticationError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) return false;

  return authErrors.includes(error.response?.status ?? -1);
};

const contentLengthErrors = [413];
export const isContentLengthError = (error: unknown): boolean => {
  if (!(error instanceof AxiosError)) return false;

  return contentLengthErrors.includes(error.response?.status ?? -1);
};
export const isRedirect = (statusCode: number) => {
  const authenticationErrors = [302];
  return authenticationErrors.includes(statusCode);
};

export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

type WindowSize = 'small' | 'extraSmall' | 'fullscreen';

export const getWindowSizes = (
  size: WindowSize,
): { height: number; width: number } => {
  const sizes = {
    small: { height: 650, width: 950 },
    extraSmall: { height: 500, width: 700 },
    fullscreen: { height: screen.availHeight, width: screen.availWidth },
  };
  return sizes[size];
};

/**
 * Normaliza una cadena de texto eliminando acentos, caracteres especiales
 * y espacios múltiples. Útil para búsquedas case-insensitive.
 *
 * @param str - Cadena a normalizar
 * @returns Cadena normalizada en minúsculas
 *
 * @example
 * normalizeString("Café Münchën") // "cafe munchen"
 * normalizeString("  múltiples   espacios  ") // "multiples espacios"
 */
export const normalizeString = (str: string): string => {
  if (!str) return '';

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[\u00F1]/g, 'n') // ñ -> n
    .replace(/[\u00D1]/g, 'N') // Ñ -> N
    .replace(/[^\w\s]/gi, '') // Elimina caracteres especiales
    .replace(/\s+/g, ' ') // Normaliza espacios
    .trim()
    .toLowerCase();
};

const openWindow = (url: string, size: WindowSize, baseURL: string): void => {
  const { height, width } = getWindowSizes(size);
  const top = screen.availHeight / 2 - height / 2;
  const left = screen.availWidth / 2 - width / 2;
  window
    .open(
      `${baseURL}/${url}`,
      '_blank',
      `popup=1,width=${width},height=${height},top=${top},left=${left}`,
    )
    ?.focus();
};

export const openNewWindow = (
  url: string,
  size: WindowSize,
  baseURL: string,
): void => {
  openWindow(url, size, baseURL);
};

export const capitalize = (str: string) => {
  const palabras = str.split(' ');
  if (palabras.length === 0) return '';
  palabras[0] = palabras[0][0].toUpperCase() + palabras[0].slice(1);
  return palabras.join(' ');
};

export const sortAlphabeticallyByField = <T, K extends keyof T>(
  items: T[],
  field: K,
  locale = 'es',
): T[] => {
  return [...items].sort((a, b) => {
    const valueA = String(a[field] ?? '');
    const valueB = String(b[field] ?? '');
    return valueA.localeCompare(valueB, locale, { sensitivity: 'base' });
  });
};

export const getTextContent = (content: unknown): string | undefined => {
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'number') {
    return content.toString();
  }

  return undefined;
};
