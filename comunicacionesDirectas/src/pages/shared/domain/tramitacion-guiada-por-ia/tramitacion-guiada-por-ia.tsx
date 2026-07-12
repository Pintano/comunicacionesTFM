import { Resolucion } from '@/shared/repositories/gestion-procesal';
import {
  AccionTarjetaTramitacionGuiadaIA,
  Automatismos,
  ElementoListadoProps,
  OpcionSelector,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';

export interface informacionPlantillasSugeridasRequest {
  idExpedienteEncriptado: string;
}
export interface informacionPlantillasSugeridas {
  plantillaSugeridas: ElementoListadoProps<DatosPlantillasSugeridasForm>[];
}

export interface informacionPlantillasSugeridasResponse {
  plantillaSugeridas: ElementoListadoProps<DatosPlantillasSugeridasForm>[];
}

export interface guardadoTramitacionLocalRequest {
  IdTemplateEncriptado: string;
  Parameters: string;
  TituloDocumento?: string;
}

export interface guardadoTramitacionLocalResponse {
  idDocumentoEncriptado: string;
  parameters: ParametrosDTO;
}

export interface obtenerMagistradosYLetradosRequest {
  idDocumentoEncriptado?: string | null;
  idExpediente?: string;
}
export interface obtenerMagistradosYLetradosResponse {
  magistrados: UsuarioDTO[];
  letrados: UsuarioDTO[];
}

export interface obtenerTipoResolucionPorPlantillaRequest {
  IdTemplateEncryptado?: string;
}
export interface obtenerTipoResolucionPorPlantillaResponse {}

export interface obtenerConfiguracionTipoNumeracionPorTemplateRequest {
  IdTemplateEncryptado?: string;
}
export interface obtenerConfiguracionTipoNumeracionPorTemplateResponse {}

export interface crearResolucionEnGuardadoRequest {
  IdDocumentoEncriptado?: string;
  IdExpediente?: string;
  Cuantia?: number;
  Resolucion?: Resolucion;
}
export interface crearResolucionEnGuardadoResponse {}

export interface descargarDocumentoParaTramitacionLocalRequest {
  idDocumentoEncriptado: string;
  Parameters: ParametrosDTO;
}
export interface descargarDocumentoParaTramitacionLocalResponse {
  documento: string;
  numeroResolucion: string;
  numeroProcedimiento: string;
  anoProcedimiento: string;
}
export interface estaEnTramitacionConcatenadaRequest {
  idPlantillaEncrypt?: string;
}

export interface estaEnTramitacionConcatenadaResponse {
  respuestaConcatenada: boolean;
}
export interface logearBusquedaManualResponse {
  seHaUtilizadoLaBusquedaManual?: boolean | null;
  idPlantillaElegida?: string | null;
  idsPlantillasSugeridas?: string[] | null;
  porcentajesPlantillasSugeridas?: string[] | null;
  posicionPlantilla?: number | null;
}

export interface logearBusquedaManualRequest {}

export type diccionarioAutomatismos = {
  [x: string]: string;
  [key: number]: string;
};

export type IdiomasPlantillaDTO = {
  idPlantillaEncriptado: string;
  idIdioma: number;
  titulo: string;
};

export type DatosPlantillasSugeridasForm = {
  idPlantillaEncriptado: string;
  titulo?: string | null;
  codigo: string;
  tipoDocumento: string;
  idTipoDocumento: number;
  automatismos: diccionarioAutomatismos;
  idiomas: IdiomasPlantillaDTO[];
  notificacionInmediata: boolean;
  firmantes: string[];
  plazoAcceso?: number | undefined;
  porcentajeAcierto?: string | undefined;
  porcentajeAciertoNormalizado?: number | undefined;
};

export type PlantillaTramitar = {
  titulo?: string;
  Codigo?: string;
  tipoDocumento?: string;
  idTipoDocumento?: number;
  Automatismos?: string;
  Idioma?: string;
  NotificacionInmediata?: boolean;
  Firmantes?: string;
};

export type PlantillaConAcciones = {
  idPlantillaEncriptado: string;
  titulo: Record<string, string>;
  acciones?: AccionTarjetaTramitacionGuiadaIA[];
  color?: string;
  onClick: () => void;
  codigo: string;
  tipoDocumento: string;
  idTipoDocumento: number;
  automatismos?: Automatismos[];
  firmantes?: string[];
  idiomas: OpcionSelector[];
  notificacionInmediata?: boolean;
  terminoAcceso?: number;
  porcentaje: number;
  accionPrincipal?: AccionTarjetaTramitacionGuiadaIA;
};

export type FiltrosDTO = {
  filtro: FiltroDTO;
};

export type FiltroDTO = {
  idComboPreseleccion: number | undefined;
  listaDeValores: number[] | undefined;
};

export type UsuarioDTO = {
  idUsuarioEncriptado: number;
  nombreUsuario: string;
  primerApellido: string;
  segundoApellido: string;
  idTipoSituacionPonente?: number;
  descripcion: string;
  esActual: boolean;
};

export type ParametrosDTO = {
  IdExpediente: string;
  IdDiligencia: string;
  IdTipoOrigenTramitacion?: number;
  IdEsquema: string;
  IdSecuencia: string;
  IdFiscalia?: string;
  IdCitaEncriptado: string;
  IdReconocimientoEncriptado: string;
  EsTramitarPorInterviniente?: string;
  IDInterviniente: string;
  IDUsuarioPSP?: string;
  IDSesion: string;

  EsINML?: boolean;
  IdExpINMLEncriptado: string;
  IdExpINML: number;
  iDDocumentoTramitado?: number;
  idAccionTramitacionFiscalia: string;

  ProveerEscritos: boolean;

  FechaFirmeza?: string;
  IdLetradoEncriptado: string;
  IdUsuarioPonenteEncriptado?: string;
  IdTipoSituacionPonente?: number;
  idTemplateEncrypt?: string;
  idTemplateField: number;
  idLiquidacion: number;
  idTipoLiquidacion: number;
  idExpedienteDiligencia?: string;
  idOrganoJudicialScace?: number;
  IdComisionJusticiaGratuita?: number;
  descTemplate?: string;
  guidTramitacionLocal?: string;

  IDOrganojudicialTramita: number;
  IDResolucion?: number;
  IdExpedienteOrigen: number;

  IDUsuarioPresidente?: number;
  IDUsuarioPonente?: number;
  IDUsuarioDeliberador1?: number;
  IDUsuarioDeliberador2?: number;
  IDUsuarioDeliberador3?: number;
  IDUsuarioDeliberador4?: number;
  IDUsuarioDeliberador5?: number;
  IDTipoAlgoritmoConfigurarSala?: number;

  IdPlanIntervencionEncriptado?: string;
  IDTipoInformeEjecucionPenal?: number;
  CamposMonitoriosSeleccionados: number[];
};

export type parametrosTramitacion = {
  arrDocumento: number[] | undefined;
  arrayDelitos: number[] | undefined;
  arrayExpedientes: number[] | undefined;
  esScace: boolean | undefined;
  fechaFirmeza: Date | undefined;
  filtros: FiltrosDTO | undefined;
  idDocumento: string | undefined;
  idOit: number | undefined;
  idTipoProcedimientoTramitado: number | undefined;
  isINML: boolean | undefined;
  isPatologia: boolean | undefined;
  origen: number | undefined;
};
export type usuario = {
  idIdioma: number;
  idNaturalezaOrganoActivo: number;
  idOrganoActivo: number;
  idUsuario: number;
  idoit: number;
};
