import { Mensaje } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import {
  EstadosMensajeConversacion,
  TipoMensajeConversacion,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import {
  BocadilloProps,
  DatosElementoADescargar,
  EstadosBocadillo,
  ProcedenciasArchivo,
  TiposDescarga,
  TiposIDElemento,
  useFileHandler,
} from 'tracasa-components';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useMemo, useState, useEffect } from 'react';

function mapearMensajes(
  mensajes?: Mensaje[],
  descargarElemento?: (datos: DatosElementoADescargar) => void,
): BocadilloProps[] {
  if (!mensajes) return [];

  return mensajes.map((msg) => {
    let estado: EstadosBocadillo;
    switch (msg.estadoMensaje) {
      case EstadosMensajeConversacion.Enviado:
        estado = EstadosBocadillo.Enviado;
        break;
      case EstadosMensajeConversacion.Error:
        estado = EstadosBocadillo.Error;
        break;
      case EstadosMensajeConversacion.Leido:
        estado = EstadosBocadillo.Leido;
        break;
      default:
        estado = EstadosBocadillo.Enviado;
        break;
    }
    return {
      texto:
        msg.tipoMensaje === TipoMensajeConversacion.Sistema
          ? t('paginas.comunicacionesDirectas.mensajesSistema.' + msg.texto!)
          : msg.texto!,
      fecha: dayjs(msg.fechaEnvio).toDate(),
      estado: estado,
      esGenerico: msg.tipoMensaje === TipoMensajeConversacion.Sistema,
      esPropio: msg.esPropioMensaje!,
      esAdjunto: msg.localizadorArchivo != undefined,
      onClickEnAdjuntos: () => {
        if (descargarElemento) {
          onClickDescargarElemento(msg, descargarElemento);
        }
      },
    };
  });
}

function onClickDescargarElemento(
  msg: Mensaje,
  descargarElemento: (datos: DatosElementoADescargar) => void,
) {
  const datosElementosADescargar: DatosElementoADescargar = {
    IDTipoDescarga: TiposDescarga.Archivo,
    IDElemento: msg.localizadorArchivo!,
    LocalizadorElemento: msg.localizadorArchivo!,
    TipoIDElemento: TiposIDElemento.Archivo,
    Titulo: msg.texto!,
    ProcedenciaArchivo: ProcedenciasArchivo.PortalDocumentacion,
  };

  descargarElemento(datosElementosADescargar);
}

export function useMensajes(mensajes?: Mensaje[]) {
  const { descargarElemento } = useFileHandler();

  const mensajesMapeadosComponente = useMemo(
    () => mapearMensajes(mensajes, descargarElemento),
    [mensajes],
  );

  const [mensajesEnMemoria, setMensajesEnMemoria] = useState<BocadilloProps[]>(
    mensajesMapeadosComponente,
  );

  useEffect(() => {
    setMensajesEnMemoria(mapearMensajes(mensajes, descargarElemento));
  }, [mensajes]);

  return { mensajesEnMemoria, setMensajesEnMemoria };
}
