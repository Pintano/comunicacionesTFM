
interface Route {
  relativePath: string;
  absolutePath: string;
}

export const URLBase = import.meta.env.BASE_URL;

const Routes = {
  root: {
    relativePath: '/',
    absolutePath: '/',
  },
  inicio: {
    relativePath: '',
    absolutePath: '/',
  },
  registroIncidencia: {
    relativePath: 'registroIncidencia',
    absolutePath: '/registroIncidencia',
  },
  importadorPlantillas: {
    relativePath: 'importadorPlantillas',
    absolutePath: '/importadorPlantillas',
  },
  diciregPersona: {
    relativePath: 'dicireg/persona/:idExpediente',
    absolutePath: '/dicireg/persona/:idExpediente',
  },
  diciregAsiento: {
    relativePath: 'dicireg/asiento/:numeroExpedienteDICIREG',
    absolutePath: '/dicireg/asiento/:numeroExpedienteDICIREG',
  },
  diciregInscripcion: {
    relativePath: 'dicireg/inscripcion',
    absolutePath: '/dicireg/inscripcion',
  },
  diciregInscripcionConsulta: {
    relativePath: 'dicireg/inscripcion/:idSolicitudInscripcionDICIREG',
    absolutePath: '/dicireg/inscripcion/:idSolicitudInscripcionDICIREG',
  },
  diciregCertificado: {
    relativePath: 'dicireg/certificado',
    absolutePath: '/dicireg/certificado',
  },
  diciregCertificadoConsulta: {
    relativePath: 'dicireg/certificado/:idSolicitudCertificadoDICIREG',
    absolutePath: '/dicireg/certificado/:idSolicitudCertificadoDICIREG',
  },
  accionesExpediente: {
    relativePath: 'accionesExpediente',
    absolutePath: '/accionesExpediente',
  },
  solicitudPsicosocial: {
    relativePath: 'psicosocial/solicitud/:idExpediente/:idSolicitud?',
    absolutePath: '/psicosocial/solicitud/:idExpediente/:idSolicitud?',
  },
  buscadorSolicitudesInformePsicosocial: {
    relativePath: 'psicosocial/buscador-solicitudes-informe/:esOrigenAviso?',
    absolutePath: '/psicosocial/buscador-solicitudes-informe/:esOrigenAviso?',
  },
  expedientePsicosocial: {
    relativePath: 'psicosocial/expediente/:idExpediente',
    absolutePath: '/psicosocial/expediente/:idExpediente',
  },
  buscadorSolicitudesInformeDesdeOJ: {
    relativePath:
      'psicosocial/buscador-solicitudes-informe-desde-oj/:esOrigenAviso?',
    absolutePath:
      '/psicosocial/buscador-solicitudes-informe-desde-oj/:esOrigenAviso?',
  },
  buscadorExpedientesPsicosocial: {
    relativePath: 'psicosocial/buscador-expedientes-psicosocial',
    absolutePath: '/psicosocial/buscador-expedientes-psicosocial',
  },
  buscadorInformesPendientes: {
    relativePath: 'psicosocial/buscador-informes-pendientes/',
    absolutePath: '/psicosocial/buscador-informes-pendientes/',
  },
  envioDocumentacion: {
    relativePath: 'psicosocial/envio-documentacion/',
    absolutePath: '/psicosocial/envio-documentacion/',
  },
  buscadorDocumentosPendientesFirmar: {
    relativePath: 'firmaDigital/buscador-documentos-pendientes-firmar/:esOrigenAviso?',
    absolutePath: 'firmaDigital/buscador-documentos-pendientes-firmar/:esOrigenAviso?',
  },
  buscadorDocumentosFirmados: {
    relativePath: 'firmaDigital/buscador-documentos-firmados/',
    absolutePath: 'firmaDigital/buscador-documentos-firmados/',
  },
  buscadorDocumentosFirmaBiometrica: {
    relativePath: 'firmaBiometrica/buscador-documentos-firma-biometrica/',
    absolutePath: 'firmaBiometrica/buscador-documentos-firma-biometrica/',
  },
  buscadorAvisosProximoTramite: {
    relativePath: 'avisos-proximo-tramite/buscador/',
    absolutePath: '/avisos-proximo-tramite/buscador/',
  },
  firmaBiometrica: {
    relativePath: 'firmaBiometrica/firma-biometrica/',
    absolutePath: 'firmaBiometrica/firma-biometrica/',
  },
  consultaSiraj: {
    relativePath: 'siraj2/consulta',
    absolutePath: '/siraj2/consulta',
  },
  expediente: {
    relativePath: 'expediente/:idExpediente',
    absolutePath: '/expediente/:idExpediente',
  },
  expedienteResumenExpediente: {
    relativePath: 'resumen',
    absolutePath: '/expediente/:idExpediente/resumen',
  },
  expedienteResumenExpedienteCategorias: {
    relativePath: ':categoria',
    absolutePath: '/expediente/:idExpediente/resumen/:categoria',
  },
  expedienteDetalleSubCategoria: {
    relativePath: ':categoria/:idSubCategoria',
    absolutePath:
      '/expediente/:idExpediente/resumen/:categoria/:idSubCategoria',
  },
  expedienteDocumentacionExpediente: {
    relativePath: 'documentacion',
    absolutePath: '/expediente/:idExpediente/documentacion',
  },
  expedienteIntevinientesExpediente: {
    relativePath: 'intevinientes',
    absolutePath: '/expediente/:idExpediente/intevinientes',
  },
  expedienteSenalamientosExpediente: {
    relativePath: 'senalamientos',
    absolutePath: '/expediente/:idExpediente/senalamientos',
  },
  explorador: {
    relativePath: 'explorador',
    absolutePath: '/explorador',
  },
  exploradorVictorinox: {
    relativePath: '',
    absolutePath: '/explorador',
  },
  exploradorInicio: {
    relativePath: 'inicio',
    absolutePath: '/explorador/inicio',
  },
  exploradorAgenda: {
    relativePath: 'agenda',
    absolutePath: '/explorador/agenda',
  },
  exploradorExpedientesBusquedaRapida: {
    relativePath: 'expedientes/busquedaRapida',
    absolutePath: '/explorador/expedientes/busquedaRapida',
  },
  exploradorAsuntosBusquedaRapida: {
    relativePath: 'asuntos/busquedaRapida',
    absolutePath: '/explorador/asuntos/busquedaRapida',
  },
  exploradorExpedientesBusquedaPorinterviniente: {
    relativePath: 'expedientes/busquedaPorinterviniente',
    absolutePath: '/explorador/expedientes/busquedaPorinterviniente',
  },
  exploradorExpedientes: {
    relativePath: 'expedientes',
    absolutePath: '/explorador/expedientes',
  },
  exploradorAuxiliosJudiciales: {
    relativePath: 'auxilios-judiciales',
    absolutePath: '/explorador/auxilios-judiciales',
  },
  exploradorExpedientesFiscalia: {
    relativePath: 'expedientes-fiscalia',
    absolutePath: '/explorador/expedientes-fiscalia',
  },
  buscadorExpedientesFiscaliaMenoresJuzgado: {
    relativePath: 'buscar/expedientes-fiscalia-menores-juzgado',
    absolutePath: '/buscar/expedientes-fiscalia-menores-juzgado',
  },
  exploradorExpedientesTramitesPendientesFiscalia: {
    relativePath: 'expedientes-fiscalia-tramites-pendientes',
    absolutePath: '/explorador/expedientes-fiscalia-tramites-pendientes',
  },
    exploradorAsuntos: {
    relativePath: 'asuntos',
    absolutePath: '/explorador/asuntos',
  },
  exploradorAsuntosPendientes: {
    relativePath: 'asuntos/pendientes',
    absolutePath: '/explorador/asuntos/pendientes',
  },
  bandejasEntrada: {
    relativePath: 'bandejas-entrada',
    absolutePath: '/bandejas-entrada',
  },
  bandejasEntradaEspecifica: {
    relativePath: ':bandeja',
    absolutePath: '/bandejas-entrada/:bandeja',
  },
  bandejasSalida: {
    relativePath: 'bandejas-salida',
    absolutePath: '/bandejas-salida',
  },
  bandejasSalidaEspecifica: {
    relativePath: ":bandeja",
    absolutePath: "/bandejas-salida/:bandeja",
  },
  ConfiguracionFirma: {
    relativePath: 'configuracion-firma/:idDocumento',
    absolutePath: '/configuracion-firma/:idDocumento',
  },
  resolucionesPropuestasMonitorio: {
    relativePath: 'monitorios/resolucionesPropuestas/:idExpediente',
    absolutePath: '/monitorios/resolucionesPropuestas/:idExpediente',
  },
  resolucionATramitarMonitorio: {
    relativePath:
      'monitorios/resolucionesPropuestas/:idExpediente/:idTipoPropuesta',
    absolutePath:
      '/monitorios/resolucionesPropuestas/:idExpediente/:idTipoPropuesta',
  },
  buscadorGruposTrabajo: {
    relativePath: 'grupos-trabajo/buscador',
    absolutePath: '/grupos-trabajo/buscador',
  },
  buscadorExpedientesGruposTrabajo: {
    relativePath: 'grupos-trabajo/buscador-expedientes/:idGrupoTrabajo?',
    absolutePath: '/grupos-trabajo/buscador-expedientes/:idGrupoTrabajo?',
  },
  detalleGruposTrabajo: {
    relativePath: 'grupos-trabajo/detalle/:idGrupoTrabajo?',
    absolutePath: '/grupos-trabajo/detalle/:idGrupoTrabajo?',
  },
  tramitacionBilingue: {
    relativePath: 'tramitacion-bilingue',
    absolutePath: '/tramitacion-bilingue',
  },
  tramitacionGuiadaPorIa: {
    relativePath: 'tramitacionGuiadaPorIa',
    absolutePath: '/tramitacionGuiadaPorIa',
  },
  incorporarArchivos: {
    relativePath: 'incorporarArchivos',
    absolutePath: '/incorporarArchivos',
  },
  digitalizacionIncorporarArchivos: {
    relativePath: 'digitalizacion/incorporarArchivos',
    absolutePath: '/digitalizacion/incorporarArchivos',
  },
  visorDocumentos: {
    relativePath: 'visorDocumentos/:iDArchivoEncriptado/:TituloDocumento',
    absolutePath: '/visorDocumentos/:iDArchivoEncriptado/:TituloDocumento',
  },
  modificarCategoriaEstadillos: {
    relativePath:
      'estadillos-fiscales/modificar-categoria-estadillos/:idDocumentoEncriptado',
    absolutePath:
      'estadillos-fiscales/modificar-categoria-estadillos/:idDocumentoEncriptado',
  },
  formularioPresentacionCorpme: {
    relativePath: 'corpme/formularios/presentacion/:idExpedienteEncriptado',
    absolutePath: '/corpme/formularios/presentacion/:idExpedienteEncriptado',
  },
  DetallePresentacionCorpme: {
    relativePath:
      'corpme/formularios/presentacion/detalle/:idExpedienteEncriptado/:idPresentacionPropiedadEncriptado/:esRegistrarNueva',
    absolutePath:
      '/corpme/formularios/presentacion/detalle/:idExpedienteEncriptado/:idPresentacionPropiedadEncriptado/:esRegistrarNueva',
  },
  buscadorPresentacionesCorpme: {
    relativePath: 'corpme/buscador/presentaciones/:idEstadoPresentacion?',
    absolutePath: '/corpme/buscador/presentaciones/:idEstadoPresentacion?',
  },
  buscadorNotificacionesCorpme: {
    relativePath: 'corpme/buscador/notificaciones/:idVisto?',
    absolutePath: '/corpme/buscador/notificaciones/:idVisto?',
  },
  detalleNotificacionCorpme: {
    relativePath:
      'corpme/formularios/notificacion/detalle/:idNotificacionEncriptado',
    absolutePath:
      '/corpme/formularios/notificacion/detalle/:idNotificacionEncriptado',
  },
  acumular: {
    relativePath: 'acumular/:idExpedienteEncriptado/:esConcursal/:soyOrigen?',
    absolutePath: '/acumular/:idExpedienteEncriptado/:esConcursal/:soyOrigen?',
  },
  lotes: {
    relativePath: 'lotes/configuracion-lotes-reparto/:esLAJ',
    absolutePath: '/lotes/configuracion-lotes-reparto/:esLAJ',
  },
  mantenimientoUsuarios: {
    relativePath: 'mantenimiento/:tipo',
    absolutePath: '/mantenimiento/:tipo',
  },
  gestionCuentaCdcj: {
    relativePath: 'CDCJ/gestion-cuenta-cdcj/:idExpedienteEncriptado',
    absolutePath: '/CDCJ/gestion-cuenta-cdcj/:idExpedienteEncriptado',
  },
  repartoLotes: {
    relativePath:
      'reparto-lotes/:idExpediente/:aperturaDesdeMenu?/:esPosibleVolver?',
    absolutePath:
      '/reparto-lotes/:idExpediente/:aperturaDesdeMenu?/:esPosibleVolver?',
  },
  repartoLotesCambioProcedimiento: {
    relativePath: 'reparto-lotes-cambio-procedimiento/:idExpediente',
    absolutePath: '/reparto-lotes-cambio-procedimiento/:idExpediente',
  },
  repartoLotesMultiple: {
    relativePath: 'reparto-lotes-multiple/:idExpedientesEncriptados',
    absolutePath: '/reparto-lotes-multiple/:idExpedientesEncriptados',
  },
  listadoAsignacionesLote: {
    relativePath: 'reparto-lotes/listado-asignaciones',
    absolutePath: '/reparto-lotes/listado-asignaciones',
  },
  visorMultimedia: {
    relativePath: 'visorMultimedia',
    absolutePath: '/visorMultimedia',
  },
  propiedadesDocumento: {
    relativePath: 'propiedades-documento/:idDocumento/:esDiligencia?',
    absolutePath: '/propiedades-documento/:idDocumento/:esDiligencia?',
  },
  abtencionRecusacionJuez: {
    relativePath: 'abstencion-recusacion-juez/:idExpedienteEncriptado',
    absolutePath: '/abstencion-recusacion-juez/:idExpedienteEncriptado',
  },
  buscadorExpedientesAbstencionRecusacion: {
    relativePath: 'buscar/expedientes-abstencion-recusacion',
    absolutePath: '/buscar/expedientes-abstencion-recusacion',
  },
  buscadorErroresCdcj: {
    relativePath: 'buscar/errores-cdcj',
    absolutePath: '/buscar/errores-cdcj',
  },
  comunicacionesDirectas: {
    relativePath: 'comunicaciones-directas',
    absolutePath: '/comunicaciones-directas',
  },
  fichaIntervinientes: {
    relativePath: 'fichaInterviniente',
    absolutePath: '/fichaInterviniente',
  },
  secuenciaDocumentos: {
    relativePath: 'secuencia-documentos/:idExpedienteEncriptado',
    absolutePath: '/secuencia-documentos/:idExpedienteEncriptado',
  },
  buscadorEnviosSIR: {
    relativePath: 'sir/buscador',
    absolutePath: '/sir/buscador',
  },
  detalleEnvioSIR: {
    relativePath: 'sir/detalle/:idExpediente',
    absolutePath: '/sir/detalle/:idExpediente',
  },
  detalleEnvioSIRPorAsiento: {
    relativePath: 'sir/detalle/asiento/:idAsiento',
    absolutePath: '/sir/detalle/asiento/:idAsiento',
  },
  detalleEnvioSIRPorApunte: {
    relativePath: 'sir/detalle/apunte/:idApunte',
    absolutePath: '/sir/detalle/apunte/:idApunte',
  },
  citiusFormularioA: {
    relativePath: 'citius/formulario-a',
    absolutePath: '/explorador/citius/formulario-a',
  },
  buscadorEventosGestionEscalonamientoNotificaciones: {
    relativePath: 'gestion-escalonamiento-notificaciones/buscador-eventos',
    absolutePath: '/gestion-escalonamiento-notificaciones/buscador-eventos',
  },
  DetalleEventosEspecialesGestionEscalonamientoNotificaciones: {
    relativePath: 'gestion-escalonamiento-notificaciones/formularios/eventos-especiales/:idEventoEspecialEncriptado',
    absolutePath: '/gestion-escalonamiento-notificaciones/formularios/eventos-especiales/:idEventoEspecialEncriptado',
  },
  buscadorConsultaMenor: {
    relativePath: 'epm/buscador-consulta-menor',
    absolutePath: '/epm/buscador-consulta-menor',
  },
  VisualizacionArchivosAsunto: {
    relativePath:'asunto/archivos-asunto/:idAsuntoEncriptado',
    absolutePath: '/asunto/archivos-asunto/:idAsuntoEncriptado',
  },
  PruebasDocuementales: {
    relativePath: 'expediente/:idExpediente/pruebasDocumentales/:idPruebaDocumental',
    absolutePath: '/expediente/:idExpediente/pruebasDocumentales/:idPruebaDocumental',
  },
  EnvioPruebasDocumentales: {
    relativePath: 'pruebasDocumentales/envio/:idExpediente/:idPruebaDocumental?',
    absolutePath: '/pruebasDocumentales/envio/:idExpediente/:idPruebaDocumental?',
  }
} as const satisfies Record<string, Route>;

type RoutesType = typeof Routes;
type RouteKeys = keyof RoutesType;

export { Routes };
export type { Route, RouteKeys, RoutesType };

