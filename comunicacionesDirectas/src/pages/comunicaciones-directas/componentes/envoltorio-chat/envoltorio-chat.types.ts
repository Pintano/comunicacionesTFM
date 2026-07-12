import { ColumnDef } from '@tanstack/react-table';
import { DatosElementosAConsolidar } from 'tracasa-components';
import { ElementoListadoProps } from 'tracasa-components';
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
