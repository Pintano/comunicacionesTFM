import { t } from 'i18next';
import { useCallback } from 'react';

export function useAccionesAjustes() {
  const accionAbrirComunicacionesArchivadasSeleccionadas = useCallback(() => {
    console.log('se abren las conversaciones archivadas');
  }, []);
  return {
    accionAbrirComunicacionesArchivadasSeleccionadas: {
      textoDescriptivo: t('comunicacionesDirectas.comunicacionesArchivadas'),
      accion: accionAbrirComunicacionesArchivadasSeleccionadas,
    },
  };
}
