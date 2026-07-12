import { useComunicacionesDirectasService } from '@/pages/comunicaciones-directas/ventana-comunicaciones-directas/comunicaciones-directas.service';
import { EnviarMensajeCommand } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { ComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import {
  EstadosMensajeConversacion,
  InfoUltimoMensaje,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { BocadilloProps, EstadosBocadillo } from 'tracasa-components';

import { SetStateAction, Dispatch, useRef } from 'react';

export function useEnviarMensaje(
  comunicacionesDirectasRepository: ComunicacionesDirectasRepository,
  setMensajesEnMemoria: Dispatch<SetStateAction<BocadilloProps[]>>,
  setInfoUltimoMensaje: Dispatch<SetStateAction<InfoUltimoMensaje | undefined>>,
  idConversacion: string,
) {
  const { EnviarMensaje } = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });
  const mensajeEnviado = useRef(false);
  const { mutateAsync } = EnviarMensaje();

  const handleEnviarMensaje = async (textoInput: string) => {
    if (!textoInput.trim()) return;

    const idMensajeEnMemoria = generarMensajeEnMemoria(textoInput);
    const request = getEnviarMensajeRequest(textoInput);
    await handleMutation(request, textoInput, idMensajeEnMemoria);
  };

  const generarMensajeEnMemoria = (textoInput: string) => {
    const nuevoMensaje: BocadilloProps = {
      texto: textoInput,
      fecha: new Date(),
      estado: undefined,
      esPropio: true,
      esAdjunto: false,
      onClickEnAdjuntos: () => {},
      idEnMemoria: String(Date.now() + Math.random() * 100000),
    };

    setMensajesEnMemoria((prevMensajes) => [...prevMensajes, nuevoMensaje]);

    return nuevoMensaje.idEnMemoria;
  };

  const getEnviarMensajeRequest = (
    textoInput: string,
  ): EnviarMensajeCommand => {
    return {
      idComunicacionEncriptado: idConversacion,
      contenidoMensaje: textoInput,
    };
  };

  const handleMutation = async (
    request: EnviarMensajeCommand,
    textoInput: string,
    idMensajeEnMemoria?: string,
  ) => {
    try {
      await mutateAsync(request);
      if (idMensajeEnMemoria) {
        actualizarEstadoMensaje(
          idMensajeEnMemoria,
          EstadosMensajeConversacion.Enviado,
        );
        mensajeEnviado.current = true;
      }
      if (mensajeEnviado.current) {
        setInfoUltimoMensaje({
          ultimoMensaje: textoInput,
          fechaUltimoMensaje: new Date().toString(),
          idConversacion: idConversacion,
        });
      }
    } catch (error) {
      console.error('Error', error);
      if (idMensajeEnMemoria) {
        actualizarEstadoMensaje(
          idMensajeEnMemoria,
          EstadosMensajeConversacion.Error,
        );
      }
    }
  };

  const actualizarEstadoMensaje = (
    idMensajeEnMemoria: string,
    estado: EstadosMensajeConversacion,
  ) => {
    let estadoActualizado: EstadosBocadillo;

    if (estado === EstadosMensajeConversacion.Error) {
      estadoActualizado = EstadosBocadillo.Error;
    } else if (estado === EstadosMensajeConversacion.Enviado) {
      estadoActualizado = EstadosBocadillo.Enviado;
    }

    setMensajesEnMemoria((prevMensajes) =>
      prevMensajes.map((mensaje) =>
        mensaje.idEnMemoria === idMensajeEnMemoria
          ? { ...mensaje, estado: estadoActualizado }
          : mensaje,
      ),
    );
  };

  return { handleEnviarMensaje };
}
