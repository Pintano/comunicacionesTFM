import { IconButton } from 'C:/Users/ataberna/tracasa-components/src/index.ts';
import { useTranslation } from 'react-i18next';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

export const BotonArchivar = ({
  idComunicacion,
}: {
  idComunicacion: string;
}) => {
  const { t } = useTranslation();
  const abrirModal = useComunicacionesDirectasStore(
    (state) => state.abrirModal,
  );

  return (
    <IconButton
      icon="archive"
      onClick={() => abrirModal(idComunicacion)}
      aria-label={t('comunicacionesDirectas.archivar')}
      size="lg"
    />
  );
};
