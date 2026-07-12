import { Dispatch, SetStateAction, useEffect } from 'react';
import { t } from 'i18next';
import { useQueryClient } from '@tanstack/react-query';

import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import { ComunicacionInfo } from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';

import { useComunicacionesDirectasService } from '../ventana-comunicaciones-directas/comunicaciones-directas.service';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

import { useAccionesTarjeta } from '../hooks/acciones-tarjeta';
import { useComunicaciones } from '../hooks/marcar-leido';

import { BotonArchivadas } from './boton-archivadas-component';
import { ListadoComunicaciones } from './tarjeta-comunicacion-component';
import { InputSearch } from 'tracasa-components';

type ComunicacionesDirectasBaseComponentProps = {
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
  setInfoComunicacion: Dispatch<SetStateAction<ComunicacionInfo | undefined>>;
};

export const ComunicacionesDirectasArchivadasComponent = ({
  comunicacionesDirectasRepository,
  setInfoComunicacion,
}: ComunicacionesDirectasBaseComponentProps) => {
  const comunicacionesDirectasService = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });

  const { data: dataArchivadas } =
    comunicacionesDirectasService.ObtenerComunicacionesArchivadas();

  const { data: conversacionesConMensajesNuevos } =
    comunicacionesDirectasService.ObtenerConversacionesConMensajesNuevos();

  const { data: comunicacionesArchivadasPendientes } =
    comunicacionesDirectasService.ObtenerComunicacionesArchivadasSinLeer();

  const { actualizarNuevosMensajes } = useComunicaciones(dataArchivadas);

  const { accionAccesoAlElemento } = useAccionesTarjeta(
    comunicacionesDirectasRepository,
    setInfoComunicacion,
    actualizarNuevosMensajes,
  );
  const { conversacionesFiltradas, conversacionSeleccionada } =
    useComunicacionesDirectasStore((state) => ({
      conversacionesFiltradas:
        state.conversacionesFiltradas ?? state.conversaciones ?? [],
      conversacionSeleccionada: state.conversacionSeleccionada,
    }));

  const { filtroTexto, setFiltroTexto } = useComunicacionesDirectasStore(
    (state) => ({
      filtroTexto: state.filtroTexto,
      setFiltroTexto: state.setFiltroTexto,
    }),
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversacionesConMensajesNuevos) return;
    if (!conversacionesConMensajesNuevos.length) return;
    if (!conversacionSeleccionada) return;

    if (
      conversacionesConMensajesNuevos.includes(
        conversacionSeleccionada.idConversacionEncriptado!,
      )
    ) {
      queryClient.invalidateQueries({
        queryKey: [
          'mensajes-por-conversacion',
          conversacionSeleccionada.idConversacionEncriptado,
        ],
        refetchType: 'all',
      });
    }

    queryClient.invalidateQueries({
      queryKey: ['comunicacion-archivada'],
      refetchType: 'all',
    });

    queryClient.invalidateQueries({
      queryKey: ['comunicacion-archivada-sin-leer'],
      refetchType: 'all',
    });
  }, [conversacionesConMensajesNuevos, conversacionSeleccionada, queryClient]);

  return (
    <div>
      <BotonArchivadas
        numeroComunicacionesArchivadas={comunicacionesArchivadasPendientes}
      />
      <div>
        <InputSearch
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          placeholder={t('paginas.comunicacionesDirectas.filtro')}
        />
      </div>
      <ListadoComunicaciones
        data={conversacionesFiltradas}
        accionAccesoAlElemento={accionAccesoAlElemento}
        textoMensaje={t(
          'paginas.comunicacionesDirectas.mensajeSinComunicacionesArchivadas',
        )}
      />
    </div>
  );
};
