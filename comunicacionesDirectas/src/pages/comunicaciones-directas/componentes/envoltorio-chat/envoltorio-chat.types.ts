import { ColumnDef } from '@tanstack/react-table';
import { DatosElementosAConsolidar } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { ElementoListadoProps } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { Dispatch, SetStateAction } from 'react';

export interface ParametrosParaAdjuntarArchivos {
  columnas: ColumnDef<
    ElementoListadoProps<DatosElementosAConsolidar>,
    unknown
  >[];
  datos: ElementoListadoProps<DatosElementosAConsolidar>[];
  setDatos: React.Dispatch<
    React.SetStateAction<ElementoListadoProps<DatosElementosAConsolidar>[]>
  >;
  onIncorporarArchivos?: (ficheros: File[]) => void;
  onConsolidarArchivos: (datosAdjuntos: ElementoListadoProps<DatosElementosAConsolidar>[]) => void;
  maxFichero: number;
  tamanoPagina: number;
  tamanoTotalficherosPermitido: number;
  extensionesPermitidas: string[];
  sinScroll: boolean;
  actualizarListado: boolean;
  setActualizarListado: Dispatch<SetStateAction<boolean>>;
}
