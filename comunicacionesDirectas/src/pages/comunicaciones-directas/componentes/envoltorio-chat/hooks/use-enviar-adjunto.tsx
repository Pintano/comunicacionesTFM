import { SetStateAction, Dispatch } from 'react';
import { useComunicacionesDirectasService } from '@/pages/comunicaciones-directas/ventana-comunicaciones-directas/comunicaciones-directas.service';
import { ComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import {
  BocadilloProps,
  DatosElementoADescargar,
  DatosElementosAConsolidar,
  ElementoListadoProps,
  EstadosBocadillo,
  ProcedenciasArchivo,
  TiposDescarga,
  TiposIDElemento,
  useFileHandler,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import {
  EstadosMensajeConversacion,
  InfoUltimoMensaje,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { EnviarMensajeCommand } from '@/shared/repositories/autogenerado/wsMensajeriaClient';

export function useEnviarAdjunto(
  comunicacionesDirectasRepository: ComunicacionesDirectasRepository,
  setMensajesEnMemoria: Dispatch<SetStateAction<BocadilloProps[]>>,
  setInfoUltimoMensaje: Dispatch<SetStateAction<InfoUltimoMensaje | undefined>>,
  idConversacion: string,
) {
  const { EnviarMensaje, AsignarArchivoAMensaje } =
    useComunicacionesDirectasService({
      comunicacionesDirectasRepository,
    });
  const { mutateAsync: enviarMensaje } = EnviarMensaje();
  const { mutateAsync: asignarArchivoAMensaje } = AsignarArchivoAMensaje();

  const { descargarElemento, consolidarArchivo } = useFileHandler();

  const handleEnviarAdjuntos = (
    datosAdjuntos: ElementoListadoProps<DatosElementosAConsolidar>[],
  ) => {
    if (!datosAdjuntos || datosAdjuntos.length === 0) return;

    datosAdjuntos.forEach((adjunto) => {
      handleAdjunto(adjunto);
    });
  };

  const handleAdjunto = async (
    datosAdjunto: ElementoListadoProps<DatosElementosAConsolidar>,
  ) => {
    const datosElementosADescargar: DatosElementoADescargar = {
      IDTipoDescarga: TiposDescarga.Archivo,
      IDElemento: datosAdjunto.localizador,
      TipoIDElemento: TiposIDElemento.Archivo,
      Titulo: datosAdjunto.nombreArchivo,
      ProcedenciaArchivo: ProcedenciasArchivo.PortalDocumentacion,
    };

    const idMensajeEnMemoria = generarAdjuntoEnMemoria(
      datosElementosADescargar,
    );

    const request = getEnviarAdjuntoRequest(datosElementosADescargar);

    if (idMensajeEnMemoria) {
      handleMutation(request, datosAdjunto, idMensajeEnMemoria);
    }
  };

  const handleMutation = async (
    request: EnviarMensajeCommand,
    datosAdjunto: ElementoListadoProps<DatosElementosAConsolidar>,
    idMensajeEnMemoria: string,
  ) => {
    try {
      const idMensaje = await enviarMensaje(request);
      const idArchivo = await consolidarArchivo(datosAdjunto);

      await asignarArchivoAMensaje({
        idComunicacionEncriptado: idConversacion,
        idMensaje: idMensaje,
        idArchivo: idArchivo,
      });

      actualizarEstadoMensaje(
        idMensajeEnMemoria,
        EstadosMensajeConversacion.Enviado,
      );

      setInfoUltimoMensaje({
        ultimoMensaje: request.contenidoMensaje || '',
        fechaUltimoMensaje: new Date().toString(),
        idConversacion: idConversacion,
      });
    } catch (error) {
      console.error('Error enviando adjunto', error);
      actualizarEstadoMensaje(
        idMensajeEnMemoria,
        EstadosMensajeConversacion.Error,
      );
    }
  };

  const generarAdjuntoEnMemoria = (
    datosElementosADescargar: DatosElementoADescargar,
  ) => {
    const nuevoMensaje: BocadilloProps = {
      texto: datosElementosADescargar.Titulo,
      fecha: new Date(),
      estado: undefined,
      esPropio: true,
      esAdjunto: true,
      onClickEnAdjuntos: () => {
        descargarElemento(datosElementosADescargar);
      },
      idEnMemoria: datosElementosADescargar.IDElemento,
    };

    setMensajesEnMemoria((prevMensajes) => [...prevMensajes, nuevoMensaje]);

    return nuevoMensaje.idEnMemoria;
  };

  const getEnviarAdjuntoRequest = (
    datosElementosADescargar: DatosElementoADescargar,
  ): EnviarMensajeCommand => {
    return {
      idComunicacionEncriptado: idConversacion,
      contenidoMensaje: datosElementosADescargar.Titulo,
    };
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

  return { handleEnviarAdjuntos };
}
