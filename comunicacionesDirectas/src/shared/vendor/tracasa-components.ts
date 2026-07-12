export { IconoCarga } from 'C:/Users/ataberna/tracasa-components/src/components/icono/icono-carga/icono-carga';
export { Aviso } from 'C:/Users/ataberna/tracasa-components/src/components/aviso/aviso';
export { Button } from 'C:/Users/ataberna/tracasa-components/src/components/base/button/button';
export { IconButton } from 'C:/Users/ataberna/tracasa-components/src/components/base/icon-button/icon-button';
export { InputSearch } from 'C:/Users/ataberna/tracasa-components/src/components/base/inputs-and-formularios/input-search/input-search';
export { TextButton } from 'C:/Users/ataberna/tracasa-components/src/components/base/text-button/text-button';
export { Mensaje } from 'C:/Users/ataberna/tracasa-components/src/components/texto/mensaje/mensaje';
export { Modal } from 'C:/Users/ataberna/tracasa-components/src/components/modal/modal';
export { BarraHerramientas } from 'C:/Users/ataberna/tracasa-components/src/components/barra-herramientas/barra-herramientas';
export { RowLayout } from 'C:/Users/ataberna/tracasa-components/src/layouts/row-layout/row-layout';
export { TituloCabecera } from 'C:/Users/ataberna/tracasa-components/src/components/titulo-cabecera/titulo-cabecera';
export { EmptyState } from 'C:/Users/ataberna/tracasa-components/src/components/empty-state/empty-state';
export { LayoutComunicaciones } from 'C:/Users/ataberna/tracasa-components/src/components/chat/layout-comunicaciones/layout-comunicaciones';
export { ChatLayout } from 'C:/Users/ataberna/tracasa-components/src/components/chat/chat/chat-layout';
export { CabeceraAvantius } from 'C:/Users/ataberna/tracasa-components/src/components/cabecera/cabecera-avantius/cabecera-avantius';
export { GlobalLayout } from 'C:/Users/ataberna/tracasa-components/src/layouts/global-layout/global-layout';
export { SubidaFicheros } from 'C:/Users/ataberna/tracasa-components/src/components/subida-ficheros/subida-ficheros';
export { TarjetaComunicacion } from 'C:/Users/ataberna/tracasa-components/src/components/chat/tarjeta-comunicacion/tarjeta-comunicacion';
export { IconWrapper } from 'C:/Users/ataberna/tracasa-components/src/components/icono/icon-wrapper/icon-wrapper';

export type { IconWrapperProps } from 'C:/Users/ataberna/tracasa-components/src/components/icono/icon-wrapper/icon-wrapper';
export type { IconName } from 'C:/Users/ataberna/tracasa-components/src/components/icono/icon-wrapper/icon-definitions';
export type { AvisoProps } from 'C:/Users/ataberna/tracasa-components/src/components/aviso/aviso';

export type ResultadoSubirFichero = {
  localizador?: string;
  calidadPDF?: string | number;
};

export { TiposAsuntoEnum } from 'C:/Users/ataberna/tracasa-components/src/models/enums/tipos-asunto-enum';
export { TiposProcedimientoEnum } from 'C:/Users/ataberna/tracasa-components/src/models/enums/tipos-procedimiento-enum';

export enum ProcedenciasArchivo {
  PortalDocumentacion = 'PortalDocumentacion',
}

export enum TiposDescarga {
  Archivo = 'Archivo',
}

export enum TiposIDElemento {
  Archivo = 'Archivo',
}

export enum OrigenesFicherosEnum {
  Avantius = 'Avantius',
}

export enum TiposExpediente {
  Expediente = 'Expediente',
}

export function createColumnDefsInput<TColumn>(
  _columnHelper: TColumn,
  columnDefs: any[],
) {
  return columnDefs;
}

export type Procedimiento = {
  numeroProcedimiento?: string;
  anoProcedimiento?: string;
  pieza?: string;
  [key: string]: any;
};

export type ElementoListadoProps<T = any> = T & Record<string, any>;

export type DatosElementoADescargar = Record<string, any>;
export type DatosElementosAConsolidar = Record<string, any>;

export type BocadilloProps = Record<string, any>;

export enum EstadosBocadillo {
  Enviado = 'Enviado',
  Error = 'Error',
  Leido = 'Leido',
}

export type AccionTarjeta = {
  idAccion: string | number;
  titulo: string;
  onClick: () => void;
  [key: string]: any;
};

export function useFileHandler() {
  const descargarElemento = async () => {
    console.warn('useFileHandler.descargarElemento is not implemented in the compatibility shim.');
  };

  const consolidarArchivo = async () => {
    console.warn('useFileHandler.consolidarArchivo is not implemented in the compatibility shim.');
    return undefined as any;
  };

  const obtenerTamanoMaximoFicheroASubir = async () => {
    return {
      [OrigenesFicherosEnum.Avantius]: 25 * 1024 * 1024,
    };
  };

  const obtenerExtensionesPermitidas = async () => {
    return [{ extension: '.pdf' }, { extension: '.docx' }, { extension: '.xlsx' }];
  };

  return {
    descargarElemento,
    consolidarArchivo,
    obtenerTamanoMaximoFicheroASubir,
    obtenerExtensionesPermitidas,
  };
}