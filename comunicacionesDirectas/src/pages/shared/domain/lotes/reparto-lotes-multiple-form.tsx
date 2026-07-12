import { ObjectSchema, array, boolean, object, string } from 'yup';

export type AsignarGrupoTrabajo = {
  grupoTrabajoAleatorio: boolean;
  iDGrupoTrabajoEncriptado?: string;
};

export const schemaAsignarGrupoTrabajo: ObjectSchema<AsignarGrupoTrabajo> =
  object({
    grupoTrabajoAleatorio: boolean().required(),
    iDGrupoTrabajoEncriptado: string()
      .defined()
      .when('grupoTrabajoAleatorio', {
        is: false,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

export type AsignarLAJ = {
  usuarioLetradoAleatorio: boolean;
  iDUsuarioLetradoEncriptado?: string;
};

export const schemaAsignarLAJ: ObjectSchema<AsignarLAJ> = object({
  usuarioLetradoAleatorio: boolean().required(),
  iDUsuarioLetradoEncriptado: string()
    .defined()
    .when('usuarioLetradoAleatorio', {
      is: false,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export type AsignarFiscal = {
  idUsuarioEncriptado: string;
};

export const schemaAsignarFiscal: ObjectSchema<AsignarFiscal> = object({
  idUsuarioEncriptado: string().defined(),
});

export type AsignarGrupoTrabajoSecundario = {
  idsGrupoTrabajoSecundario: string[];
};

export const schemaAsignarGrupoTrabajoSecundario: ObjectSchema<AsignarGrupoTrabajoSecundario> =
  object({
    idsGrupoTrabajoSecundario: array().of(string().defined()).required(),
  });

export type DatosExpedienteErrorAsignacion = {
  descripcionExpediente: string;
  organoJudicialTramita: string;
  motivo?: string;
  errorSinGrupoPrincipal?: boolean;
  errorMismoGrupoPrincipalSecundario?: boolean;
};
