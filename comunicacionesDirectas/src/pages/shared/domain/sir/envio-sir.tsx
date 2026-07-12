import { ObjectSchema, array, number, object, string } from 'yup';

import { ArchivoVM } from '@/shared/repositories/autogenerado/wsIntegracionSIRClient';

export const schema: ObjectSchema<EnvioSIRForm> = object({
  idExpedienteEncriptado: string().required(),
  destinoSeleccionado: object<Destino>().shape({
    dir3: string()
      .matches(/^[A-Za-z0-9]{9}$/)
      .required(),
    descripcion: string().required(),
  }),
  anexos: array(
    object({
      idArchivoEncriptado: string().required(),
      nombre: string().optional(),
      tipoArchivo: string().optional(),
      fechaArchivo: string().optional(),
      icono: number().optional(),
    }).required(),
  )
    .required()
    .min(1, 'paginas.sir.mensajes.errorValidacionAnexos'),
});

export type EnvioSIRForm = {
  idExpedienteEncriptado: string;
  destinoSeleccionado: Destino;
  anexos: ArchivoVM[];
};

export interface Destino {
  dir3: string;
  descripcion: string;
}
