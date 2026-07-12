declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig;
  }
}

interface AppConfig {
  apisUrls: {
    avantiusLegacy?: string;
    avantiusLegacyProxy?: string;
    avantiusProxy?: string;
    wsVictorinox?: string;
    documentacionIntegracionesProxy?: string;
    portalDocumentacionIntranet?: string;
    epaibi?: string;
    ivapEuskadi?: string;
  };
  idiomas: {
    principal: string;
    secundarios: string[];
  };
  firmaBiometrica?: {
    webSignJS?: string;
    locales?: string;
    signatureType?: string;
  };
  tramitacionBilingue?: {
    milisegundosGuardadoBorrador?: number;
  };
  sufijo?: string;
  comunicacionesDirectas?: {
    tasaRefrescoComunicacionesDirectas?: number;
  };
  inactividad?: {
    minutosActividad?: number;
    minutosInactividad?: number;
  };
}

export const config: AppConfig = window.__APP_CONFIG__ ?? {
  apisUrls: {},
  idiomas: {
    principal: 'es',
    secundarios: [],
  },
};
