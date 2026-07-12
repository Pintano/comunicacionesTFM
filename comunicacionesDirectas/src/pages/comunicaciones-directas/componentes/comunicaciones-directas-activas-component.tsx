import { Dispatch, SetStateAction, useEffect } from 'react';
import { t } from 'i18next';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import {
  RowLayout,
  TituloCabecera,
  AvisoProps,
  InputSearch,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';

import styles from '@/shared/styles/general/general.module.css';
import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import {
  ComunicacionInfo,
  InfoUltimoMensaje,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';
import { ActualizarConsentimientoComunicacionesCommand } from '@/shared/repositories/autogenerado/wsMensajeriaClient';

import { useComunicacionesDirectasService } from '../ventana-comunicaciones-directas/comunicaciones-directas.service';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

import { useAccionesTarjeta } from '../hooks/acciones-tarjeta';
import { useComunicaciones } from '../hooks/marcar-leido';

import { BotonArchivadas } from './boton-archivadas-component';
import { ListadoComunicaciones } from './tarjeta-comunicacion-component';
import { DesActivacionComunicaciones } from './desactivacion-comunicaciones';

type ComunicacionesDirectasBaseComponentProps = {
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
  setConsentimientoActivo: Dispatch<SetStateAction<boolean>>;
  actualizarConsentimiento: UseMutationResult<
    void,
    unknown,
    ActualizarConsentimientoComunicacionesCommand,
    unknown
  >;
  setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
  setInfoComunicacion: Dispatch<SetStateAction<ComunicacionInfo | undefined>>;
  infoUltimoMensajeEnviado?: InfoUltimoMensaje;
};

export const ComunicacionesDirectasActivasComponent = ({
  comunicacionesDirectasRepository,
  setConsentimientoActivo,
  actualizarConsentimiento,
  setAviso,
  setInfoComunicacion,
}: ComunicacionesDirectasBaseComponentProps) => {
  const comunicacionesDirectasService = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });
  const { data: dataActivas } =
    comunicacionesDirectasService.ObtenerComunicacionesActivas();

  const { data: conversacionesConMensajesNuevos } =
    comunicacionesDirectasService.ObtenerConversacionesConMensajesNuevos();

  const { data: comunicacionesArchivadasPendientes } =
    comunicacionesDirectasService.ObtenerComunicacionesArchivadasSinLeer();

  const { actualizarNuevosMensajes } = useComunicaciones(dataActivas);

  const { accionArchivarComunicaciones, accionAccesoAlElemento } =
    useAccionesTarjeta(
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
    if (!conversacionesConMensajesNuevos!.length) return;

    if (!conversacionSeleccionada) {
      queryClient.invalidateQueries({
        queryKey: ['comunicacion-activa'],
        refetchType: 'active',
      });
    } else {
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
          refetchType: 'active',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['comunicacion-activa'],
        refetchType: 'active',
      });
    }
  }, [conversacionesConMensajesNuevos, conversacionSeleccionada, queryClient]);

  return (
    <div>
      <div>
        <TituloCabecera>
          {t('paginas.comunicacionesDirectas.comunicacionesActivas')}
        </TituloCabecera>
      </div>
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
        accionArchivarComunicaciones={accionArchivarComunicaciones}
        textoMensaje={t(
          'paginas.comunicacionesDirectas.mensajeSinComunicaciones',
        )}
      />
      <RowLayout
        space={1}
        justifyContent="space-between"
        className={styles.filtros__botones}
      >
        <DesActivacionComunicaciones
          setConsentimientoActivo={setConsentimientoActivo}
          actualizarConsentimiento={actualizarConsentimiento}
          setAviso={setAviso}
          idsComunicacionesActivas={dataActivas?.conversaciones?.flatMap((c) =>
            c.idConversacionEncriptado ? [c.idConversacionEncriptado] : [],
          )}
          comunicacionesDirectasRepository={comunicacionesDirectasRepository}
        />
      </RowLayout>
    </div>
  );
};
