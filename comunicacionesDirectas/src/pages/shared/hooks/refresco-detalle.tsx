import { SubCategorias } from '@/pages/expediente/resumen/models/subcategorias.enum';
import { useBroadcastListener } from '@/shared/hooks/broadcast-listener.hook';
import { useInvalidarParametros } from '@/shared/hooks/invalidar-parametros.hook';

export const useRefrescoDetalleExpediente = (idExpediente: string) => {
  const invalidar = useInvalidarParametros(idExpediente);

  useBroadcastListener(() => {
    invalidar.funcionInvalidarDocumentos();
    invalidar.funcionInvalidarArchivos();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-archivos-documentos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarDocumentos();
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Notificaciones);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-documentos-notificaciones-comunicaciones-telematicas-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.EnviosDocumentacionRemitidos,
    );
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-envio-documentacion-remitidos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.EnviosDocumentacionRecibidos,
    );
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-envio-documentacion-recibidos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.RemisionesRemitidas);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.RemisionesRecibidas);
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.RemisionesPendientesDestino,
    );
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.RemisionesPendientesOrigen,
    );
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-remisiones-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Acumulaciones);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-remisiones-remitidas-detalle-acumulaciones');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.PartesHospitalarios);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Atestados);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Delitos);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-partes-hospitalarios-atestados-delitos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.EscritosInicioOtrosEscritos,
    );
    invalidar.funcionInvalidarSubcategoria(SubCategorias.EscritosTelematicos);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-escritos-inicio-telematicos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-secreto-sumarial-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSenalamiento();
    invalidar.funcionInvalidarEscritos();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-minuta-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.AuxiliosTelematicos);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-auxilios-telematicos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Email);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-email-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.SMS);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-sms-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.SolicitudesSEP);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-solicitud-sep-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.MedidasCautelares);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-medidas-cautelares-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.FichaEjecutoria);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-medidas-definitivas-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.SituacionesPenales);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.PresosJuzgado);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-situaciones-penales-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Senalamientos);
    invalidar.funcionInvalidarLegajo();
    invalidar.funcionInvalidarAgenda();
  }, 'invalidar-senalamientos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.AsistenciaAVista);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.ControlDelExpediente);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.ReciboDeDocumentacion);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.SinCatalogar);
    invalidar.funcionInvalidarSubcategoria(SubCategorias.AvisoProximoTramite);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-notas-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarIntervinientes();
  }, 'invalidar-intervinientes-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarIntervinientes();
    invalidar.funcionInvalidarLegajo();
    invalidar.funcionInvalidarDetalleExpediente();
  }, 'invalidar-intervinientes-legajo-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.ExpedientesIML);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-expedientes-iml-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Requisitorias);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-requisitorias-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.ExpedientesAdministrativos,
    );
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-expedientes-administrativos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Objetos);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-objetos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Requisitorias);
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-requisitorias-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.EscritosRecursos);
    invalidar.funcionInvalidarEscritos();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-escritos-recursos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Acontecimientos);
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
    invalidar.funcionInvalidarArbolRelacionados();
  }, 'invalidar-cambio-procedimiento-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.NotificacionesPendientes,
    );
    invalidar.funcionInvalidarDocumentos();
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-notificacion-pendiente-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.SolicitudDocumentacionPendiente,
    );
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-solicitud-documentacion-pendiente-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.ProveerEscritosPendientes,
    );
    invalidar.funcionInvalidarDocumentos();
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarEscritos();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-proveer-escrito-pendiente-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.DacionDeCuentaPendiente,
    );
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-dacion-cuenta-pendiente-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.SCACEPendiente);
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-envio-scace-pendiente-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Acontecimientos);
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarLegajo();
  }, 'invalidar-acontecimientos-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarDetalleExpediente();
  }, 'invalidar-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarArbolRelacionados();
  }, 'invalidar-arbol-relacionados');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(
      SubCategorias.NotificacionesFiscalia,
    );
  }, 'invalidar-notificaciones-fiscalia-detalle-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarSubcategoria(SubCategorias.Delitos);
  }, 'invalidar-delitos-incoados-fiscalia');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarLegajo();
    invalidar.funcionInvalidarSubcategoria(SubCategorias.PresosFiscalia);
    invalidar.funcionInvalidarIntervinientes();
  }, 'invalidar-prision-preventiva-fiscalia');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarIntervinientes();
    invalidar.funcionInvalidarDetalleExpediente();
  }, 'invalidar-datos-expediente-hoja-registro-fiscalia');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarPermisosExpediente();
  }, 'invalidar-permisos-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarDetalleExpediente();
    invalidar.funcionInvalidarArbolRelacionados();
    invalidar.funcionInvalidarIntervinientes();
  }, 'invalidar-intervinientes-legajo-fiscalia-expediente');

  useBroadcastListener(() => {
    invalidar.funcionInvalidarTramitesPendientes();
  }, 'invalidar-tramites-pendientes-fiscalia');
};
