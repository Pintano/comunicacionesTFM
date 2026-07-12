export type Interviniente = {
  idInterviniente: string;
  nombreCompleto: string;
  numeroIdentificacion: string;
  tipoIdentificacion: string;
  sexo: string;
  idSexo: number;
  tipoIntervencion: string;
  municipioNacimiento: string;
  fechaNacimiento: string;
  paisNacimiento: string;
  idTipoIdentificacion: number;
  paisExpedicionExtranjero: boolean;
};

export interface Asiento {
  numeroExpedienteDICIREG: string;
  fechaInscripcion: Date;
  tipoAsiento: string;
}

export type Inscripcion = {
  idSolicitudInscripcionDICIREG: string;
  fechaSolicitud: string;
  tipoInscripcion: string;
  numeroExpedienteENI: string;
  estado: string;
};

export type Certificado = {
  idSolicitudCertificadoDICIREG: string;
  fechaSolicitud: string;
  tipoCertificado: string;
  numeroExpedienteENI: string;
  estado: string;
};
