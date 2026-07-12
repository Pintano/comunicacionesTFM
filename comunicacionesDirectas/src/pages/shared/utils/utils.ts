import { OITEnum } from '@/shared/models/enums/oits-enum';
import { Procedimiento } from 'tracasa-components';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import isoWeek from 'dayjs/plugin/isoWeek';
import { TiposAsuntoEnum } from '@/shared/models/enums/tipos-asunto-enums';

dayjs.extend(isoWeek);

export const obtenerFechaInicialPrimerDiaSemana = (
  d: Date | null | undefined,
) => {
  return dayjs(d || new Date())
    .startOf('isoWeek')
    .toDate();
};

export const anadirSemanas = (fecha: Date, weeks: number) => {
  return dayjs(fecha).add(weeks, 'week').toDate();
};

export function compararProcedimientos(
  desde?: Procedimiento,
  hasta?: Procedimiento,
): boolean {
  if (
    !desde?.numeroProcedimiento ||
    !desde.anoProcedimiento ||
    !hasta?.numeroProcedimiento ||
    !hasta?.anoProcedimiento
  )
    return true;

  const desdeStr = `${desde.anoProcedimiento?.padStart(4, '0') || ''}${desde.numeroProcedimiento?.padStart(6, '0') || ''}${desde.pieza?.padStart(4, '0') || ''}`;
  const hastaStr = `${hasta.anoProcedimiento?.padStart(4, '0') || ''}${hasta.numeroProcedimiento?.padStart(6, '0') || ''}${hasta.pieza?.padStart(4, '0') || ''}`;

  return hastaStr >= desdeStr;
}

export function validarProcedimiento(procedimiento?: Procedimiento): boolean {
  const numero = procedimiento?.numeroProcedimiento?.trim();
  const ano = procedimiento?.anoProcedimiento?.trim();

  return (!!numero && !!ano) || (!numero && !ano);
}

export const contarFiltrosAplicados = (
  valores: object,
  clavesIgnoradas: string[] | undefined = [],
) =>
  Object.entries(valores).filter(
    ([clave, valor]) => !clavesIgnoradas.includes(clave) && tieneValor(valor),
  ).length;

export const tieneValor = (valor: unknown): boolean => {
  if (valor === null || valor === undefined) return false;
  if (typeof valor === 'string') return valor.trim() !== '';
  if (typeof valor === 'number' || typeof valor === 'boolean') return true;
  if (Array.isArray(valor)) {
    return valor.some((v) => tieneValor(v));
  }
  if (typeof valor === 'object') {
    const entries = Object.values(valor as Record<string, unknown>);
    return entries.length > 0 && entries.some((x) => tieneValor(x));
  }
  return false;
};

export const alMenosUnFiltroTieneValor = (
  objeto: object,
  clavesIgnoradas: string[] | undefined = [],
) => {
  return Object.entries(objeto).some(
    ([clave, valor]) => !clavesIgnoradas.includes(clave) && tieneValor(valor),
  );
};

export const generarRangoFechas = (fechaReferencia: Date) => {
  const fechaInicio = new Date(fechaReferencia);
  fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  fechaInicio.setDate(1);
  fechaInicio.setHours(0, 0, 0, 0);

  const fechaFin = new Date(fechaReferencia);
  fechaFin.setMonth(fechaFin.getMonth() + 1);
  fechaFin.setDate(0);
  fechaFin.setHours(23, 59, 59, 999);

  return {
    fechaInicio: formatearFechaUndefinedBackend(fechaInicio),
    fechaFin: formatearFechaUndefinedBackend(fechaFin),
  };
};

export function ordenarPorFecha<T>(
  campo: keyof T,
  descendente: boolean = true,
): (a: T, b: T) => number {
  return (a, b) => {
    const aFecha = dayjs(a[campo] as string | Date).valueOf();
    const bFecha = dayjs(b[campo] as string | Date).valueOf();
    return descendente ? bFecha - aFecha : aFecha - bFecha;
  };
}

export function ordenarPorString<T>(
  campo: keyof T,
  descendente: boolean = false,
): (a: T, b: T) => number {
  return (a, b) => {
    const aStr = String(a[campo] ?? '');
    const bStr = String(b[campo] ?? '');
    const comparacion = aStr.localeCompare(bStr);
    return descendente ? -comparacion : comparacion;
  };
}

const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filtrarPorColumnas =
  <T extends object>(columnas: (keyof T)[], valor: string) =>
  (x: T) => {
    const filtro = normalizar(valor);
    return columnas.some((col) =>
      normalizar(String(x[col] ?? '').toLowerCase()).includes(
        normalizar(filtro.toLowerCase()),
      ),
    );
  };

export const valorContiene = (texto: string, filtro: string): boolean => {
  return normalizar(texto.toLowerCase()).includes(
    normalizar(filtro.toLowerCase()),
  );
};

export const formatearFecha = (fecha: string, formato: string) => {
  return dayjs(fecha).format(formato);
};

export const formatearFechaDate = (fecha: Date, formato: string) => {
  return dayjs(fecha).format(formato);
};

export const formatearFechaUndefinedBackend = (fecha?: Date) => {
  return dayjs(fecha ?? new Date()).format('YYYY-MM-DD HH:mm:ss');
};

export const formatearFechaABackend = (fecha?: string | null) => {
  return fecha ? dayjs(fecha) : undefined;
};

export const EsPenal = (iDOITSesion: number | undefined) => {
  return (
    iDOITSesion == OITEnum.AudienciaProvincialPenal ||
    iDOITSesion == OITEnum.JuzgadoInstruccion ||
    iDOITSesion == OITEnum.JuzgadoPenal ||
    iDOITSesion == OITEnum.TSJPenal ||
    iDOITSesion == OITEnum.SCEPPenal
  );
};

export const mapearTipoAsunto = (
  idTipoAsunto: number,
  t: TFunction<'translation'>,
) => {
  switch (idTipoAsunto) {
    case TiposAsuntoEnum.Exhortos:
      return t('palabras.exhorto');
    case TiposAsuntoEnum.PiezasSeparadas:
      return t('palabras.pieza');
    default:
      return t('palabras.principal');
  }
};

export const mapearTipoAsuntoSegundaInstancia = (
  idTipoAsuntoSegundaInstancia: number,
  t: TFunction<'translation'>,
) => {
  switch (idTipoAsuntoSegundaInstancia) {
    case TiposAsuntoEnum.Exhortos:
      return t('palabras.exhorto');
    case TiposAsuntoEnum.Recursos:
      return t('palabras.recurso');
    default:
      return t('palabras.asunto');
  }
};

export const mapearTipoAsuntoAIdTipoAsuntoSegundaInstancia = (
  tipoAsunto?: string | null,
) => {
  switch (tipoAsunto) {
    case 'exhorto':
      return TiposAsuntoEnum.Exhortos;
    case 'recurso':
      return TiposAsuntoEnum.Recursos;
    default:
      return TiposAsuntoEnum.Asuntos;
  }
};

export const EsSCPE = (iDOITSesion?: number) => {
  return iDOITSesion == OITEnum.SCEPCivil || iDOITSesion == OITEnum.SCEPPenal;
};

export const EsFiscaliaOFiscaliaMenores = (iDOITSesion: number | undefined) => {
  return EsFiscalia(iDOITSesion) || EsFiscaliaMenores(iDOITSesion);
};

export const EsFiscalia = (iDOITSesion: number | undefined) => {
  return iDOITSesion == OITEnum.Fiscalia;
};

export const EsFiscaliaMenores = (iDOITSesion: number | undefined) => {
  return iDOITSesion == OITEnum.FiscaliaMenores;
};

export const esStringValido = (valor: string | null | undefined) =>
  valor !== null && valor !== undefined && valor.trim().length > 0;
