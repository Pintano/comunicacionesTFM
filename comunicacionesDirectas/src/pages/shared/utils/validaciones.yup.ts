import { object, string } from 'yup';
import { compararProcedimientos, validarProcedimiento } from './utils';
import { Procedimiento } from 'tracasa-components';
import {
  traducirConParametros,
  translateWithParams,
} from '@/shared/config/i18n/yup.config';

export const fechaDesdeConValidacion = () =>
  string()
    .typeError(translateWithParams('fechas.fechaDesdeSuperiorFechaHasta'))
    .test(
      'fechaHastaMayorQueFechaDesde',
      translateWithParams('fechas.fechaDesdeSuperiorFechaHasta'),
      function (value) {
        const { fechaHasta } = this.parent;
        return fechaHasta && value
          ? new Date(fechaHasta) >= new Date(value)
          : true;
      },
    );

export const fechaHastaConValidacion = () =>
  string().test(
    'fechaHastaNoMenorQueFechaDesde',
    translateWithParams('fechas.fechaDesdeSuperiorFechaHasta') ?? '',
    function (value) {
      const { fechaDesde } = this.parent;

      if (!value) return true;

      return fechaDesde && value
        ? new Date(value) >= new Date(fechaDesde)
        : true;
    },
  );

export const fechaEnvioDesdeConValidacion = () =>
  string()
    .typeError(
      translateWithParams('fechas.fechaEnvioDesdeSuperiorFechaEnvioHasta'),
    )
    .test(
      'fechaEnvioHastaNoMenorQueFechaEnvioDesde',
      translateWithParams('fechas.fechaEnvioDesdeSuperiorFechaEnvioHasta'),
      function (value) {
        const { fechaEnvioHasta } = this.parent;
        return fechaEnvioHasta && value
          ? new Date(fechaEnvioHasta) >= new Date(value)
          : true;
      },
    );

export const fechaDevolucionDesdeConValidacion = () =>
  string()
    .typeError(
      translateWithParams(
        'fechas.fechaDevolucionDesdeSuperiorFechaDevolucionHasta',
      ),
    )
    .test(
      'fechaDevolucionHastaNoMenorQueFechaDevolucionDesde',
      translateWithParams(
        'fechas.fechaDevolucionDesdeSuperiorFechaDevolucionHasta',
      ),
      function (value) {
        const { fechaDevolucionHasta } = this.parent;
        return fechaDevolucionHasta && value
          ? new Date(fechaDevolucionHasta) >= new Date(value)
          : true;
      },
    );

export const numeroProcedimientoDesdeConValidacion = () =>
  object<Procedimiento>()
    .shape({
      numeroProcedimiento: string(),
      anoProcedimiento: string(),
      pieza: string(),
    })
    .notRequired()
    .test(
      'procedimientoHastaMayorQueDesde',
      translateWithParams('validaciones.numeroProcedimientoDesdeMayorQueHasta'),
      function (desde) {
        const hasta = this.parent?.numeroProcedimientoHasta;
        return compararProcedimientos(desde ?? undefined, hasta);
      },
    )
    .test(
      'procedimientoHastaNoMenorQueDesde',
      traducirConParametros('validaciones.formatoProcedimientoIncorrecto'),
      function (desde) {
        return validarProcedimiento(desde ?? undefined);
      },
    );

export const numeroProcedimientoHastaConValidacion = () =>
  object<Procedimiento>()
    .shape({
      numeroProcedimiento: string(),
      anoProcedimiento: string(),
      pieza: string(),
    })
    .notRequired()
    .test(
      'procedimientoHastaNoMenorQueDesde',
      translateWithParams('validaciones.numeroProcedimientoDesdeMayorQueHasta'),
      function (hasta) {
        const desde = this.parent?.numeroProcedimientoDesde;
        return compararProcedimientos(desde, hasta ?? undefined);
      },
    )
    .test(
      'procedimientoHastaNoMenorQueDesde',
      traducirConParametros('validaciones.formatoProcedimientoIncorrecto'),
      function (hasta) {
        return validarProcedimiento(hasta ?? undefined);
      },
    );

const tieneValor = (valor: unknown): boolean => {
  if (valor === null || valor === undefined) return false;
  if (typeof valor === 'string') return valor.trim() !== '';
  if (typeof valor === 'number' || typeof valor === 'boolean') return true;
  if (typeof valor === 'object') {
    return Object.values(valor as Record<string, unknown>).some((x) =>
      tieneValor(x),
    );
  }
  return false;
};

export const alMenosUnFiltroBusqueda = (
  clavesIgnoradas: string[] | undefined = [],
) =>
  object()
    .notRequired()
    .test(
      'al-menos-un-campo',
      translateWithParams('shared.busquedas.alMenos1FiltroBusqueda'),
      function () {
        const objeto = this.parent;
        if (!objeto) return true;

        return Object.entries(objeto).some(
          ([clave, valor]) =>
            !clavesIgnoradas.includes(clave) && tieneValor(valor),
        );
      },
    );

export const procedimientoOpcional = () =>
  object<Procedimiento>()
    .shape({
      numeroProcedimiento: string().optional(),
      anoProcedimiento: string().optional(),
      pieza: string().optional(),
    })
    .optional()
    .test(
      'procedimientoOpcionalFormatoValido',
      traducirConParametros('validaciones.formatoProcedimientoIncorrecto'),
      function (procedimiento) {
        if (!procedimiento) return true;
        return validarProcedimiento(procedimiento);
      },
    );
