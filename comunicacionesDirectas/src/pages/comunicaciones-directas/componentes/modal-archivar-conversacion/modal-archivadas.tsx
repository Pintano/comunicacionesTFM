import { Suspense, useRef, useState } from 'react';
import { t } from 'i18next';
import { useQueryClient } from '@tanstack/react-query';

import {
  Aviso,
  Button,
  IconoCarga,
  Mensaje,
  Modal,
  RowLayout,
  TextButton,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';

import CustomErrorBoundary from '@/pages/shared/components/error/error-boundary';
import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';

import { useComunicacionesDirectasStore } from '../../ventana-comunicaciones-directas/comunicaciones-directas.store';
import { useComunicacionesDirectasService } from '../../ventana-comunicaciones-directas/comunicaciones-directas.service';

type ArchivarComunicacionModalProps = {
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
};

export default function ArchivarComunicacionModal({
  comunicacionesDirectasRepository,
}: React.PropsWithChildren<ArchivarComunicacionModalProps>) {
  const { modal, cerrarModal } = useComunicacionesDirectasStore((state) => ({
    modal: state.modal,
    cerrarModal: state.cerrarModal,
  }));

  const { setIdConversacionSeleccionada, setConversacionSeleccionada } =
    useComunicacionesDirectasStore((state) => ({
      setIdConversacionSeleccionada: state.setIdConversacionSeleccionada,
      setConversacionSeleccionada: state.setConversacionSeleccionada,
    }));

  const [mostrarAviso, setMostrarAviso] = useState(false);

  const isLoading = useRef(false);

  const { ArchivarComunicaciones } = useComunicacionesDirectasService({
    comunicacionesDirectasRepository,
  });

  const { mutateAsync, isPending } = ArchivarComunicaciones();

  const queryClient = useQueryClient();

  const handleAceptar = async () => {
    if (!modal.idComunicacion) return;
    if (isLoading.current) return;

    isLoading.current = true;

    try {
      await mutateAsync([modal.idComunicacion]);

      await queryClient.invalidateQueries({
        queryKey: ['comunicacion-activa'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['comunicacion-archivada'],
      });

      await queryClient.refetchQueries({
        queryKey: ['mensajes-por-conversacion'],
      });

      setMostrarAviso(true);

      setConversacionSeleccionada(undefined);
      setIdConversacionSeleccionada(undefined);

      cerrarModal();
    } catch (error) {
      console.error('Error archivando comunicación', error);
    } finally {
      isLoading.current = false;
    }
  };

  return (
    <CustomErrorBoundary>
      <Modal isOpen={modal.abierto} onClose={cerrarModal} size="medium">
        <Suspense fallback={<IconoCarga />}>
          <Modal.Header>
            {t('paginas.comunicacionesDirectas.archivarComunicacion')}
          </Modal.Header>
        </Suspense>

        <Modal.Body>
          <Mensaje
            message={t(
              'paginas.comunicacionesDirectas.avisoArchivarComunicacion',
            )}
            variant="warning"
          />
        </Modal.Body>

        <Modal.Footer>
          <RowLayout>
            <TextButton variant="secondary" onClick={cerrarModal}>
              {t('palabras.cancelar')}
            </TextButton>

            <Button
              variant="principal"
              onClick={handleAceptar}
              disabled={isPending || isLoading.current}
            >
              {t('palabras.aceptar')}
            </Button>
          </RowLayout>
        </Modal.Footer>
      </Modal>

      {mostrarAviso && (
        <Aviso
          variant="success"
          message={t(
            'paginas.comunicacionesDirectas.avisoArchivadaCorrectamente',
          )}
          duration={3000}
          onClose={() => setMostrarAviso(false)}
        />
      )}
    </CustomErrorBoundary>
  );
}
