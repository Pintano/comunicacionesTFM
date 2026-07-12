import {
  ArbolRelacionados,
  GrupoExpedientes,
  Modal,
} from 'tracasa-components';
import { useTranslation } from 'react-i18next';

interface ArbolRelacionadosModalProps {
  expedientes: GrupoExpedientes[];
  isOpen: boolean;
  onClose: () => void;
}

export const ModalArbolRelacionados = ({
  expedientes,
  isOpen,
  onClose,
}: ArbolRelacionadosModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="large">
        <Modal.Header>{t('modales.arbolRelacionados.titulo')}</Modal.Header>
        <Modal.Body>
          <ArbolRelacionados
            expedientesOrgano={expedientes}
          ></ArbolRelacionados>
        </Modal.Body>
      </Modal>
    </>
  );
};
