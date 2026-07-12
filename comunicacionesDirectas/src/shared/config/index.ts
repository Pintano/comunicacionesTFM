import { config as appConfig } from '@/config';

declare global {
  interface Window {
    AVANTIUS_APP_BASEURL?: string;
    AVANTIUS_APP_LEGACY_BASEURL?: string;
    DICIREG_BASEURL?: string;
    AVANTIUSPROXY_BASEURL?: string;
  }
}

const appConfigConInactividad = appConfig as typeof appConfig & {
  inactividad?: {
    minutosActividad: number;
    minutosInactividad: number;
  };
};

const idiomas = {
  principal: appConfig.idiomas.principal,
  secundarios: appConfig.idiomas.secundarios,
};

const inactividad = {
  minutosActividad: appConfigConInactividad.inactividad?.minutosActividad ?? 5,
  minutosInactividad:
    appConfigConInactividad.inactividad?.minutosInactividad ?? 15,
};

export const config = {
  debug: false,
  server: {
    baseURL:
      appConfig.apisUrls.avantiusLegacy ?? window.AVANTIUS_APP_BASEURL ?? '',
    jsonServer: 'http://localhost:1234',
  },
  idiomas,
  inactividad,
};

export const configAvantiusLegacy = {
  debug: false,
  server: {
    baseURL:
      appConfig.apisUrls.avantiusLegacy ?? window.AVANTIUS_APP_BASEURL ?? '',
    jsonServer: 'http://localhost:1234',
  },
  idiomas,
};

export const configAvantiusProxy = {
  debug: false,
  server: {
    baseURL:
      appConfig.apisUrls.avantiusLegacy ?? window.AVANTIUS_APP_BASEURL ?? '',
    jsonServer: 'http://localhost:1234',

    avantiusProxy: `${appConfig.apisUrls.avantiusProxy}`,
    wsSIRAJ2: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionSIRAJ2/api`,
    wsPsicosocial: `${appConfig.apisUrls.avantiusProxy}/wsPsicosocial/api`,
    integracionCDCJ: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionCDCJ/api`,
    wsAccesoDocumentacion: `${appConfig.apisUrls.avantiusProxy}/wsAccesoDocumentacion/api`,
    wsIntegracionDICIREG: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionDICIREG/api`,
    wsCatalogoServicios: `${appConfig.apisUrls.avantiusProxy}/wsCatalogoServicios/api`,
    wsServiciosWeb: `${appConfig.apisUrls.avantiusProxy}/wsServiciosWeb`,
    portalDocumentacion: `${appConfig.apisUrls.portalDocumentacionIntranet}/api`,
    expedienteJudicialElectronico: `${appConfig.apisUrls.avantiusProxy}/wsExpedienteJudicialElectronico`,
    wsAvantius: `${appConfig.apisUrls.avantiusProxy}/wsAvantius/api`,
    wsTramitador: `${appConfig.apisUrls.avantiusProxy}/wsTramitador/api`,
    avantiusCliente: `${appConfig.apisUrls.avantiusProxy}/avantiusCliente`,
    wsVictorinox: `${appConfig.apisUrls.avantiusProxy}/wsVictorinox/api`,
    wsIntegracionCORPME: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionCORPME`,
    wsImportador: `${appConfig.apisUrls.avantiusProxy}/wsApiImportador/api`,
    wsTemplates: `${appConfig.apisUrls.avantiusProxy}/wsTemplates/Templates.asmx`,
    wsModuloArchivo: `${appConfig.apisUrls.avantiusProxy}/ModuloArchivo/api`,
    wsAyudaInteractiva: `${appConfig.apisUrls.avantiusProxy}/wsAyudaInteractiva`,
    wsMensajeria: `${appConfig.apisUrls.avantiusProxy}/wsMensajeria/api`,
    epaibi: `${appConfig.apisUrls.epaibi}`,
    ivapEuskadi: `${appConfig.apisUrls.ivapEuskadi}`,
    wsIntegracionSIR: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionSIR`,
    wsNotificaciones: `${appConfig.apisUrls.avantiusProxy}/wsNotificaciones/api`,
    wsIntegracionEPM: `${appConfig.apisUrls.avantiusProxy}/wsIntegracionEPM`,
    wsRecepcionEscritos: `${appConfig.apisUrls.avantiusProxy}/wsRecepcionEscritos/api`,
  },
  idiomas,
};

export const configDocumentacionIntegracionesProxy = {
  debug: false,
  server: {
    baseURL:
      appConfig.apisUrls.avantiusLegacy ?? window.AVANTIUS_APP_BASEURL ?? '',
    jsonServer: 'http://localhost:1234',
    wsSIRAJ2: `${appConfig.apisUrls.documentacionIntegracionesProxy}/wsIntegracionSIRAJ2/api`,
  },
  idiomas,
};
