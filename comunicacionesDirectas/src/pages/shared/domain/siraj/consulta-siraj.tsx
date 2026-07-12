import {
  IconWrapper,
  OpcionSelector,
  Procedimiento,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { ObjectSchema, array, date, number, object, string } from 'yup';
import { OrganoJudicial, Pais, Provincia, TipoProcedimiento } from '../comun';

export enum TipoResultados {
  INTERVINIENTE = 0,
  ASUNTO = 1,
}

export enum TipoInterviniente {
  DDO = 0,
  VIC = 1,
  ALL = 2,
  NC = 3,
}

export enum TipoBusqueda {
  NOR = 0,
  AVA = 1,
}

export enum TipoIntervinienteBusqueda {
  ENT = 0,
  FIS = 1,
}

export enum Registro {
  RCP = 0,
  DS = 1,
  VIDG = 2,
  CIV = 3,
  MEN = 4,
  RCMC = 5,
}

export const coloRegistro = (registro: Registro): string => {
  switch (registro) {
    case Registro.RCP:
      return '#F55050';
    case Registro.DS:
      return '#000000';
    case Registro.VIDG:
      return '#AD6DA8';
    case Registro.CIV:
      return '#F6B55D';
    case Registro.MEN:
      return '#8cd0f2';
    case Registro.RCMC:
      return '#51AF71';

    default:
      throw new Error('Registro no especificado');
  }
};

export const tiposRegistroSIRAJ: OpcionSelector[] = Object.entries(Registro)
  .map(([nombre, valor]) => {
    if (typeof valor === 'number') {
      return {
        id: valor.toString(),
        texto: nombre,
        render: (
          <div style={{ alignItems: 'center', display: 'flex', gap: '.5rem' }}>
            <IconWrapper color={coloRegistro(valor)} icono="square" />
            <span>{nombre}</span>
          </div>
        ),
      };
    }
    return null;
  })
  .filter((item) => item !== null) as OpcionSelector[];

export const schema: ObjectSchema<ConsultaSirajForm> = object({
  tipoBusqueda: number().default(TipoBusqueda.NOR),
  tipo: number().required(),
  registro: array(string().required()).nullable(),
  numeroDocumento: string().nullable(),
  nip: string().nullable().matches(/^\d*$/, ' '),
  primerApellidoRazonSocial: string().nullable(),
  segundoApellidoOtraDenominacion: string().nullable(),
  nombre: string().nullable(),
  nacionalidad: string().nullable(),
  nacimiento: string().nullable(),
  fechaNacimiento: string().nullable(),
  mesAnoNacimiento: string().nullable(),
  anoNacimiento: string().nullable(),
  numeroPolicial: string().nullable(),
  tipoInterviniente: number().required(),
  codigoOrgano: string().nullable(),
  numeroRegistroCentral: string().nullable(),
  anioRegistroCentral: string().nullable(),
  codigoTipoProcedimiento: string().nullable(),
  numeroProcedimiento: object<Procedimiento>().shape({
    numeroProcedimiento: string(),
    anoProcedimiento: string(),
  }),
  nig: string().nullable(),
});

export type ConsultaSirajForm = {
  tipoBusqueda: TipoBusqueda;
  tipo: number;
  registro?: string[] | null;
  numeroDocumento?: string | null;
  nip?: string | null;
  primerApellidoRazonSocial?: string | null;
  segundoApellidoOtraDenominacion?: string | null;
  nombre?: string | null;
  nacionalidad?: string | null;
  nacimiento?: string | null;
  fechaNacimiento?: string | null;
  mesAnoNacimiento?: string | null;
  anoNacimiento?: string | null;
  numeroPolicial?: string | null;
  tipoInterviniente: number;
  codigoOrgano?: string | null;
  numeroRegistroCentral?: string | null;
  anioRegistroCentral?: string | null;
  codigoTipoProcedimiento?: string | null;
  numeroProcedimiento?: Procedimiento | null;
  nig?: string | null;
};

export interface ObtenerMaestrosConsultaSirajRequest {
  idIntervinienteEncriptado: string;
}

export interface ObtenerMaestrosConsultaSirajResponse {
  paises: Pais[];
  provincias: Provincia[];
  paisesNacimiento: Pais[];
  organosJudiciales: OrganoJudicial[];
  tiposProcedimiento: TipoProcedimiento[];
  datosInterviniente?: DatosInterviniente;
}

export interface DatosInterviniente {
  tipoIntervinienteBusqueda: TipoIntervinienteBusqueda;
  documento?: string;
  nombre?: string;
  primerApellidoRazonSocial?: string;
  segundoApellidoOtraDenominacion?: string;
  paisNacimiento?: string;
  fechaNacimiento?: string;
}

export interface ParametrosConsultaDatosPersonales {
  tipoIntervinienteBusqueda: TipoIntervinienteBusqueda;
  tipoInterviniente: TipoInterviniente;
  tipoBusqueda: TipoBusqueda;
  registros?: number[];
  documento?: string;
  nip?: string;
  nombre?: string;
  primerApellidoRazonSocial?: string;
  segundoApellidoOtraDenominacion?: string;
  nacionalidad?: string;
  paisNacimiento?: string;
  provinciaNacimiento?: string;
  fechaNacimiento?: string;
  numeroOrdinalPolicial?: string;
}

export interface ParametrosConsultaAsunto {
  parametrosConsultaDatosPersonales: ParametrosConsultaDatosPersonales;
  organo?: string;
  numeroRegistroCentral?: string;
  anioRegistroCentral?: string;
  tipoProcedimiento?: string;
  numeroProcedimiento?: string;
  anioProcedimiento?: string;
  nig?: string;
  sgpIdAsunto?: string;
  sgpIdProcedimiento?: string;
  sgpIdInterviniente?: string;
}

export interface BusquedaSirajIntervinienteRequest
  extends ParametrosConsultaDatosPersonales {}
export interface BusquedaSirajAsuntoRequest extends ParametrosConsultaAsunto {}

export type BusquedaSirajAsuntoResponse = SirajResponse<{
  listaCoincidentes: CoincidenteAsunto[];
  complementoRespuesta?: string;
}>;

export type BusquedaSirajIntervinienteResponse = SirajResponse<{
  listaCoincidentes: Coincidente[];
  complementoRespuesta?: string;
}>;

export interface SirajResponse<TResponse> {
  success: TResponse;
  errores: string[];
  isSuccess: boolean;
}

export interface ResultadoConsultaSIRAJ extends Coincidente {
  nig?: string;
  organo?: string;
  tipoProcedimiento?: string;
  tipoProcedimientoDescripcion?: string;
  numeroProcedimiento?: string;
  anioProcedimiento?: string;
  numeroRegistroCentral?: string;
  anioRegistroCentral?: string;
  ticketAsunto?: string;
  sIRAJIdAsunto?: string;
  sGPIdAsunto?: string;
  sGPIdProcedimiento?: string;
  sGPIdInterviniente?: string;
}

export interface Coincidente {
  nip: string;
  nombre?: string;
  primerApellidoRazonSocial?: string;
  segundoApellidoOtraDenominacion?: string;
  nacionalidad: string;
  paisNacimiento: string;
  provinciaNacimiento: string;
  fechaNacimiento?: Date;
  documento: string;
  nombrePadre: string;
  nombreMadre: string;
  registros: Registro[];
  tipoIntervinienteBusqueda: number;
}

export interface CoincidenteAsunto {
  datosPersonales: Coincidente;
  nig: string;
  organo: string;
  tipoProcedimiento: string;
  tipoProcedimientoDescripcion: string;
  numeroProcedimiento: string;
  anioProcedimiento: string;
  numeroRegistroCentral: string;
  anioRegistroCentral: string;
  ticketAsunto: string;
  sIRAJIdAsunto: string;
  sGPIdAsunto: string;
  sGPIdProcedimiento: string;
  sGPIdInterviniente: string;
}

export interface GenerarAcontecimientoRequest {
  iDExpedienteEncrypt: string;
}

export interface GenerarAcontecimientoResponse {}

export interface ObtenerHistorialEnPDFRequest {
  nip?: string;
  documento?: string;
  tipoIntervinienteBusqueda?: number;
}

export interface incorporarArchivoSIRAJForm {
  nombreArchivo: string;
  fechaDocumento: Date;
}

export const schemaIncorporarArchivoSIRAJ: ObjectSchema<incorporarArchivoSIRAJForm> =
  object({
    nombreArchivo: string().required('Campo requerido'),
    fechaDocumento: date().required(),
  });
