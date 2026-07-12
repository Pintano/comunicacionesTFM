import { ActualizarConsentimientoComunicacionesCommand } from '@/shared/repositories/autogenerado/wsMensajeriaClient';
import { IComunicacionesDirectasRepository } from '@/shared/repositories/comunicaciones-directas';
import { UseMutationResult } from '@tanstack/react-query';
import {
  AvisoProps,
  Button,
  TextButton,
  Modal,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type DesActivacionComunicacionesProps = {
  setConsentimientoActivo: Dispatch<SetStateAction<boolean>>;
  actualizarConsentimiento: UseMutationResult<
    void,
    unknown,
    ActualizarConsentimientoComunicacionesCommand,
    unknown
  >;
  setAviso: Dispatch<SetStateAction<AvisoProps | undefined>>;
  idsComunicacionesActivas: string[] | undefined;
  comunicacionesDirectasRepository: IComunicacionesDirectasRepository;
};

export const DesActivacionComunicaciones = ({
  setConsentimientoActivo,
  actualizarConsentimiento,
  setAviso,
}: DesActivacionComunicacionesProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();

  const mostrarAvisoDesactivado = () => {
    setConsentimientoActivo(false);
    if (window.opener && !window.opener.closed) {
      window.close();
    }
    setAviso({
      message: t(
        'paginas.comunicacionesDirectas.comunicacionesDirectasDesactivado',
      ),
      variant: 'success',
      duration: 3000,
    });
  };

  const onDesactivar = () => {
    actualizarConsentimiento.mutate(
      { consentimiento: false },
      {
        onSuccess: () => {
          mostrarAvisoDesactivado();
        },
        onError: (error) => {
          console.error(
            'Error actualizando el consentimiento del magistrado',
            error,
          );
        },
      },
    );
  };

  return (
    <>
      <TextButton
        variant="secondary"
        icono="messageOff"
        onClick={() => setIsOpenModal(true)}
        aria-label={t('palabras.comunicacionesDirectas.bajaConsentimiento')}
      >
        {t('paginas.comunicacionesDirectas.bajaConsentimiento')}
      </TextButton>

      <Modal
        size="large"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Modal.Header>
          {t('paginas.comunicacionesDirectas.desactivarComunicacionesDirectas')}
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: '2px' }}>
            <Trans i18nKey="paginas.comunicacionesDirectas.mensajePrevioCancelacionComunicaciones" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TextButton variant="secondary" onClick={() => setIsOpenModal(false)}>
            {t('palabras.cancelar')}
          </TextButton>
          <Button variant="principal" onClick={onDesactivar}>
            {t('paginas.comunicacionesDirectas.desactivar')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
