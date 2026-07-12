import { ChatLayout, EmptyState } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { ComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import { useMensajes } from './hooks/use-mensajes';
import {
  EstadosMensajeConversacion,
  InfoUltimoMensaje,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { useEnviarMensaje } from './hooks/use-enviar-mensaje';
import { MensajesPorConversacionResponse } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import {
  EstadosComunicacion,
  TAMANO_MAXIMO_MENSAJE,
} from '../../models/comunicaciones.enum';
import { useQueryClient } from '@tanstack/react-query';
import { useComunicacionesDirectasService } from '../../ventana-comunicaciones-directas/comunicaciones-directas.service';
import { useComunicacionesDirectasStore } from '../../ventana-comunicaciones-directas/comunicaciones-directas.store';
import { useEnviarAdjunto } from './hooks/use-enviar-adjunto';
import { useAdjuntos } from './hooks/use-adjuntos';
import { ModalAdjuntarArchivos } from './componentes/modal-adjuntos';

interface EnvoltorioChatProps {
  comunicacionesDirectasRepository: ComunicacionesDirectasRepository;
  setInfoUltimoMensaje: Dispatch<SetStateAction<InfoUltimoMensaje | undefined>>;
}

export function EnvoltorioChat({
  comunicacionesDirectasRepository,
  setInfoUltimoMensaje,
}: EnvoltorioChatProps) {
  const { t } = useTranslation();

  const {
    idConversacionSeleccionada,
    setConversacionSeleccionada,
    conversacionSeleccionada,
  } = useComunicacionesDirectasStore();

  const queryClient = useQueryClient();

  const comunicacionesDirectasService = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });

  const { mensajesEnMemoria, setMensajesEnMemoria } = useMensajes(
    conversacionSeleccionada?.mensajes,
  );

  const { data: mensajes } =
    comunicacionesDirectasService.ObtenerMensajesPorConversacion(
      idConversacionSeleccionada!,
    );

  const marcarMensajesLeidos = useCallback(
    async (conversacion: MensajesPorConversacionResponse) => {
      const mensajesSinLeer = conversacion.mensajes!.filter(
        (m) =>
          m.estadoMensaje === EstadosMensajeConversacion.Enviado &&
          !m.esPropioMensaje,
      );

      if (mensajesSinLeer.length === 0) return;

      const ids = mensajesSinLeer.map((m) => m.idMensajeEncriptado!);
      await comunicacionesDirectasRepository.marcarMensajesLeidos({
        idsMensajesLeidosEncriptados: ids,
      });
      await queryClient.invalidateQueries({
        queryKey: ['comunicacion-activa'],
      });
    },
    [comunicacionesDirectasRepository, queryClient],
  );

  useEffect(() => {
    if (!mensajes) return;

    setConversacionSeleccionada(mensajes);
  }, [mensajes, setConversacionSeleccionada]);

  useEffect(() => {
    if (conversacionSeleccionada?.mensajes) {
      marcarMensajesLeidos(conversacionSeleccionada);
    }
  }, [conversacionSeleccionada, marcarMensajesLeidos]);

  const { handleEnviarAdjuntos } = useEnviarAdjunto(
    comunicacionesDirectasRepository,
    setMensajesEnMemoria,
    setInfoUltimoMensaje,
    idConversacionSeleccionada!,
  );

  const {
    isOpenIncorporarArchivos,
    setIsOpenIncorporarArchivos,
    parametrosAdjuntadoArchivos,
    onFicheroSubidoConversacion,
  } = useAdjuntos(handleEnviarAdjuntos);

  const { handleEnviarMensaje } = useEnviarMensaje(
    comunicacionesDirectasRepository,
    setMensajesEnMemoria,
    setInfoUltimoMensaje,
    idConversacionSeleccionada!,
  );

  const onEnviar = async (textoInput: string) => {
    await handleEnviarMensaje(textoInput);
    await queryClient.invalidateQueries({ queryKey: ['comunicacion-activa'] });
  };

  return (
    <>
      {!conversacionSeleccionada ? (
        <EmptyState
          icono="infoCircle"
          titulo={t('chat.conversacion.seleccioneUnaComunicacion')}
        >
          {t('chat.conversacion.seleccioneUnaComunicacionExtendido')}
        </EmptyState>
      ) : (
        <>
          <ChatLayout
            onEnviar={onEnviar}
            onAdjuntar={() => setIsOpenIncorporarArchivos(true)}
            maxLength={TAMANO_MAXIMO_MENSAJE}
            mensajes={mensajesEnMemoria}
            readonly={
              conversacionSeleccionada.idEstadoConversacion ==
              EstadosComunicacion.Archivada
            }
            textReadonly={t('chat.conversacion.mensajeComunicacionArchivada')}
          ></ChatLayout>
        </>
      )}

      {parametrosAdjuntadoArchivos && (
        <ModalAdjuntarArchivos
          isOpen={isOpenIncorporarArchivos}
          onClose={() => setIsOpenIncorporarArchivos(false)}
          parametros={parametrosAdjuntadoArchivos}
          onFicheroSubidoConversacion={onFicheroSubidoConversacion}
        />
      )}
    </>
  );
}
