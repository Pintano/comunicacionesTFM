import { t } from 'i18next';
import {
  IconButton,
  RowLayout,
  TarjetaComunicacion,
  TituloCabecera,
} from 'tracasa-components';
import { useComunicacionesDirectasStore } from '../ventana-comunicaciones-directas/comunicaciones-directas.store';

interface BotonArchivadasProps {
  numeroComunicacionesArchivadas: number;
}

export const BotonArchivadas = ({
  numeroComunicacionesArchivadas,
}: BotonArchivadasProps) => {
  const { vistaActual, setVistaActual } = useComunicacionesDirectasStore();

  const {
    setConversacionSeleccionada,
    setIdConversacionSeleccionada,
    setConversaciones,
  } = useComunicacionesDirectasStore();

  const { setFiltroTexto } = useComunicacionesDirectasStore();

  const cambiarRuta = () => {
    setConversacionSeleccionada(undefined);
    setIdConversacionSeleccionada(undefined);
    setConversaciones(undefined);
    setVistaActual(vistaActual === 'activas' ? 'archivadas' : 'activas');
    setFiltroTexto('');
  };

  const textoBotonCambio =
    vistaActual === 'activas'
      ? t('paginas.comunicacionesDirectas.comunicacionesArchivadas')
      : t('paginas.comunicacionesDirectas.comunicacionesActivas');

  return (
    <>
      {vistaActual === 'archivadas' ? (
        <RowLayout alignItems="center">
          <IconButton
            icon={'arrowNarrowLeft'}
            aria-label={'arrowNarrowLeft'}
            onClick={cambiarRuta}
          />
          <TituloCabecera>
            {t('paginas.comunicacionesDirectas.comunicacionesArchivadas')}
          </TituloCabecera>
        </RowLayout>
      ) : (
        <>
          <TarjetaComunicacion
            id={0}
            titulo={textoBotonCambio}
            icono="archive"
            onClick={cambiarRuta}
            esBoton={true}
            contador={numeroComunicacionesArchivadas}
          />
        </>
      )}
    </>
  );
};
