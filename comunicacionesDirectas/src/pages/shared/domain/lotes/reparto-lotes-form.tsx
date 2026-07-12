import { object, string, ObjectSchema, array } from 'yup';

export type ConsultaRepartoLotesLajForm = {
  idLoteLaj: string;
  idLajSeleccionado: string | null;
};

export type ConsultaRepartoLotesFiscalForm = {
  idFiscalSeleccionado: string | null;
};

export const schema: ObjectSchema<ConsultaRepartoLotesLajForm> = object({
  idLoteLaj: string().required(),
  idLajSeleccionado: string().nullable().defined(),
});

export const schemaFiscal: ObjectSchema<ConsultaRepartoLotesFiscalForm> =
  object({
    idFiscalSeleccionado: string().nullable().defined(),
  });

export type ConsultaRepartoLotesGTForm = {
  idLoteGT: string;
  idGTSeleccionado: string | null;
};

export const schemaGT: ObjectSchema<ConsultaRepartoLotesGTForm> = object({
  idLoteGT: string().required(),
  idGTSeleccionado: string().nullable().defined(),
});

export type ConsultaRepartoGTSecundarios = {
  idGTSecundario: string[];
  idLoteGTSecundario: string;
};

export const schemaGTSecundarios: ObjectSchema<ConsultaRepartoGTSecundarios> =
  object({
    idGTSecundario: array().required(),
    idLoteGTSecundario: string().required(),
  });
