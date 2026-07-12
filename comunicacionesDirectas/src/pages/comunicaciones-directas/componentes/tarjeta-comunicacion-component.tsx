/* eslint-disable react/prop-types */
import { memo, useMemo } from 'react';
import { t } from 'i18next';
import {
  AccionTarjeta,
  EmptyState,
  TarjetaComunicacion,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import {
  EstadosMensajeConversacion,
  TipoMensajeConversacion,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { formatearFecha } from './tarjeta-comunicacion.utils';
import { Conversacion } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

interface ListadoComunicacionesProps {
  data: Conversacion[];
  accionAccesoAlElemento: (comunicacion: Conversacion) => AccionTarjeta;
  accionArchivarComunicaciones?: (idConversacion: string) => AccionTarjeta;
  textoMensaje: string;
}

export const ListadoComunicaciones = memo(
  ({
    data,
    accionAccesoAlElemento,
    accionArchivarComunicaciones,
    textoMensaje,
  }: ListadoComunicacionesProps) => {
    const seleccionadaId = useComunicacionesDirectasStore(
      (state) =>
        state.conversacionSeleccionada?.idConversacionEncriptado ?? null,
    );

    const elementos = useMemo(
      () =>
        data.map((comunicacion) => {
          const fechaFormateada = formatearFecha(
            comunicacion.fechaUltimoMensaje?.toString() ?? '',
          );
          const remitente = comunicacion.nombreParticipante!;
          const subrol = remitente.includes('/')
            ? remitente.split('/')[1].trim()
            : remitente;

          let colorIcono: 'primario' | 'secundario' = 'secundario';
          let textoEstado = '';

          colorIcono =
            comunicacion.estadoUltimoMensaje ===
            EstadosMensajeConversacion.Leido
              ? 'primario'
              : 'secundario';
          if (
            comunicacion.tipoUltimoMensaje === TipoMensajeConversacion.Sistema
          ) {
            textoEstado = t(
              'paginas.comunicacionesDirectas.mensajesSistema.' +
                comunicacion.ultimoMensaje!,
            );
          } else {
            if (comunicacion.esPropioMensaje) {
              textoEstado = `${t('palabras.ud')}: ${comunicacion.ultimoMensaje}`;
            } else {
              textoEstado = `${subrol}: ${comunicacion.ultimoMensaje}`;
            }
          }

          const handleClick = () => {
            accionAccesoAlElemento(comunicacion).onClick?.();
          };

          return (
            <TarjetaComunicacion
              key={comunicacion.idConversacionEncriptado}
              id={Date.now() + Math.random() * 100000}
              titulo={comunicacion.titulo!}
              subtitulo={remitente}
              notaSuperior={fechaFormateada}
              icono={comunicacion.esPropioMensaje ? 'checks' : undefined}
              colorIcono={colorIcono}
              texto={textoEstado}
              onClick={handleClick}
              seleccionada={
                seleccionadaId === comunicacion.idConversacionEncriptado
              }
              archivada={!accionArchivarComunicaciones}
              contador={comunicacion.mensajesSinLeer || 0}
            />
          );
        }),
      [
        data,
        seleccionadaId,
        accionArchivarComunicaciones,
        accionAccesoAlElemento,
      ],
    );

    return data.length > 0 ? (
      elementos
    ) : (
      <EmptyState key={1}>{textoMensaje}</EmptyState>
    );
  },
);

ListadoComunicaciones.displayName = 'ListadoComunicaciones';
