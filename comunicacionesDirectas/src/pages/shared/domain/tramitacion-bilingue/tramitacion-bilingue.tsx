import { MaestrosMargenes } from '@/shared/repositories/autogenerado/wsTramitadorClient';

export type CampoAutomatico = {
  tipoCampo: TiposCampoPlantillaAutomatica;
  descripcion?: string;
  bookmarkNameCastellano?: string;
  bookmarkNameEuskera?: string;
  valorCastellano?: string;
  valorEuskera?: string;
  hijos?: CampoAutomatico[];
  idTemplateEncrypt?: string;
  idField: number;
  seleccionado: boolean;
};

export type ParrafoAutomatico = {
  idsParrafoEncrypt?: string[];
  bookmark: string;
};

export type DocumentoGenerado = {
  idDocumentoEncrypt: string;
  tituloDocumentoEncrypt: string;
  tituloDocumento: string;
};

export enum TiposCampoPlantillaAutomatica {
  SoloTexto = 1,
  Parrafo = 2,
  AutomaticoSinIntervencion = 3,
  Interviniente = 4,
  TextoAviso = 5,
  Senalamiento = 6,
}

export enum TiposTraduccionesItzuli {
  Juridica = 1,
  General = 2,
  Administrativa = 3,
}

export interface GuardarParrafosEnBorradorResponse {
  idDocumentoEncriptado: string;
  resultado: boolean;
}

export interface ObtenerEstadoDocumentoRequest {
  idDocumentoEncriptado: string;
}

export interface ObtenerEstadoDocumentoResponse {
  idEstadoDocumento: number;
}

export interface PasarDocumentoAutomaticoADefinitivoProps {
  idPlantillaEncrypt?: string;
  idExpediente: string;
  idDocumentoEncriptado: string;
}

export interface GuardarParrafosEnBorradorProps {
  idExpediente: string;
  idDocumentoEncriptado: string;
  parrafos: ParrafoAutomatico[];
}

export interface ObtenerIntervinientesRequest {
  idExpedienteEncriptado: string;
}

export type CampoInterviniente = keyof DatosInterviniente;

export type Interviniente = {
  iDIntervinienteEncriptado: string;
  datosCastellano: DatosInterviniente;
  datosEuskera: DatosInterviniente;
  seleccionado: boolean;
};

export type DatosInterviniente = {
  iDIntervinienteEncriptado: string;
  iDIdioma: number;
  tipoIntervencion: string;
  domicilio: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  nacionalidad: string;
  situacionProcesal: string;
  localidad: string;
  direccionAbogado: string;
  nombreApellidos: string;
  tipoIdentificacion: string;
  identificacion: string;
  abogado: string;
  procurador: string;
  padre: string;
  madre: string;
  codigoPostal: string;
  telefono: string;
  observaciones: string;
  responsable: string;
  cargo: string;
  alias: string;
};

export interface ComposicionDocumento {
  sfdtDocument: string;
  sfdtCabecera?: string;
  maestrosMargenes?: MaestrosMargenes;
}

export interface ModelosItzuli {
  modelo?: string;
  parteUrl?: string;
  descripcion?: string;
}

export interface TramitarPlantillaGeneracionAutomaticaRequest {
  idexpediente: string;
  idPlantillaEncrypt: string;
  idDocumentoEncriptado: string;
}
