export type MaestrosExpediente = {
  tipoProcedimiento?: string;
  numero?: string;
  ano?: string;
  pieza?: string;
  idPais?: number;
  codigoProvincia?: string;
  codigoMunicipio?: string;
};

export type TipoProcedimiento = {
  id: number;
  idTipoProcedimiento: number;
  codigo: string;
  descripcion: string;
  idMateria: number;
};

export type Pais = {
  codigo: string;
  descripcion: string;
};

export type Provincia = {
  codigo: string;
  codigoPais: string;
  descripcion: string;
};

export type Municipio = {
  codigo: string;
  codigoProvincia: string;
  descripcion: string;
};

export type RegistroCivil = {
  id: number;
  codigo: string;
  codigoMunicipio?: string;
  codigoPais: string;
  descripcion: string;
};

export type Idioma = {
  id: number;
  idIdiomaDICIREG: number;
  codigo: string;
  descripcion: string;
};

export type PersonaInscripcion = {
  nombreYApellidos: string;
  numeroIdentificacion: string;
  sexo: string;
  fechaNacimiento: string;
  paisNacimiento: string;
  municipioNacimiento: string;
  idSexo: number;
};

export type DocumentoInscripcion = {
  idArchivo: string;
  titulo: string;
  fecha: string;
};

export type Documento = {
  idDocumento: string;
  idArchivo: string;
  titulo: string;
  fecha: string;
};

export type Documentacion = {
  solicitante: Solicitante[];
  recibida?: Recibida[];
};

export type Solicitante = {
  idArchivo: string;
  titulo: string;
  fechaIncorporacion: string;
  descripcionTipoDocumento: string;
  fechaConsolidacion: string;
  enviado: boolean;
};

export type Recibida = {
  idArchivo: string;
  titulo: string;
  descripcionTipoDocumento: string;
  fechaRecepcion: string;
  localizadorArchivo: string;
};
