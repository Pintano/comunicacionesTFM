import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import { t } from 'i18next';
import { AccionTarjeta } from 'tracasa-components';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useComunicacionesDirectasService } from '../ventana-comunicaciones-directas/comunicaciones-directas.service';
import { ComunicacionInfo } from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { Conversacion } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';
import { useQueryClient } from '@tanstack/react-query';

export function useAccionesTarjeta(
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository,
  setInfoComunicacion: Dispatch<SetStateAction<ComunicacionInfo | undefined>>,
  actualizarNuevosMensajes: (idComunicacion: string) => void,
) {
  const {
    conversacionSeleccionada,
    setConversacionSeleccionada,
    setIdConversacionSeleccionada,
  } = useComunicacionesDirectasStore();

  const { mutate: archivarMutate } = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  }).ArchivarComunicaciones();

  const accionArchivarComunicaciones = useCallback(
    (idComunicacion: string): AccionTarjeta => ({
      key: 2,
      idAccion: 2,
      titulo: t('paginas.comunicacionesDirectas.archivar'),
      onClick: () => archivarMutate([idComunicacion]),
    }),
    [archivarMutate],
  );

  const queryClient = useQueryClient();

  const accionAccesoAlElemento = useCallback(
    (comunicacion: Conversacion): AccionTarjeta => ({
      key: 1,
      idAccion: 1,
      titulo: t('palabras.accederAElemento'),
      onClick: async () => {
        if (
          comunicacion.idConversacionEncriptado !=
          conversacionSeleccionada?.idConversacionEncriptado
        )
          setConversacionSeleccionada(comunicacion);
        setIdConversacionSeleccionada(comunicacion.idConversacionEncriptado!);

        queryClient.invalidateQueries({
          queryKey: [
            'mensajes-por-conversacion',
            comunicacion.idConversacionEncriptado,
          ],
          refetchType: 'all',
        });

        setInfoComunicacion({
          idComunicacion: comunicacion.idConversacionEncriptado!,
          titulo: comunicacion.titulo!,
          remitenteRol: comunicacion.nombreParticipante!,
        });
      },
    }),
    [
      conversacionSeleccionada?.idConversacionEncriptado,
      setConversacionSeleccionada,
      setIdConversacionSeleccionada,
      queryClient,
      setInfoComunicacion,
      actualizarNuevosMensajes,
    ],
  );

  return {
    accionArchivarComunicaciones,
    accionAccesoAlElemento,
  };
}
