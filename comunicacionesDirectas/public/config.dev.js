window.__APP_CONFIG__ = {
  apisUrls: {
    avantiusLegacy: 'https://localhost.tcsa.local:5174',
    //avantiusLegacy: 'https://pmpwvcdweb7.tcsa.local/Desarrollo/Avantius',

    avantiusLegacyProxy: 'http://localhost:1418',
    // avantiusLegacyProxy: 'https://pmpwvcdweb7.tcsa.local/Desarrollo/Avantius',

    avantiusProxy: 'https://localhost.tcsa.local:8001',

    //avantiusProxy: 'https://pmpwvcdweb7.tcsa.local/Desarrollo/AvantiusProxy',

    wsVictorinox: 'https://pmpwvcdweb7.tcsa.local/Desarrollo/wsVictorinox/#',

    documentacionIntegracionesProxy:
      'https://pmpwvcdweb7.tcsa.local/Desarrollo/DocumentacionIntegracionesProxy',
    portalDocumentacionIntranet:
      'https://pmpwvcdweb7.tcsa.local/Desarrollo/PortalDocumentacionIntranet',
    epaibi: 'https://epaibi.justizia.eus/EpaiBiToolBarWEB',
    ivapEuskadi:
      'https://www.ivap.euskadi.eus/traductor-automatico-neuronal/webivap00-a2izo/es/',
  },
  idiomas: {
    principal: 'es',
    secundarios: ['eu'],
  },
  firmaBiometrica: {
    webSignJS:
      'https://pmpwvcdweb7.tcsa.local/Desarrollo/AvantiusFrontal/js/web-sign.js',
    locales: '/AvantiusFrontal/locales/firma-i18n-{{lng}}.json',
    signatureType: 'display',
  },
  tramitacionBilingue: {
    milisegundosGuardadoBorrador: 60000,
  },
  sufijo: '_Desarrollo',
  comunicacionesDirectas: {
    tasaRefrescoComunicacionesDirectas: 10000
  },
  inactividad: {
    minutosActividad: 2,
    minutosInactividad: 30
  }
};
