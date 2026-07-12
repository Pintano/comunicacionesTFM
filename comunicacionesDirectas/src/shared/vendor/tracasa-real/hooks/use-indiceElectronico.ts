import { useCallback } from 'react';
import { openNewWindow } from '../helpers/helpers';
import { OITEnum } from '../models';

export const useAbrirVentanaIndiceElectronico = () => {
  const EsOITConEstructuraIndiceNueva = (idOIT: OITEnum) => {
    switch (idOIT) {
      case OITEnum.ServicioEjecucionPenal:
      case OITEnum.JusticiaRestaurativa:
      case OITEnum.EquipoPsicosocial:
        return true;
      default:
        return false;
    }
  };

  const AbrirVentanaIndiceElectronico = useCallback(
    ({
      baseUrl,
      idExpedienteEncriptado,
      abrirIndiceFiscalia,
      abrirIndiceExpedienteAdministrativo,
      esDiligencia,
      esModoLectura = false,
      idDocRemisionEncriptado = '',
      idAsuntoAuxilioEncriptado = '',
      idObjetoVisibilidadEncriptado = '',
      idOIT,
    }: {
      baseUrl: string;
      idExpedienteEncriptado: string;
      abrirIndiceFiscalia: boolean;
      abrirIndiceExpedienteAdministrativo: boolean;
      esDiligencia: boolean;
      esModoLectura?: boolean;
      idDocRemisionEncriptado?: string;
      idAsuntoAuxilioEncriptado?: string;
      idObjetoVisibilidadEncriptado?: string;
      idOIT: OITEnum;
    }) => {
      let url = '';

      if (EsOITConEstructuraIndiceNueva(idOIT)) {
        url = `app/index.html#/expediente/exploradorNuevaestructura/${idExpedienteEncriptado}`;
      } else {
        if (idObjetoVisibilidadEncriptado !== '')
          url = `app/index.html#/expediente/explorador/${idExpedienteEncriptado}/${idObjetoVisibilidadEncriptado}`;
        else
          url = `app/index.html#/expediente/explorador/${idExpedienteEncriptado}/${abrirIndiceFiscalia}/${esDiligencia}/${abrirIndiceExpedienteAdministrativo}`;

        if (idDocRemisionEncriptado !== '') {
          url += `/${idDocRemisionEncriptado}`;
        }

        if (idAsuntoAuxilioEncriptado !== '') {
          url += `/${idAsuntoAuxilioEncriptado}`;
        }

        if (esModoLectura) {
          url += '/1';
        }
      }

      openNewWindow(url, 'fullscreen', baseUrl);
    },
    [],
  );

  return { AbrirVentanaIndiceElectronico };
};
