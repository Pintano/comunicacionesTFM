import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CabeceraAvantius,
  EmptyState,
  GlobalLayout,
  LayoutComunicaciones,
} from 'tracasa-components';

import { useTitulo } from '@/pages/shared/hooks/use-titulo';
import { useAvisosContext } from '@/shared/hooks/useAvisosContext.hook';

import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import {
  ComunicacionInfo,
  InfoUltimoMensaje,
} from '@/shared/repositories/comunicaciones-directas/models/comunicaciones-directas';

import { ComunicacionesDirectasActivasComponent } from '../componentes/comunicaciones-directas-activas-component';
import { ComunicacionesDirectasArchivadasComponent } from '../componentes/comunicaciones-directas-archivadas-component';
import { EnvoltorioChat } from '../componentes/envoltorio-chat/envoltorio-chat';
import { ActivacionComunicaciones } from '../componentes/activacion-comunicaciones';
import ArchivarComunicacionModal from '../componentes/modal-archivar-conversacion/modal-archivadas';

import { useComunicacionesDirectasService } from './comunicaciones-directas.service';
import { useComunicacionesDirectasStore } from './comunicaciones-directas.store';
import { EstadosComunicacion } from '../models/comunicaciones.enum';

const estadoComunicaciones = {
  activas: ComunicacionesDirectasActivasComponent,
  archivadas: ComunicacionesDirectasArchivadasComponent,
};

type ComunicacionesDirectasPageProps = {
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
  estadoComunicacion?: string;
};

const ComunicacionesDirectasPage = ({
  comunicacionesDirectasRepository,
}: ComunicacionesDirectasPageProps) => {
  const { t } = useTranslation();
  const { setAviso } = useAvisosContext();

  useTitulo(t('comunicacionesDirectas.comunicacionesDirectas'));

  const vistaActual = useComunicacionesDirectasStore(
    (state) => state.vistaActual,
  );

  const conversacionSeleccionada = useComunicacionesDirectasStore(
    (state) => state.conversacionSeleccionada,
  );

  const {
    idConversacionSeleccionada,
    setIdConversacionSeleccionada,
    setConversacionSeleccionada,
    abrirModal,
    modal,
  } = useComunicacionesDirectasStore();

  const comunicacionesDirectasService = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });

  const { data } =
    comunicacionesDirectasService.ComprobarConsentimientoComunicaciones();

  const actualizarConsentimiento =
    comunicacionesDirectasService.ActualizarConsentimientoComunicaciones();

  const [consentimientoActivo, setConsentimientoActivo] = useState<boolean>(
    data ? data : false,
  );

  const [infoComunicacion, setInfoComunicacion] = useState<
    ComunicacionInfo | undefined
  >(undefined);

  const [infoUltimoMensaje, setInfoUltimoMensaje] = useState<
    InfoUltimoMensaje | undefined
  >(undefined);

  const mostrarButtonRight = () => {
    if (vistaActual !== 'activas') return undefined;
    if (!conversacionSeleccionada) return undefined;
    if (
      conversacionSeleccionada.idEstadoConversacion !==
      EstadosComunicacion.Activa
    )
      return undefined;

    return 'archive';
  };

  const cerrarConversacion = () => {
    setConversacionSeleccionada(undefined);
    setIdConversacionSeleccionada(undefined);
    setInfoComunicacion(undefined);
  };

  const abrirArchivarComunicacionModal = () => {
    if (idConversacionSeleccionada) {
      abrirModal(idConversacionSeleccionada);
    }
  };

  const Componente = estadoComunicaciones[vistaActual];

  return (
    <GlobalLayout>
      <CabeceraAvantius
        title={t('paginas.comunicacionesDirectas.comunicacionesDirectas')}
        menuConfig={[]}
        mostrarAccionesTramitacion={false}
      />
      {consentimientoActivo ? (
        <LayoutComunicaciones
          colapsableSidebar={false}
          esVistaDetalle={!!idConversacionSeleccionada}
          sidebar={
            <Componente
              comunicacionesDirectasRepository={comunicacionesDirectasRepository}
              setConsentimientoActivo={setConsentimientoActivo}
              actualizarConsentimiento={actualizarConsentimiento}
              setAviso={setAviso}
              setInfoComunicacion={setInfoComunicacion}
              infoUltimoMensajeEnviado={infoUltimoMensaje}
            />
          }
          contenido={
            !idConversacionSeleccionada ? (
              <EmptyState
                icono="infoCircle"
                titulo={t('chat.conversacion.seleccioneUnaComunicacion')}
              >
                {t('chat.conversacion.seleccioneUnaComunicacionExtendido')}
              </EmptyState>
            ) : (
              <>
                <EnvoltorioChat
                  comunicacionesDirectasRepository={comunicacionesDirectasRepository}
                  setInfoUltimoMensaje={setInfoUltimoMensaje}
                />
                {modal.abierto && (
                  <ArchivarComunicacionModal
                    comunicacionesDirectasRepository={comunicacionesDirectasRepository}
                  />
                )}
              </>
            )
          }
          header={{
            buttonLeft: 'arrowNarrowLeft',
            onClickButtonLeft: cerrarConversacion,
            buttonRight: mostrarButtonRight(),
            onClickButtonRight: abrirArchivarComunicacionModal,
            textLeft: infoComunicacion?.titulo,
            textRight: infoComunicacion?.remitenteRol,
          }}
          mostrarHeader={true}
        />
      ) : (
        <ActivacionComunicaciones
          setConsentimientoActivo={setConsentimientoActivo}
          actualizarConsentimiento={actualizarConsentimiento}
          setAviso={setAviso}
        />
      )}
    </GlobalLayout>
  );
};

export default ComunicacionesDirectasPage;
