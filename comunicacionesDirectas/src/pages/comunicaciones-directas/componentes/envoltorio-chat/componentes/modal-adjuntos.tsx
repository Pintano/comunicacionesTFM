import {
  ResultadoSubirFichero,
  Modal,
  SubidaFicheros,
  Button,
} from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { ParametrosParaAdjuntarArchivos } from '../envoltorio-chat.types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface ModalAdjuntarArchivosProps {
  isOpen: boolean;
  onClose: () => void;
  parametros: ParametrosParaAdjuntarArchivos;
  onFicheroSubidoConversacion: (
    resultado: ResultadoSubirFichero,
    nombreFichero: string,
  ) => Promise<void>;
}

export function ModalAdjuntarArchivos({
  isOpen,
  onClose,
  parametros,
  onFicheroSubidoConversacion,
}: ModalAdjuntarArchivosProps) {
  const { t } = useTranslation();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const clickEnviarArchivos = () => {
    setButtonDisabled(true);
    parametros.onConsolidarArchivos(parametros.datos);
    parametros.setDatos([]);
    onClose();
    setButtonDisabled(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="wide"
      disableCloseOnClickOutside
    >
      <Modal.Header>{t('chat.conversacion.adjuntarArchivos')}</Modal.Header>
      <Modal.Body>
        <SubidaFicheros
          error={false}
          maxFicheros={parametros.maxFichero}
          extensionesPermitidas={parametros.extensionesPermitidas}
          tamanoTotalficherosPermitido={parametros.tamanoTotalficherosPermitido}
          tamanoPagina={parametros.tamanoPagina}
          columnas={parametros.columnas}
          datos={parametros.datos}
          setDatos={parametros.setDatos}
          onFicheroSubido={onFicheroSubidoConversacion}
          sinScroll={parametros.sinScroll}
          permiteReordenar={false}
          ocultarListado={true}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            clickEnviarArchivos();
          }}
          variant="principal"
          textoAccesibilidad={t('chat.conversacion.enviar')}
          disabled={buttonDisabled || parametros.datos.length === 0}
        >
          {t('chat.conversacion.enviar')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
