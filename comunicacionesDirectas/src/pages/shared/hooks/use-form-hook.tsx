import { UseFormReturn, FieldValues, useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import {
  alMenosUnFiltroTieneValor,
  contarFiltrosAplicados,
} from '../utils/utils';
import { useAppStore } from '@/shared/zustand/store';
import useKeyPressFormulario from '@/pages/bandejas/bandeja-entrada/hooks/keypress-formulario.hook';

type CondicionIgnorar<T extends FieldValues> = {
  campo: keyof T;
  cuando?: {
    campo: keyof T;
    valor: unknown[];
    esIgual?: boolean;
    esDistinto?: boolean;
  }[];
};

export function useFormHook<T extends FieldValues>({
  registro,
  filtrosExcluidos = [],
  condicionesIgnorar = [],
  onSubmit,
}: {
  registro: UseFormReturn<T>;
  filtrosExcluidos?: (keyof T)[];
  condicionesIgnorar?: CondicionIgnorar<T>[];
  onSubmit: (filtros: T) => void;
}) {
  const cargando = useAppStore((x) => x.cargando);

  const { handleKeyPress } = useKeyPressFormulario<T>({
    registro,
    onSubmit,
  });

  const filtros = useWatch({ control: registro.control });

  const filtrosExcluidosFinales = useMemo(() => {
    const excluidos = new Set<string>(filtrosExcluidos.map((f) => f as string));

    condicionesIgnorar.forEach((cond) => {
      const campo = cond.campo as string;

      if (cond.cuando && Array.isArray(cond.cuando)) {
        const cumpleTodas = cond.cuando.every(
          ({ campo: otroCampo, valor, esIgual, esDistinto }) => {
            const actual = filtros?.[otroCampo as string];

            if (esIgual) {
              return valor.some((v) => actual === v);
            }

            if (esDistinto) {
              return valor.every((v) => actual !== v);
            }

            return false;
          },
        );

        if (cumpleTodas) {
          excluidos.add(campo);
        }
      }
    });

    return Array.from(excluidos);
  }, [filtros, filtrosExcluidos, condicionesIgnorar]);

  const filtrosAplicados = useMemo(
    () => contarFiltrosAplicados(filtros, filtrosExcluidosFinales) ?? 0,
    [filtros, filtrosExcluidosFinales],
  );

  const alMenosUnFiltro = useMemo(
    () => alMenosUnFiltroTieneValor(filtros, filtrosExcluidosFinales),
    [filtros, filtrosExcluidosFinales],
  );

  return {
    filtrosAplicados,
    sinFiltros: !alMenosUnFiltro,
    filtrosExcluidosFinales,
    cargando,
    disabled: cargando || !alMenosUnFiltro,
    handleKeyPress: alMenosUnFiltro ? handleKeyPress : () => {},
  };
}
