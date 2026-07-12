import { IconButton } from 'tracasa-components';
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
