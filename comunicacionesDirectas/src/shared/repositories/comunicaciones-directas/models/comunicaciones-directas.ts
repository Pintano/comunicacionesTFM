import { DatosElementoADescargar } from 'tracasa-components';

export enum TipoMensajeConversacion {
  Texto = 1,
  ArchivoAdjunto,
  Sistema,
}

export enum EstadosMensajeConversacion {
  Borrador,
  Enviado,
  Leido,
  Error,
  Archivado,
}

export type Comunicacion = {
  idConversacion: string;
  titulo: string;
  remitenteRol: string;
  estadoUltimoMensaje: number;
  esPropioMensaje: boolean;
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  nuevosMensajesConversacion: number;
};

export interface MensajesPorConversacion {
  idConversacion: string;
  nuevosMensajesConversacion: number;
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  idUltimoMensaje: string;
}
export type datosComunicacionResponse = {
  idConversacion: string;
  titulo: string;
  remitenteRol: string;
  estadoUltimoMensaje: number;
  esPropioMensaje: boolean;
};

export interface ConversacionType {
  idUsuario: string;
  idConversacion: string;
  esActiva?: boolean;
  mensajes: MensajeConversacionType[];
}

export interface MensajeConversacionType {
  idMensaje: string;
  idUsuario: string;
  fechaYHora: string;
  estado: EstadosMensajeConversacion;
  tipo: TipoMensajeConversacion;
  contenido: ContentMensajeConversacion;
}
export interface InfoUltimoMensaje {
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  idConversacion: string;
}
export interface ContentMensajeConversacion {
  texto: string;
  archivos?: DatosElementoADescargar[];
}

export interface ArchivoAdjunto {
  idArchivo: string;
  nombre: string;
  extension: string;
  url: string;
}

export type ComunicacionInfo = {
  idComunicacion: string;
  titulo: string;
  remitenteRol?: string;
};

export type Maestros = {
  idUsuario: string;
  daConsentimiento: boolean;
  idRol: number;
};

export type obtenerLlamadaDePruebaRequest = {
  estado: number;
};

export type obtenerLlamadaDePruebaResponse = Comunicacion[];

export type obtenerMaestrosResponse = Maestros;

export type EnviarMensajeResponse = EstadosMensajeConversacion;

export interface EnviarMensajeRequest {
  idUsuario: string;
  fechaYHora: Date;
  contenido: ContentMensajeConversacion;
}

export interface MensajesNuevosResponse {
  hayMensajesNuevos: boolean;
}

export interface MensajesNuevos {
  archivadas: number;
}
export interface ComunicacionesArchivadasSinLeerResponse {
  numeroComunicacionesArchivadas: number;
}

export interface ComprobarConsentimientoComunicacionesResponse {
  tieneConsentimientoActivo: boolean;
}

export interface ActualizarConsentimientoComunicacionesRequest {
  NuevoValorConsentimiento: boolean;
}

export interface ActualizarConsentimientoComunicacionesResponse {
  ConsentimientoActualizadoCorrectamente: boolean;
}
