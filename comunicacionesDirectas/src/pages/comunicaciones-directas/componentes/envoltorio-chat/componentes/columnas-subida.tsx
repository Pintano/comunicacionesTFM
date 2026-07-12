import { createColumnHelper } from '@tanstack/react-table';
import {
  createColumnDefsInput,
  DatosElementosAConsolidar,
  ElementoListadoProps,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { TFunction } from 'i18next';

export const getColumnasSubida = (
  t: TFunction,
  handleCellChange: (
    id: number,
    value: string | null,
    campo: keyof DatosElementosAConsolidar,
  ) => void,
) => {
  const columnHelper =
    createColumnHelper<ElementoListadoProps<DatosElementosAConsolidar>>();

  return createColumnDefsInput(columnHelper, [
    {
      id: 'nombreArchivo',
      tipo: 'input',
      texto: t('chat.conversacion.titulo') + '*',
      alinear: 'centro',
      tamano: 40,
      handleCellChange: (id, value) =>
        handleCellChange(id, value, 'nombreArchivo'),
    },
    {
      id: 'FechaDocumento',
      tipo: 'fechaYHora',
      texto: t('palabras.fecha'),
      alinear: 'centro',
      tamano: 20,
      handleCellChange: (id, value) =>
        handleCellChange(id, value, 'FechaDocumento'),
    },
  ]);
};
