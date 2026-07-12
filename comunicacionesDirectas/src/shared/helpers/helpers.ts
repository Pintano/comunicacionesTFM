import type { Dispatch, SetStateAction } from 'react';
import type { TFunction } from 'i18next';
import type { AvisoProps, TiposProcedimientoEnum } from 'tracasa-components';
import { TiposProcedimientoEnum as tiposProcedimientoEnum } from 'tracasa-components';

type SetAviso = Dispatch<SetStateAction<AvisoProps | undefined>>;

type Variant = 'warning' | 'success' | 'error';

type WindowSize = 'fullscreen' | 'small' | 'extraSmall' | string;

const POPUP_FEATURES_BY_SIZE: Record<string, string> = {
  fullscreen: [
    'toolbar=no',
    'location=no',
    'status=no',
    'menubar=no',
    'scrollbars=yes',
    'resizable=yes',
    `width=${window.screen.availWidth}`,
    `height=${window.screen.availHeight}`,
    'left=0',
    'top=0',
  ].join(','),
  small: [
    'toolbar=no',
    'location=no',
    'status=no',
    'menubar=no',
    'scrollbars=yes',
    'resizable=yes',
    'width=1024',
    'height=768',
    'left=120',
    'top=40',
  ].join(','),
  extraSmall: [
    'toolbar=no',
    'location=no',
    'status=no',
    'menubar=no',
    'scrollbars=yes',
    'resizable=yes',
    'width=760',
    'height=560',
    'left=180',
    'top=120',
  ].join(','),
};

const buildUrl = (url: string, urlBase?: string): string => {
  if (/^(https?:)?\/\//i.test(url)) {
    return url;
  }

  if (!urlBase) {
    return url;
  }

  return `${urlBase}${url}`;
};

const publishAviso = (
  t: TFunction,
  setAviso: SetAviso,
  messageKey: string,
  variant: Variant,
  params?: Record<string, unknown>,
): void => {
  setAviso({
    message: t(messageKey, params),
    variant,
    duration: 3000,
  } as AvisoProps);
};

export const openNewWindow = (
  url: string,
  size: WindowSize = 'fullscreen',
  urlBase?: string,
  windowName = '_blank',
): Window | null => {
  const finalUrl = buildUrl(url, urlBase);
  const features = POPUP_FEATURES_BY_SIZE[size] ?? POPUP_FEATURES_BY_SIZE.fullscreen;

  return window.open(finalUrl, windowName, features);
};

export const openCustomWindow = (
  url: string,
  width: number,
  height: number,
  urlBase?: string,
  windowName = '_blank',
): Window | null => {
  const left = Math.max(0, Math.floor((window.screen.availWidth - width) / 2));
  const top = Math.max(0, Math.floor((window.screen.availHeight - height) / 2));
  const features = [
    'toolbar=no',
    'location=no',
    'status=no',
    'menubar=no',
    'scrollbars=yes',
    'resizable=yes',
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
  ].join(',');

  return window.open(buildUrl(url, urlBase), windowName, features);
};

export const mostrarAvisoAdvertencia = (
  t: TFunction,
  setAviso: SetAviso,
  messageKey: string,
  params?: Record<string, unknown>,
): void => {
  publishAviso(t, setAviso, messageKey, 'warning', params);
};

export const mostrarAvisoExito = (
  t: TFunction,
  setAviso: SetAviso,
  messageKey: string,
  params?: Record<string, unknown>,
): void => {
  publishAviso(t, setAviso, messageKey, 'success', params);
};

export const mostrarAvisoError = (
  t: TFunction,
  setAviso: SetAviso,
  messageKey: string,
  params?: Record<string, unknown>,
): void => {
  publishAviso(t, setAviso, messageKey, 'error', params);
};

export const comprobarSiProcedimientoEsExpedienteConcursoOSeccion = (
  tipoProcedimiento: TiposProcedimientoEnum | number | string | undefined,
): boolean => {
  if (tipoProcedimiento === undefined || tipoProcedimiento === null) {
    return false;
  }

  const concursoYSeccionValues = Object.entries(tiposProcedimientoEnum)
    .filter(([key]) => Number.isNaN(Number(key)))
    .filter(([key]) => /concurso|seccion/i.test(key))
    .map(([, value]) => value);

  return concursoYSeccionValues.includes(tipoProcedimiento);
};
