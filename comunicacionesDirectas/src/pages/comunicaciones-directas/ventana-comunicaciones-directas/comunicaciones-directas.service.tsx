import { config } from '@/config';
import useMutationCargando from '@/pages/shared/hooks/use-mutation-cargando';
import {
  ActualizarConsentimientoComunicacionesCommand,
  AsignarArchivoAMensajeCommand,
  ConversacionesPorUsuarioResponse,
  EnviarMensajeCommand,
  MensajesPorConversacionResponse,
} from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

type ComunicacionesDirectasServiceProps = {
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
};

export const useComunicacionesDirectasService = ({
  comunicacionesDirectasRepository,
}: ComunicacionesDirectasServiceProps) => {
  const ObtenerComunicacionesActivas = () => {
    return useQuery({
      queryKey: ['comunicacion-activa'],
      queryFn: async (): Promise<ConversacionesPorUsuarioResponse> =>
        comunicacionesDirectasRepository.obtenerConversacionesPorUsuario(true),
    });
  };
  const ObtenerComunicacionesArchivadasSinLeer = () => {
    return useSuspenseQuery({
      queryKey: ['comunicacion-archivada-sin-leer'],
      queryFn: async (): Promise<number> =>
        comunicacionesDirectasRepository.obtenerArchivadasConMensajesNuevos({}),
    });
  };
  const ObtenerComunicacionesArchivadas = () => {
    return useSuspenseQuery({
      queryKey: ['comunicacion-archivada'],
      queryFn: async (): Promise<ConversacionesPorUsuarioResponse> =>
        comunicacionesDirectasRepository.obtenerConversacionesPorUsuario(false),
    });
  };
  const ObtenerConversacionesConMensajesNuevos = () => {
    return useQuery({
      queryKey: ['mensajesPendientesPorConversacion'],
      queryFn: async (): Promise<string[]> =>
        comunicacionesDirectasRepository.obtenerConversacionesConMensajesNuevos(
          {},
        ),
      refetchInterval: Number(
        config.comunicacionesDirectas?.tasaRefrescoComunicacionesDirectas ?? 0,
      ),
    });
  };
  const ArchivarComunicaciones = () => {
    return useMutation({
      mutationFn: (idsComunicaciones: string[]) =>
        comunicacionesDirectasRepository.archivarComunicacionesDirectas({
          idsComunicacionesEncriptados: idsComunicaciones,
        }),
    });
  };

  const EnviarMensaje = () => {
    return useMutation<string, unknown, EnviarMensajeCommand>({
      mutationFn: async (request: EnviarMensajeCommand) => {
        return await comunicacionesDirectasRepository.enviarMensaje(request);
      },
    });
  };

  const ComprobarConsentimientoComunicaciones = () => {
    return useSuspenseQuery({
      queryKey: ['ComprobarConsentimientoComunicaciones'],
      queryFn: async (): Promise<boolean> =>
        comunicacionesDirectasRepository.comprobarConsentimientoComunicaciones(
          {},
        ),
    });
  };

  const ActualizarConsentimientoComunicaciones = () => {
    return useMutationCargando(['actualizar-consentimiento-comunicaciones'], {
      mutationFn: (request: ActualizarConsentimientoComunicacionesCommand) =>
        comunicacionesDirectasRepository.actualizarConsentimientoComunicaciones(
          request,
        ),
    });
  };
  const ObtenerMensajesPorConversacion = (idConversacionEncriptado: string) => {
    return useQuery({
      queryKey: ['mensajes-por-conversacion', idConversacionEncriptado],
      queryFn: async (): Promise<MensajesPorConversacionResponse> => {
        return comunicacionesDirectasRepository.obtenerMensajesPorConversacion(
          idConversacionEncriptado,
        );
      },
      enabled: !!idConversacionEncriptado,
    });
  };

  const AsignarArchivoAMensaje = () =>
    useMutation({
      mutationFn: (request: AsignarArchivoAMensajeCommand) =>
        comunicacionesDirectasRepository.asignarArchivoAMensaje(request),
    });

  return {
    ObtenerComunicacionesActivas,
    ObtenerComunicacionesArchivadas,
    ArchivarComunicaciones,
    EnviarMensaje,
    ObtenerConversacionesConMensajesNuevos,
    ObtenerComunicacionesArchivadasSinLeer,
    ComprobarConsentimientoComunicaciones,
    ActualizarConsentimientoComunicaciones,
    ObtenerMensajesPorConversacion,
    AsignarArchivoAMensaje,
  };
};
