import { InformacionConfiguracionFirma } from '@/pages/configuracion-firma/secciones/informacion-firma';
import { ElementoListadoProps } from 'tracasa-components';
import { boolean, date, object, ObjectSchema, string } from 'yup';

export interface ConfiguracionFirmaRequest {}

export interface ConfiguracionFirmaResponse {
  datosConsulta: ElementoListadoProps<InformacionConfiguracionFirma>[];
}

export type DatosConfiguracionFirmaForm = {
  nombre?: string | null;
  fecha?: Date | null;
  tipo?: string | null;
  origen?: string | null;
  procedimiento?: string | null;
  ordenFirma?: boolean | null;
  revisionFirmante?: boolean | null;
};

export const schema: ObjectSchema<DatosConfiguracionFirmaForm> = object({
  nombre: string().nullable(),
  fecha: date().nullable(),
  tipo: string().nullable(),
  origen: string().nullable(),
  procedimiento: string().nullable(),
  ordenFirma: boolean().nullable(),
  revisionFirmante: boolean().nullable(),
});
