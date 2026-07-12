export interface IdentificadorPrincipalInterface {
  numIdentificador?: string;
  paisEmisor?: string;
  tipoIdentificador: string;
}

export type IntervinientesInterface = {
  idInterviniente: string;
  idTipoIntervencion: number;
  tipoIntervencion: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  acciones?: Accion[];
};

export type IntervinientesConAcciones = {
  acciones: Accion[];
  idInterviniente: string;
  tipoIntervencion: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  principal: boolean;
};

export type Accion = {
  accion: () => void;
  iconoDerecha: string;
  iconoIzquierda: string;
  textoDescriptivo: string;
};
