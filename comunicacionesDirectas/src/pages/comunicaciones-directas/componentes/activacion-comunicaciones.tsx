import { ActualizarConsentimientoComunicacionesCommand } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { UseMutationResult } from '@tanstack/react-query';
import {
  AvisoProps,
  Button,
  TextButton,
  EmptyState,
  Modal,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type ActivacionComunicacionesProps = {
  setConsentimientoActivo: Dispatch<SetStateAction<boolean>>;
  actualizarConsentimiento: UseMutationResult<
    void,
    unknown,
    ActualizarConsentimientoComunicacionesCommand,
    unknown
  >;
  setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
};

export const ActivacionComunicaciones = ({
  setConsentimientoActivo,
  actualizarConsentimiento,
  setAviso,
}: ActivacionComunicacionesProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { t } = useTranslation();

  const onActivar = () => {
    actualizarConsentimiento.mutate(
      {
        consentimiento: true,
      },
      {
        onSuccess: () => {
          setConsentimientoActivo(true);
          setAviso({
            message: t(
              'paginas.comunicacionesDirectas.comunicacionesDirectasActivado',
            ),
            variant: 'success',
            duration: 3000,
          });
        },
      },
    );
  };

  return (
    <div style={{ height: 'calc(100vh - var(--header-height))' }}>
      <EmptyState
        icono="infoCircle"
        titulo={t(
          'paginas.comunicacionesDirectas.comunicacionesDirectasDesactivado',
        )}
        link={{
          texto: t(
            'paginas.comunicacionesDirectas.activarComunicacionesDirectas',
          ),
          onClick: () => setIsOpenModal(true),
        }}
      >
        {t('paginas.comunicacionesDirectas.explicacionMensajeAviso')}
      </EmptyState>

      <Modal
        size="large"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Modal.Header>
          {t('paginas.comunicacionesDirectas.activarComunicacionesDirectas')}
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: '2px' }}>
            <Trans i18nKey="paginas.comunicacionesDirectas.mensajePrevioActivacionComunicaciones" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TextButton variant="secondary" onClick={() => setIsOpenModal(false)}>
            {t('palabras.cancelar')}
          </TextButton>
          <Button variant="principal" onClick={onActivar}>
            {t('paginas.comunicacionesDirectas.activar')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
