import {
  ActualizarConsentimientoComunicacionesCommand,
  ArchivarConversacionesCommand,
  AsignarArchivoAMensajeCommand,
  ComprobarConsentimientoComunicacionesQuery,
  ConversacionesPorUsuarioResponse,
  EnviarMensajeCommand,
  IComunicacionDirectaClient,
  MarcarMensajesLeidosCommand,
  MensajesPorConversacionResponse,
  ObtenerArchivadasConMensajesNuevosQuery,
  ObtenerConversacionesConMensajesNuevosQuery,
} from '../autogenerado/wsMensajeriaClient';

export type IComunicacionesDirectasRepository = {
  clienteAvantius: IComunicacionDirectaClient;
  enviarMensaje(request: EnviarMensajeCommand): Promise<string>;
  archivarComunicacionesDirectas(
    request: ArchivarConversacionesCommand,
  ): Promise<void>;
  actualizarConsentimientoComunicaciones(
    request: ActualizarConsentimientoComunicacionesCommand,
  ): Promise<void>;
  comprobarConsentimientoComunicaciones(
    request: ComprobarConsentimientoComunicacionesQuery,
  ): Promise<boolean>;
  obtenerConversacionesPorUsuario(
    request: boolean,
  ): Promise<ConversacionesPorUsuarioResponse>;
  obtenerMensajesPorConversacion(
    idConversacionEncriptado: string,
  ): Promise<MensajesPorConversacionResponse>;
  obtenerConversacionesConMensajesNuevos(
    request: ObtenerConversacionesConMensajesNuevosQuery,
  ): Promise<string[]>;
  obtenerArchivadasConMensajesNuevos(
    request: ObtenerArchivadasConMensajesNuevosQuery,
  ): Promise<number>;
  marcarMensajesLeidos(request: MarcarMensajesLeidosCommand): Promise<void>;
  asignarArchivoAMensaje(request: AsignarArchivoAMensajeCommand): Promise<void>;
};
